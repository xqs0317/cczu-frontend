<template>
  <div class="main">
    <van-cell title="用户名" is-link :value="user.username" @click="toEdit('username','用户名',user.username)"/>
    <van-cell title="账号" is-link :value="user.userAccount" @click="toEdit('userAccount','账号',user.userAccount)"/>
    <van-cell title="头像" is-link @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <img :src="user.avatarUrl" style="height: 48px;width: 38px"/>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号" :value="user.planetCode" @click="toEdit('planetCode','星球编号',user.planetCode)"/>
    <van-cell title="创建时间" :value="user.createTime" @click="toEdit('createTime','创建时间',user.createTime)"/>
  </div>
</template>

<script setup lang='ts'>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import qs from "qs";
import {showToast} from "vant";
import {getCurrentUser, setCurrentUser} from "../states/user.ts";

const router = useRouter()
const user = ref({})
const toEdit = (editKey, label, originVal) => {
  router.push({
    path: '/user/edit',
    //query用于拼接
    query: {
      editKey,
      label,
      originVal
    }
  })
}
//获取当前用户
onMounted(() => {
  myAxios.get('/user/current').then(function (response) {
    if (response.data.code === 0) {
      user.value = response.data.data
      setCurrentUser(user.value)
    } else {
      showToast("获取当前用户失败")
    }
  })
})
</script>

<style scoped>
.main {
  position: absolute;
  width: 100%;
  left: 0%;
}
</style>
