// 拼接tokens里面的数据和字符串
export default function renderTemplate(tokens, data) {
  console.log(tokens, data)
  let DomStr = ''
  for(let i = 0; i < tokens.length ; i++) {
    const token = tokens[i]
    if (token[0] === 'text') {
      DomStr += token[1]
    } else if (token[0] === 'name') { // name里面是要替换的变量和数据
      DomStr += data[token[1]]
    } else if (token[0] === '#') { // #里面是要折叠的

    }
  }
  return DomStr
}