import Home from '../pages/Index.vue'
import Team from '../pages/Team.vue'
import User from '../pages/User.vue'
import SearchPage from "../pages/SearchPage.vue"
import UserEdit from "../pages/UserEdit.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import srx from "../pages/srx.vue";
import teamAddPage from "../pages/TeamAddPage.vue";
import teamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserCreateTeamPage from "../pages/UserCreateTeamPage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {path: '/', component: Home, title:'主页'},
    {path: '/team', component: Team,title: '找队伍'},
    {path: '/user', component: User,title: '用户'},
    {path: '/search', component: SearchPage,title:'查询用户'},
    {path: '/user/edit', component: UserEdit,title:'编辑信息'},
    {path: '/user/update', component: UserUpdatePage,title: '修改用户'},
    {path: '/user/team/create', component: UserCreateTeamPage,title:'已创建的队伍'},
    {path: '/user/team/join', component: UserTeamJoinPage,title: '已加入的队伍'},
    {path: '/user/list', component: SearchResultPage,title:'伙伴匹配'},
    {path: '/user/login', component: UserLoginPage,title: '登录'},
    {path: '/srx', component: srx},
    {path: '/team/add', component: teamAddPage,title: '创建队伍'},
    {path: '/team/update', component: teamUpdatePage,title: '更新队伍'}
]
export default routes
