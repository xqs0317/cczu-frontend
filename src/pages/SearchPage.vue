<template>
  <div class="main">
    <form action="/">
      <van-search
          v-model="searchTags"
          show-action
          placeholder="请输入搜素标签"
          @search="onSearch"
          @cancel="onCancel"
      />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <van-space size="20px" wrap align="end">
      <van-tag v-for="tag in activeIds" closeable size="medium" type="primary" @close="doClose(tag)">
        {{tag}}
      </van-tag>
    </van-space>
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue';
import {showToast} from 'vant';
import {useRouter} from "vue-router";
//标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
      {text: '动物', id: '动物', disabled: true},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '大wu', id: '大wu'},
      {text: '大liu', id: '大liu'},
      {text: '社畜', id: '社畜'},
    ],
  },
  // {text: '身份', disabled: true},
];
let tagList = ref(originTagList);
const searchTags = ref('');
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => {
      return item.text.includes(searchTags.value);
    });
    return tempParentTag;
  });
};
const onCancel = () => {
  searchTags.value = ''
  tagList.value = originTagList
};
const activeIds = ref([]);
const activeIndex = ref(0);
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter((item) => {
    return item !== tag;
  })
}
const router = useRouter()
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}
</script>

<style scoped>
.main {
  position: absolute;
  width: 100%;
  left: 0%
}
</style>
