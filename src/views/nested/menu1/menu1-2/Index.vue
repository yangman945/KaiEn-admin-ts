<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="menu 1-2" type="success">
      <router-view>
      </router-view>
    </el-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
