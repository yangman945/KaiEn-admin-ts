<template>
    <div class="component-wrapper">
        <svg-icon @click="onChangeTheme(theme === 'light' ? 'dark' :'light')" :icon="theme"  :config="{ size: 25, cursor: 'pointer' }" />
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/types'
const store = useStore()
const theme = computed(() => {
    return store.state.app.theme
})
const onChangeTheme = (theme: string) => {
    store.dispatch(AppActionTypes.ACTION_SET_THEME, theme)
    document.documentElement.setAttribute("data-theme", theme);
}
onChangeTheme(theme.value)
</script>