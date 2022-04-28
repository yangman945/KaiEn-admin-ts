import {MenuItem} from '@/store/modules/system/state'
/**
* @function getVueSysKey
* @description 获取vue专属key
* @param Object
* @return Array<string>
*/
interface GetVueSysKey {(theme:object):Array<string>}
export const getVueSysKey:GetVueSysKey = (theme) => {
  const reg = /_vue$/ 
  const menuidList:Array<string> = []
  Array.from(Object.keys(theme)).forEach((str:string) => {
    if(reg.test(str)){
      menuidList.push(theme[str])
    }
  })
  return menuidList
}

/**
* @function getValidMenus
* @description 获取有效的meuns菜单
* @param Object
* @return Array<Array<MenuItem>>
*/
interface GetValidMenus {(menus:Object):Array<Array<MenuItem>> }
export const getValidMenus:GetValidMenus = (menus) => {
  const validMenus:Array<Array<MenuItem>> = []
  Array.from(Object.values(menus)).forEach(list => {
    if(list.length > 0){
      validMenus.push(list)
    }
  })
  return validMenus
}