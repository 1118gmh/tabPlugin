### tabPlugin
本项目是一个基于原生JS封装的选项卡插件

### 使用
1. 引入tabStyle.css、tabPlugin.js这两个文件
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>选项卡</title>
    <link rel="stylesheet" href="css/baseCss.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <script src="js/tabPlugin.js"></script>
</body>

</html>
```

2. 引入html结构

```html
    <div class="tabBox" id="tabBox">
        <ul class="option">
            <li class="active"><a href="#">图片</a></li>
            <li><a href="#">专栏</a></li>
            <li><a href="#">热点</a></li>
        </ul>
        <div class="con active">1</div>
        <div class="con">2</div>
        <div class="con">3</div>
    </div>
```

3. 初始化一个选项卡
```
    new TabPlugin('#tabBox', {
        lastIndex: 2,
        eventType: 'click',
        changeEnd: function(curLi, curContent, index, lastIndex) {
            // curLi.style.background = 'red';
        }
    });
```

### 配置项
```js
 new TabPlugin('#tabBox', {
        lastIndex = 0,              //第几个选中（默认第一个）
        eventType = 'mouseover',    //事件触发（默认鼠标滑过）
        customPageClass = 'option',  //标签盒子（默认option）
        customContentClass = 'con',  //内容盒子（默认con）
        changeEnd                    //钩子函数（自定义执行完成后做什么）
    });
```