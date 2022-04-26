<template>
    <svg class="svg-icon"  aria-hidden="true" :style="iconStyle">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script lang="ts" setup>
import { defineProps, computed,PropType } from 'vue'
const props = defineProps({
    icon: {
        type: String,
        require: true
    },
    config:{
        type:Object as  PropType<IconConfig>,
        require: false
    },
    isPointer:{
        type:Boolean,
        require: false,
        default:true
    }
    
})
const iconName = computed(() => {
    return `#icon-${props.icon}`
})
interface IconConfig {
    size?:number,
    color?:string,
    cursor?:string
}
const iconStyle = computed(()=>{
    return {
        'color':props.config?.color,
        'font-size': `${props.config?.size}`+'px',
        'cursor': props.config?.cursor
    }
})
</script>
<style lang="scss" scoped>
.svg-icon {
    /*将icon大小设置和字体大小一致，后续在通过svg-icon 使用icon的时候，可直接设置图标的font-size即可控制图标大小 */
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
    fill: currentColor;
    /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
    overflow: hidden;
}
</style>