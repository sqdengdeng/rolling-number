# rolling-number
数字滚动效果
- 加1时向上滚动，减1时向下滚动
- 未发生进位时个位滚动，进位时多位同时滚动
- 支持负数


## 效果如图
demo.gif![demo](https://user-images.githubusercontent.com/49194092/123943875-21980280-d9cf-11eb-8c74-8804b110680e.gif)

## Install
```
npm i rolling-number
```
## Usage
```js
import rolling from 'rolling-number'
let number = 99
rolling('.demo', number)
```
```html
<div class="demo"></div>
```
