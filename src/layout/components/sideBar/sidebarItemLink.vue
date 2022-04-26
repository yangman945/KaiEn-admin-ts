<template>
  <a v-if="isExternal(props.to)" :href="props.to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { defineProps,PropType } from 'vue'; 
import { useRouter } from 'vue-router'
import {isExternal} from '@/utils/validate'
const props = defineProps({
    to:{
        type:String,
        required: true
    }
})
const router = useRouter()
const push = () => {
    router.push(props.to).catch((err) => {
        console.log(err)
      })
}
</script>