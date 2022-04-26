/**
* @function isExternal
* @description 是否为外链
* @param string
* @return boolean
*/
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)
