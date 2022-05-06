export interface MenuSubItem {
    id?:number,
    title:string,
    tag?:string,
    status:number,
    role?:string,
    url:string,
    icon?:string,
    css?:string,
    actived?:number,
    target:'_self' | '_blank'
}