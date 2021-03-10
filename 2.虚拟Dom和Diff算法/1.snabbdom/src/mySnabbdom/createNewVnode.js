// 真正创建节点，将vnode创建为DOM，但是是孤儿节点不进行插入
export default function createNewVnode(vnode) {

  // 创建新节点
  let newDomNode = document.createElement(vnode.sel)

  // 判断该虚拟节点是文本节点还是数组节点
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) { // 假如是文本节点
    newDomNode.innerText = vnode.text
  } else if(Array.isArray(vnode.children) && vnode.children.length > 0){ // 假如是数组节点
    for (let i = 0; i < vnode.children.length; i++) {
      let vnodeChild = vnode.children[i];
      let vnodeDomChild = createNewVnode(vnodeChild)
      newDomNode.appendChild(vnodeDomChild)
    }
  }
  vnode.elm = newDomNode
  console.log('newDomNode',newDomNode)
  return vnode.elm
}