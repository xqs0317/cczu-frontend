import {createApp} from 'vue'
import 'vant/lib/index.css';
import './style.css'
import App from './App.vue'
import routes from "./config/router";
import * as VueRouter from 'vue-router'
import {
    Search,
    Tag,
    Tabbar,
    TabbarItem,
    NavBar,
    Icon,
    Divider,
    TreeSelect,
    Space,
    Cell,
    CellGroup,
    Field, Form, Button, Card, Toast, Empty, Stepper, RadioGroup, Radio, Calendar, Skeleton, Tab, Tabs, Dialog
} from "vant/es";

const app = createApp(App)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Icon)
app.use(Search)
app.use(Divider)
app.use(Tag)
app.use(TreeSelect)
app.use(Space)
app.use(Cell)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Button)
app.use(Card)
app.use(Toast)
app.use(Empty)
app.use(Stepper)
app.use(RadioGroup)
app.use(Radio)
app.use(Calendar)
app.use(Skeleton)
app.use(Tab)
app.use(Tabs)
app.use(Dialog)
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。import './style.css'
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)
app.mount('#app')
