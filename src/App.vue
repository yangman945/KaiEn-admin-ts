<template>
  <router-view />
</template>
<script lang="ts" setup>
import { onMounted, nextTick } from "vue"
import { initializeComponents } from "@/core/plugins/keenthemes";
onMounted(() => {
  nextTick(() => {
    initializeComponents()
  })
})
</script>
<style lang="scss">
</style>