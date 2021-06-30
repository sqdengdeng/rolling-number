import { fixRec, $ } from '../utils'
import event from './event'
import './index.less'
export default  function renderRecommend(selector, voteCount = 0) {
  if (!selector) {
    return
  }
  const template = `
  <div class="widget-rec">
    <div class="widget-rec-vote js-recommend" data-vote="${voteCount}" data-added="0" data-subtracted="0" >
      <i class="s-up"></i><p class="s-vote">${fixRec(voteCount)}</p><i class="s-down js-diss"></i>
    </div>
  </div>`
  let dom = $(selector)
  if (dom) {
    dom.innerHTML= template
    setTimeout(() => { event() }, 1000)
  } 
}

