~ function() {
    // let hasClass = function(curEle, className) {
    //     return curEle.className.trim().split(/ +/).indexOf(className) >= 0;
    // };

    // let addClass = function(curEle, className) {
    //     if (!hasClass(curEle, className)) {
    //         curEle.className += ` ${className}`;
    //     }
    // };

    // let removeClass = function(curEle, className) {
    //     if (hasClass(curEle, className)) {
    //         curEle.className = curEle.className.trim().split(/ +/).filter(item => {
    //             return item !== className;
    //         }).join(' ');

    //     }
    // };
    // let getEleChildren = function(curEle, className) {
    //     let [...ary] = curEle.children;
    //     return ary.filter(item => hasClass(item, className));
    // };
    class TabPlugin {
        constructor(container, options = {}) {
            //第一个参数必须，并且传递的参数是元素对象
            //参数合法性验证
            if (typeof container === 'undefined' && container.nodeType === 1) {
                throw new SyntaxError("The first parameter must be passed, and the parameter type is an element!");
            }
            //参数初始化（初始化配置项）
            let {
                lastIndex = 0,
                    eventType = 'mouseover',
                    customPageClass = 'option',
                    customContentClass = 'con',
                    changeEnd
            } = options;
            //把处理好的参数配置项尽可能的挂在到当前类的实例上，称为实例的私有属性，
            //这样不仅在公共或者私有方法中直接获取使用，而且也保证了每一个实例之间这些属性是不冲突的
            ['lastIndex', 'eventType', 'customPageClass', 'customContentClass', 'changeEnd'].forEach(item => {
                this[item] = eval(item);
            });
            this.container = document.querySelector(container);
            this.option = this.getEleChildren(this.container, this.customPageClass)[0];
            this.optionList = [].slice.call(this.option.getElementsByTagName('li'));
            this.conList = this.getEleChildren(this.container, this.customContentClass);

            //让lastindex对应项有选中样式，其余项没有选中样式
            this.optionList.forEach((item, index) => {
                if (index === this.lastIndex) {
                    this.addClass(this.optionList[index], 'active');
                    this.addClass(this.conList[index], 'active');
                    return;
                }
                this.removeClass(this.optionList[index], 'active');
                this.removeClass(this.conList[index], 'active');
            });
            //实现选项卡
            this.changeTab();
        }

        changeTab() {
                this.optionList.forEach((item, index) => {
                    let _this = this;
                    item[`on${this.eventType}`] = function() {
                        if (_this.lastIndex === index) {
                            return;
                        }
                        _this.addClass(this, 'active');
                        _this.removeClass(_this.optionList[_this.lastIndex], 'active');
                        _this.addClass(_this.conList[index], 'active');
                        _this.removeClass(_this.conList[_this.lastIndex], 'active');
                        _this.lastIndex = index;

                        //切换完成后执行传递进来的回调函数（回调函数中的this是当前类的实例）
                        _this.changeEnd && _this.changeEnd(this, _this.conList[index], index, _this.lastIndex);
                    };
                });
            }
            //将公共方法挂在到原型上：也可以挂在到外面，不提供给使用者使用
        hasClass(curEle, className) {
            return curEle.className.trim().split(/ +/).indexOf(className) >= 0;

        }
        addClass(curEle, className) {
            if (!this.hasClass(curEle, className)) {
                curEle.className += ` ${className}`;
            }
        }
        removeClass(curEle, className) {

            if (this.hasClass(curEle, className)) {
                curEle.className = curEle.className.trim().split(/ +/).filter(item => {
                    return item !== className;
                }).join(' ');
            }
        }
        getEleChildren(curEle, className) {
            let [...ary] = curEle.children;
            return ary.filter(item => this.hasClass(item, className));
        }
    }

    window.TabPlugin = TabPlugin;
}();

/**
 * 不确定项：
 * 1. 哪一个容器实现选项卡
 * 2. 默认选中项（默认值：0 第一个选中）
 * 3. 切换的事件类型（默认值：mouseover）
 * 4. 可以自定义页卡区域的样式类和内容弄区域的样式（参考值：option、con）
 * 5. 支持钩子函数（生命周期函数），例如：我们可以支持切换完成后做什么事，你只需要传递给我一个回调函数，在内部插件每一次切换完成后，我把传递的回调函数执行
 */