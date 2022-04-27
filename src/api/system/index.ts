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
export function getMenuRequest() {
    return api({
      url: '/sys/menu/list',
      method: 'post',
      // data:qs.stringify(data)
    });
}