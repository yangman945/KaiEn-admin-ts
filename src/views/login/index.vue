<template>
<div class="login-wrapper">
    登录页
    <el-button @click="request.cancelRequest('/login')">取消请求</el-button>
</div>
</template>
<script lang="ts" setup>
    import {onMounted} from  'vue'
    import {request} from '@/api'
    import { login} from '@/api/login'
    onMounted(async  ()=>{
        await login({
            username:'admin',
            password:'123456'
            }).then(res => {
            console.log(res,'res')
        }).catch(err =>{
            console.log(err,'err')
        })
    })
</script>
<style lang="scss">

</style>