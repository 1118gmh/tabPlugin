let hasClass = function(curEle, className) {
    return curEle.className.trim().split(/ +/).indexOf(className) >= 0;
};

let addClass = function(curEle, className) {
    if (!hasClass(curEle, className)) {
        curEle.className += ` ${className}`;
    }
};

let removeClass = function(curEle, className) {
    if (hasClass(curEle, className)) {
        curEle.className = curEle.className.trim().split(/ +/).filter(item => {
            return item !== className;
        }).join(' ');

    }
};
let getEleChildren = function(curEle, className) {
    let [...ary] = curEle.children;
    return ary.filter(item => hasClass(item, className));
};

let tabBox = document.querySelector('#tabBox'),
    option = getEleChildren(tabBox, 'option')[0],
    optionList = [].slice.call(option.getElementsByTagName('li')),
    conList = getEleChildren(tabBox, 'con');
let lastIndex = 0;
optionList.forEach((item, index) => {
    item.onmouseover = function() {
        if (lastIndex === index) {
            return;
        }
        addClass(this, 'active');
        removeClass(optionList[lastIndex], 'active');
        addClass(conList[index], 'active');
        removeClass(conList[lastIndex], 'active');
        lastIndex = index;
    };
});