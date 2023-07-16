/**
 * cat.js v1.0.3
 * gonabi78@gmail.com
 * (c) 2014-2021 Jihwan Kim
 * Released under the MIT License.
 */
(function(global, factory) {
    "use strict";
    factory(global);
})(window, function(window) {
"use strict";
var document = window.document;
var version = '1.0.3';

var cat = {   
    paw: paw
};

function paw(selector, context) {
	
    return new Cat(selector, context);
}

function Cat(selector, context) {
    this.meow = "Meow" + ("" + Math.random()).replace(/[^0-9]/g, ""); 
    this.length = 0;
    this.$(selector, context);
}
Cat.fn = Cat.prototype = {
    verson: version,
    $: function(selector, context) {
        if (!selector) {
            return this
        }
        var els, len, i, context = getContext(context);
        var htmlExp = /(<[\w\W]+>)/;

        if (selector.nodeType === 1 || selector === document || isWindow(selector)) { //document, window
            this[0] = selector;
            this.length = 1;
            return this;
        } else if (isArrInElement(selector) || isNodeList(selector) || isHTMLCollection(selector)) {

            els = selector;
            len = selector.length;
        } else if (typeof selector === "string" && !htmlExp.test(selector)) {
            els = context.querySelectorAll(selector);
            len = els.length;
        } else if (htmlExp.test(selector)) {
            els = getStringToHtml(selector);
            len = els.length;
        }

        for (i = 0; i < len; i++) {
            this[i] = els[i];
        }


        if (isFunction(selector)) {
            this[0] = document;
            this.length = 1;
            this.ready(selector)
        }

        this.length = len;
        return this;
    },
    on: function(type, a, b, c) { //eventType, targetSelector, eventHandler, useCapture(false- Default. The event handler is executed in the bubbling phase)
        return on(this, type, a, b, c);
    },
    off: function(type) { //이벤트 삭제
        return off(this, type);
    },
    trigger: function(type) {
        return trigger(this, type);
    },
    ready: function(fn) {
        return ready(this, fn);
    },
    animate: function(props, params) { //props, params
        return animate(this, props, params);
    },
    stop: function(stopAll, goToEnd) { //큐삭제, change값으로 순간 이동 여부, (stopAll, goToEnd)
        return stop(this, stopAll, goToEnd);
    },
    resume: function() {
        return resume(this);
    },
    splice: [].splice,
};
Object.defineProperty(Cat.prototype, "constructor", {
    enumerable: false,
    value: Cat
});
cat.extend = Cat.fn.extend = extend;


Cat.fn.extend({
    eq: function(i) {
        if (i == void 0) {
            return this;
        }
        var el = i < 0 ? this[this.length + i] : this[i];
        return el === void 0 ? this : paw(el);
    },
    get: function(i) { //get DOM element
        if (i === void 0) {
            return [].slice.apply(this);
        } //The slice() method returns selected elements in an array, as a new array.
        return i < 0 ? this[this.length + i] : this[i];
    },
    each: function(callback) {
        return each(this, callback);
    },
    first: function() {
        return this.eq(0);
    },
    last: function() {
        return this.eq(-1);
    },
    index: function(selector) {
        return index(this, selector);
    },
    removeStyle: function(props) { //([])
        return removeStyle(this, props);
    },
    addClass: function(cls) {
        return addClass(this, cls);
    },
    removeClass: function(cls) {
        return removeClass(this, cls);
    },
    css: function(a, b) { //get: css(width), set: css(k, v) or css({k:v})
        return css(this, a, b);
    },
    setCssProps: function(props) { //(object), custom css와 연동, 커스텀 css 값 설정, {"--check-primary": "#607d8b"}, set css custom properties
        return setCssProps(this, props);
    },
    getCssPseudo: function(pseudoElement, props) { //el, ":after", "width" , 엘리먼트에 해당하는 가상셀렉터 값을 얻을 수 있다., props: string OR []
        return getCssPseudo(this, pseudoElement, props);
    },
    remove: function() {
        return remove(this);
    },
    is: function(selector) {
        return is(this, selector);
    },
    nextAll: function(selector) {
        return paw(nextAll(this[0], selector));
    },
    prevAll: function(selector) {
        return paw(prevAll(this[0], selector));
    },
    next: function(selector) {
        return paw(_prev_next(this, selector, "nextElementSibling"));
    },
    prev: function(selector) {
        return paw(_prev_next(this, selector, "previousElementSibling"));
    },
    siblings: function(selector) {
        return paw(siblings(this, selector));
    },
    parent: function(selector) {
        return paw(parent(this, selector));
    },
    parents: function(selector) {
        return paw(parents(this, selector))
    },
    children: function(selector) {
        return paw(children(this, selector));
    },
    scrollHeight: function() {
        return getValueFromElementDiretory(this[0], "scrollHeight");
    },
    scrollWidth: function() {
        return getValueFromElementDiretory(this[0], "scrollWidth");
    },
    offset: function() {
        return offset(this);
    },
    position: function() {
        return position(this);
    },
    hasClass: function(cls) {
        return hasClass(this, cls);
    },
    toggleClass: function(cls, bool) {
        return toggleClass(this, cls, bool);
    },
    closest: function(selector) {
        return paw(_closest(this, selector));
    },
    hide: function() {
        return hide(this);
    },
    show: function() {
        return show(this);
    },
    data: function(key, value) {
        return data(this, key, value);
    },
    removeData: function(key) {
        return removeData(this, key);
    },
    setDuration: function(millisecond) {
        return setDuration(this, millisecond);
    },
    translate3d: function(x, y, z) {
        return translate3d(this, x, y, z);
    },
    getTranslate3d: function() {
        return getTranslate3d(this[0]);
    },

    html: function(selector) {
        return html(this, selector);
    },
    text: function(value) {
        return text(this, value);
    },
    offsetParent: function() { //The offsetParent property returns the nearest ancestor that has a position other than static.
        return paw(getElementProp(this[0], "offsetParent"));
    },
    width: function(val) {
        return width_height(this, "width", val);
    },
    height: function(val) {
        return width_height(this, "height", val);
    },
    outerWidth: function(val) {
        return outerWidth_outerHeight(this, "width", val);
    },
    outerHeight: function(val) {
        return outerWidth_outerHeight(this, "height", val);
    },
    filter: function(selector, callback) {
        return paw(filter(this, selector, callback));
    },
    not: function(selector, callback) {
        return paw(not(this, selector, callback));
    },
    scrollTop: function(val) {
        return _scroll("scrollTop", this, val);
    },
    scrollLeft: function(val) {
        return _scroll("scrollLeft", this, val);
    },
    prop: function(prop, value) {
        return prop(this, prop, value);
    },
    empty: function() {
        return empty(this);
    },
    add: function(selector) {
        return paw(add(this, selector));
    },
    even: function() {
        return paw(even(this));
    },
    odd: function() {
        return paw(odd(this));
    },
    slice: function() {
        return paw([].slice.apply(this, arguments));
    },
    clone: function(bool) {
        return paw(clone(this, bool));
    },
    attr: function(prop, value) {
        return attr(this, prop, value);
    },
    removeAttr: function(prop) {
        return removeAttr(this, prop);
    },
    find: function(selector) {
        return paw(find(this, selector));
    },
    append: function(insertNode) {
        return append(this, insertNode);
    },
    prepend: function(insertNode) {
        return prepend(this, insertNode);
    },
    appendTo: function(targetNode) {
        return appendTo(this, targetNode);
    },
    prependTo: function(targetNode) {
        return prependTo(this, targetNode);
    },
    before: function(insertNode) {
        return before_after(this, insertNode, "before");
    },
    after: function(insertNode) {
        return before_after(this, insertNode, "after");
    },
	fadeIn: function(duration, easing, callback){
		return fadeIn(this, duration, easing, callback);
	},
	fadeOut: function(duration, easing, callback){
		return fadeOut(this, duration, easing, callback);
	},
	val: function(value){
		return val(this, value);
	}
});


cat.extend({
 	qs: qs,
    qsa: qsa,	
    animate: animate,
    stop: stop,
    resume: resume,
    addEvent: _addEvent, //저장소에 이벤트 저장
    on: on,
    off: off, //저장소 이벤트 삭제
    trigger: trigger,
    toCamelCase: toCamelCase, //background-color => backgroundColor
    toHyphenCase: _toHyphenCase,
    toArray: _toArray, //"a" => ["a"]
    htmlEscape: htmlEscape, //html 이스케이프
    comma: comma, //comma(amount, display) display = true면 1,000, false면 1000
    thousandComma: thousandComma, //(1000) => 1,000
    removeComma: removeComma, //(1,000) => 1000
    insertRule: insertRule, //가상셀렉터를 스타일할수 있다. 한번만 가능, ('.test::before{color:purple}')
    addStyleSheet: addStyleSheet, //head에 스타일시트 추가합니다. (css)
    removeStyleSheet: removeStyleSheet, //추가한 스타일시트를 삭제합니다.
    getQueryString: getQueryStringArgs,
    index: index,
    removeStyle: removeStyle,
    addClass: addClass,
    removeClass: removeClass,
    addStyle: _addStyle,
    css: css, //el, get,set
    setCssProps: setCssProps, //custom css와 연동, 커스텀 css 값 설정
    getCssPseudo: getCssPseudo, //el, ":after", "width" , 엘리먼트에 해당하는 가상셀렉터 값을 얻을 수 있다.
    remove: remove,
    append: append,
    prepend: prepend,
    appendTo: appendTo,
    prependTo: prependTo,
    next: function(elements, selector) {
        return _prev_next(elements, selector, "nextElementSibling");
    },
    prev: function(elements, selector) {
        return _prev_next(elements, selector, "previousElementSibling");
    },
    filter: filter,
    not: not,
    is: is,
    each: each,
    html: html,
    text: text,
    clearJS: clearJS, //clear js comment
    render: render, //'width={:width},height={:height},left={:left},top={:top}';
    siblings: siblings,
    asc: asc,
    desc: desc,
    parse: parse,
    stringify: stringify,
    parent: parent,
    parents: parents,
    children: children,
    getIframeWindow: getIframeWindow,
    ready: ready,
    position: position,
    width: function(elements, val) {
        return width_height(elements, "width", val);
    },
    height: function(elements, val) {
        return width_height(elements, "height", val);
    },
    outerWidth: function(elements, val) {
        return outerWidth_outerHeight(elements, "width", val);
    },
    outerHeight: function(elements, val) {
        return outerWidth_outerHeight(elements, "height", val);
    },
    scrollHeight: function(el) {
        return getValueFromElementDiretory(el, "scrollHeight");
    },
    scrollWidth: function(el) {
        return getValueFromElementDiretory(el, "scrollWidth");
    },
    offsetParent: function(element) { //The offsetParent property returns the nearest ancestor that has a position other than static.
        var el = getElementProp(element, "offsetParent");
        return el ? el : element;
    },
    offset: offset,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    prop: prop,
    closest: _closest,
    getComputedStyle: getComputedStyle,
    hide: hide,
    data: data,
    removeData: removeData,
    getTransitionEnd: getTransitionEnd,
    getAnimationEnd: getAnimationEnd,
    setDuration: setDuration,
    translate3d: translate3d, //(elements, x, y, z)
    getTranslate3d: getTranslate3d, //(elements, x, y, z)
    getUniqueArray: getUniqueArray,
    prevAll: prevAll,
    nextAll: nextAll,
    getClass: getClass,
    trim: trim,
    empty: empty,
    add: add,
    even: even,
    odd: odd,
    clone: clone,
    find: find,
    ajax: ajax,
    import: _import, //importJS: ['L1/js/u101_11_cap.js']
	show: show,
	hide: hide,
	before: function(elements, insertNode){
		return before_after(elements, insertNode, "before");
	},
	after: function(elements, insertNode){
		return before_after(elements, insertNode, "after");
	},
	fadeOut: fadeOut,
	fadeIn: fadeIn,
	val: val,
	scrollableElement: scrollableElement,
	strByteCut: strByteCut,
	strCut: strCut,
});

/*
The charCodeAt() method returns the Unicode of the character at a specified index (position) in a string.
charCodeAt() 메서드는 문자열의 지정된 인덱스(위치)에 있는 문자의 유니코드를 반환합니다.

string.substr(start, length) First character is at index 0.
string.substring(start, end) First character is at index 0.


*/

function strByteCut(str, byte, mark){
	mark = typeof mark == "undefined" ?  "": mark;
	var uc, strLen=str.length, byteLen=0, strCut;	
	for( var i=0; i<strLen; i++ ){
		uc = str.charCodeAt(i);		
		byteLen = uc > 255 ? byteLen+2 : byteLen+1;			
		if( byteLen >=  byte ){
			break;			
		}
	}
	return byteLen < strLen ? str.substr(0, i)+mark : str;
}
function strCut(str, len, mark){
	mark = typeof mark == "undefined" ? "" : mark;
	var strLen=str.length;
	return len < strLen ? str.substr(0, len)+mark : str;	
}





function val(elements, value){
	var els = getElementInArray(elements), i, j, el, values=[];
	el = els[0];
	if(el.nodeType !== 1){ //1: element, 2: attr, 3:text, 9:Document
		return elements;
	}

	if( value === void 0 ){ //get
		if( el.multiple && el.nodeName.toLowerCase() === 'select' ){
			for(i=0; i<el.selectedOptions.length; i++){
				values.push(el.selectedOptions[i].value);
			}
			return values;
		}
		return el.value;
	}

	for( i=0; i<els.length; i++ ){ //set
		el = els[i];

		if( Array.isArray(value) && el.multiple && el.nodeName.toLowerCase() === 'select' ){

			for(j=0; j<el.options.length; j++){ //HTMLOptionsCollection(5) [option, option, option, option, option, selectedIndex:-1 or index]
				el.options[j].selected = value.indexOf(el.options[j].value) >= 0;
			}

		} else {
			el.value = value;
		}
	}

	return elements;
}
function fadeOut( elements, duration, easing, callback ){
	var els = getElementInArray(elements), el, i, visibleEls=[];
	for(i=0; i<els.length; i++){
		el = els[i];
		if( is(el, ":visible") ){
			visibleEls.push(el);
		}
	}
	animate(visibleEls, {
		opacity: 0
	},{
		duration: duration,
		easing: easing,
		complete: function(el, easeProgress){
			removeStyle(el, ["opacity"]);
			hide(el);
			if(isFunction(callback)){
				callback(el, easeProgress);
			}
		}
	});
	return elements;
}

function fadeIn( elements, duration, easing, callback ){
	var els = getElementInArray(elements), el, i, hideEls =[];
	for(i=0; i<els.length; i++){
		el = els[i];
		if( !is(el, ":visible") ){
			hideEls.push(el);
		}
	}
	if(hideEls.length){
		css(hideEls, "opacity", 0);
		show(hideEls);
		animate(hideEls, {
			opacity: 1
		},{
			duration: duration,
			easing: easing,
			complete: function(el, easeProgress){
				removeStyle(el, ["opacity"]);
				show(el);
				if(isFunction(callback)){
					callback(el, easeProgress);
				}
			}
		});
	}
	return elements;
}

function before_after(elements, insertNode, before_after) {
	var els = getElementInArray(elements);
	var nodes = getElementInArray(insertNode);
    var i = 0, el, parent, j, node, copyNode, k, obj, targetNode, htmlExp = /(<[\w\W]+>)/, stringToEls;

    for (; i < els.length; i++) {
        el = els[i];
        parent = el.parentNode;
		if( before_after === "before" ){
			targetNode = el;
		}else if( before_after === "after" ){
			targetNode = el.nextSibling;
		}

        for (j = 0; j < nodes.length; j++) {
            node = nodes[j];

			if( i === 0 && node.nodeType === 1 ){
				parent.insertBefore(node, targetNode); //insertBefore(insertNode, targetNode);
			}else if( i > 0 && node.catEventData ){
                copyNode = node.cloneNode(true);
                parent.insertBefore(copyNode, targetNode);
                for( k = 0; k < node.catEventData.length; k++ ){
                    obj = node.catEventData[k];
                    on(copyNode, obj.type, obj.fn, obj.useCapture);
                }

			}else if( node.nodeType === 1 && typeof node.catEventData === 'undefined' ){
				copyNode = node.cloneNode(true);
				parent.insertBefore(copyNode, targetNode);
			}else if( isString(node) && htmlExp.test(node) ){ //html string
				stringToEls = getStringToHtml(node);
                for( k = 0; k < stringToEls.length; k++ ) {
                    parent.insertBefore(stringToEls[k], targetNode);
                }
			}
    	}
    }

    return elements;
}


function _import(a, b) { //source, option={}
    if (!a) { return;}
    var srcArr = Array.isArray(a) ? a : [a];
    if (b === void 0) { b = {} };
    var target = b.target || qs("head");
    var callback = b.load || null;

    var exp = {
        js: /(.*?)\.(js)$/,
        css: /(.*?)\.(css)$/,
    };
    var i, src, el, cnt=0;
    for (i = 0; i < srcArr.length; i++) {
        src = srcArr[i];
        if (exp.js.test(src)) { //js
            el = document.createElement("script");
            el.type = "text/javascript";
            el.src = src;
        } else if (exp.css.test(src)) { //css
            el = document.createElement("link");
            el.type = "text/css";
            el.rel = "stylesheet";
            el.href = src;
        }

        target.appendChild(el);
        el.onload = function() {
            cnt++;
            if( cnt === srcArr.length ){
                if (isFunction(callback)) {
                    callback.call(this);
                }
            }
        }
    }
}


function ajax(a) {
    if (!isObject(a) || !a.url || !a.success) {
        return false;
    }
    var xmlHttp, o, k;
    xmlHttp = new XMLHttpRequest(); //1. XMLHttpRequest생성하기
    xmlHttp.onreadystatechange = _onreadystatechange; //2. 요청에 대한 응답처리 이벤트 리스너 등록.
    o = {
        method: a.method || "GET",
        url: a.url,
        async: a.async,
        setRequestHeader: a.setRequestHeader || null,
        data: a.data || null,
        before: a.before || null,
        success: a.success || null,
        error: a.error || null,
        complete: a.complete || null,
    }
    if (o.method.trim() === "GET") {
        o.data = null;
    }
    if (!o.async) {
        o.async = false;
    }
    if (isFunction(o.before)) {
        o.before.call(this, o);
    }


    if (!o.setRequestHeader) {
        for (k in o.setRequestHeader) {
            xmlHttp.setRequestHeader(k, o.setRequestHeader[k]);
        }
    }
    xmlHttp.open(o.method, o.url, o.async); //open(method, url, async)
    xmlHttp.send(o.data); //데이터 전송
    function _onreadystatechange() { //응답처리
        if (this.readyState === 4) { //4=데이터 전송 완료.(0=초기화전,1=로딩중,2=로딩됨,3=대화상태),200은 에러 없음.(404=페이지가 존재하지 않음)
            if (isFunction(o.complete)) {
                o.complete.call(this, this);
            }
            if (this.status == 200) {
                if (isFunction(o.success)) {
                    o.success.call(this, this); //xmlHttp
                }
            } else {
                if (isFunction(o.error)) {
                    o.error.call(this, this); //xmlHttp
                }
            }
        }
    };
}




function find(elements, selector) {
    var els = getElementInArray(elements),
        el, found = [],i, j, child, relative=null;

    if (isString(selector) && selector.trim().indexOf(">") === 0) {
        relative = selector.match(/[^\s\t\r\n]+/g);
    }

    for (i = 0; i < els.length; i++) {
        el = els[i];
        el = isWindow(el) ? document : el;

        if (relative) {
			child = el;

	        for (j = 0; j < relative.length; j++) {
				if( relative[j] === ">" ){
					child = children(child, relative[j+1]);
				}
	        }

        } else {
            child = el.querySelectorAll(selector);
        }

        for (j = 0; j < child.length; j++) {
            found.push(child[j]);
        }
    }
    return found;
}

function attr(elements, attr, value) {
    var els = getElementInArray(elements), i=0, el, k;
    for (; i < els.length; i++) {
        el = els[i];
        if (isObject(attr)) {
            for (k in attr) {
                el.setAttribute(k, attr[k]);
            }
        } else if (isFunction(value)) {
            value.call(el, i, el.getAttribute(attr));
        } else if (value) { //set
            el.setAttribute(attr, value);
        } else { //get
            return el.getAttribute(attr);
        }
    }
    return elements;
}

function removeAttr(elements, attr) {
    var els = getElementInArray(elements);
    var i = 0, el;
    for (; i < els.length; i++) {
        el = els[i];
        el.removeAttribute(attr);
    }
    return elements;
}


function clone(elements, bool) {
    var els = getElementInArray(elements),
        i, el, arr = [],
        copyNode, j, obj;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        copyNode = el.cloneNode(bool);
        if (el.catEventData) {
            for (j = 0; j < el.catEventData.length; j++) {
                obj = el.catEventData[j];
                on(copyNode, obj.type, obj.fn, obj.useCapture);
            }
        }
        arr.push(copyNode);
    }
    return arr;
}

function even(elements) { //0, 2, 4 ...
    var els = getElementInArray(elements),
        i, el, arr = [];
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if ((i + 1) % 2) { //0 or i+1
            arr.push(el);
        }
    }
    return arr;
}

function odd(elements) { //1, 3, 5 ...
    var els = getElementInArray(elements),
        i, el, arr = [];
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if (i % 2) { //0 or i+1
            arr.push(el);
        }
    }
    return arr;
}

function add(elements, selector, context) {
	if(!selector){return elements;}
    context = getContext(context);
    var els = getElementInArray(elements),  addEls;

    if (isString(selector)) {
        addEls = qsa(selector, context);
    } else {
        addEls = getElementInArray(selector);
    }
    return mergeArrayType(els, addEls);
}

function mergeArrayType() {
    var arguArr = [],  i = 0, argu, j, arr = [];
    arguArr.push.apply(arguArr, arguments);
    for (; i < arguArr.length; i++) {
        argu = arguArr[i];
        for (j = 0; j < argu.length; j++) {
            arr.push(argu[j]);
        }
    }
    return getUniqueArray(arr);
}

function getUniqueArray(arr) {
    var uniqueArray = [], i, item;
    for (i = 0; i < arr.length; i++) {
        item = arr[i];
        if (uniqueArray.indexOf(item) === -1) {
            uniqueArray.push(item);
        }
    }
    return uniqueArray;
}


function empty(elements) {
    var els = getElementInArray(elements);
    var i, el, childNodes, child, j, parent;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        childNodes = el.childNodes;
        for (j = childNodes.length - 1; j >= 0; j--) {
            child = childNodes[j];
            if (parent = child.parentNode) {
                parent.removeChild(child);
            }
        }
    }
    return elements;
}



function prop(elements, prop, value) {
    var els = getElementInArray(elements);
    var i = 0, el, k;
    for (; i < els.length; i++) {
        el = els[i];
        if (isObject(prop)) {
            for (k in prop) {
                el[k] = prop[k];
            }
        } else if (isFunction(value)) {
            value(i, el[prop]);
        } else if (value) {
            el[prop] = value;
        } else {
            return el[prop];
        }
    }
    return elements;
}


function each(elements, callback) {
    if (!isFunction(callback)) {
        return false
    }
    var els = getElementInArray(elements), i;
    if (isObject(els)) {
        for (i in els) {
            callback.call(els[i], i, els[i]);
        }
    } else {
        for (i = 0; i < els.length; i++) {
            callback.call(els[i], i, els[i]);
        }
    }
    return elements;
}





function filter(elements, selector, callback) {
    var els = getElementInArray(elements);
    var i, j, el, arr = [];
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if (isArrInElement(selector) || isNodeList(selector) || isHTMLCollection(selector)) {
            for (j = 0; j < selector.length; j++) {
                if (el === selector[j]) {
                    arr.push(el);
                }
            }
        } else if (selector.nodeType === 1) {
            if (el === selector) {
                arr.push(el);
            }
        } else if (isString(selector)) {
            if (is(el, selector)) {
                arr.push(el);
            }
        }
    }

    if (isFunction(callback)) {
        arr = Array.prototype.filter.call(arr, callback);
    }

    return arr;
}

function not(elements, selector, callback) {
    var els = getElementInArray(elements);
    var i, j, el, arr = [];
    outermost:
        for (i = 0; i < els.length; i++) {
            el = els[i];

            if (isArrInElement(selector) || isNodeList(selector) || isHTMLCollection(selector)) {
                for (j = 0; j < selector.length; j++) {
                    if (el === selector[j]) {
                        continue outermost;
                    }
                }
            } else if (selector.nodeType === 1) {
                if (el === selector) {
                    continue outermost;
                }
            } else if (isString(selector)) {
                if (is(el, selector)) {
                    continue outermost;
                }
            }

            arr.push(el);
        }

    if (isFunction(callback)) {
        arr = Array.prototype.filter.call(arr, callback);
    }

    return arr;
}

function outerWidth_outerHeight(elements, prop, val) { //include scrollbar
    var els = getElementInArray(elements);
    var i = 0,
        el, padding, border, value;
    for (; i < els.length; i++) {
        el = els[i];

        if (val) {
            if (prop === "width") {
                padding = parseFloat(css(el, "padding-left")) + parseFloat(css(el, "padding-right"));
                border = parseFloat(css(el, "border-left-width")) + parseFloat(css(el, "border-right-width"));
            } else if (prop === "height") {
                padding = parseFloat(css(el, "padding-top")) + parseFloat(css(el, "padding-bottom"));
                border = parseFloat(css(el, "border-top-width")) + parseFloat(css(el, "border-bottom-width"));
            }
            value = val - padding - border;
            css(el, prop, value);

        } else if (isWindow(el)) {
            return el[toCamelCase("inner-" + prop)]; //The window.innerWidth property returns the width of a window's content area.
        } else if (el.nodeType === 9) {
            //The documentElement property returns the documentElement of the document, as an Element object.
            //For HTML documents the returned object is the <html> element.

            //The element.scrollWidth property returns the entire width of an element in pixels, including padding, but not the border, scrollbar or margin.
            //The scrollWidth and scrollHeight properties return the entire height and width of an element, including the height and width that is not viewable (because of overflow).
            //The element.offsetHeight property returns the viewable height of an element in pixels, including padding, border and scrollbar, but not the margin.
            //The clientWidth property returns the viewable width of an element in pixels, including padding, but not the border, scrollbar or margin.


			return Math.max(
                el.body[toCamelCase("scroll-" + prop)],
                el.documentElement[toCamelCase("scroll-" + prop)],
                el.body[toCamelCase("offset-" + prop)],
                el.documentElement[toCamelCase("offset-" + prop)],
                el.documentElement[toCamelCase("client-" + prop)]
            );

        } else if (el.nodeType === 1) {

            //The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
            //This method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.
            //Note: The amount of scrolling that has been done of the viewport area is taken into account when computing the bounding rectangle. This means that the rectangle's edges (top, left, bottom, and right) change their values every time the scrolling position changes.
            return getBoundClientRectPropValue(el, prop);
        }

    }

    return elements;
}

function getBoundClientRectPropValue(element, prop) {
    //The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    //This method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.
    //Note: The amount of scrolling that has been done of the viewport area is taken into account when computing the bounding rectangle. 
	//This means that the rectangle's edges (top, left, bottom, and right) change their values every time the scrolling position changes.
    return element.getBoundingClientRect()[prop]; //el.offsetWidth 는 int
}

function width_height(elements, prop, val) { //Scrollbar not included
    var els = getElementInArray(elements);
    var i = 0,
        el;
    for (; i < els.length; i++) {
        el = els[i];
        if (val) {
            css(el, prop, val);
        } else if (isWindow(el)) { //Area visible without scrolling
            return el.document.documentElement[toCamelCase("client-" + prop)]; //The clientWidth property returns the viewable width of an element in pixels, including padding, but not the border, scrollbar or margin.
        } else if (el.nodeType === 9) { //document
            //documentElement: For HTML documents the returned object is the <html> element.
            return el.documentElement[toCamelCase("scroll-" + prop)]; //The scrollHeight property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.
        } else if (el.nodeType === 1) {
            return parseFloat(css(el, prop));
        }
    }
    return elements;
}



function css(elements, a, b) { //el, get,set
    var els = getElementInArray(elements);
    var cssProp, cssValue, i, el, k;
    var expr = {
        unit: /[a-zA-Z%]+/,
        prop: /(?:width|height|font-size|fontSize|top|right|bottom|left|padding|margin)/,
    }

    for (i = 0; i < els.length; i++) {
        el = els[i];

        //get
        if (a !== void 0 && !isObject(a) && b === void 0) { //css("width")
            cssProp = getComputedStyle(el, null);
            cssValue = cssProp.getPropertyValue(a);
            return cssValue;
        }

        if (a !== void 0 && b !== void 0) { //css("width", "30px")
            cssValue = b;
            if (expr.prop.test(a) && !expr.unit.test(b)) {
                cssValue = cssValue + "px";
            }
            el.style[toCamelCase(a)] = cssValue;

        } else if (a !== void 0 && isObject(a) && b === void 0) { //css({ color: "red" })
            for (k in a) {
                cssValue = a[k];
                if (expr.prop.test(k) && !expr.unit.test(cssValue)) {
                    cssValue = cssValue + "px";
                }
                el.style[toCamelCase(k)] = cssValue;
            }
        }
    } //end i

    return elements;
}

function getElementProp(el, prop) {
    if (el && el.nodeType === 1) {
        return el[prop];
    }
    return null;
}


function getValueFromElementDiretory(el, prop) {
    return el[prop];
}

function text(elements, text) {
    var els = getElementInArray(elements),
        i, el;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if (typeof text === 'undefined') { //get
            return el.textContent; //Returns only the first element text
        } else {
            el.textContent = text;
        }
    }
    return text ? text : elements;
}

//rnoInnerhtml = /<script|<style|<link/i, !rnoInnerhtml.test( value )
function html(elements, html) {
    var els = getElementInArray(elements), i, el;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if (typeof html === 'undefined') { //get
            return el.innerHTML //Returns only the first element html
        } else { //
            el.innerHTML = html;
        }
    }
    return elements;
}

function _prev_next(elements, selector, prop) {
    var els = getElementInArray(elements);
    var i = 0,  el, arr = [],  target;

    for (; i < els.length; i++) {
        el = els[i];
        target = el[prop];
        if (!selector || is(target, selector)) { //selector not: "" or null or undefined
            arr.push(target);
        }
    }
    return arr;
}

/*
function _getSymbol(selector){
 var reg = {
     id: /[#]/,
     class: /[.]/,
     pseudo: /[:]/,
 }
 var k, exp, symbol="tag";
 for( k in reg ){
     exp = reg[k];
     if( exp.test(selector) ){
         symbol = k;
     }
 }
 return symbol;
}
*/

function is(elements, selector) { //true if any of the elements is included
    if (!selector) { return false }
    var els = getElementInArray(elements), i, el, cssProp;

    for (i = 0; i < els.length; i++) {
        el = els[i];
        cssProp = getComputedStyle(el, null);


        if (selector === window && el === window) {
            return true;
        }else if (selector === document && el === document) {
            return true;
        }else if( selector === ":visible" && cssProp.getPropertyValue('display') !== 'none' && el.style.display !== 'none' ){

			return true;
        }else if (selector.nodeType === 1 && el === selector) {
            return true;
        }else if (selector instanceof Cat && el === selector[i]) {
            return true;
        }else if ( selector !== ":visible" && isString(selector) && el.matches(selector)) { //ie18+, pollyfill ie11
            return true;
        }

    }
    return false;
}

function getClass(el) {
    return el.getAttribute("class") || null;
}


function hasClass(elements, cls) {
    if (!cls) {
        return false
    }
    var els = getElementInArray(elements),
        clsArr = getClassToArray(cls),
        el, i, clsFillterArr;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        clsFillterArr = clsArr.filter(function(className) {
            return el.classList.contains(className);
        });

        if (clsFillterArr.length === clsArr.length) {
            return true;
        }
    }
    return false;
}

function siblings(elements, selector) {
    var els = getElementInArray(elements),
        i, el, arr = [];
    for (i = 0; i < els.length; i++) {
        el = els[i];
        arr.push.apply(arr, prevAll(el, selector).reverse());
        arr.push.apply(arr, prevAll(el, selector));
    }
    return arr;
}


function prevAll(el, selector) {
    return getElementPropAll(el, selector, "previousElementSibling");
}

function nextAll(el, selector) {
    return getElementPropAll(el, selector, "nextElementSibling");
}

function getElementPropAll(el, selector, prop) {
    var matched = [];
    while (el = el[prop]) {
        if (selector) {
            if (filter(el, selector).length) {
                matched.push(el);
            }
        } else {
            matched.push(el);
        }
    }
    return matched;
}


function setDuration(elements, millisecond) {
    var els = getElementInArray(elements), i=0, el;
    for (; i < els.length; i++) {
        el = els[i];
        el.style.transitionDuration = millisecond + "ms";
    }
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

function getTranslate3d(el) {
    var values = el.style.transform.split(/\w+\(|\);?/);
    if (!values[1] || !values[1].length) {
        return [];
    }
    return values[1].split(/,\s?/g);
}


function translate3d(elements, x, y, z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;
    var els = getElementInArray(elements);
    var i = 0, el;
    for (; i < els.length; i++) {
        el = els[i];
        el.style.transform = "translate3d(" + x + ", " + y + ", " + z + ")";
    }
}




function getAnimationEnd() {
    var el = document.createElement('div');
    var endEventNames = {
        "animation": "animationend",
        "OAnimation": "oAnimationEnd",
        "MozAnimation": "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    };
    for (var name in endEventNames) {
        if (el.style[name] !== undefined) {
            return endEventNames[name];
        }
    };
    return false;
}


function getTransitionEnd() {
    var el = document.createElement('div');
    var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend',
        msTransition: 'MSTransitionEnd'
    };
    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name]
        }
    };
    return false;
}


function on(elements, type, a, b, c) {

    var els = getElementInArray(elements);
    var event = type.match(/[^\s\d\.]+/)[0]; //"click.cat0", remove namespace
    var targetSelector, eventHandler, useCapture, i, el, handler;

	//Safari doesn't support wheel, it supports mousewheel.
	if(event === "wheel"){
		event = 'onwheel' in document ? 'wheel' : 'mousewheel';
	}


    if (isFunction(a)) { //on("click", function(){})
        targetSelector = null;
        eventHandler = a;
        useCapture = b || false;
    }

    if (isString(a)) { //on("click", ".js-btn", function(){}, true), delegation
        targetSelector = a;
        eventHandler = b;
        useCapture = c || false;
    }

    if (targetSelector !== null && !isString(targetSelector)) { //delegation validate
        //throw new TypeError("targetSelector:: It must be of type string.");
        console.log(targetSelector + ": It must be of type string.");
        return false;
    }


    for (i = 0; i < els.length; i++) {
        el = els[i];
        el.catEventData === void 0 ? el.catEventData = [] : el.catEventData;

        if (targetSelector !== null) {
            handler = _delegationHandler(el);
        } else {
            handler = _handler(i);
        }


        el.addEventListener(event, _addEvent(el, type, useCapture, handler), useCapture); //element.addEventListener(event, function, useCapture)
    }

    //catEventData save
    function _handler(i) {
		return function(e){
	        eventHandler.apply(this, [e, i]); //original handler
		}
    }

    function _delegationHandler(el) {
        var context, targets, target, i, bubbleTarget;
        if (el === document) {
            context = document;
        } else {
            context = el;
        }

        return function(e) {
	        targets = context.querySelectorAll(targetSelector);
	        if (targets === null) {
	            return false;
	        }

            for (i = 0; i < targets.length; i++) {
                target = targets[i];
                bubbleTarget = e.target;

                while (bubbleTarget) {
                    if (bubbleTarget === target) {
                        eventHandler.apply(target, [e, i]);
                        break;
                    }
                    bubbleTarget = bubbleTarget.parentElement;
                }
            }
        }
    }
    //console.log(eventType, targetSelector, eventHandler, useCapture);
    return elements;
}

function off(elements, type) {
    var els = getElementInArray(elements);
    var eventType, reg = new RegExp(type);
    var i, el, eventData, j, data;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        eventData = el.catEventData, data;
        if (eventData !== void 0) {
            for (j = eventData.length - 1; j >= 0; j--) {
                data = eventData[j];
                eventType = data.type.match(/[^\s\d\.]+/)[0]; //"click.cat0", remove namespace
                if (type === void 0 || (type !== void 0 && reg.test(data.type))) { //remove all, remove type
                    _clearEvent(el, eventType, data.fn, data.useCapture, j);
                }
            }
        }
    } //end i
    return elements;
}


function removeData(elements, key) {
    var els = getElementInArray(elements);
    var i = 0,
        el, domStringMap, prop;
    for (; i < els.length; i++) {
        el = els[i];
        domStringMap = el.dataset;
        if (key === void 0) {
            for (prop in domStringMap) {
                delete domStringMap[prop];
            }
        } else if (key) {
            delete domStringMap[toCamelCase(key)];
        }
    }
    return elements;
}


function data(elements, name, value) {
    var els = getElementInArray(elements);
    var i = 0,
        el, domStringMap, arr = [],
        prop;
    //var attrs = attributes

    for (; i < els.length; i++) {
        el = els[i];
        domStringMap = el.dataset;

        if (name === void 0) { //get all
            arr.push(domStringMap);
        } else if (name && !isObject(name) && value === void 0) { //get
            arr.push(domStringMap[toCamelCase(name)]);

        } else if (name && isObject(name)) { //set object
            for (prop in name) {
                domStringMap[toCamelCase(prop)] = name[prop];
            }
        } else if (name !== void 0 && value !== void 0) { //set

            domStringMap[toCamelCase(name)] = value;
        }
    }

    return arr.length ? arr.length === 1 ? arr[0] : arr : elements;
}


function getComputedStyle(element, pseudoElement) { //window.getComputedStyle(el, null).getPropertyValue('display')
    pseudoElement = pseudoElement || null;
    var cssProp = window.getComputedStyle(element, pseudoElement);
    return cssProp;
}

function show(elements) {
    var els = getElementInArray(elements), i = 0, el;
    for (; i < els.length; i++) {
        el = els[i];
        if (el.style.display === 'none') { //inline style check
            el.style.display = '';
        }
        if (getComputedStyle(el).getPropertyValue('display') === 'none') { //css check
            el.style.display = 'block';
        }
    }
    return elements;
}

function hide(elements) {
    var els = getElementInArray(elements), i = 0, el;
    for (; i < els.length; i++) {
        el = els[i];
        if (el.style.display !== 'none') {
            el.style.display = 'none';
        }
        if (getComputedStyle(el).getPropertyValue('display') !== 'none') { //css check
            el.style.display = 'none';
        }
    }
    return elements;
}

function _closest(elements, selector) {
    return parents(elements, selector)[0];
}

function toggleClass(elements, cls, bool) {
    var els = getElementInArray(elements), i = 0, el;
    var classes = getClassToArray(cls), j;
    for (; i < els.length; i++) {
        el = els[i];
        for (j = 0; j < classes.length; j++) {
            if (bool !== void 0) {
                el.classList.toggle(classes[j], bool);
            } else {
                el.classList.toggle(classes[j]);
            }
        }
    }
    return elements;
}

function offset(elements) {//스크롤 상관없는 절대값
    var els = getElementInArray(elements), el=els[0], box, win;
	if(!el ){return}

	//The pageXOffset and pageYOffset properties returns the pixels the current document has been scrolled from the upper left corner of the window, horizontally and vertically.
	//The pageXOffset and pageYOffset properties are equal to the scrollX and scrollY properties.

	//The ownerDocument property returns the owner document of a node, as a Document object.
	//The defaultView property returns the document's Window Object.
	box = el.getBoundingClientRect();
	win = isWindow(el) ? el : el.ownerDocument.defaultView;

	console.log(win, win.pageYOffset);
    return {
        top: box.top + win.pageYOffset,
        left: box.left + win.pageXOffset,
    }
}

function position(elements) {//스크롤 상관 있는 상대값
	var els = getElementInArray(elements), el=els[0],screen,box,doc,state;
	if(!el){return}

//The offsetTop property returns the top position (in pixels) relative to the top of the offsetParent element.

//The offsetParent property returns the nearest ancestor that has a position other than static.
//Note: offsetParent is used with the offsetLeft, and offsetTop properties.
//Tip: offsetParent will return null if the element is set to display="none".
//object.offsetParent

//The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.

	state = {
		screen:{
			top: 0,
			left: 0
		}
	}

	if( css(el, "position") === "fixed" ){//fixed === viewport
		box = el.getBoundingClientRect();//스크롤에 따라 변화
	}else{
		doc = el.ownerDocument;
		screen = el.offsetParent || doc.documentElement;//el.offsetParent or html, null 방지

		while( screen && (screen === doc.body || screen === doc.documentElement) && css(screen, "position") === "static"  ){//screen이 null아니고, 스태틱 아닌 끝은 document이다.
			screen = screen.parentNode;//document
		}

		if( screen.nodeType === 1 ){
			//The offsetTop property returns the top position (in pixels) relative to the top of the offsetParent element.
			box = {
				top:  el.offsetTop,
				left: el.offsetLeft
			}
			state.screen.top = _scroll("scrollTop", screen);
			state.screen.left = _scroll("scrollLeft", screen);
		}else{
			box = offset(el);
			//console.log(box, state, el);
		}

	}

    return { //include margin
		top: box.top - state.screen.top - parseFloat(css(el, "margin-top")),
		left: box.left - state.screen.left - parseFloat(css(el, "margin-left"))

    }
}
function _scroll(prop, elements, val) { //window:pageXOffset, elemnet:scrollLeft
    var els = getElementInArray(elements);
    var i, el, x, y, win;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        win = null;

        if (isWindow(el)) {
            win = el;
        } else if (el.nodeType === 9) {
            win = el.defaultView; //The defaultView property returns the document's Window Object.
        }

        if (!val) {
            //The pageXOffset and pageYOffset properties returns the pixels the current document has been scrolled from the upper left corner of the window, horizontally and vertically.
            return win ? win[prop === "scrollLeft" ? "pageXOffset" : "pageYOffset"] : el[prop];
        } else {
            if (win) {
                win.scrollTo(prop === "scrollLeft" ? val : win["pageXOffset"], prop === "scrollTop" ? val : win["pageYOffset"]);
            } else {
                el[prop] = val;
            }
        }

    }
    return elements;
}

function ready(doc, fn) {
    return on(doc, 'DOMContentLoaded', fn);
}

function getIframeWindow(iframe) { //iframe window
    if (!iframe) {
        return false
    }
    var window = (iframe.contentWindow || iframe.contentDocument);
    var document = window.document;
    return document;
}

function children(elements, selector) {
    var els = getElementInArray(elements);
    var i, el, j;
    var arr = [],
        children, child;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        children = el.children || [];
        for (j = 0; j < children.length; j++) {
            child = children[j];

            if (selector) {
                if (is(child, selector)) {
                    arr.push(child);
                }
            } else {
                arr.push(child);
            }
        }
    }
    return arr;
}

function parents(elements, selector) {
    var els = getElementInArray(elements);
    var i = 0,
        el, parent, arr = [];
    for (; i < els.length; i++) {
        el = els[i];
        parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (is(parent, selector)) {
                    arr.push(parent);
                    break;
                }
            } else {
                arr.push(parent);
            }
            parent = parent.parentElement;
        }
    }

    return getUniqueArray(arr);
};


function parent(elements, selector) {
    var els = getElementInArray(elements);
    var i = 0,
        el, parent, result = [];
    for (; i < els.length; i++) {
        el = els[i];
        parent = el.parentElement;
        if (selector && is(parent, selector)) {
            result.push(parent);
        }
        if (!selector) {
            result.push(parent);
        }
    }
    return getUniqueArray(result);
}

function parse(jsonString) { //JSON.parse() The method parses the string and returns a JavaScript object, the string must be written in JSON format.
    //JSON.parse(;
    return JSON.parse(jsonString); //'{"firstName":"John", "lastName":"Doe"}'
}

function stringify(obj) { //{ name: "John", age: 30, city: "New York" };
    //JSON의 일반적인 용도는 웹 서버와 데이터를주고받는 것입니다.웹 서버로 데이터를 보낼 때 데이터는 문자열이어야합니다.JSON.stringify ()를 사용하여 JavaScript 객체를 문자열로 변환합니다.
    return JSON.stringify(obj);
}


function index(elements, selector) { //첫번째 el, selector 전체, selector: string or element
    var els = getElementInArray(elements),
        el, i, target;

    el = els[0];
    if (!el || (el && !el.parentNode)) { // null, '', undefined OR window OR document
        return -1;
    }

    if (!selector) { //selector: "" or null or undefined
        return prevAll(el).length; //A Node object, representing the parent node of a node, or null if the node has no parent
    }

    if (isString(selector)) {
        target = qs(selector);
    } else if (selector.nodeType === 1) {
        target = selector;
    }

    for (i = 0; i < els.length; i++) {
        el = els[i];
        if (el === target) {
            return i;
        }
    }
    return -1;
}

function removeStyle(elements, props) { //el, ["color"]
    var els = getElementInArray(elements), i, el, os, osa, filterStyle, arr, originalProp, j, currentProp, style;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if ( props === void 0) { //undefined
            el.removeAttribute('style');
        } else if (os = els[i].getAttribute('style')) { // original style
            osa = os.match(/[^;]+/g);
            filterStyle = osa.filter(function(currentValue, index) {
                arr = currentValue.trim().split(":");
                originalProp = arr[0];
                for (j = 0; j < props.length; j++) {
                    currentProp = props[j].trim();
                    if (originalProp === currentProp) {
                        return false; //delete
                    }
                }
                return true;
            });
            if (filterStyle.length === 0) {
                el.removeAttribute('style');
            } else {
                style = filterStyle.join(";").trim();
                el.setAttribute('style', style);
            }
        }
    }
    return elements;
}

function _addStyle(elements, props) {
    var els = getElementInArray(elements);
    var i, el, os, osa, prop, currentProp, currentValue, arr, originalProp, filterStyle, style;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        os = el.getAttribute('style'); //original style
        osa = os.match(/[^;]+/g);

        filterStyle = osa.filter(function(currentValue) {
            arr = currentValue.trim().split(":");
            originalProp = arr[0];
            for (prop in props) {
                currentProp = prop.trim();
                currentValue = props[prop].trim();
                if (originalProp === currentProp) {
                    return false;
                }
            }
            return true;
        });

        if (filterStyle.length === 0) {
            style = '';
        } else {
            style = filterStyle.join(";").trim() + ";";
        }


        for (prop in props) {
            currentProp = prop.trim();
            currentValue = props[prop].trim();
            style += currentProp + ":" + currentValue + ";";
        }

        el.setAttribute('style', style);
    }

    return elements;
}

function addClass(elements, cls) {
	if(!isString(cls)){	return elements; }
    var els = getElementInArray(elements), classes = getClassToArray(cls), i, j;
    for (i = 0; i < els.length; i++) {
        for (j = 0; j < classes.length; j++) {
            els[i].classList.add(classes[j]); //ie10+
        }
    }
    return elements;
}


function removeClass(elements, cls) {
	if(!isString(cls)){	return elements; }
    var els = getElementInArray(elements), classes=getClassToArray(cls), i, j;
    for (i = 0; i < els.length; i++) {
        for (j = 0; j < classes.length; j++) {
            els[i].classList.remove(classes[j]);
        }
    }
    return elements;
}

function getClassToArray(cls) {
    return cls.match(/[^\s\t\r\n]+/g); //Creates an empty-based array.
}

function getElementInArray(el) {
    var result = [];
    if (!(el instanceof Cat) && !Array.isArray(el) && !isNodeList(el) && !isHTMLCollection(el) && !isObject(el)) {
        result.push(el);
    } else {
        result = el;
    }
    return result;
}

function setCssProps(elements, props) { //custom css와 연동, 커스텀 css 값 설정, "--check-primary": "#607d8b", set css custom properties
    var els = getElementInArray(elements);
    var i, el, k;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        for (k in props) {
            el.style.setProperty(k, props[k]);
        }
    }
    return elements;
}

function getCssPseudo(elements, pseudoElement, props) { //el, ":after", "width" , 엘리먼트에 해당하는 가상셀렉터 값을 얻을 수 있다.
    var els = getElementInArray(elements);
    pseudoElement = pseudoElement || null;

    var i, j, cssProp, cssValueArr = [],
        target, obj, prop;
    for (i = 0; i < els.length; i++) {
        target = els[i];
        cssProp = window.getComputedStyle(target, pseudoElement);

        if (props !== void 0 && isString(props)) { //"width"
            cssValueArr.push(cssProp.getPropertyValue(props));
        }

        if (props !== void 0 && Array.isArray(props)) { //[], return [{}]
            obj = {}
            for (j = 0; j < props.length; j++) {
                prop = props[j];
                obj[prop] = cssProp.getPropertyValue(prop);
            }
            cssValueArr.push(obj);
        }
    }

    return cssValueArr.length ? cssValueArr.length === 1 ? cssValueArr[0] : cssValueArr : false;
}

function _clearEvent(el, type, fn, capture, i) { // 이벤트 저장소 삭제, i: 지울 index OR all
    el.removeEventListener(type, fn, capture); //element.addEventListener(event, function, useCapture)
    el.catEventData.splice(i, 1);
    if (el.catEventData.length === 0) {
        delete el.catEventData;
    }
    //전체 삭제 el.catEventData.splice(0)
}


function getContext(context) {
    if (!!context) {
        if (context.nodeType === 1) {
            return context;
        } else if (isNodeList(context) || isHTMLCollection(context)) {
            return context[0];
        }
    }
    return document;
}



function remove(elements) {
    var els = getElementInArray(elements),
        el, i;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        el.parentNode.removeChild(el); //node.removeChild(node)
    }
    return elements;
}

function _addEvent(el, type, useCapture, fn) { //(el, "click","capture", function)
    var obj = new Object();
    obj.el = el;
    obj.type = type;
    obj.useCapture = useCapture;
    obj.fn = fn;
    el.catEventData.push(obj);
    return fn;
};

function trigger(elements, type) {
    var els = getElementInArray(elements);
    var i, el, evt;
    for (i = 0; i < els.length; i++) {

        el = els[i];
        evt = new CustomEvent(type, {
            detail: {
                el: el,
                type: type
            },
            bubbles: true,
            cancelable: true
        })
        el.dispatchEvent(evt);
    }
    return elements;
}

function clearJS(script) {
    var js = script.textContent;
    var exp = /\/\*[\s\S]*?\*\/|\/\/.*/g;
    script.textContent = js.replace(exp, '');
    return script;
}

function render(str, obj) {
    var k, reg;
    for (k in obj) {
        reg = new RegExp('{:' + k + '}', 'g');
        str = str.replace(reg, obj[k]);
    }
    return str;
}



function appendTo(insertNode, targetNode) { //p.appendTo(box);//insertNode, targetNode
    if (isString(targetNode)) {
        targetNode = qsa(targetNode);
    }
    append(targetNode, insertNode);
    return insertNode;
}

function prependTo(insertNode, targetNode) {
    if (isString(targetNode)) {
        targetNode = qsa(targetNode);
    }
    prepend(targetNode, insertNode);
    return insertNode;
}


function append(targetNode, insertNode) {
	if(!insertNode){return targetNode}
    var targets = getElementInArray(targetNode),
        nodes = getElementInArray(insertNode);
    var i, target, j, node, copyNode, k, obj;
    var htmlExp = /(<[\w\W]+>)/;
    var stringToEls;
    for (i = 0; i < targets.length; i++) {
        target = targets[i];

        for (j = 0; j < nodes.length; j++) {
            node = nodes[j];


            if (node.nodeType === 1 && i === 0) { //node or not event
                target.appendChild(node);
            } else if (typeof node.catEventData === 'undefined' && node.nodeType === 1) {
                copyNode = node.cloneNode(true);
                target.appendChild(copyNode);
            } else if (node.catEventData) {
                copyNode = node.cloneNode(true);
                target.appendChild(copyNode);
                for (k = 0; k < node.catEventData.length; k++) {
                    obj = node.catEventData[k];
                    on(copyNode, obj.type, obj.fn, obj.useCapture);
                }

            } else if (isString(node) && htmlExp.test(node)) {

                stringToEls = getStringToHtml(node);

                for (k = 0; k < stringToEls.length; k++) {
                    target.appendChild(stringToEls[k]);
                }
            } else {
                target.innerHTML += node;
            }

        } //end for j

    } //end for i
    return targetNode;
}


function prepend(targetNode, insertNode) {
    var targets = getElementInArray(targetNode),
        nodes = getElementInArray(insertNode);
    var i, target, j, node, copyNode, k, obj;
    var htmlExp = /(<[\w\W]+>)/;
    var stringToEls;
    for (i = 0; i < targets.length; i++) {
        target = targets[i];

        for (j = 0; j < nodes.length; j++) {
            node = nodes[j];

            if (node.nodeType === 1 && i === 0) { //node or not event
                target.insertBefore(node, target.firstChild); //insertBefore(insertNode, targetNode);
            } else if (typeof node.catEventData === 'undefined') {
                copyNode = node.cloneNode(true);
                target.insertBefore(copyNode, target.firstChild);
            } else if (node.catEventData) {
                copyNode = node.cloneNode(true);
                target.insertBefore(copyNode, target.firstChild);
                for (k = 0; k < node.catEventData.length; k++) {
                    obj = node.catEventData[k];
                    on(copyNode, obj.type, obj.fn, obj.useCapture);
                }

            } else if (isString(node) && htmlExp.test(node)) {
                stringToEls = getStringToHtml(node);
                for (k = 0; k < stringToEls.length; k++) {
                    target.insertBefore(stringToEls[k], target.firstChild);
                }
            }

        } //end for j

    } //end for i
    return targetNode;
}



function getStringToHtml(str) {
    var htmlExp = /(<[\w\W]+>)/;
    var parentTag, html, tempElement;
    var els = [],
        i;
    if (htmlExp.test(str)) {
        html = str.trim();
        if (html.indexOf('<li') === 0) {
            parentTag = "ul";
        } else if (html.indexOf('<tr') === 0) {
            parentTag = "tbody";
        } else if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) {
            parentTag = "tr";
        } else if (html.indexOf('<tbody') === 0) {
            parentTag = "table";
        } else if (html.indexOf('<option') === 0) {
            parentTag = "select";
        }

        tempElement = document.createElement(parentTag);
        tempElement.innerHTML = html;

        for (i = 0; i < tempElement.childNodes.length; i++) {
            if (tempElement.childNodes[i].nodeType === 1) {
                els.push(tempElement.childNodes[i]);
            }
        }
    } // end htmlExp.test(str)

    return els;
}

function extend() {
    var arr = [];
    arr.push.apply(arr, arguments);
    var len = arr.length,
        i, prop, target = arr[0],
        src, targetValue, srcValue, j, k;

    if (!len || !isObjectInArray(arr)) {
        return false
    }
    if (len === 1) {
        arr.unshift("this");
        ++len;
        target = this;
    }
    for (i = 1; i < len; i++) {
        src = arr[i];

        for (prop in src) {
            targetValue = target[prop];
            srcValue = src[prop];
			//console.log("ui.extend:",targetValue, srcValue );
            if (prop === "__proto__" || target === src) { //target === src ? continue, cat.extend(o1, {__proto__})
                continue;
            }

            if (isObject(targetValue) && isObject(srcValue)) {
                extend(targetValue, srcValue);
            } else if ( (targetValue === void 0 && srcValue !== void 0 ) || ( !isObject(targetValue) && srcValue !== undefined && !isObject(srcValue) && !Array.isArray(targetValue) && !Array.isArray(srcValue)) ) {
                target[prop] = srcValue;
            }
			
        }
    }
    return target;
}
function qs(selector, context) {
    //getElementInArray
    context = getContext(context);
    return context.querySelector(selector);
}

function qsa(selector, context) {
    context = getContext(context);
    return context.querySelectorAll(selector);
}

function toCamelCase(key) {
    //hyphenAlphabet : /-([a-z])/gi,
    var exp = /-(.)/g;
    var camelNotation = key.replace(exp, function(match, char, index, str) {
        return char.toUpperCase();
    });
    return camelNotation;
}

function _toHyphenCase(key) {
    var exp = /([A-Z])/g;
    var hyphenNotation = key.replace(exp, function(match, char, index, str) {
        return '-' + char.toLowerCase();
    });
    return hyphenNotation;
}
//const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);


function _toArray(a) {
    var arr = [];
    if (_isArrayLike(a)) {
        arr.push.apply(arr, a)
    }
    return arr; //make Array
}

function _isArrayLike(obj) {
    if (Array.isArray(obj) || typeof obj.length === "number" && obj.length > 0 && (obj.length - 1) in obj) {
        return true;
    }
    return false;
}

function htmlEscape(text) { //html을 escape 처리해줍니다.
    return text.replace(/[<>&"'\n]/g, function(match, char, index, str) { //일치하는 문자열, 해당 문자열의 위치, 마지막으로 전체 문자열입니다.
        switch (match) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
            case "'":
                return "&apos;";
            case "\n":
                return "<br />";
        }
    });
}

function comma(amount, display) { //100.0 => 100, 1,000
    var reg = /(^[+-]?\d+)(\d{3})/;
    var arr = new String(amount).split('.');
    var res = arr[0].replace(/[^0-9+\-]/g, '');
    if (display) {
        while (reg.test(res)) {
            res = res.replace(reg, '$1' + ',' + '$2');
        }
    }
    if (arr[1]) {
        res = res + '.' + arr[1].replace(/[^0-9]/g, '');
    }
    return res;
};

function thousandComma(amount) {
    var exp = /\d{1,3}(?=(\d{3})+(?!\d))/g;
    var str = amount.toString();
    var comma = str.replace(exp, function(match, char, index, str) {
        return match + ",";
    });
    return comma;
}

function removeComma(str) {
    var exp = /\54/g; //octal ,
    var amount = str.replace(exp, '');
    //return parseFloat(amount);
    return amount;
}

function insertRule(style) {
    document.styleSheets[0].insertRule(style, 0);
    //document.styleSheets[0].insertRule('.test::before{color:purple}',0);
}

//ms edge 15.0
function addStyleSheet(styleId, css) {
    var styleSheet = qs("#"+styleId);
    var styleCont = "";

//console.log(styleSheet);

    if (styleSheet === null) {
        styleSheet = document.createElement("style");
        styleSheet.id = styleId;
        document.head.appendChild(styleSheet);
    } else {
        styleCont = styleSheet.innerHTML;
    }
    styleSheet.innerHTML = styleCont + css;
    return styleSheet;
}

function removeStyleSheet(styleId) {
    var styleSheet = qs("#"+styleId);
    var parent;
    if (styleSheet !== null) {
        parent = styleSheet.parentNode;
        parent.removeChild(styleSheet);
    }
}


//?q=javascript&num=10
function getQueryStringArgs() {
    //물음표 뒤의 쿼리스트링을 가져옵니다. get query string without the initial ?
    var qs = (location.search.length > 0 ? location.search.substring(1) : "");
    var args = {}; //데이터 저장 객체, object to hold data

    //get individual items
    var items = qs.length ? qs.split("&") : [];

    var item = null,
        name = null,
        value = null;

    //used in for loop
    var i = 0;
    var len = items.length;

    //assign each item onto the args object 각 매개변수를 args 객체에 할당
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);


        if (name.length) { //값이 있으면
            args[name] = value;
        }
    }

    return args;
}
//http://localhost:8080/root/2021/js_made_2021/cat1/01/prependTo.html?a=1&b=1&aa=2
//var args = getQueryStringArgs();//{a: "1", b: "1", aa: "2"}
//console.log(args);
//console.log(args["q"]);
//console.log(args["num"]);

//The concat() method concatenates (joins) two or more arrays.
//The concat() method does not change the existing arrays, but returns a new array, containing the values of the joined arrays.
function asc(arr) { //arr.reverse()
    return arr.concat().sort(); //does not change the existing arrays
}
function desc(arr) {
    return arr.concat().sort(_compare);
}
function _compare(value1, value2) { //arr.sort(compare);
    if (value1 < value2) {
        return 1;
    } else if (value1 > value2) {
        return -1;
    } else {
        return 0;
    }
}
cat.extend({
    isArrInElement: isArrInElement, //(arr), array안에 있는것이 엘리먼트인지 체크
    isWindow: isWindow, //(window)
    //isNodeType: isNodeType, //1:element, (node), 9:document, 3:text, https://www.w3schools.com/jsref/prop_node_nodetype.asp
    isNodeList: isNodeList, //(node), document.querySelectorAll("span"), https://www.w3schools.com/js/js_htmldom_nodelist.asp, A NodeList is a collection of document nodes.
    isHTMLCollection: isHTMLCollection, //(node),document.getElementsByTagName("P"), https://www.w3schools.com/jsref/dom_obj_htmlcollection.asp, An HTMLCollection (previous chapter) is a collection of HTML elements.
    isFunction: isFunction, //(fn)
    isObject: isObject, //(source)
    isObjectInArray: isObjectInArray, //(source) object in array
    isString: isString, //(str)
	isNumber: isNumber,
    isEmailAddress: isEmailAddress,
    isNotEmpty: isNotEmpty,
	isEmpty: isEmpty,
    isSame: isSame
});

function isArrInElement(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].nodeType !== 1 && !isNodeList(arr[i]) && !isHTMLCollection(arr[i]) && !isWindow(arr[i]) && document != arr[i]) {
                return false;
            }
        }

        return true;
    }
    return false;
}

function isWindow(w) {
    return w === window ? true : false;
}

function isNodeList(node) {
    return NodeList.prototype.isPrototypeOf(node); //document.querySelectorAll("span")
}

function isHTMLCollection(node) {
    return HTMLCollection.prototype.isPrototypeOf(node); //document.getElementsByTagName("span")
}

function isFunction(f) {
    if (f instanceof Function) {
        return true;
    }
    return false;
}

function isObjectInArray(src) {
    var bool = false, i;
    if (Array.isArray(src)) {
        for (i = 0; i < src.length; i++) {
            if (isObject(src[i])) {
                bool = true;
            } else {
                return false;
            }
        }
    }
    return bool;
}

function isObject(obj) { //object
    return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
}

function isString(str) {
    return typeof str === "string" ? true : false;
}

function isNumber(str){
	var pattern = /^\d+$/;//^시작, \d 숫자와 일치, 이전과 하나 이상 일치, 끝
	return pattern.test(str); //returns a boolean
}

function isEmailAddress(str){
    var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  // returns a boolean
}

function isNotEmpty(str){
    var pattern =/\S+/;
    return pattern.test(str);  // returns a boolean
}
function isEmpty(str){   
    return !isNotEmpty(str);
}
function isSame(str1, str2){
    return str1 === str2;
}

function animate(a, b, c) {
    var els = getElementInArray(a), i, el;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if (typeof el.catAnimate === "undefined") {
            el.catAnimate = new Animate(el, b, c);
        } else {
            el.catAnimate.setQueue(b, c); // Having catAnimate means ing:true or done:false
        }
    }
    return a;
}

function stop(elements, stopAll, goToEnd) {
    var els = getElementInArray(elements);
    var i, el;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if (el.catAnimate) {
            el.catAnimate.stop(stopAll, goToEnd);
        }
    }

    return elements;
}

function resume(elements) {
    var els = getElementInArray(elements);
    var i, el;
    for (i = 0; i < els.length; i++) {
        el = els[i];
        if (el.catAnimate) {
            el.catAnimate.resume();
        }
    }
    return elements;
}


function _getBoxSize(el) {
    var div = document.createElement("div"), copy, cssProp, width, height;
    copy = el.cloneNode(true);
    css(div, {
        position: "absolute",
        visibility: "hidden",
        overflow: "hidden",
        height: 0
    });
    div.appendChild(copy);
    document.body.appendChild(div);
    show(copy);
    cssProp = getComputedStyle(copy, null);
    width = parseFloat(cssProp.width);
    height = parseFloat(cssProp.height);
    remove(div);
    return {
        width: width,
        height: height
    }
}

function Animate(a, b, c) { //el, props={}, params={}
    //if(a.nodeType !== 1 && a.nodeType !== 9 && !isWindow(a)){ console.log(a+" Must be an element node."); return false; }
    this.el = a;
    this.data = {};
    this.queue = [];
    this.frameId = null;
    this.removeStyleAfterDone = [];
    this.expr = {
        scroll: /(scrollTop|scrollLeft)/,
        box: /(width|height)/,
    }
    this.init(b, c);
}
Animate.fn = Animate.prototype;
Animate.fn.extend = extend;
Object.defineProperty(Animate.prototype, "constructor", {
    enumerable: false, //이런 식으로 생성자 재설정하면 프로퍼티의 [[Enumerable]] 속성이 true로 지정된다는 점을 알야둬야 합니다.
    value: Animate //네이티브 constructor 프로퍼티는 기본적으로 나열 불가능한 프로퍼티이므로 ECMAScript 5판을 구현한 자바스크립트 엔진이라면 다음과 같이 Object.defineProperty()를 쓰는 편이 좋습니다.
});

Animate.fn.extend({
    init: function(b, c) {
        //if(typeof b === 'undefined'){b={}}
        if (typeof c === 'undefined') { c = {} }
        this.state = {
            ing: false, //stop
            done: false, //delete instance
        };
        this.props = b || {};
        this.easing = c.easing || 'swing';//linear
        this.duration = c.duration || 300;
        this.callback = {
            begin: c.begin || null,
            progress: c.progress || null,
            complete: c.complete || null,
        }
        this.resume();
    },
    resume: function() {
        //console.log("resume:this.state:", this.state)
        if (!this.state.ing) {
            this.setData();
        }
    },
    steState: function(state) {
        extend(this.state, state);
    },

    setData: function() {
        var el = this.el,
            props = this.props,
            prop, beginValue, begin, change, unit = 'px';
        var cssProp, box, style;

        this.steState({
            ing: false,
            done: false
        });

        for (prop in props) {

            if (this.expr.scroll.test(prop)) {
                begin = _scroll(prop, el);
                change = props[prop];

            } else if (this.expr.box.test(prop) && /show/.test(props[prop]) && !is(el, ":visible")) { //(show|hide)

                box = _getBoxSize(el);
                begin = 0;
                change = box[prop];
                style = {};
                style[prop] = begin;
                style.overflow = "hidden";
                css(el, style);
                show(el);
                this.removeStyleAfterDone.push(prop, 'overflow');

            } else {
                //var cssProp = window.getComputedStyle(element, pseudoElement);
                cssProp = getComputedStyle(el, null);
                beginValue = cssProp.getPropertyValue(prop);
                if (!beginValue) {
                    beginValue = el.style[prop] || 0;
                }
                begin = parseFloat(beginValue);

                if (this.expr.box.test(prop) && /hide/.test(props[prop])) {
                    change = 0;
                    css(el, "overflow", "hidden");
                    this.removeStyleAfterDone.push(prop, 'overflow', 'display');
                } else {
                    change = parseFloat(props[prop]);
                }

                unit = beginValue.replace(begin, '');
            }

            this.data[prop] = {
                currentValue: begin,
                begin: begin,
                change: change,
                unit: unit
            }

        } //end for(prop in props)


        if (!begin && isNaN(begin) || !change && isNaN(change)) {
            this.done();
        } else {
            this.render();
        }
        //console.log("setData:", this)
    },
    render: function() {
        var _this = this;
		var el = this.el, easing = this.easing, duration=this.duration, data=this.data, callback=this.callback;
        this.state.ing = true;

        if ( isFunction(callback.begin) ) {
            callback.begin.call(this, el);
        }

        var time, startTime, progress = 0, easeProgress = 0, remaining;
        var currentValue, begin, change, unit, prop, x, y;

        function step(timestamp) {
            time = new Date().getTime();
            if (startTime === void 0) {
                startTime = time
            }
            progress = Math.max(Math.min((time - startTime) / duration, 1), 0); //최소0, 최대1


            if ( isFunction(callback.progress) ) {
                remaining = startTime + duration - time < 0 ? 0 : startTime + duration - time; //남은 밀리세컨드
                callback.progress(el, progress, easeProgress, remaining, startTime, timestamp);
            }

            for (prop in data) {
                begin = data[prop].begin;
                change = data[prop].change;
                unit = data[prop].unit;

                easeProgress = _this.getEaseProgress(easing, {
                    t: progress,
                    b: 0,
                    c: begin + change - begin,
                    d: 1
                });

                currentValue = data[prop].currentValue = begin + easeProgress * (change - begin); //props별 현재값, (change-begin)이동거리

                if (isWindow(el)) {
                    if (prop === "scrollLeft") {
                        x = currentValue;
                        y = el.pageYOffset;
                    } else if (prop === "scrollTop") {
                        x = el.pageXOffset;
                        y = currentValue;
                    }

                    el.scrollTo(x, y);

                } else if (_this.expr.scroll.test(prop)) { //scrollTop, scrollLeft
                    el[prop] = currentValue;
                } else {
                    el.style[prop] = currentValue + unit;
                }

                if (change === begin || change > begin && currentValue >= change || change < begin && currentValue <= change) { //plus 넘치면 그만 || minus 작아지면 그만

                    _this.state.done = true;
                    if (isWindow(el)) {
                        if (prop === "scrollLeft") {
                            x = change;
                            y = el.pageYOffset;
                        } else if (prop === "scrollTop") {
                            x = el.pageXOffset;
                            y = change;
                        }

                        el.scrollTo(x, y);

                    } else if (_this.expr.scroll.test(prop)) {
                        el[prop] = change;
                    } else {
                        el.style[prop] = change + unit;
                    }

                }
            } //end for in

            if (_this.state.done) {
                window.cancelAnimationFrame(_this.frameId);
                _this.frameId = null;
                _this.done();
                if (isFunction(callback.complete)) {
                    callback.complete(el, easeProgress);
                }
            } else {
                _this.frameId = window.requestAnimationFrame(step);
            }
        } //end step
        _this.frameId = window.requestAnimationFrame(step);

    },
    done: function() {
        var queue = this.queue,
            que;
        this.steState({
            ing: false,
            done: true
        });

        if (queue.length) {
            que = queue.shift();
            this.init(que[0], que[1]);
        } else {
            this.removeCatAnimate();
        }

        if (this.removeStyleAfterDone.length) {
            removeStyle(this.el, this.removeStyleAfterDone);
            this.removeStyleAfterDone.length = 0;
        }

    },
    getEaseProgress: function(easing, o) { //progress: 0-1

        if (easing === 'swing') {
            //Math.cos(3.141592653589793) = -1 , -1/2 = -0.5, 0.5--0.5 = 1
            return 0.5 - Math.cos(o.t * Math.PI)/2; //Math.cos(0) = 1, 45 = 0.5253219888177297
        }

        // result = (1, 0, b+c-b, 1), = result/b+c-b = 1
        if (typeof easing === 'function') {
            return easing(o.t, o.b, o.c, o.d) / o.c;
        }

        return o.t; //{time, begin, change, duration}
    },
    setQueue: function(b, c) {

        this.queue.push([b, c]);
    },
    removeCatAnimate: function() {
        delete this.el.catAnimate;
    },
    stop: function(stopAll, goToEnd) { //delete queue, move to change
		var el = this.el, data=this.data;
        window.cancelAnimationFrame(this.frameId);
        this.state.ing = false;
        if (goToEnd) {
            var prop, change, unit;
            for (prop in data) {
                change = data[prop].change;
                unit = data[prop].unit;
                el.style[prop] = change + unit;
            }
            this.state.done = true;
        }

        if (stopAll) { //delete queue
            //this.queue.length = 0;
            //this.queue= [];
            this.queue.splice(0);
            this.removeCatAnimate();
        } else {
            this.resume();
        }

    }
});

function scrollableElement(){//$('html, body'), jquery 원도우 기능이 없다. cat에는 있다.
	var i=0, arguLen = arguments.length, el, $scrollElement, isScrollable;
	for(; i<arguLen; i++ ){
		el = arguments[i];
		$scrollElement = $(el);
		$scrollElement.scrollTop(1);
		isScrollable = $scrollElement.scrollTop() > 0;
		$scrollElement.scrollTop(0);
		if( isScrollable ){
			return el;
		}
	}
	return [];
}



// Polyfill --------------------------------------------------------------------------------
function CustomEvent(event, params) {
    params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
}
if (typeof window.CustomEvent !== "function") {
    window.CustomEvent = CustomEvent;
}

/**
 * Object.assign() polyfill for IE11
 * @see <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign>
 */
if (typeof Object.assign != "function") {
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            "use strict";
            if (target == null) {
                throw new TypeError("Cannot convert undefined or null to object");
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

//However, given the practicality of supporting older browsers, the following should suffice for most (if not all) practical cases (i.e. IE9+ support).
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

window.cat = cat;


});
