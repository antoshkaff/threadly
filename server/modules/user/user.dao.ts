import { prisma } from '@server/shared/prisma';
import { User } from '@server/generated/prisma/client';

export class UserDAO {
    static findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }
    static findByUsername(username: string) {
        return prisma.user.findUnique({ where: { username } });
    }
    static findById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }
    static create(data: {
        username: string;
        email: string;
        name: string;
        bio?: string | null;
        passwordHash: string;
    }) {
        return prisma.user.create({
            data: { ...data, avatarUrl: process.env.DEFAULT_AVATAR_URL! },
        });
    }
    static async toggleFollow(followerId: string, followingId: string) {
        const exists = await prisma.userFollow.findUnique({
            where: { followerId_followingId: { followerId, followingId } },
        });

        if (exists) {
            await prisma.userFollow.delete({
                where: { followerId_followingId: { followerId, followingId } },
            });
            return { followed: false };
        }

        await prisma.userFollow.create({
            data: { followerId, followingId },
        });

        return { followed: true };
    }

    static async getFollowers(userId: string) {
        const followers = await prisma.userFollow.findMany({
            where: { followingId: userId },
            include: {
                follower: {
                    select: { name: true, username: true, avatarUrl: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return followers.map((f) => f.follower);
    }

    static getProfileByUsername(username: string) {
        return prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                name: true,
                bio: true,
                avatarUrl: true,
                _count: {
                    select: {
                        subscriptions: true,
                        subscribers: true,
                    },
                },
                Post: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
    }

    static isFollowing(followerId: string, followingId: string) {
        return prisma.userFollow.findUnique({
            where: {
                followerId_followingId: { followerId, followingId },
            },
            select: { followerId: true },
        });
    }

    static updateProfile(
        userId: string,
        data: {
            name?: string;
            bio?: string | null;
            avatarUrl?: string;
        },
    ) {
        return prisma.user.update({
            where: { id: userId },
            data,
        });
    }

    static async getSubscriptions(userId: string) {
        const subs = await prisma.userFollow.findMany({
            where: { followerId: userId },
            include: {
                following: {
                    select: { name: true, username: true, avatarUrl: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return subs.map((s) => s.following);
    }

    static async getRandomUsers(limit: number, excludeUserId?: string) {
        if (excludeUserId) {
            return prisma.$queryRaw<User[]>`
                SELECT * FROM "User"
                WHERE "id" <> ${excludeUserId}
                ORDER BY RANDOM()
                LIMIT ${limit}
            `;
        }

        return prisma.$queryRaw<User[]>`
            SELECT * FROM "User"
            ORDER BY RANDOM()
            LIMIT ${limit}
        `;
    }
}

export function toPublicDTO(u: User) {
    return {
        id: u.id,
        username: u.username,
        email: u.email,
        name: u.name,
        bio: u.bio,
        createdAt: u.createdAt.toISOString(),
        updatedAt: u.updatedAt.toISOString(),
        avatarUrl: u.avatarUrl,
    };
}
