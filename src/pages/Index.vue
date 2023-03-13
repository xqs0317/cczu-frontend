<template>
  <van-button type="primary" plain @click="doMatch" style="left: 38%"
              v-model="modeText">{{ modeText }}
  </van-button>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length <1" description="由于网络波动数据为空"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import UserCardList from "../components/UserCardList.vue";

const loading = ref(true)
const route = useRoute()
const userList = ref([])
onMounted(() => {
  myAxios.get('/user/recommend', {
    params: {
      currentPage: 1,
      pageSize: 8
    }
  }).then(function (response) {
    console.log(response)
    const tempList = response.data.data.records
    tempList.value = tempList.map((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = tempList
    loading.value = false
  })
})
const modeKey = false
const modeText = ref("为您推荐")
let clickTime = 0
//匹配用户
const doMatch = () => {
  loading.value = true
  if (clickTime % 2 === 0) {
    myAxios.get('/user/match', {
      params: {
        num: 10
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
      modeText.value = "普通模式"
    })
  } else {
    myAxios.get('/user/recommend', {
      params: {
        currentPage: 1,
        pageSize: 8
      }
    }).then(function (response) {
      console.log(response)
      const tempList = response.data.data.records
      tempList.value = tempList.map((user) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags)
        }
      })
      userList.value = tempList
    })
    modeText.value = "推荐模式"
  }
  clickTime = clickTime + 1
  loading.value = false
}
</script>

<style scoped>
</style>

