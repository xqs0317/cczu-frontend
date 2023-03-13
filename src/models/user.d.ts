/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    planetCode: string;
    createTime: Date;
    userRole: number;
    tags: string[];
};
