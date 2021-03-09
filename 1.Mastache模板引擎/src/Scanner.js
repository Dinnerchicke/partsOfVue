// 扫描函数
export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    // 从头开始扫描
    this.pos = 0
    // 待扫描区域
    this.tail = templateStr
  }

  // 跳过stopTag,stopTag由开发者给出而不是使用者
  scan(stopTag) {
    if (this.tail.indexOf(stopTag) === 0) { // 当stopTag被堵在前面时才进行操作
      this.pos += stopTag.length
      this.tail = this.templateStr.substring(this.pos)
    }
  }

  // 扫描pos和stopTag之间的字符串
  scanUntil(stopTag) { // 扫描到stopTag停止扫描，拆分
    // pos_backup保存pos之前的状态
    const pos_backup = this.pos
    // 通过this.pos一个字符一个字符循环，避免了当没有stopTag的时候的复杂情况
    while ( this.tail.indexOf(stopTag) !== 0 && !this.eos()) {
      // 以自身tail为基准，不断获取stopTag的位置
      this.pos++
      this.tail = this.templateStr.substring(this.pos)
    }
    // 这里获取到的字串是被stopTag挡住的或者是到达templateStr末尾的
    return this.templateStr.substring(pos_backup, this.pos)
  }

  eos() {
    return this.pos >= this.templateStr.length
  }
}