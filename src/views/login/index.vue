<template>
  <div class="login-wrapper">
    <el-button @click="handleLogin">登录</el-button>
   </div>  
</template>
<script lang="ts" setup>
import { useStore } from "@/store";
import { UserActionTypes} from '@/store/modules/user/types'
const store = useStore()
const loginData= {
    username: 'tester',
    password: 'MTIzNzg5',
    method: 'ps',
    token_type: 'user',
    timestamp: '1650964211',
}

const handleLogin = () => {
  store.dispatch(UserActionTypes.ACTION_LOGIN,loginData)
}
</script>
<style lang="scss">
</style>
