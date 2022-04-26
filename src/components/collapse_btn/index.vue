<template>
    <div @click="toggleClick" class="component-wrapper">
        <svg-icon :class="{ 'is-active': isActive }" icon="collapse" :config="{ size: 25, cursor: 'pointer' }" />
    </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
    isActive: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['toggleClick'])
const toggleClick = () => {
    emit('toggleClick')
}
</script>
<style lang="scss" scoped>
.component-wrapper {
    margin: 0 40px 0 0;

    .is-active {
        transform: rotate(180deg);
    }
}
</style>