<template>
  <div class="main">
    <van-cell title="当前用户" :value="user.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </div>
</template>

<script setup lang='ts'>
import {useRouter} from "vue-router";
import {getCurrentUser} from "../states/user.ts";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";

const router = useRouter()
const initUser = {
  "username":''
}
const user = ref({...initUser})
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
onMounted(()=>{
  myAxios.get('/user/current').then(function (resp) {
    user.value = resp.data.data
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
