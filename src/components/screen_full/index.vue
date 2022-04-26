<template>
    <svg-icon @click="handleScreenFull" :config="{ size: 25, cursor: 'pointer' }"
        :icon="isFull ? 'fullscreenExit' : 'fullscreenOpen'" />
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
import { ZoomIn, ZoomOut } from '@element-plus/icons'
const isFull = ref(screenfull.isFullscreen)
const handleScreenFull = () => {
    if (screenfull.isEnabled) {
        screenfull.toggle()
    }
}
const onScreenFull = () => {
    isFull.value = screenfull.isFullscreen
}
onMounted(() => {
    screenfull.on('change', onScreenFull)
})
onUnmounted(() => {
    screenfull.off('change', onScreenFull)
})  
</script>