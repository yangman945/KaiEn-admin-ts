<template>
    <div class="component-wrapper">
        <el-dropdown @command="handleCommand">
            <svg-icon 
            :config="{ size: 25, cursor: 'pointer' }" 
            :icon=" currentLanguage === 'en' ? 'languageE':'languageC'" />
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in languages" :key="item.value" :command="item.value"
                        :disabled="item.value === currentLanguage">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { ElemeFilled } from '@element-plus/icons'
import { useI18n } from 'vue-i18n';
const i18n = useI18n()
const currentLanguage = computed(() => {
    return i18n.locale.value
})
const languages = reactive([
    { name: 'en', value: 'en' },
    { name: '中文', value: 'zh-cn' }
])
const handleCommand = (val) => {
    i18n.locale.value = val
}
</script>
<style lang="scss" scoped>
.component-wrapper {
    margin: 0 20px;
}
</style>