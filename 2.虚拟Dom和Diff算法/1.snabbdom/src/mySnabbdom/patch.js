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
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) { // 假如是，则最小量更新
    if (oldVnode === newVnode) { // 完全相同
      return
    }
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length ===0)) { // 有text且没有子节点
      console.log('新vnode有text属性')
      if (newVnode.text !== oldVnode.text) { // 新旧节点文字不同
        oldVnode.elm.innerText = newVnode.text // 直接写入即可，即使旧节点有children也会被覆盖
      }
    } else { // 新节点没有text属性
      if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
        // 最复杂，新老都有children
      } else {
        // 老的没有children，新的有
        // 清空老节点内容
        oldVnode.elm.innerHTML = ''
        // 创建子节点DOM上树
        for (let i = 0; i < newVnode.children.length; i++) {
          const newDom = createNewVnode(newVnode.children[i])
          oldVnode.elm.appendChild(newDom)
        }
      }
    }
  } else { //假如不是同一个节点，则摧毁旧节点，直接更新新节点
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