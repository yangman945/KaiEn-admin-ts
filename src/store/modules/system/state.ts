export interface SystemState {
  theme:Array<string>,
  paths:Object,
  gvcode_login:number,
  gvcode_reg:number,
  site_name:string,
  menuList: Array<any>
}

export const state: SystemState = {
  theme:[],
  paths:{},
  site_name:'',
  gvcode_login:0,
  gvcode_reg:0,
  menuList:[] 
}
