# rolling-number
数字滚动效果
- 加1时向上滚动，减1时向下滚动
- 未发生进位时个位滚动，进位时多位同时滚动
- 支持负数


## 效果如图

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