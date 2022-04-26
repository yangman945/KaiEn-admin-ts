type Debounce = (
  fn: Function,
  interval?: number,
  immediate?: boolean
) => Function;
export const debounce:Debounce = (fn, interval = 300, immediate = true) => {
  let timer: number | undefined;
  return function (this: unknown,event) {
    clearTimeout(timer);
    let now = immediate && !timer;
    //   window.setTimeout 返回的是number
    timer = window.setTimeout(() => {
      timer = undefined;
      !immediate ? fn.call(this, event) : null;
    }, interval);
    now ? fn.call(this, event) : null;
  };
};

type Throttle = (
    fn:Function,
    interval?:number
) => Function
export const throttle:Throttle = (fn,interval=300) => {
    let flag:boolean = true
    return function(this: unknown){
        if(!flag) return
        flag = false
        setTimeout(() =>{
            fn.call(this,arguments)
            flag = true
        },interval)
    }
}
