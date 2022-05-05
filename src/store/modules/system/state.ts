import { RouteRecordRaw } from "vue-router";
export interface MenuItem {
  actived:string,
  css:string,
  has_sub:0,
  icon:string,
  role:number,
  status:number,
  sub:Array<MenuItem>,
  tag:string,
  target:string,
  title:string,
  url:string
}
export interface SystemState {
  theme:Array<string>,
  paths:Object,
  gvcode_login:number,
  gvcode_reg:number,
  site_name:string,
  menuList: Array<Array<MenuItem>>,
  asyacRoutes:Array<RouteRecordRaw>
}
const localMenu = JSON.parse(window.localStorage.getItem('localMenu') || '[]') 
const localAsyncRoutes= JSON.parse(window.localStorage.getItem('localAsyncRoutes') || '[]') 
export const state: SystemState = {
  theme:[],
  paths:{},
  site_name:'',
  gvcode_login:0,
  gvcode_reg:0,
  menuList:localMenu,
  asyacRoutes:localAsyncRoutes
}
