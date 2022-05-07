<template>
  <el-dialog v-model="dialogVisible" title="添加子菜单" width="600px" destroy-on-close>
    <div>
      <el-form :model="fromData" :rules="rules" ref="ruleFormRef" label-width="120px">
        <el-form-item label="菜单标题" prop="title">
          <el-input v-model="fromData.title" />
        </el-form-item>
        <el-form-item label="菜单标识" prop="tag">
          <el-input v-model="fromData.tag" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="fromData.icon" />
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="fromData.url" />
        </el-form-item>
        <el-form-item label="打开方式">
          <el-input v-model="fromData.target" />
        </el-form-item>
        <el-form-item label="样式类名">
          <el-input v-model="fromData.css" />
        </el-form-item>
        <!-- <el-form-item label="目标角色">
          <el-input v-model="fromData.role" />
        </el-form-item> -->
        <el-form-item label="自动展开" prop="actived">
          <el-switch v-model="fromData.actived" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="status">
          <el-switch v-model="fromData.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
// import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive, defineProps } from "vue";
import { MenuSubItem } from "../../types";
import { addMenuSubRequest } from "@/api/system";
const props = defineProps({
  subId: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(["updateTable"]);
const dialogVisible = ref(false);
const fromData = ref({
  title: "",
  tag: "",
  status: 1,
  // role:"",
  url: "",
  icon: "",
  css: "",
  actived: 0,
  target: "_self",
});
const rules = reactive({
  title: [{ required: true, message: "菜单标题不能为空", trigger: "blur" }],
  tag: [{ required: true, message: "菜单标识不能为空", trigger: "blur" }],
  url: [{ required: true, message: "链接地址不能为空", trigger: "blur" }],
});
const ruleFormRef = ref();

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields;
};
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log({ ...fromData.value, id: props.subId },"{ ...fromData.value, id: props.subId }")
      addMenuSub({ ...fromData.value, id: props.subId });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const handleOpen = () => {
  dialogVisible.value = true;
};
const handleClose = () => {
  // resetForm(ruleFormRef)
  dialogVisible.value = false;
};
defineExpose({
  handleOpen,
});
const addMenuSub = (data) => {
  addMenuSubRequest(data)
    .then((res) => {
      console.log(res);
      if (res.response_code === "0") {
        emits("updateTable", props.subId);
        handleClose();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
