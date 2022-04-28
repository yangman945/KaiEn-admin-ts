<template>
  <div class="login-wrapper">
    <el-button @click="handleLogin">登录</el-button>
   </div>  
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "@/store";
import { UserActionTypes} from '@/store/modules/user/types'
import {SystemActionTypes} from '@/store/modules/system/types'
const store = useStore()
const loginData= {
    username: 'tester',
    password: 'MTIzNzg5',
    method: 'ps',
    token_type: 'user',
    timestamp: '1650964211',
}
onMounted(()=>{
  store.dispatch(SystemActionTypes.ACTION_GET_SYS_CONFIG,undefined)
})
const handleLogin = () => {
  store.dispatch(UserActionTypes.ACTION_LOGIN,loginData)
}
</script>
