// 主函数
import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'
window.myMustache = {
  render(templateStr,data) { // 渲染函数
    let tokens = parseTemplateToTokens(templateStr)
    let domStr = renderTemplate(tokens,data)
    return domStr
  }
}