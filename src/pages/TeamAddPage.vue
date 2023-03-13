<template>
  <div id="teamAdd">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队名"
            placeholder="队名"
            :rules="[{ required: true, message: '请填写队名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            name="expireTime"
            label="过期时间"
            placeholder="请选择过期时间"
            @click="showCalendar = true"
        />
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm"/>
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" min="3" max="20"/>
          </template>
        </van-field>
        <van-field name="status" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="addTeamData.status==='2'"
            v-model="addTeamData.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入入队密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang='ts'>
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant/es";
import {useRouter} from "vue-router";
import moment from "moment";

const router = useRouter()

const initTeam = {
  "description": "",
  "expireTime": moment().format('YYYY-MM-DD HH:mm:ss'),
  "maxNum": 3,
  "name": "",
  "password": "",
  "status": "2",
}
//用户填写表单数据
const addTeamData = ref({...initTeam})
//时间选择器
const result = ref('');
const showCalendar = ref(false);
const onConfirm = (date) => {
  addTeamData.value.expireTime = moment(date).format('YYYY-MM-DD HH:mm:ss')
  showCalendar.value = false;
};
//提交表单
const onSubmit = () => {
  //修改数据
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  myAxios.post("/team/add", postData)
      .then(function (res) {
        if (res.data.code === 0) {
          showToast("创建队伍成功")
          router.push({
            path: '/team',
            replace: true //禁止回退
          })
        } else {
          showToast("创建队伍失败")
        }
      })
}
</script>

<style scoped>

</style>
