export interface SystemState {
  themeMenu:Array<number>,
  paths:Object,
  gvcode_login:number,
  gvcode_reg:number,
  site_name:string,
  menu: Array<any>
}

export const state: SystemState = {
  themeMenu:[],
  paths:{},
  site_name:'',
  gvcode_login:0,
  gvcode_reg:0,
  menu:[] 
}
