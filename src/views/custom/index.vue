<template>
<div class="custom-wrapper">
    自定义路由
</div>
</template>
<script lang="ts" setup>
import { useRoute} from 'vue-router';
const route = useRoute()
const { params} = route
console.log(params,'params')
</script>
<style lang="scss" scoped>
</style>