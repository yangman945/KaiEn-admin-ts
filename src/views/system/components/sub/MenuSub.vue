<template>
  <el-dialog v-model="dialogVisible" title="添加子菜单" width="600px" destroy-on-close>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="菜单名称" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              title="是否确定删除此子菜单项?"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
  <add-menu-sub @update-table="handleOpen" :subId="subId" ref="add_menu_sub" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import AddMenuSub from "./AddMenuSub.vue";
import { getMenuSubAllRequest } from "@/api/system";
const dialogVisible = ref(false);
const add_menu_sub = ref()
const subId = ref(0)
let tableData = ref<Array<any>>([]);
const handleOpen = (data) => {
  subId.value = data.id
  getMenuSubAll({ id: data });
  dialogVisible.value = true;
};
const handleClose = () => {
  dialogVisible.value = false;
};
defineExpose({
  handleOpen,
});
const handleEdit = (row) => {};
const handleDelete = (index, row) => {};
const handleAdd = () => {
  add_menu_sub.value.handleOpen()
}
const getMenuSubAll = (data) => {
  getMenuSubAllRequest(data)
    .then((res) => {
      console.log(res);
      if (res.response_code === "0") {
        tableData.value = filterTableData(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const filterTableData = (data) => {
  return Array.from(Object.values(data));
};
</script>
