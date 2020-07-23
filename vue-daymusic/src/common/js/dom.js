// 模块化封装一个addClass方法

// 判断某个el是否具有className
export function hasClass(el, className){
    
    let reg = new RegExp('(^\\s)'+ className + '(\\s|$)')
    return reg.test(el.className)
}

export function addClass(el, className){

    if(hasClass(el,className))  return 
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}


// export function hasClass(el, className) {
//     let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
//     return reg.test(el.className)
//   }
  
//   export function addClass(el, className) {
//     if (hasClass(el, className)) {
//       return
//     }
  
//     let newClass = el.className.split(' ')
//     newClass.push(className)
//     el.className = newClass.join(' ')
//   }