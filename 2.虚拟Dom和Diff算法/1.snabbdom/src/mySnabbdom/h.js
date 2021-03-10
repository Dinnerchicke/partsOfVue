import vnode from './vnode'

// 当前版本h函数的限制：限定三种参数，且第三个参数限定三种类型
// h的格式：
// 1. h('选择器', {data}, 'innerText') 单个文本节点
// 2. h('选择器', {data}, [h()...]) 父节点带一群子节点
// 3. h('选择器', {data}, h()...) 父节点带一个子节点

export default function (sel, data, third) {
  // 参数个数检查
  if (arguments.length !== 3) {
    throw new Error('对不起，该版本h函数限定3个参数')
  }

  // 对第三个参数third的类型检查
  if (typeof third === 'string' || typeof third === 'number') { // 1.基本类型，直接返回
    return vnode(sel, data, undefined, third, undefined)
  } else if(Array.isArray(third)){ // 2.数组,递归
    let children = []
    for (let i = 0; i < third.length; i++) {
      const thirdsChildren = third[i];
      // 将数组里面的元素放入children数组里面
      // 因为放入数组的格式是类似[h(...),h(...)...]的格式，所以子字节自己也会调用h函数完成孙子节点生成
      children.push(thirdsChildren)
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if(typeof third === 'object' && third.hasOwnProperty('sel')) { // 3.唯一子节点
    let children = [third]
    return vnode(sel, data, children, undefined, undefined)
  }
}