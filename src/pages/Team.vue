<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" background="#0099FF"
                @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"></van-tab>
      <van-tab title="私有" name="private"></van-tab>
      <van-tab title="加密" name="password"></van-tab>
    </van-tabs>
    <van-button type="primary" plain @click="doJoinTeam" style="left: 38%">添加队伍</van-button>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="!teamList || teamList.length <1" description="搜索不到符合要求的队伍"/>
  </div>
</template>

<script setup lang='ts'>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showToast} from "vant/es";
import myAxios from "../plugins/myAxios.js";
import TeamCardList from "../components/TeamCardList.vue";
import moment from "moment";

const active = ref('public')
const onTabChange = (name) => {
  if (name === 'public') {
    onSearch(searchText.value, 0)
  } else if (name === 'private') {
    onSearch(searchText.value, 1)
  } else {
    onSearch(searchText.value, 2)
  }
}
const router = useRouter()
//搜索内容
const searchText = ref('')
//搜索函数
const onSearch = (val, status = 0) => {
  myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status: status,
    }
  }).then(function (res) {
    teamList.value = res.data.data
    if (res.data.code === 0) {
      showToast("加载数据成功")
      teamList.value.map(team => {
        team.expireTime = moment(team.expireTime).format('YYYY-MM-DD HH:mm:ss')
        team.createTime = moment(team.createTime).format('YYYY-MM-DD HH:mm:ss')
      })
    }
  })
};
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}
const teamList = ref([])
onMounted(() => {
  myAxios.get("/team/list").then(function (res) {
    if (res.data.code === 0) {
      showToast("加载数据成功")
      teamList.value = res.data.data
      teamList.value.map(team => {
        team.expireTime = moment(team.expireTime).format('YYYY-MM-DD HH:mm:ss')
        team.createTime = moment(team.createTime).format('YYYY-MM-DD HH:mm:ss')
      })
    }
  })
})


</script>

<style scoped>

</style>
