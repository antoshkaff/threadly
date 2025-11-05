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
        return prisma.user.create({ data });
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
    };
}
