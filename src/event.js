import rolling from '../utils/roll'
import { closest, $ } from '../utils'

export default function recEvent() {
  const parent = $('.js-recommend')
  const selector = '.js-recommend .s-vote'
  function handleAnimation(key, value) {
    const classObj = {
      added: ['added', 'cancel-add'],
      subtracted: ['subtracted', 'cancel-subtract']
    }
    parent.classList.remove(...[].concat(classObj.subtracted, classObj.added))
    setTimeout(() => {
      parent.classList.add(classObj[key][value])
    }, 0)
    if (key === 'added') {
      parent.dataset.added = value ? 0 : 1
      parent.dataset.subtracted = 0
      return
    }
    if (key === 'subtracted') {
      parent.dataset.subtracted = value ? 0 : 1
      parent.dataset.added = 0
    }
  }
  // 触发事件：推荐、取消推荐
  parent.addEventListener('click', (e) => {
    const target = closest(e.target, '.s-up')
    if (target && parent.dataset.added === '0') {
      handleAnimation('added', 0)
      rolling({ selector, num: +parent.dataset.vote, direction: 'up' })
      return
    }
    if (target && parent.dataset.added === '1') {      
      handleAnimation('added', 1)
      rolling({ selector, num: +parent.dataset.vote + 1, direction: 'down' })
    }
  }, false)
  // 触发事件：不推荐、取消不推荐
  parent.addEventListener('click', (e) => {
    const target = closest(e.target, '.s-down')
    if (target && parent.dataset.subtracted === '0') {
      handleAnimation('subtracted', 0)
      rolling({ selector, num: +parent.dataset.vote, direction: 'down' })
      return
    }
    if (target && parent.dataset.subtracted === '1') {
      handleAnimation('subtracted', 1)
      rolling({ selector, num: +parent.dataset.vote - 1, direction: 'up' })
    }
  }, false)
}
