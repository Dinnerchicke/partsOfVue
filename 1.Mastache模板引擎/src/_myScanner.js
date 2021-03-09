// 扫描函数
// 此函数为demo函数

// 相较于源码，这里的不足之处在于：
// 1.原来是想用this.tail自身为基准循环获取，但是后来发现处理最后一个没有stopTag的字串过于麻烦
// 2.违反了单一职责原则，一个函数里面有过多职责，导致调试起来很困难

export default class Scanner {
  constructor(templateStr) {
    this.result = []
    // 从头开始扫描
    this.pos = 0
    // 待扫描区域
    this.tail = templateStr
  }

  // 跳过stopTag
  scan(stopTag) {
    return stopTag.length
  }

  // 扫描pos和stopTag之间的字符串
  scanUntil(stopTag) { // 扫描到stopTag停止扫描，拆分
    let tailResult = 0
    let sliceResult = ''
    while (this.tail !== '') { // 只要不为空就一直扫描
      tailResult = this.tail.indexOf(stopTag)
      // console.log('tai',tailResult) // 假如tail长度不为0
        if(tailResult === -1) { // 假如长度不为0且没有标识符,则直接全部放入result
          this.result.push(this.tail)
          this.tail
          break
        }
        sliceResult = this.tail.slice(0, tailResult)
        console.log(tailResult)
        // 将结果推入result
        this.result.push(sliceResult)
        // console.log('sli',sliceResult)
        // 更新tail,后移stopTag位
        this.tail = this.tail.slice(tailResult + this.scan(stopTag))
        // 更新pos,也后移stopTag位
        // this.scan(stopTag) // 将pos的位置定在stopTag后
        // console.log('tail',this.tail)
    }
    return this.result
  }
}