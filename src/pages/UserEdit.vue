<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentVal"
          :name="editUser.editKey"
          :label="editUser.label"
          :placeholder="editUser.label"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang='ts'>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";
import {getCurrentUser} from "../states/user.ts";

const route = useRoute()
const router = useRouter()
const editUser = ref({
  editKey: route.query.editKey,
  currentVal: route.query.originVal,
  label: route.query.label
})
//表单提交
const onSubmit = (values) => {
  const currentUser = getCurrentUser()
  myAxios.post('/user/update', {
    [editUser.value.editKey]: editUser.value.currentVal,
    'id': currentUser["id"],
    'userRole': currentUser["userRole"]
  }).then(function (response) {
    if (response.data.data) {
      showToast("修改成功")
      router.back()
    }
  })
};
</script>

<style scoped>

</style>
