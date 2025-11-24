import bcrypt from 'bcryptjs';
import { toPublicDTO, UserDAO } from './user.dao';
import { signAccess } from '@shared/jwt';
import { AppError } from '@server/modules/error/AppError';
import { ERROR_CODES } from '@shared/constants';
import { EditProfileInput } from '@shared/contracts/user.dto';

export class UserService {
    static async register(input: {
        username: string;
        email: string;
        name: string;
        password: string;
        passwordRepeat: string;
        bio?: string;
    }) {
        if (await UserDAO.findByEmail(input.email)) {
            throw new AppError(
                ERROR_CODES.email_taken,
                'Email already in use',
                409,
            );
        }
        if (await UserDAO.findByUsername(input.username)) {
            throw new AppError(
                ERROR_CODES.username_taken,
                'Username already in use',
                409,
            );
        }

        const { password, passwordRepeat, ...rest } = input;
        const passwordHash = await bcrypt.hash(input.password, 10);
        const user = await UserDAO.create({ ...rest, passwordHash });

        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
        };
        const accessToken = await signAccess(payload);

        return { user: toPublicDTO(user), accessToken };
    }

    static async login(input: { emailOrUsername: string; password: string }) {
        const byEmail = await UserDAO.findByEmail(input.emailOrUsername);
        const user =
            byEmail ?? (await UserDAO.findByUsername(input.emailOrUsername));
        if (!user) {
            throw new AppError(ERROR_CODES.not_found, 'User not found', 404);
        }

        const ok = await bcrypt.compare(input.password, user.passwordHash);
        if (!ok) {
            throw new AppError(
                ERROR_CODES.bad_credentials,
                'Wrong email or password',
                401,
            );
        }

        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
        };
        const accessToken = await signAccess(payload, '7d');

        return { user: toPublicDTO(user), accessToken };
    }

    static async toggleFollowByUsername(
        userId: string,
        targetUsername: string,
    ) {
        const target = await UserDAO.findByUsername(targetUsername);
        if (!target) {
            throw new AppError(ERROR_CODES.not_found, 'User not found', 404);
        }

        if (userId === target.id) {
            throw new AppError(
                ERROR_CODES.validation,
                'You cannot follow yourself',
                400,
            );
        }

        return UserDAO.toggleFollow(userId, target.id);
    }

    static async getFollowersByUsername(username: string) {
        const user = await UserDAO.findByUsername(username);
        if (!user) {
            throw new AppError(ERROR_CODES.not_found, 'User not found', 404);
        }

        return UserDAO.getFollowers(user.id);
    }

    static async getProfileByUsername(
        username: string,
        viewerId?: string | null,
    ) {
        const user = await UserDAO.getProfileByUsername(username);

        if (!user) {
            throw new AppError(ERROR_CODES.not_found, 'User not found', 404);
        }

        let isFollowed = false;

        if (viewerId && viewerId !== user.id) {
            const follow = await UserDAO.isFollowing(viewerId, user.id);
            isFollowed = !!follow;
        }

        return {
            id: user.id,
            username: user.username,
            name: user.name,
            bio: user.bio,
            avatarUrl: user.avatarUrl,

            subscriptionsCount: user._count.subscriptions,
            subscribersCount: user._count.subscribers,

            isFollowed,
        };
    }
    static async editProfile(userId: string, input: EditProfileInput) {
        const user = await UserDAO.findById(userId);
        if (!user) {
            throw new AppError(ERROR_CODES.not_found, 'User not found', 404);
        }

        const updated = await UserDAO.updateProfile(userId, {
            name: input.name,
            bio: input.bio ?? null,
            avatarUrl: input.avatarUrl,
        });

        return toPublicDTO(updated);
    }
}
