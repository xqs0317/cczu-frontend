<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length <1" description="搜索不到符合要求的用户"/>
</template>

<script setup lang='ts'>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()
const {tags} = route.query
const mockUser = {
  id: 1,
  username: 'xqs',
  userAccount: 'songshu',
  avatarUrl: 'https://pic2.zhimg.com/80/v2-fc211a708401d0813ccad2645f8ce45d_720w.webp',
  profile: "我变秃了，也变强了",
  gender: 0,
  phone: '15062174217',
  email: '8888888',
  planetCode: '16888',
  createTime: '2023-02-02',
  tags: ['c++', 'java', 'emo', '打工中']
};
const userList = ref([mockUser])
onMounted(() => {
  myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: function (params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }
    }
  }).then(function (response) {
    console.log(response)
    const tempList = response.data.data
    tempList.value = tempList.map((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = tempList
  })
})
</script>

<style scoped>
</style>
