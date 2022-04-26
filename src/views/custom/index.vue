<template>
<div class="custom-wrapper">
    这个是自定义路由{{params.id}}
</div>
</template>
<script lang="ts" setup>
import { useRoute} from 'vue-router';
const route = useRoute()
const { params} = route
console.log(params,'params')
</script>
<style lang="scss" scoped>
.custom-wrapper{
    background-color: aqua;
}
</style>