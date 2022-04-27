/**
* @function isVueKey
* @description 匹配是否为vue专属key
* @param Object
* @return Array<string>
*/
interface IsVuekey {(theme:object):Array<string>}
export const isVueKey:IsVuekey = (theme) => {
  const reg = /_vue$/ 
  const menuidList:Array<string> = []
  Array.from(Object.keys(theme)).forEach((str:string) => {
    if(reg.test(str)){
      menuidList.push(theme[str])
    }
  })
  return menuidList
}