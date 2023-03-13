import {UserType} from "../models/user";

//页面使用到set和get方法时，这个文件中的内容也被当做源码返回给浏览器
//浏览器运行vue组件，此时currentUser对象占用的就是浏览器的内存
let currentUser: UserType;
const setCurrentUser = (user: UserType) => {
    currentUser = user
}
const getCurrentUser = (): UserType => {
    return currentUser
}

export {
    setCurrentUser,
    getCurrentUser
}
