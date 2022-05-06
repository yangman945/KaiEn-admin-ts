<template>
  <el-dialog v-model="dialogVisible" title="编辑菜单" width="600px">
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
        <el-button type="success" @click="dialogVisible = false">管理子菜单</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { EditMenuItemRequest } from "@/api/system";
const dialogVisible = ref(false);
const fromData = ref();
const handleOpen = (from) => {
  fromData.value = from;
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
  EditMenuItemRequest(fromData.value)
    .then((res) => {
      console.log(res);
      if (res.response_code === "0") {
        handleClose();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
