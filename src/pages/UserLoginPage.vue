<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang='ts'>
import {ref} from 'vue';
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";
import {useRouter} from "vue-router";
import {setCurrentUser} from "../states/user.ts";

const router = useRouter()

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = (values) => {
  myAxios.post('/user/login', {
    "userAccount": userAccount.value,
    "userPassword": userPassword.value
  }).then(function (resp) {
    if (resp.data.data) {
      showToast("登录成功")
      //保存到浏览器内存
      setCurrentUser(resp.data.data)
      router.push({
        path: '/'
      })
    } else {
      showToast("登录失败")
    }
  })
};
</script>

<style scoped>

</style>
