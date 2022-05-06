import api from '../index'
import qs from 'qs'
// 获取系统配置
export function getSysConfigRequest() {
  return api({
    url: 'sys/config/base/get',
    method: 'post',
    data:null
    // data:qs.stringify(data)
  });
}
// 获取菜单配置列表
export function getMenuRequest(data) {
    return api({
      url: '/sys/menu/list',
      method: 'post',
      data:qs.stringify(data)
    });
}

// 获取主菜单列表
export function getMenuAllRequest(data) {
  return api({
    url: '/sys/menu/main',
    method: 'post',
    data:qs.stringify(data)
  });
}


// 编辑主菜单列表项
export function EditMenuItemRequest(data) {
  return api({
    url: '/sys/menu/edit',
    method: 'post',
    data:qs.stringify(data)
  });
}

// 添加主菜单列表项
export function AddMenuItemRequest(data) {
  return api({
    url: '/sys/menu/add',
    method: 'post',
    data:qs.stringify(data)
  });
}

// 删除主菜单列表项
export function DeleteMenuItemRequest(data) {
  return api({
    url: '/sys/menu/del',
    method: 'post',
    data:qs.stringify(data)
  });
}

// 获取子菜单列表
export function getMenuSubAllRequest(data) {
  return api({
    url: '/sys/menu/sub/list',
    method: 'post',
    data:qs.stringify(data)
  });
}

// 编辑子菜单列表项
export function EditMenuSubRequest(data) {
  return api({
    url: '/sys/menu/sub/edit',
    method: 'post',
    data:qs.stringify(data)
  });
}

// 添加子菜单列表项
export function AddMenuSubRequest(data) {
  return api({
    url: '/sys/menu/sub/add',
    method: 'post',
    data:qs.stringify(data)
  });
}

// 删除子菜单列表项
export function DeleteMenuSubRequest(data) {
  return api({
    url: '/sys/menu/sub/del',
    method: 'post',
    data:qs.stringify(data)
  });
}

// 排序子菜单列表项
export function SortMenuSubRequest(data) {
  return api({
    url: '/sys/menu/sub/sort',
    method: 'post',
    data:qs.stringify(data)
  });
}