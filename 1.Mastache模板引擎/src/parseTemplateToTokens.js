// 把模板字符串转为Tokens
import Scanner from './Scanner'
export default function parseTemplateToTokens(templateStr, data) {
  console.log(templateStr, data)
  let tokens = []
  let scanner = new Scanner(templateStr,data)
  let words
  while(!scanner.eos()) {
    words = scanner.scanUntil('{{')
    // 把双括号左边push进tokens
    tokens.push(['text',words])
    // 扫描跳过左双括号
    scanner.scan('{{')

    // 扫描右边
    words = scanner.scanUntil('}}')
    if (words !== '') {
      if (words === '#') {
        tokens.push(['#', words.substring(1)])
      } else if (words === '/') {
        tokens.push(['/',words.substring(1)])
      } else {
        tokens.push(['name',words])
      }
    }
    // 扫描跳过右边双括号
    scanner.scan('}}')
  }
  return tokens
}