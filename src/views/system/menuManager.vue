<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-toolbar">
        <div class="d-flex justify-content-end" data-kt-subscription-table-toolbar="base">
          <button
            @click="handleAdd"
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_subscriptions_export_modal"
          >
            添加菜单项
          </button>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <!-- <KTDatatable
        :table-data="state.tableData"
        :table-header="state.headerConfig"
        :enable-items-per-page-dropdown="false"
      >
        <template v-slot:cell-id="{ row: customer }">
          {{ customer.id }}
        </template>
        <template v-slot:cell-name="{ row: customer }">
          {{ customer.name }}
        </template>
        <template v-slot:cell-status="{ row: customer }">
          <div class="badge badge-light">{{ customer.status }}</div>
        </template>
        <template v-slot:cell-actions="{ row: customer }">
          <a
            href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >Actions
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            <div class="menu-item px-3">
              <router-link to="/apps/customers/customer-details" class="menu-link px-3"
                >View</router-link
              >
            </div>
            <div class="menu-item px-3">
              <a @click="" class="menu-link px-3">Delete</a>
            </div>
          </div>
        </template>
      </KTDatatable> -->

      <el-table :data="state.tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="success" @click="handleEditSub(scope.row)"
              >管理子菜单</el-button
            >
            <el-popconfirm
              title="是否确定删除次菜单项?"
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
  </div>
  
  <edit-menu ref="edit_menu" />
  <add-menu @updateTable="getMenuAll" ref="add_menu" />
  <menu-sub ref="menu_sub" />
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { getMenuAllRequest, DeleteMenuItemRequest } from "@/api/system";
import KTDatatable from "@/components/KT_components/kt-datatable/KTDatatable.vue";
import EditMenu from "./components/EditMenu.vue";
import AddMenu from "./components/AddMenu.vue";
import MenuSub from "./components/sub/MenuSub.vue";
const edit_menu = ref();
const add_menu = ref();
const menu_sub = ref();
const state = reactive({
  headerConfig: [
    {
      name: "ID",
      key: "id",
      sortable: true,
    },
    {
      name: "菜单名称",
      key: "name",
      sortable: true,
    },
    {
      name: "状态",
      key: "status",
      sortable: true,
    },
    {
      name: "操作",
      key: "actions",
      sortable: false,
    },
  ],
  tableData: [] as Array<any>,
});
const getMenuAll = () => {
  getMenuAllRequest(null)
    .then((res) => {
      if (res.response_code === "0") {
        const data = filterTableData(res.data);
        console.log(data,"data")
        state.tableData = data
        // state.tableData = state.tableData.splice(0, state.tableData.length, ...data);
      }
    })
    .catch((err) => {
      console.log(err, "err");
    });
};
const filterTableData = (data) => {
  return Array.from(Object.values(data));
};
const handleAdd = () => {
  add_menu.value.handleOpen();
};
const handleEdit = (row) => {
  edit_menu.value.handleOpen(row);
};
const handleEditSub = (row) => {
  menu_sub.value.handleOpen(row.id);
};
const handleDelete = (index, row) => {
  DeleteMenuItemRequest({ id: row.id })
    .then((res) => {
      if (res.response_code === "0") {
          state.tableData.splice(index,1)
      }
    })
    .catch((err) => {});
};
onMounted(() => {
  getMenuAll();
});
</script>
