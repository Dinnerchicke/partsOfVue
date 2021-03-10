import vnode from './vnode'
// createNewVnode：创建新的虚拟节点
import createNewVnode from './createNewVnode'

export default function (oldVnode, newVnode) {
  console.log('oldVnode',oldVnode)
  console.log('newVnode',newVnode)

  // 假如oldVnode并非是虚拟节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  console.log('----------------------')

  // 判断新老节点是否是同一个节点：通过选择器和key值判断
  if (oldVnode.data.key === newVnode.data.key && oldVnode.sel === newVnode.sel) { // 假如是，则最小量更新
    // console.log('新老节点是同一个节点')
  } else { //假如不是同一个节点，则摧毁旧节点，直接更新新节点
    // console.log('新老节点不同')
    // 将虚拟节点转化为真实DOM，并添加到被删除的老节点的位置上
    let newVnodeElm = createNewVnode(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElm) {
      // 添加新节点到oldVnode指向的DOM所在
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}