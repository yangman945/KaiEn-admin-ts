<template>
  <el-dialog v-model="dialogVisible" title="添加菜单" width="600px" destroy-on-close>
    <div>
      <el-form :model="fromData" label-width="120px">
        <el-form-item label="菜单名称">
          <el-input v-model="fromData.name" />
        </el-form-item>
        <el-form-item label="是否启用" prop="delivery">
          <el-switch v-model="fromData.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="EditMenuItem">保存</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { AddMenuItemRequest } from "@/api/system";
const  emits = defineEmits(['updateTable'])
const dialogVisible = ref(false);
const fromData = ref({
  name:'',
  status:0
});
const handleOpen = () => {
  dialogVisible.value = true;
};
const handleClose = () => {
  dialogVisible.value = false;
};
defineExpose({
  dialogVisible,
  handleOpen,
});
const EditMenuItem = () => {
  AddMenuItemRequest(fromData.value)
    .then((res) => {
      console.log(res);
      if (res.response_code === "0") {
        emits('updateTable')
        handleClose();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
