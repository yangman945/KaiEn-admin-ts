<template>
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <transition name="fadeIn">
                    <component :is="Component" />
                </transition>
            </keep-alive>
        </router-view>
    </section>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
 .app-main {
     width: 100%;
     min-height: calc(100vh - 50px);
     padding-top: 50px;
     position: relative;
     overflow: hidden;
 }

 .hasTagsView {
     .app-main {
         min-height: calc(100vh - 84px);
         padding-top: 84px;
     }
 }
</style>