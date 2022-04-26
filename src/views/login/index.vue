<template>
  <div class="login-wrapper">
    登录页
    <el-button @click="request.cancelRequest('/login')">取消请求</el-button>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { request } from "@/api";
import { login } from "@/api/login";
import axios from "axios";
onMounted(() => {
  login({
    username: 'tester',
    password: 'MTIzNzg5',
    method: 'ps',
    token_type: 'user',
    timestamp: '1650964211',
  }).then(res => {
    console.log(res, 'res')
  }).catch(err => {
    console.log(err, 'err')
  })
});
</script>
<style lang="scss">
</style>
