export function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  let element = el
  while (element && element.removeChild) {
    if (matchesSelector.call(element, selector)) {
      return element
    }
    element = element.parentElement
    // 防止溢出
    if (element && element.tagName && element.tagName.toLowerCase() === 'html') {
      return null
    }
  }
  return null
}
export function $(selector) {
  return document.querySelector(selector)
}
export function fixNumber(number) {
  if (number >= 10000) {
    return (number / 10000).toFixed(1) + '万'
  }
  return number
}
export function fixRec(number) {
  if (!number) {
    return '推荐'
  }
  if (number > 999999) {
    return '99.9万'
  }
  if (number >= 10000) {
    return (number / 10000).toFixed(1) + '万'
  }
  return number
}
