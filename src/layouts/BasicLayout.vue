<template>
  <div class="main">
    <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        class="navbar"
    >
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>
    <router-view/>
    <van-tabbar route @change="onChange">
      <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
      <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
      <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup lang='ts'>  //setup语法糖，不需要return
import {showToast} from 'vant';
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import routes from "../config/router.ts";

const router = useRouter()
const route = useRoute()
const title = ref("伙伴匹配")
const onChange = (index) => showToast(`标签 ${index}`);
const onClickLeft = () => {
  //回到上一个页面
  router.back();
};
const onClickRight = () => {
  //方式一
  // location.href = "/#/search"
  //方式二
  router.push({path: '/search'})
};
const DEFAULT_TITLE = "伙伴匹配"
router.beforeEach((to, from) => {
  const toPath = to.path
  const route = routes.find((route) => {
    return route.path == toPath
  })
  if (!route) {
    title.value = DEFAULT_TITLE
  } else {
    title.value= route.title
  }
  return true
})
</script>

<style scoped>
.main {
  position: absolute;
  left: 0%;
  width: 100%;
}
</style>
