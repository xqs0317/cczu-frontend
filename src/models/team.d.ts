import User from "../pages/User.vue";

/**
 * 用户类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    userVo: User;
    hasJoin: boolean;
    hasJoinNum:number;
};
