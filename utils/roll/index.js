import './index.less'
import { fixNumber } from '../index'
import { isNumber, isString } from '../type'

export default function play({ selector, num = '', direction = 'up' }) {
  // 判断参数合法性
  if (!isNumber(+num)) {
    return
  }
  const source = fixNumber(+num)
  if (isString(source)) {
    if (source.length === 0) {
      return
    }
    // 显示xx万时，数字不变，无滚动效果
    if (/万/g.test(source)) {
      return
    }
  }
  let html = ''
  const container = document.querySelector(selector)
  // 显示推荐(0)时，数字变化，无滚动效果
  if (source === 0) {
    container.innerHTML = '<div class="num"><span><i>-1</i><i>0</i><i>1</i></span></div>'
    container.querySelector('.num span').style.transform = `translate(0, ${direction === 'up' ? -0.3 : 0.3}rem)`
    return
  }
  // 显示-1时
  if (source === -1) {
    container.innerHTML = '<div class="num"><span><i>-2</i><i>-1</i><i>0</i></span></div>'
    container.querySelector('.num span').style.transform = `translate(0, ${direction === 'up' ? -0.3 : 0.3}rem)`
    return
  }
  let arr = String(source).split('')
  let target = direction === 'up' ? source + 1 : source - 1
  let targetArr = String(target).split('')
  let property = 'positive'

  // 如果是负数，去掉负号的干扰
  if (source < 0 && target < 0) {
    targetArr = targetArr.slice(1)
    arr = arr.slice(1)
    property = 'negative'
  }
  // 如果是从两位数滚动到三位数，插入第一位占位，比如从99滚动到100
  if (arr.length < targetArr.length) {
    arr.unshift('firstNull')
  }
  // 如果是从三位数滚动到两位数，第一位展示空，比如从100滚动到99
  if (arr.length > targetArr.length) {
    arr[0] = 'firstOne'
  }
 
  let reseultArr = check(arr, targetArr)
  let len = Math.max(targetArr.length, arr.length)
  for (let i = 0; i < len; i++) {
    html += `<div id="num_${targetArr[i]}" class="num" data-id="${+targetArr[i]}">${property === 'positive' ? retunePositive(arr[i]) : retuneNegative(arr[i])}</div>`
  }
  container.innerHTML = property === 'positive' ? html : `<div class="negative">-</div>${html}`
  let allNum = container.querySelectorAll('.num')
  let spanHeight = allNum[0].querySelector('span').offsetHeight
  // eslint-disable-next-line no-console
  console.log('==========spanHeight:', spanHeight)
  let numlen = allNum.length
  for (let j = 0; j < numlen; j++) {
    if (reseultArr.includes(j)) {
      allNum[j].querySelector('span').style.transform = `translate(0, ${direction === 'up' ? -0.3 : 0.3}rem)`
      allNum[j].querySelector('span').style.transition = 'all 0.5s ease-in-out'
    }
  }
}

function retunePositive(num) {
  if (num > 0 && num < 9) {
    return `<span><i>${num - 1}</i><i>${num}</i><i>${+num + 1}</i></span>`
  }
  if (+num === 0) {
    return '<span><i>9</i><i>0</i><i>1</i></span>'
  }
  if (+num === 9) {
    return '<span><i>8</i><i>9</i><i>0</i></span>'
  }
  if (num === 'firstNull') {
    return '<span><i></i><i></i><i>1</i></span>'
  }
  if (num === 'firstOne') {
    return '<span><i></i><i>1</i><i></i></span>'
  }
  return ''
}
function retuneNegative(num) {
  if (num > 0 && num < 9) {
    return `<span><i>${+num + 1}</i><i>${num}</i><i>${num - 1}</i></span>`
  } 
  if (+num === 0) {
    return '<span><i>1</i><i>0</i><i>9</i></span>'
  } 
  if (+num === 9) {
    return '<span><i>0</i><i>9</i><i>8</i></span>'
  }
  if (num === 'firstNull') {
    return '<span><i>1</i><i></i><i></i></span>'
  }
  if (num === 'firstOne') {
    return '<span><i></i><i></i><i></i></span>'
  }
  return ''
}

function check(sourceArr, targetArr) {
  let result = []
  if (sourceArr.length === targetArr.length) {
    for (let i = 0; i < sourceArr.length; i++) {
      if (sourceArr[i] !== targetArr[i]) {
        result.push(i)
      }
    }
    return result
  }
  let len = Math.max(targetArr.length, sourceArr.length)
  for (let i = 0; i < len; i++) {
    result[i] = i
  }
  return result
}
