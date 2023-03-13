<template>
  <div id="teamCard">
    <van-card
        v-for="team in teamList"
        :desc="team.description"
        :title="team.name"
        :thumb="team.userVo.avatarUrl"
    >
      <template #bottom>
        <div>
          {{ `队伍人数:${team.hasJoinNum}   最大人数:${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime!=null">
          {{ `过期时间:${team.expireTime}` }}
        </div>
        <div v-if="team.expireTime!=null">
          {{ `创建时间:${team.createTime}` }}
        </div>
      </template>
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px;margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" type="primary" plain
                    v-if="team.userVo.id!==currentUser?.id && team.hasJoin=== false"
                    @click="preJoinTeam(team)">加入队伍

        </van-button>
        <van-button v-if="team.userVo.id===currentUser?.id" size="mini" type="primary" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button v-if="team.userVo.id!==currentUser?.id && team.hasJoin === true" size="mini" type="primary" plain
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userVo.id===currentUser?.id" size="mini" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showTeamPasswordDialog" title="入队密码" show-cancel-button
                @confirm="doJoinTeam"
                @cancel="doJoinCancel">
      <van-field v-model="password" label="密码" placeholder="请输入密码" type="password"/>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant/es";
import {getCurrentUser} from "../states/user";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";


interface TeamCardListProps {
  teamList: TeamType[]
}

const showTeamPasswordDialog = ref(false)
const password = ref('')
const joinTeamId = ref()
const props = defineProps<TeamCardListProps>()
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id
  if (team.status === 0)
    doJoinTeam()
  if (team.status === 2)
    showTeamPasswordDialog.value = true
}
const doJoinTeam = () => {
  if (!joinTeamId.value) {
    return;
  }
  myAxios.post('/team/join', {
    id: joinTeamId.value,
    password: password.value
  }).then(function (res) {
    if (res.data.code === 0) {
      showToast("入队成功");
      joinTeamId.value = 0
      password.value = '';
    } else {
      showToast(`${res.data.msg},具体原因:${res.data.description}`)
    }
  })
}
const doJoinCancel = ()=>{
  joinTeamId.value = 0
  password.value = '';
}
const currentUser = getCurrentUser()
// const currentUser = ref({})
// onMounted(async () => {
//   currentUser.value = await getCurrentUser()
// })
const router = useRouter()
const doUpdateTeam = (teamId: number) => {
  router.push({
    path: '/team/update',
    query: {
      teamId: teamId
    }
  })
}
const doQuitTeam = (teamId: number) => {
  myAxios.post('/team/quit', null, {
    params: {
      teamId: teamId
    }
  }).then(function (res) {
    if (res.data.code === 0) {
      showToast("退出成功")
    } else {
      showToast(`${res.data.msg},具体原因:${res.data.description}`)
    }
  })
}
const doDeleteTeam = (teamId: number) => {
  myAxios.delete('/team/delete', {
    params: {
      id: teamId
    }
  }).then(function (res) {
    if (res.data.code === 0) {
      showToast("退出队伍成功")
    } else {
      showToast(`${res.data.msg},具体原因:${res.data.description}`)
    }
  })
}
</script>

<style scoped>
#teamCard {
  --van-card-thumb-size: 88px
}
</style>
