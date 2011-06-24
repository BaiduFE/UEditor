var baidu = baidu || {};

/**
 * @namespace baidu.editor
 */
baidu.editor = baidu.editor || {};

/**
 * @class baidu.editor.commands
 */
baidu.editor.commands = {};
/**
 * @class baidu.editor.plugins
 */
baidu.editor.plugins = {};

baidu.editor.browser = function(){
    var agent = navigator.userAgent.toLowerCase(),
        opera = window.opera,
        browser = {
        /**
         * 检测浏览器是否为IE
         * @type Boolean
         * @example

         */
        ie		: !!window.ActiveXObject,

        /**
         * 检测浏览器是否为Opera.
         * @type Boolean
         * @example

         */
        opera	: ( !!opera && opera.version ),

        /**
         * 检测浏览器是否为WebKit内核
         * @type Boolean
         * @example

         */
        webkit	: ( agent.indexOf( ' applewebkit/' ) > -1 ),

        /**
         * 检测是否为Adobe AIR.
         * @type Boolean
         * @example

         */
        air		: ( agent.indexOf( ' adobeair/' ) > -1 ),

        /**
         * 检查是否为Macintosh系统.
         * @type Boolean
         * @example

         */
        mac	: ( agent.indexOf( 'macintosh' ) > -1 ),

        /**
         * 检查浏览器是否为quirks模式.
         * @type Boolean
         */
        quirks : ( document.compatMode == 'BackCompat' )
    };

    /**
     * 检测浏览器是否为Gecko内核，如Firefox
     */
    browser.gecko = ( navigator.product == 'Gecko' && !browser.webkit && !browser.opera );

    var version = 0;

    // Internet Explorer 6.0+
    if ( browser.ie )
    {
        version = parseFloat( agent.match( /msie (\d+)/ )[1] );

        /**
         *  是否 IE8 浏览器.
         *  @type Boolean
         */
        browser.ie8 = !!document.documentMode;

        /**
         * 是否 IE8 模式.
         * @type Boolean
         */
        browser.ie8Compat = document.documentMode == 8;

        /**
         * 是否运行在 兼容IE7模式
         * @type Boolean
         */
        browser.ie7Compat = ( ( version == 7 && !document.documentMode )
                || document.documentMode == 7 );

        /**
         * 是否 IE6 模式或怪异模式
         * @type Boolean
         */
        browser.ie6Compat = ( version < 7 || browser.quirks );

    }

    // Gecko.
    if ( browser.gecko )
    {
        var geckoRelease = agent.match( /rv:([\d\.]+)/ );
        if ( geckoRelease )
        {
            geckoRelease = geckoRelease[1].split( '.' );
            version = geckoRelease[0] * 10000 + ( geckoRelease[1] || 0 ) * 100 + ( geckoRelease[2] || 0 ) * 1;
        }
    }

    // Opera 9.50+
    if ( browser.opera )
        version = parseFloat( opera.version() );

    // WebKit 522+ (Safari 3+)
    if ( browser.webkit )
        version = parseFloat( agent.match( / applewebkit\/(\d+)/ )[1] );

    /**
     * 浏览器版本
     *
     * gecko内核浏览器的版本会转换成这样(如 1.9.0.2 -> 10900).
     *
     * webkit内核浏览器版本号使用其build号 (如 522).
     * @name baidu.editor.browser.version
     * @type Boolean
     * @example
     * if ( baidu.editor.browser.ie && <b>baidu.editor.browser.version</b> <= 6 )
     *     alert( "Ouch!" );
     */
    browser.version = version;

    /**
     * 是否一定兼容的浏览器
     * @name baidu.editor.browser.isCompatible
     * @type Boolean
     * @example
     * if ( baidu.editor.browser.isCompatible )
     *     alert( "Your browser is pretty cool!" );
     */
    browser.isCompatible =
        !browser.mobile && (
        ( browser.ie && version >= 6 ) ||
        ( browser.gecko && version >= 10801 ) ||
        ( browser.opera && version >= 9.5 ) ||
        ( browser.air && version >= 1 ) ||
        ( browser.webkit && version >= 522 ) ||
        false );
    return browser;
}();

﻿(function (){
    var noop = new Function();
    var utils = baidu.editor.utils = {
        /**
         * 以obj为原型创建实例
         * @param obj
         */
        makeInstance : function ( obj ) {
            noop.prototype = obj;
            obj = new noop;
            noop.prototype = null;
            return obj;
        },
        /**
         * 判断是否为数组
         * @param array
         */
        isArray : function (array){
            return array && array.constructor === Array;
        },
        /**
         * 遍历元素执行迭代器
         * @param {Array|Object} eachable
         * @param {Function} iterator
         * @param {Object} this_
         */
        each: function (eachable, iterator, this_){
            if (utils.isArray(eachable)) {
                for (var i=0; i<eachable.length; i++) {
                    iterator.call(this_, eachable[i], i, eachable);
                }
            } else {
                for (var k in eachable) {
                    iterator.call(this_, eachable[k], k, eachable);
                }
            }
        },
        /**
         * 继承
         * @param {Object} subClass
         * @param {Object} superClass
         */
        inherits : function ( subClass, superClass ) {
            var oldP = subClass.prototype;
            var newP = utils.makeInstance( superClass.prototype );
            utils.extend( newP, oldP, true );
            subClass.prototype = newP;
            return ( newP.constructor = subClass );
        },

        /**
         * @param {Function} fn
         * @param {Object} this_
         */
        bind : function ( fn, this_ ) {
            return function () {
                return fn.apply( this_, arguments );
            };
        },

        /**
         * 创建延迟执行的函数
         * @param {Function} fn
         * @param {Number} delay
         * @param {Boolean?} exclusion 是否互斥执行
         */
        defer : function ( fn, delay, exclusion ){
            var timerID;
            return function () {
                if ( exclusion ) {
                    clearTimeout( timerID );
                }
                timerID = setTimeout( fn, delay );
            };
        },

        /**
         * 将s对象中的属性扩展到t对象上
         * @param {Object} t
         * @param {Object} s
         * @param {Boolean} b 是否保留已有属性
         * @returns {Object}
         */
        extend : function ( t, s, b ) {
            if (s) {
                for ( var k in s ) {
                    if (!b || !t.hasOwnProperty(k)) {
                        t[k] = s[k];
                    }
                }
            }
            return t;
        },

        /**
         * 查找元素在数组中的索引, 若找不到返回-1
         * @param {Array} array
         * @param {*} item
         * @param {Number?} at
         * @returns {Number}
         */
        indexOf : function ( array, item, at ) {
            at = at || 0;
            while ( at < array.length ) {
                if ( array[at] === item ) {
                    return at;
                }
                at ++;
            }
            return -1;
        },

        /**
         * 移除数组中的元素
         * @param {Array} array
         * @param {*} item
         */
        removeItem : function ( array, item ) {
            var k = array.length;
            if ( k ) while ( k -- ) {
                if ( array[k] === item ) {
                    array.splice(k, 1);
                    break;
                }
            }
        },

        /**
         * 删除字符串首尾空格
         * @param {String} str
         * @return {String} str
         */
        trim : function () {
            // "non-breaking spaces" 就是&nbsp;不能被捕获，所以不用\s
            var trimRegex = /(^[ \t\n\r]+)|([ \t\n\r]+$)/g;
            return function ( str ) {
                return str.replace( trimRegex, '' ) ;
            };
        }(),

        /**
         * 将字符串转换成hashmap, key由逗号分开
         * @param {String} list
         * @returns {Object}
         */
        listToMap : function ( list ) {
            if ( !list ) {
                return {};
            }
            var array = list.split( /,/g ),
                k = array.length,
                map = {};
            if ( k ) while ( k -- ) {
                map[array[k]] = 1;
            }
            return map;
        },

        /**
         * 将str中的html符号转义以用于放入html中
         * @param {String} str
         * @returns {String}
         */
        unhtml: function () {
            var map = { '<': '&lt;', '&': '&amp', '"': '&quot;', '>': '&gt;' };
            function rep( m ){ return map[m]; }
            return function ( str ) {
                return str ? str.replace( /[&<">]/g, rep ) : '';
            };
        }(),

        cssStyleToDomStyle : function(){
			var test = document.createElement( 'div' ).style,
				cssFloat =  test.cssFloat != undefined  ? 'cssFloat'
				: test.styleFloat != undefined ? 'styleFloat'
				: 'float',
                cache = { 'float': cssFloat };
            function replacer( match ){ return match.charAt( 1 ).toUpperCase(); }
			return function( cssName ) {
                return cache[cssName] || (cache[cssName] = cssName.toLowerCase().replace( /-./g, replacer ) );
			};
		}()
    };
})();

(function () {
    baidu.editor.EventBase = EventBase;

    var utils = baidu.editor.utils;

    /**
     * 事件基础类
     * @public
     * @class
     * @name baidu.editor.EventBase
     */
    function EventBase() {

    }

    EventBase.prototype = /**@lends baidu.editor.EventBase.prototype*/{
        /**
         * 注册事件监听器
         * @public
         * @function
         * @param {String} type 事件名
         * @param {Function} listener 监听器
         */
        addListener : function ( type, listener ) {
            getListener( this, type.toLowerCase(), true ).push( listener );
        },
        /**
         * 移除事件监听器
         * @public
         * @function
         * @param {String} type 事件名
         * @param {Function} listener 监听器
         */
        removeListener : function ( type, listener ) {
            var listeners = getListener( this, type );
            listeners && utils.removeItem( listeners, listener );
        },
        /**
         * 触发事件
         * @public
         * @function
         * @param {String} type 事件名
         */
        fireEvent : function ( type ) {
            var listeners = getListener( this, type ),
                r, t, k;
            if ( listeners ) {

                k = listeners.length;
                while ( k -- ) {

                    t = listeners[k].apply( this, arguments );
                    if ( t !== undefined ) {
                        r = t;
                    }

                }
                
            }
            if ( t = this['on' + type.toLowerCase()] ) {
                r = t.apply( this, arguments );
            }
            return r;
        }
    };

    function getListener( obj, type, force ) {
        var allListeners;
        return ( ( allListeners = ( obj.__allListeners || force && ( obj.__allListeners = {} ) ) )
            && ( allListeners[type] || force && ( allListeners[type] = [] ) ) );
    }
})();

//注册命名空间
baidu.editor.dom = baidu.editor.dom || {};
﻿/**
 * dtd html语义化的体现类 来自于ckeditor源码，有改动
 * @constructor
 * @namespace dtd
 */
baidu.editor.dom.dtd = (function() {
    function _( s ) {
        for (var k in s) {
            s[k.toUpperCase()] = s[k];
        }
        return s;
    }
    function X( t ) {
        var a = arguments;
        for ( var i=1; i<a.length; i++ ) {
            var x = a[i];
            for ( var k in x ) {
                if (!t.hasOwnProperty(k)) {
                    t[k] = x[k];
                }
            }
        }
        return t;
    }
    var A = _({isindex:1,fieldset:1}),
        B = _({input:1,button:1,select:1,textarea:1,label:1}),
        C = X( _({a:0}), B ),
        D = X( {iframe:1}, C ),
        E = _({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1}),
        F = _({ins:1,del:1,script:1,style:1}),
        G = X( _({b:1,acronym:1,bdo:1,'var':1,'#':1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}), F ),
        H = X( _({sub:1,img:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}), G ),
        I = X( _({p:1}), H ),
        J = X( _({iframe:1}), H, B ),
        K = _({img:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,'#':1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,'var':1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),

        L = X( _({a:1}), J ),
        M = _({tr:1}),
        N = _({'#':1}),
        O = X( _({param:1}), K ),
        P = X( _({form:1}), A, D, E, I ),
        Q = _({li:1}),
        R = _({style:1,script:1}),
        S = _({base:1,link:1,meta:1,title:1}),
        T = X( S, R ),
        U = _({head:1,body:1}),
        V = _({html:1});

    var block = _({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1});

    return  _({

        // $ 表示自定的属性

        // body外的元素列表.
        $nonBodyContent: X( V, U, S ),

        //块结构元素列表
        $block : block,

        //内联元素列表
        $inline : L,

        $body : X( _({script:1,style:1}), block ),

        $cdata : _({script:1,style:1}),

        //自闭和元素
        $empty : _({area:1,base:1,br:1,col:1,hr:1,img:1,input:1,link:1,meta:1,param:1}),

        //列表元素列表
        $listItem : _({dd:1,dt:1,li:1}),

        //列表根元素列表
        $list: _({ul:1,ol:1,dl:1}),

        //如果没有子节点就可以删除的元素列表，像span,a
        $removeEmpty : _({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1}),

        //在table元素里的元素列表
        $tableContent : _({caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1}),

        html: U,
        head: T,
        style: N,
        script: N,
        body: P,
        base: {},
        link: {},
        meta: {},
        title: N,
        col : {},
        tr : _({td:1,th:1}),
        img : {},
        colgroup : _({col:1}),
        noscript : P,
        td : P,
        br : {},
        th : P,
        center : P,
        kbd : L,
        button : X( I, E ),
        basefont : {},
        h5 : L,
        h4 : L,
        samp : L,
        h6 : L,
        ol : Q,
        h1 : L,
        h3 : L,
        option : N,
        h2 : L,
        form : X( A, D, E, I ),
        select : _({optgroup:1,option:1}),
        font : L,
        ins : L,
        menu : Q,
        abbr : L,
        label : L,
        table : _({thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1}),
        code : L,
        tfoot : M,
        cite : L,
        li : P,
        input : {},
        iframe : P,
        strong : L,
        textarea : N,
        noframes : P,
        big : L,
        small : L,
        span :baidu.editor.utils.extend(L,{'A':0,'a':0}),
        hr : L,
        dt : L,
        sub : L,
        optgroup : _({option:1}),
        param : {},
        bdo : L,
        'var' : L,
        div : P,
        object : O,
        sup : L,
        dd : P,
        strike : L,
        area : {},
        dir : Q,
        map : X( _({area:1,form:1,p:1}), A, F, E ),
        applet : O,
        dl : _({dt:1,dd:1}),
        del : L,
        isindex : {},
        fieldset : X( _({legend:1}), K ),
        thead : M,
        ul : Q,
        acronym : L,
        b : L,
        a : X( _({a:1}), J ),
        blockquote :X(_({td:1,tr:1,tbody:1,li:1}),P),
        caption : L,
        i : L,
        u : {},
        tbody : M,
        s : L,
        address : X( D, I ),
        tt : L,
        legend : L,
        q : L,
        pre : X( G, C ),
        p : L,
        em :L,
        dfn : L
    });
})();

(function() {
    var editor = baidu.editor,
        browser = editor.browser,
        dtd = editor.dom.dtd,
        utils = editor.utils,
        // for domUtils.remove
        orphanDiv;

    //for getNextDomNode getPreviousDomNode
    function getDomNode( node, start, ltr, startFromChild, fn, guard ) {
        var tmpNode = startFromChild && node[start],
            parent;

        !tmpNode && (tmpNode = node[ltr]);

        while ( !tmpNode && (parent = (parent || node).parentNode) ) {
            if ( parent.tagName == 'BODY' )
                return null;
            if ( guard && !guard( parent ) )
                return null;
            tmpNode = parent[ltr];
        }

        if ( tmpNode && fn && !fn( tmpNode ) ) {
            return  getDomNode( tmpNode, start, ltr, false, fn )
        }
        return tmpNode;
    }


    var domUtils = baidu.editor.dom.domUtils = {
        //节点常量
        NODE_ELEMENT : 1,
        NODE_DOCUMENT : 9,
        NODE_TEXT : 3,
        NODE_COMMENT : 8,
        NODE_DOCUMENT_FRAGMENT : 11,

        //位置关系
        POSITION_IDENTICAL : 0,
        POSITION_DISCONNECTED : 1,
        POSITION_FOLLOWING : 2,
        POSITION_PRECEDING : 4,
        POSITION_IS_CONTAINED : 8,
        POSITION_CONTAINS : 16,
        //ie6使用其他的会有一段空白出现
        fillChar : browser.ie && browser.version == '6' ? '\ufeff' : '\u200B',
        //-------------------------Node部分--------------------------------


        /**
         * 获取两个节点的位置关系
         * @param {Node} nodeA
         * @param {Node} nodeB
         * @returns {Number}
         */
        getPosition : function ( nodeA, nodeB ) {
            // 如果两个节点是同一个节点
            if ( nodeA === nodeB ) {
                // domUtils.POSITION_IDENTICAL
                return 0;
            }
            //chrome在nodeA,nodeB都不在树上时，会有问题
            if ( browser.gecko ) {
                return nodeA.compareDocumentPosition( nodeB );
            }

            var node,
                parentsA = [nodeA],
                parentsB = [nodeB];


            node = nodeA;
            while ( node = node.parentNode ) {
                // 如果nodeB是nodeA的祖先节点
                if ( node === nodeB ) {
                    // domUtils.POSITION_IS_CONTAINED + domUtils.POSITION_FOLLOWING
                    return 10;
                }
                parentsA.push( node );

            }


            node = nodeB;
            while ( node = node.parentNode ) {
                // 如果nodeA是nodeB的祖先节点
                if ( node === nodeA ) {
                    // domUtils.POSITION_CONTAINS + domUtils.POSITION_PRECEDING
                    return 20;
                }
                parentsB.push( node );

            }

            parentsA.reverse();
            parentsB.reverse();

            if ( parentsA[0] !== parentsB[0] )
            // domUtils.POSITION_DISCONNECTED
                return 1;

            var i = -1;
            while ( i++,parentsA[i] === parentsB[i] ) ;
            nodeA = parentsA[i];
            nodeB = parentsB[i];

            while ( nodeA = nodeA.nextSibling ) {
                if ( nodeA === nodeB ) {
                    // domUtils.POSITION_PRECEDING
                    return 4
                }
            }
            // domUtils.POSITION_FOLLOWING
            return  2;
        },

        /**
         * 返回节点索引，zero-based
         * @param {Node} node
         * @returns {Number}
         */
        getNodeIndex : function ( node ) {
            var childNodes = node.parentNode.childNodes,
                i = 0;
            while ( childNodes[i] !== node ) i++;
            return i;
        },

        /**
         * 查找祖先节点
         * @param {Function} tester
         * @returns {Node}
         */
        findParent : function ( node, tester ) {
            if(!this.isBody(node)){
                node =  node.parentNode;
                while ( node ) {

                    if ( !tester || tester( node ) || this.isBody(node)) {

                        return tester && !tester(node) && this.isBody(node) ? null : node;
                    }
                    node = node.parentNode;

                }
            }

            return null;
        },

        findParentByTagName : function( node, tagName, includeSelf ) {
            if(node && node.nodeType && !this.isBody(node)  && (node.nodeType == 1 || node.nodeType) ){
                tagName = !utils.isArray( tagName ) ? [tagName] : tagName;
                node = node.nodeType == 3 || !includeSelf ? node.parentNode : node;
                while ( node && node.nodeType != 9 ) {
                    if ( utils.indexOf( tagName, node.tagName.toLowerCase() ) > -1 )
                        return node;
                    node = node.parentNode;
                }
            }

            return null;
        },
        /**
         * 查找祖先节点集合
         * @param {Node} node
         * @param {Function} tester
         * @param {Boolean} includeSelf
         * @param {Boolean} closerFirst
         * @returns {Array}
         */
        findParents: function ( node, includeSelf, tester, closerFirst ) {
            var parents = includeSelf && ( tester && tester(node) || !tester ) ? [node] : [];
            while ( node = domUtils.findParent( node, tester ) ) {
                parents.push( node );
            }
            if ( !closerFirst ) {
                parents.reverse();
            }
            return parents;
        },

        /**
         * 往后插入节点
         * @param node
         * @param nodeToInsert
         */
        insertAfter : function ( node, nodeToInsert ) {
            return node.parentNode.insertBefore( nodeToInsert, node.nextSibling );
        },

        /**
         * 删除该节点
         * @param {Node} node
         * @param {Boolean} keepChildren 是否包含子节点
         * @return {Node} node
         */
        remove :  function ( node, keepChildren ) {
            var parent = node.parentNode,
                child;
            if ( parent ) {
                if ( keepChildren && node.hasChildNodes() ) {
                    while ( child = node.firstChild ) {
                        parent.insertBefore( child, node );
                    }
                }
//                if ( browser.ie ) {
//                    if ( orphanDiv == null ) {
//                        orphanDiv = node.ownerDocument.createElement( 'div' );
//                    }
//                    orphanDiv.appendChild( node );
//                    orphanDiv.innerHTML = '';
//                } else {
//                    parent.removeChild( node );
//                }
                parent.removeChild( node );
            }
            return node;
        },

        /**
         * 取得node节点在dom树上的下一个节点
         * @param {Node} node
         * @param {Boolean} startFromChild 为true从子节点开始找
         * @param {Function} fn 找到fn为真的节点
         * @return {Node} node
         */
        getNextDomNode : function( node, startFromChild, filter, guard ) {
            return getDomNode( node, 'firstChild', 'nextSibling', startFromChild, filter, guard );

        },

        /**
         * 取得node节点在dom树上的上一个节点
         * @param {Node} node
         * @param {Boolean} startFromChild 为true从子节点开始找
         * @param {Function} fn 找到fn为真的节点
         * @return {Node} node
         */
        getPreviousDomNode : function( node, startFromChild, fn ) {
            return getDomNode( node, 'lastChild', 'previousSibling', startFromChild, fn );

        },
        /**
         * 是bookmark节点
         * @param {Node} node
         * @return {Boolean} true
         */
        isBookmarkNode : function( node ) {
            return node.nodeType == 1 && node.id && /^_baidu_bookmark_/i.test(node.id);
        },
        /**
         * 获取节点所在window对象
         * @param {Node} node
         */
        getWindow : function ( node ) {
            var doc = node.ownerDocument || node;
            return doc.defaultView || doc.parentWindow;
        },
        /**
         * 得到公共的祖先节点
         * @return {Node} 祖先节点
         */
        getCommonAncestor : function( nodeA, nodeB ) {
            if ( nodeA === nodeB )
                return nodeA;
            var parentsA = [nodeA] ,parentsB = [nodeB], parent = nodeA,
                i = -1;


            while ( parent = parent.parentNode ) {

                if ( parent === nodeB )
                    return parent;
                parentsA.push( parent )
            }
            parent = nodeB;
            while ( parent = parent.parentNode ) {
                if ( parent === nodeA )
                    return parent;
                parentsB.push( parent )
            }

            parentsA.reverse();
            parentsB.reverse();
            while ( i++,parentsA[i] === parentsB[i] );
            return i == 0 ? null : parentsA[i - 1];

        },
        /**
         * 清除该节点左右空的inline节点
         * @exmaple <b></b><i></i>xxxx<b>bb</b> --> xxxx<b>bb</b>
         */
        clearEmptySibling : function( node, ingoreNext, ingorePre ) {
            function clear( next, dir ) {
                var tmpNode;
                if ( next && (!domUtils.isBookmarkNode( next ) && domUtils.isEmptyInlineElement( next ) || domUtils.isWhitespace(next) )) {
                    tmpNode = next[dir];
                    domUtils.remove( next );
                    tmpNode && clear( tmpNode, dir );
                }
            }

            !ingoreNext && clear( node.nextSibling, 'nextSibling' );
            !ingorePre && clear( node.previousSibling, 'previousSibling' );
        },

        //---------------------------Text----------------------------------

        /**
         * 将一个文本节点拆分成两个文本节点
         * @param {TextNode} node
         * @param {Integer} offset 拆分的
         * @return {TextNode} 拆分后的后一个文本节
         */
        split: function ( node, offset ) {
            var doc = node.ownerDocument;
            if ( browser.ie && offset == node.nodeValue.length ) {
                var next = doc.createTextNode( '' );
                return domUtils.insertAfter( node, next );
            }

            var retval = node.splitText( offset );


            //ie8下splitText不会跟新childNodes,我们手动触发他的更新

            if ( browser.ie8 ) {
                var tmpNode = doc.createTextNode( '' );
                domUtils.insertAfter( retval, tmpNode );
                domUtils.remove( tmpNode );

            }

            return retval;
        },

        /**
         * 是空白节点否
         * @param {TextNode}
            * @return {Boolean}
         */
        isWhitespace : function( node ) {
            var reg = new RegExp('[^ \t\n\r'+domUtils.fillChar+']');
            return !reg.test( node.nodeValue );
        },

        //------------------------------Element-------------------------------------------
        /**
         * 获取元素相对于viewport的像素坐标
         * @param {Element} element
         * @returns {Object}
         */
        getXY : function ( element ) {
            var box = element.getBoundingClientRect();
            return {
                x: Math.round( box.left ),
                y: Math.round( box.top )
            };
        },
        /**
         * 绑原生DOM事件
         * @param {Element|Window|Document} target
         * @param {Array|String} type
         * @param {Function} handler
         */
        on : function ( obj, type, handler ) {
            var types = type instanceof Array ? type : [type],
                k = types.length;
            if ( k ) while ( k -- ) {
                type = types[k];
                if ( obj.addEventListener ) {
                    obj.addEventListener( type, handler, false );
                } else {
                    obj.attachEvent( 'on' + type, handler );
                }
            }
        },

        /**
         * 解除原生DOM事件绑定
         * @param {Element|Window|Document} obj
         * @param {Array|String} type
         * @param {Function} handler
         */
        un : function ( obj, type, handler ) {
            var types = type instanceof Array ? type : [type],
                k = types.length;
            if ( k ) while ( k -- ) {
                type = types[k];
                if ( obj.removeEventListener ) {
                    obj.removeEventListener( type, handler, false );
                } else {
                    obj.detachEvent( 'on' + type, handler );
                }
            }
        },

        /**
         * 比较两个节点是否tagName相同且有相同的属性和属性值
         * @param {Element}   nodeA
         * @param {Element}   nodeB
         * @return {Boolean} true 相同
         * @example
         * &lt;span  style="font-size:12px"&gt;ssss&lt;/span&gt;和&lt;span style="font-size:12px"&gt;bbbbb&lt;/span&gt; 相等
         *  &lt;span  style="font-size:13px"&gt;ssss&lt;/span&gt;和&lt;span style="font-size:12px"&gt;bbbbb&lt;/span&gt; 不相等
         */
        isSameElement : function( nodeA, nodeB ) {

            if ( nodeA.tagName != nodeB.tagName )
                return false;

            var thisAttribs = nodeA.attributes,
                otherAttribs = nodeB.attributes;


            if ( !browser.ie && thisAttribs.length != otherAttribs.length )
                return false;

            var k = thisAttribs.length,
                specLen = 0;
            if ( k ) while ( k -- ) {
                var thisAttr = thisAttribs[k];
                if ( !browser.ie || thisAttr.specified ) {
                    specLen ++;
                    if ( thisAttr.nodeName == 'style' ) continue;
                    // ie6 下必须用getAttribute("className")才能取到class属性
//                    if ( nodeB.getAttribute( thisAttr.nodeName ) != thisAttr.nodeValue ) {
                    var attr = nodeB.attributes[thisAttr.nodeName];
                    var attrValue = attr && attr.nodeValue || null;
                    if (attrValue != thisAttr.nodeValue ) {
                        return false;
                    }
                }
            }

            if ( !domUtils.isSameStyle( nodeA, nodeB ) ) {
                return false;
            }

            // 如果是IE，不能通过attributes.length判断属性是否一样多，需要单独判断
            if ( browser.ie ) {
                k = otherAttribs.length;
                if ( k ) while ( k -- ) {
                    if ( otherAttribs[k].specified ) {
                        specLen --;
                    }
                }
                return !specLen;
            }

            return true;
        },
        isRedundantSpan : function( node ) {
            if ( node.nodeType == 3 || node.tagName.toLowerCase() != 'span' )
                return 0;
            if ( browser.ie ) {
                var attrs = node.attributes;
                if ( attrs.length ) {
                    for ( var i = 0,ai; ai = attrs[i++]; ) {
                        if ( ai.specified ) {
                            return 0;
                        }
                    }
                    return 1;
                }
            }
            return !node.attributes.length
        },
        /**
         * 判断两个元素的style是不是style属性一致
         * @param elementA
         * @param elementB
         */
        isSameStyle : function ( elementA, elementB ) {
            var styleA = elementA.style.cssText,
                styleB = elementB.style.cssText;
//            if ( browser.ie && browser.version <= 8 ) {
//                styleA = styleA.toLowerCase();
//                styleB = styleB.toLowerCase();
//            }
            if ( !styleA && !styleB ) {
                return true;
            } else if ( !styleA || !styleB ) {
                return false;
            }
            var styleNameMap = {},
                record = [],
                exit = {};
            styleA.replace( /[\w-]+\s*(?=:)/g, function ( name ) {
                styleNameMap[name] = record.push( name );
            } );
            try {
                styleB.replace( /[\w-]+\s*(?=:)/g, function ( name ) {
                    var index = styleNameMap[name];
                    if ( index ) {
//                        var valA, valB;
                        name = utils.cssStyleToDomStyle( name );
//                        if ( browser.ie ) {
//                            valA = elementA.style.getAttribute( name );
//                            valB = elementB.style.getAttribute( name );
//                        } else {
//                            valA = elementA.style[name];
//                            valB = elementB.style[name];
//                        }
                        if ( elementA.style[name] !== elementB.style[name] ) {
                            throw exit;
                        }
                        record[index - 1] = '';
                    } else {
                        throw exit;
                    }
                } );
            } catch( ex ) {
                if ( ex === exit ) {
                    return false;
                }
            }
            return !record.join( '' );
        },

        /**
         * 检查是否为块元素
         * @param {Element} node
         * @param {String} customNodeNames 自定义的块元素的tagName
         * @return {Boolean} true 是块元素
         */
        isBlockElm : function () {
            var blockBoundaryDisplayMatch = ['block' ,'list-item' ,'table' ,'table-row-group' ,'table-header-group','table-footer-group' ,'table-row' ,'table-column-group' ,'table-column' ,'table-cell' ,'table-caption'],
                blockBoundaryNodeNameMatch = { hr : 1 };
            return function( node, customNodeNames ) {
                return node.nodeType == 1 && (utils.indexOf( blockBoundaryDisplayMatch, domUtils.getComputedStyle( node, 'display' ) ) != -1 ||
                    utils.extend( blockBoundaryNodeNameMatch, customNodeNames || {} )[ node.tagName.toLocaleLowerCase() ]);
            }
        }(),

        /**
         * 是body
         * @param {Node}
            * @param {Boolean}
            */
        isBody : function( node ) {
            return  node && node.nodeType == 1 && node.tagName.toLowerCase() == 'body';
        },
        /**
         * 以node节点为中心，将该节点的父节点拆分成2块
         * @param {Element} node
         * @param {Element} parent 要被拆分的父节点
         * @example <div>xxxx<b>xxx</b>xxx</div> ==> <div>xxx</div><b>xx</b><div>xxx</div>
         */
        breakParent : function( node, parent ) {
            var tmpNode, parentClone = node, clone = node, leftNodes, rightNodes;
            do {
                parentClone = parentClone.parentNode;

                if ( leftNodes ) {
                    tmpNode = parentClone.cloneNode( false );
                    tmpNode.appendChild( leftNodes );
                    leftNodes = tmpNode;

                    tmpNode = parentClone.cloneNode( false );
                    tmpNode.appendChild( rightNodes );
                    rightNodes = tmpNode;

                } else {
                    leftNodes = parentClone.cloneNode( false );
                    rightNodes = leftNodes.cloneNode( false );
                }


                while ( tmpNode = clone.previousSibling ) {
                    leftNodes.insertBefore( tmpNode, leftNodes.firstChild );
                }

                while ( tmpNode = clone.nextSibling ) {
                    rightNodes.appendChild( tmpNode );
                }

                clone = parentClone;
            } while ( parent !== parentClone );

            tmpNode = parent.parentNode;
            tmpNode.insertBefore( leftNodes, parent );
            tmpNode.insertBefore( rightNodes, parent );
            tmpNode.insertBefore( node, rightNodes );
            domUtils.remove( parent );
            return node;
        },

        /**
         * 检查是否是inline的套用的空节点
         * @return {Boolean} 1/0
         * @example
         * &lt;b&gt;&lt;i&gt;&lt;/i&gt;&lt;/b&gt; //true
         * <b><i></i><u></u></b> true
         * &lt;b&gt;&lt;/b&gt; true  &lt;b&gt;xx&lt;i&gt;&lt;/i&gt;&lt;/b&gt; //false
         */
        isEmptyInlineElement : function( node ) {

            if ( node.nodeType != 1 || !dtd.$removeEmpty[ node.tagName ] )
                return 0;

            node = node.firstChild;
            while ( node ) {
                //如果是创建的bookmark就跳过
                if ( domUtils.isBookmarkNode( node ) )
                    return 0;
                if ( node.nodeType == 1 && !domUtils.isEmptyInlineElement( node ) ||
                    node.nodeType == 3 && !domUtils.isWhitespace( node )
                    ) {
                    return 0;
                }
                node = node.nextSibling;
            }
            return 1;

        },

        /**
         * 删除节点下的左右的空白节点
         * @param {Element} node
         */
        trimWhiteTextNode : function( node ) {

            function remove( dir ) {
                var child;
                while ( (child = node[dir]) && child.nodeType == 3 && domUtils.isWhitespace( child ) )
                    node.removeChild( child )

            }

            remove( 'firstChild' );
            remove( 'lastChild' );

        },

        /**
         * 合并子节点
         * @example &lt;span style="font-size:12px;"&gt;xx&lt;span style="font-size:12px;"&gt;aa&lt;/span&gt;xx&lt;/span  使用后
         * &lt;span style="font-size:12px;"&gt;xxaaxx&lt;/span
         */
        mergChild : function( node ) {
            var list = domUtils.getElementsByTagName( node, node.tagName.toLowerCase() );
            for ( var i = 0,ci; ci = list[i++]; ) {

                if ( !ci.parentNode || domUtils.isBookmarkNode( ci ) ) continue;
                //span单独处理
                if ( ci.tagName.toLowerCase() == 'span' ) {
                    if ( node === ci.parentNode ) {
                        domUtils.trimWhiteTextNode( node );
                        if(node.childNodes.length == 1){
                            node.style.cssText = ci.style.cssText + ";"+node.style.cssText;
                            domUtils.remove(ci,true);
                            continue;
                        }
                    }
                    ci.style.cssText =  ci.style.cssText + ";" + node.style.cssText;
                    if(ci.style.cssText == node.style.cssText){
                        domUtils.remove( ci, true )
                    }
                    continue;
                }
                if ( domUtils.isSameElement( node, ci ) ) {
                    domUtils.remove( ci, true );
                }
            }

        },

        /**
         * 封装一下getElemensByTagName
         * @param node
         * @return {Array}
         */
        getElementsByTagName : function( node, name ) {
            var list = node.getElementsByTagName( name ),arr = [];
            for ( var i = 0,ci; ci = list[i++]; ) {
                arr.push( ci )
            }
            return arr;
        },
        /**
         * 合并子节点和父节点
         * @param {Element} node
         * @example &lt;span style="color:#ff"&gt;&lt;span style="font-size:12px"&gt;xxx&lt;/span&gt;&lt;/span&gt; ==&gt; &lt;span style="color:#ff;font-size:12px"&gt;xxx&lt;/span&gt;
         */
        mergToParent : function( node ) {
            var parent = node.parentNode;

            while ( parent && dtd.$removeEmpty[parent.tagName] ) {
                if ( parent.tagName == node.tagName ) {
                    domUtils.trimWhiteTextNode( parent );
                    //span需要特殊处理  不处理这样的情况 <span stlye="color:#fff">xxx<span style="color:#ccc">xxx</span>xxx</span>
                    if ( parent.tagName.toLowerCase() == 'span' && !domUtils.isSameStyle(parent, node) ) {
                        if ( parent.childNodes.length > 1 || parent !== node.parentNode) {
                            node.style.cssText = parent.style.cssText + ";" + node.style.cssText;
                            parent = parent.parentNode;
                            continue;
                        } else {
                           
                            parent.style.cssText += ";" + node.style.cssText;

                        }
                    }
                    domUtils.remove( node, true );

                }
                parent = parent.parentNode;
            }

        },
        /**
         * 合并左右兄弟节点
         * @example &lt;b&gt;xxxx&lt;/b&gt;&lt;b&gt;xxx&lt;/b&gt;&lt;b&gt;xxxx&lt;/b&gt; ==> &lt;b&gt;xxxxxxxxxxx&lt;/b&gt;
         */
        mergSibling : function( node,ingorePre,ingoreNext ) {
            function merg( rtl, start, node ) {
                var next;
                if ( (next = node[rtl]) && !domUtils.isBookmarkNode( next ) && next.nodeType == 1 && domUtils.isSameElement( node, next ) ) {
                    while ( next.firstChild ) {
                        if ( start == 'firstChild' ) {
                            node.insertBefore( next.lastChild, node.firstChild );
                        } else {
                            node.appendChild( next.firstChild )
                        }

                    }
                    domUtils.remove( next );
                }
            }

           !ingorePre &&  merg( 'previousSibling', 'firstChild', node );
           !ingoreNext && merg( 'nextSibling', 'lastChild', node );
        },

        /**
         * 使得元素和他的子节点不可编辑器
         */
        unselectable :
            browser.gecko ?
                function( node ) {
                    node.style.MozUserSelect = 'none';
                }
                : browser.webkit ?
                function( node ) {
                    node.style.KhtmlUserSelect = 'none';
                }
                :
                function( node ) {
                    node.unselectable = 'on';
                    for ( var i = 0,ci; ci = node.all[i++]; ) {
                        switch ( ci.tagName.toLowerCase() ) {
                            case 'iframe' :
                            case 'textarea' :
                            case 'input' :
                            case 'select' :

                                break;
                            default :
                                ci.unselectable = 'on';
                        }
                    }
                },
        //todo yuxiang
        /**
         * 删除元素上的属性，可以删除多个
         * @param {Element} element
         * @param {Array} attrNames
         */
        removeAttributes : function ( element, attrNames ) {
            var k = attrNames.length;
            if ( k ) while ( k -- ) {
                element.removeAttribute( attrNames[k] );
            }
        },
        setAttributes : function( node, attrs ) {
            for ( var name in attrs ) {
                switch ( name ) {
                    case 'class' :
                        node.className = attrs[name];
                        break;
                    case 'style' :
                        node.style.cssText = attrs[name];
                        break;
                    default:
                        node.setAttribute( name, attrs[name] );
                }
            }

            return node;
        },

        /**
         * 获取元素的样式
         * @param {Element} element
         * @param {String} styleName
         */
        getComputedStyle : function () {
            function fixUnit(key, val){
                if (key == 'font-size' && /px$/.test(val)) {
                    val = Math.round(parseFloat(val) * 0.75) + 'pt';
                }
                return val;
            }
            if ( window.getComputedStyle ) {
                return function ( element, styleName ) {
                    return fixUnit(styleName,
                        domUtils.getWindow( element ).getComputedStyle( element, '' ).getPropertyValue( styleName ));
                };
            }

            return function ( element, styleName ) {
                return fixUnit(styleName,
                    ( element.currentStyle || element.style )[utils.cssStyleToDomStyle( styleName )]);
            };
        }(),

        /**
         * 删除cssClass，可以支持删除多个class，需以空格分隔
         * @param {Element} element
         * @param {Array} classNames
         */
        removeClasses : function ( element, classNames ) {
            element.className = element.className.replace(
                new RegExp( '(?:\\s*\\b)(?:' + classNames.join( '|' ) + ')(?:\\b)', 'g' ), '' );
        },

        removeStyle : function( node, name ) {
            node.style[utils.cssStyleToDomStyle( name )] = '';
            if ( node.style.removeAttribute )
                node.style.removeAttribute( utils.cssStyleToDomStyle( name ) );

            if ( !node.style.cssText )
                node.removeAttribute( 'style' );
        },
        /**
         * 判断元素是否包含某cssClass
         * @param {Element} element
         * @param {String} className
         * @returns {Boolean}
         */
        hasClass : function ( element, className ) {
            return ( ' ' + element.className + ' ' ).indexOf( ' ' + className + ' ' ) > -1;
        },

        /**
         * 阻止事件默认行为
         * @param {Event} evt
         */
        preventDefault : function ( evt ){
            if ( evt.preventDefault ) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        },
        
        getStyle : function( element, name ) {
            var value = element.style[ utils.cssStyleToDomStyle( name ) ];
            if ( /color/i.test( name ) && value.indexOf( "rgb(" ) != -1 ) {
                var array = value.split( "," );

                value = "#";
                for ( var i = 0, color; color = array[i]; i++ ) {
                    color = parseInt( color.replace( /[^\d]/gi, '' ), 10 ).toString( 16 );
                    value += color.length == 1 ? "0" + color : color;
                }

                value = value.toUpperCase();
            }
            return  value;
        },
        removeDirtyAttr : function( node ) {
            for ( var i = 0,ci,nodes = node.getElementsByTagName( '*' ); ci = nodes[i++]; ) {
                ci.removeAttribute( '_moz_dirty' )
            }
            node.removeAttribute( '_moz_dirty' )
        },
        getChildCount : function (node,fn){
            var count = 0,first = node.firstChild;
            fn = fn || function(){return 1};
            while(first){
                if(fn(first))
                    count++;
                first = first.nextSibling;
            }
            return count;
        }

    };
})();

/**
 * @description Range类实现
 * @author zhanyi
 */
(function() {
    var editor = baidu.editor,
        browser = editor.browser,
        domUtils = editor.dom.domUtils,
        dtd = editor.dom.dtd,
        utils = editor.utils,
        guid = 0,
        fillChar = domUtils.fillChar;


    //更新collapse
    var updateCollapse = function( range ) {
        range.collapsed =
            range.startContainer && range.endContainer &&
                range.startContainer === range.endContainer &&
                range.startOffset == range.endOffset;
    },
        setEndPoint = function( toStart, node, offset, range ) {
            //如果node是自闭合标签要处理
            if ( node.nodeType == 1 && dtd.$empty[node.tagName.toLowerCase()] ) {
                offset = domUtils.getNodeIndex( node ) + (toStart ? 0 : 1);
                node = node.parentNode;
            }
            if ( toStart ) {
                range.startContainer = node;
                range.startOffset = offset;
                if ( !range.endContainer ) {
                    range.collapse( true );
                }
            } else {
                range.endContainer = node;
                range.endOffset = offset;
                if ( !range.startContainer ) {
                    range.collapse( false );
                }
            }
            updateCollapse( range );
            return range;
        },
        execContentsAction = function( range, action ) {
            //调整边界
            //range.includeBookmark();

            var start = range.startContainer,
                end = range.endContainer,
                startOffset = range.startOffset,
                endOffset = range.endOffset,
                doc = range.document,
                frag = doc.createDocumentFragment(),
                tmpStart,tmpEnd;

            if ( start.nodeType == 1 ) {
                start = start.childNodes[startOffset] || (tmpStart = start.appendChild( doc.createTextNode( '' ) ));
            }
            if ( end.nodeType == 1 ) {
                end = end.childNodes[endOffset] || (tmpEnd = end.appendChild( doc.createTextNode( '' ) ));
            }

            if ( start === end && start.nodeType == 3 ) {

                frag.appendChild( doc.createTextNode( start.substringData( startOffset, endOffset - startOffset ) ) );
                //is not clone
                if ( action ) {
                    start.deleteData( startOffset, endOffset - startOffset );
                    range.collapse( true );
                }

                return frag;
            }


            var current,currentLevel,clone = frag,
                startParents = domUtils.findParents( start, true ),endParents = domUtils.findParents( end, true );
            for ( var i = 0; startParents[i] == endParents[i]; i++ );


            for ( var j = i,si; si = startParents[j]; j++ ) {
                current = si.nextSibling;
                if ( si == start ) {
                    if ( !tmpStart ) {
                        if ( range.startContainer.nodeType == 3 ) {
                            clone.appendChild( doc.createTextNode( start.nodeValue.slice( startOffset ) ) );
                            //is not clone
                            if ( action ) {
                                start.deleteData( startOffset, start.nodeValue.length - startOffset );

                            }
                        } else {
                            clone.appendChild( !action ? start.cloneNode( true ) : start );
                        }
                    }

                } else {
                    currentLevel = si.cloneNode( false );
                    clone.appendChild( currentLevel );
                }


                while ( current ) {
                    if ( current === end || current === endParents[j] )break;
                    si = current.nextSibling;
                    clone.appendChild( !action ? current.cloneNode( true ) : current );


                    current = si;
                }
                clone = currentLevel;

            }


            clone = frag;

            if ( !startParents[i] ) {
                clone.appendChild( startParents[i - 1].cloneNode( false ) );
                clone = clone.firstChild;
            }
            for ( var j = i,ei; ei = endParents[j]; j++ ) {
                current = ei.previousSibling;
                if ( ei == end ) {
                    if ( !tmpEnd && range.endContainer.nodeType == 3 ) {
                        clone.appendChild( doc.createTextNode( end.substringData( 0, endOffset ) ) );
                        //is not clone
                        if ( action ) {
                            end.deleteData( 0, endOffset );

                        }
                    }


                } else {
                    currentLevel = ei.cloneNode( false );
                    clone.appendChild( currentLevel );
                }
                //如果两端同级，右边第一次已经被开始做了
                if ( j != i || !startParents[i] ) {
                    while ( current ) {
                        if ( current === start )break;
                        ei = current.previousSibling;
                        clone.insertBefore( !action ? current.cloneNode( true ) : current, clone.firstChild );


                        current = ei;
                    }

                }
                clone = currentLevel;
            }


            if ( action ) {
                range.setStartBefore( !endParents[i] ? endParents[i - 1] : !startParents[i] ? startParents[i - 1] : endParents[i] ).collapse( true )
            }
            tmpStart && domUtils.remove( tmpStart );
            tmpEnd && domUtils.remove( tmpEnd );
            return frag;
        };


    /**
     * Range类
     * @constructor
     * @namespace range对象
     * @param {} document 编辑器页面document对象
     */
    var Range = baidu.editor.dom.Range = function( document ) {
        var me = this;
        me.startContainer =
            me.startOffset =
                me.endContainer =
                    me.endOffset = null;
        me.document = document;
        me.collapsed = true;
    };

    Range.prototype = {
        /**
         * 克隆选中的内容到一个fragment里
         * @return {}
         */
        cloneContents : function() {

            return this.collapsed ? null : execContentsAction( this, 0 );
        },
        deleteContents : function() {
            if ( !this.collapsed )
                execContentsAction( this, 1 );
            return this;
        },
        extractContents : function() {
            return this.collapsed ? null : execContentsAction( this, 2 );
        },
        setStart : function( node, offset ) {
            return setEndPoint( true, node, offset, this );
        },
        setEnd : function( node, offset ) {
            return setEndPoint( false, node, offset, this );
        },
        setStartAfter : function( node ) {
            return this.setStart( node.parentNode, domUtils.getNodeIndex( node ) + 1 );
        },
        setStartBefore : function( node ) {
            return this.setStart( node.parentNode, domUtils.getNodeIndex( node ) );
        },
        setEndAfter : function( node ) {
            return this.setEnd( node.parentNode, domUtils.getNodeIndex( node ) + 1 );
        },
        setEndBefore : function( node ) {
            return this.setEnd( node.parentNode, domUtils.getNodeIndex( node ) );
        },
        selectNode : function( node ) {
            return this.setStartBefore( node ).setEndAfter( node );
        },
        /**
         * 选中node下的所有节点
         * @param {Element} node 要设置的节点
         */
        selectNodeContents : function( node ) {
            return this.setStart( node, 0 ).setEnd( node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length );
        },

        /**
         * 克隆range
         * @return {Range} 克隆的range对象
         */
        cloneRange : function() {
            var me = this,range = new Range( me.document );
            return range.setStart( me.startContainer, me.startOffset ).setEnd( me.endContainer, me.endOffset );

        },

        /**
         * 让选区闭合
         * @param {Boolean} toStart 是否在选区开始位置闭合选区
         */
        collapse : function( toStart ) {
            var me = this;
            if ( toStart ) {
                me.endContainer = me.startContainer;
                me.endOffset = me.startOffset;
            }
            else {
                me.startContainer = me.endContainer;
                me.startOffset = me.endOffset;
            }

            me.collapsed = true;
            return me;
        },
        /**
         * 调整range的边界，缩进到合适的位置
         */
        shrinkBoundary : function( ignoreEnd ) {
            var me = this,child,
                collapsed = me.collapsed;
            while ( me.startContainer.nodeType == 1 //是element
                && (child = me.startContainer.childNodes[me.startOffset]) //子节点也是element
                && child.nodeType == 1  && !domUtils.isBookmarkNode(child)
                && !dtd.$empty[child.tagName] ) {
                me.setStart( child, 0 );
            }
            if ( collapsed )
                return me.collapse( true );
            if ( !ignoreEnd ) {
                while ( me.endContainer.nodeType == 1//是element
                    && me.endOffset > 0 //如果是空元素就退出 endOffset=0那么endOffst-1为负值，childNodes[endOffset]报错
                    && (child = me.endContainer.childNodes[me.endOffset - 1]) //子节点也是element
                    && child.nodeType == 1 && !domUtils.isBookmarkNode(child)
                    && !dtd.$empty[child.tagName] ) {
                    me.setEnd( child, child.childNodes.length );
                }
            }

            return me;
        },
        /**
         * 找到祖先节点
         * @param includeSelf
         * @param {Boolean} ignoreTextNode 是否忽略文本节点
         */
        getCommonAncestor : function( includeSelf, ignoreTextNode ) {
            var start = this.startContainer,
                end = this.endContainer;
            if ( start === end ) {
                if ( includeSelf && start.nodeType == 1 && this.startOffset == this.endOffset - 1 ) {
                    return start.childNodes[this.startOffset];
                }
                //只有在上来就相等的情况下才会出现是文本的情况
                return ignoreTextNode && start.nodeType == 3 ? start.parentNode : start;
            }
            return domUtils.getCommonAncestor( start, end );

        },
        /**
         * 切割文本节点，将边界扩大到element
         * @param {Boolean}  为真就不处理结束边界
         * @example <b>|xxx</b>
         * startContainer = xxx
         * startOffset = 0
         * 执行后
         * startContainer = <b>
         * startOffset = 0
         * @example <b>xx|x</b>
         * startContainer = xxx
         * startOffset = 2
         * 执行后
         * startContainer = <b>
         * startOffset = 1  因为将xxx切割成2个节点了
         */
        trimBoundary : function( ignoreEnd ) {
            this.txtToElmBoundary();
            var start = this.startContainer,
                offset = this.startOffset,
                collapsed = this.collapsed,
                end = this.endContainer;
            if ( start.nodeType == 3 ) {
                if ( offset == 0 ) {
                    this.setStartBefore( start )
                } else {
                    if ( offset >= start.nodeValue.length ) {
                        this.setStartAfter( start );
                    } else {
                        var textNode = domUtils.split( start, offset );
                        //跟新结束边界
                        if ( start === end )
                            this.setEnd( textNode, this.endOffset - offset );
                        else if ( start.parentNode === end )
                            this.endOffset += 1;
                        this.setStartBefore( textNode );
                    }
                }
                if ( collapsed ) {
                    return this.collapse( true );
                }
            }
            if ( !ignoreEnd ) {
                offset = this.endOffset;
                end = this.endContainer;
                if ( end.nodeType == 3 ) {
                    if ( offset == 0 ) {
                        this.setEndBefore( end );
                    } else {
                        if ( offset >= end.nodeValue.length ) {
                            this.setEndAfter( end );
                        } else {
                            domUtils.split( end, offset );
                            this.setEndAfter( end );
                        }
                    }

                }
            }
            return this;
        },
        /**
         * 如果边界在文本的边上，就提升边界到元素上
         * @example <b> |xxx</b>
         * startContainer = xxx
         * startOffset = 0
         * 执行后
         * startContainer = <b>
         * startOffset = 0
         * @example <b> xxx| </b>
         * startContainer = xxx
         * startOffset = 3
         * 执行后
         * startContainer = <b>
         * startOffset = 1
         */
        txtToElmBoundary : function() {
            function adjust( r, c ) {
                var container = r[c + 'Container'],
                    offset = r[c + 'Offset'];
                if ( container.nodeType == 3 ) {
                    if ( !offset ) {
                        r['set' + c.replace( /(\w)/, function( a ) {
                            return a.toUpperCase()
                        } ) + 'Before']( container )
                    } else if ( offset >= container.nodeValue.length ) {
                        r['set' + c.replace( /(\w)/, function( a ) {
                            return a.toUpperCase()
                        } ) + 'After' ]( container )
                    }
                }
            }

            if ( !this.collapsed ) {
                adjust( this, 'start' );
                adjust( this, 'end' );
            }

            return this;
        },

        /**
         * 在range开始插入一个节点或者一个fragment
         * @param {Node/DocumentFragment}
            */
        insertNode : function( node ) {
            var first = node,length = 1;
            if ( node.nodeType == 11 ) {
                first = node.firstChild;
                length = node.childNodes.length;
            }


            this.trimBoundary( true );

            var start = this.startContainer,
                offset = this.startOffset;

            var nextNode = start.childNodes[ offset ];

            if ( nextNode ) {
                start.insertBefore( node, nextNode );

            }
            else {
                start.appendChild( node );
            }


            if ( first.parentNode === this.endContainer ) {
                this.endOffset = this.endOffset + length;
            }


            return this.setStartBefore( first );
        },

        setCursor : function( toEnd ) {
            return this.collapse( toEnd ? false : true ).select();
        },
        /**
         * 创建标签
         * @params {Boolean}
         * @returns {Object} bookmark对象
         */
        createBookmark : function( serialize, same ) {
            var endNode,
                startNode = this.document.createElement( 'span' );
            startNode.style.cssText = 'display:none;line-height:0px;';
            startNode.appendChild( this.document.createTextNode( '\uFEFF' ) );
            startNode.id = '_baidu_bookmark_start_' + (same ? '' : guid++);

            if ( !this.collapsed ) {
                endNode = startNode.cloneNode( true );
                endNode.id = '_baidu_bookmark_end_' + (same ? '' : guid++);
            }
            this.insertNode( startNode );

            if ( endNode ) {
                this.collapse( false ).insertNode( endNode );
                this.setEndBefore( endNode )
            }
            this.setStartAfter( startNode );

            return {
                start : serialize ? startNode.id : startNode,
                end : endNode ? serialize ? endNode.id : endNode : null,
                id : serialize
            }
        },
        /**
         *  移动边界到bookmark
         *  @params {Object} bookmark对象
         *  @returns {Range}
         */
        moveToBookmark : function( bookmark ) {
            var start = bookmark.id ? this.document.getElementById( bookmark.start ) : bookmark.start,
                end = bookmark.end && bookmark.id ? this.document.getElementById( bookmark.end ) : bookmark.end;
            this.setStartBefore( start );
            domUtils.remove( start );
            if ( end ) {
                this.setEndBefore( end );
                domUtils.remove( end )
            } else {
                this.collapse( true );
            }

            return this;
        },
        /**
         * 调整边界到一个block元素上，或者移动到最大的位置
         * @params {Boolean} 扩展到block元素
         * @params {Function} 停止函数
         */
        enlarge : function( toBlock, stopFn ) {
            var isBody = domUtils.isBody,
                pre,node,tmp = this.document.createTextNode( '' );
            if ( toBlock ) {
                node = this.startContainer;
                if ( node.nodeType == 1 ) {
                    if ( node.childNodes[this.startOffset] ) {
                        pre = node = node.childNodes[this.startOffset]
                    } else {
                        node.appendChild( tmp );
                        pre = node = tmp;
                    }
                } else {
                    pre = node;
                }

                while ( 1 ) {
                    if ( domUtils.isBlockElm( node ) ) {
                        node = pre;
                        while ( (pre = node.previousSibling) && !domUtils.isBlockElm( pre ) ) {
                            node = pre;
                        }
                        this.setStartBefore( node );

                        break;
                    }
                    pre = node;
                    node = node.parentNode;
                }
                node = this.endContainer;
                if ( node.nodeType == 1 ) {
                    if(pre = node.childNodes[this.endOffset]) {
                        node.insertBefore( tmp, pre );
                    }else{
                        node.appendChild(tmp)
                    }

                    pre = node = tmp;
                } else {
                    pre = node;
                }

                while ( 1 ) {
                    if ( domUtils.isBlockElm( node ) ) {
                        node = pre;
                        while ( (pre = node.nextSibling) && !domUtils.isBlockElm( pre ) ) {
                            node = pre;
                        }
                        this.setEndAfter( node );

                        break;
                    }
                    pre = node;
                    node = node.parentNode;
                }
                if ( tmp.parentNode === this.endContainer ) {
                    this.endOffset--;
                }
                domUtils.remove( tmp )
            }

            // 扩展边界到最大
            if ( !this.collapsed ) {
                while ( this.startOffset == 0 ) {
                    if ( stopFn && stopFn( this.startContainer ) )
                        break;
                    if ( isBody( this.startContainer ) )break;
                    this.setStartBefore( this.startContainer );
                }
                while ( this.endOffset == (this.endContainer.nodeType == 1 ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) ) {
                    if ( stopFn && stopFn( this.endContainer ) )
                        break;
                    if ( isBody( this.endContainer ) )break;

                    this.setEndAfter( this.endContainer )
                }
            }

            return this;
        },
        /**
         * 调整边界
         * @example
         * <b>xx[</b>xxxxx] ==> <b>xx</b>[xxxxx]
         * <b>[xx</b><i>]xxx</i> ==> <b>[xx</b>]<i>xxx</i>
         *
         */
        adjustmentBoundary : function() {
            if(!this.collapsed){
                while ( !domUtils.isBody( this.startContainer ) &&
                    this.startOffset == this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                ) {
                    this.setStartAfter( this.startContainer );
                }
                while ( !domUtils.isBody( this.endContainer ) && !this.endOffset ) {
                    this.setEndBefore( this.endContainer );
                }
            }
            return this;
        },
        /**
         * 给选区中的内容加上inline样式
         * @param {String} tagName 标签名称
         * @param {Object} attrObj 属性

         */
        applyInlineStyle : function( tagName, attrs ) {
            if(this.collapsed)return;
            this.trimBoundary().enlarge( false,
                function( node ) {
                    return node.nodeType == 1 && domUtils.isBlockElm( node )
                } ).adjustmentBoundary();


            var bookmark = this.createBookmark(),
                end = bookmark.end,
                filterFn = function( node ) {
                    return node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' : !domUtils.isWhitespace( node )
                },
                current = domUtils.getNextDomNode( bookmark.start, false, filterFn ),
                node,
                pre,
                range = this.cloneRange();

            while ( current && (domUtils.getPosition( current, end ) & domUtils.POSITION_PRECEDING) ) {


                if ( current.nodeType == 3 || dtd[tagName][current.tagName] ) {
                    range.setStartBefore( current );
                    node = current;
                    while ( node && (node.nodeType == 3 || dtd[tagName][node.tagName]) && node !== end ) {

                        pre = node;
                        node = domUtils.getNextDomNode( node, node.nodeType == 1, null, function( parent ) {
                            return dtd[tagName][parent.tagName]
                        } )
                    }

                    var frag = range.setEndAfter( pre ).extractContents(),
                        elm = range.document.createElement( tagName );
                    if ( attrs ) {
                        domUtils.setAttributes( elm, attrs )
                    }
                    elm.appendChild( frag );
                    //去除子节点相同的
                    domUtils.mergChild( elm, tagName );
                    range.insertNode( elm );
                    domUtils.mergSibling( elm );
                    domUtils.clearEmptySibling( elm );
                    current = domUtils.getNextDomNode( elm, false, filterFn );
                    domUtils.mergToParent( elm );
                    if ( node === end )break;
                } else {
                    current = domUtils.getNextDomNode( current, true, filterFn )
                }
            }

            return this.moveToBookmark( bookmark );
        },
        /**
         * 去掉inline样式
         * @params {String/Array} 要去掉的标签名
         */
        removeInlineStyle : function( tagName ) {
            if(this.collapsed)return;
            tagName = utils.isArray( tagName ) ? tagName : [tagName];

            this.shrinkBoundary().adjustmentBoundary();

            var start = this.startContainer,end = this.endContainer;

            while ( 1 ) {

                if ( start.nodeType == 1 ) {
                    if ( utils.indexOf( tagName, start.tagName.toLowerCase() ) > -1 ) {
                        break;
                    }
                    if ( start.tagName.toLowerCase() == 'body' ) {
                        start = null;
                        break;
                    }


                }
                start = start.parentNode;

            }

            while ( 1 ) {
                if ( end.nodeType == 1 ) {
                    if ( utils.indexOf( tagName, end.tagName.toLowerCase() ) > -1 ) {
                        break;
                    }
                    if ( end.tagName.toLowerCase() == 'body' ) {
                        end = null;
                        break;
                    }

                }
                end = end.parentNode;
            }


            var bookmark = this.createBookmark(),
                frag,
                tmpRange;
            if ( start ) {
                tmpRange = this.cloneRange().setEndBefore( bookmark.start ).setStartBefore( start );
                frag = tmpRange.extractContents();
                tmpRange.insertNode( frag );
                domUtils.clearEmptySibling( start, true );
                start.parentNode.insertBefore( bookmark.start, start );

            }

            if ( end ) {
                tmpRange = this.cloneRange().setStartAfter( bookmark.end ).setEndAfter( end );
                frag = tmpRange.extractContents();
                tmpRange.insertNode( frag );
                domUtils.clearEmptySibling( end, false, true );
                end.parentNode.insertBefore( bookmark.end, end.nextSibling );


            }

            var current = domUtils.getNextDomNode( bookmark.start, false, function( node ) {
                return node.nodeType == 1
            } ),next;

            while ( current && current !== bookmark.end ) {

                next = domUtils.getNextDomNode( current, true, function( node ) {
                    return node.nodeType == 1
                } );
                if ( utils.indexOf( tagName, current.tagName.toLowerCase() ) > -1 ) {

                    domUtils.remove( current, true );


                }
                current = next;
            }



            return this.moveToBookmark( bookmark );
        },
        /**
         * 得到一个字闭合的节点
         */
        getClosedNode : function() {
            var node;
            if ( !this.collapsed ) {
                var range = this.cloneRange().shrinkBoundary();
                if ( range.startContainer.nodeType == 1 && range.startContainer === range.endContainer && range.endOffset - range.startOffset == 1 ) {
                    var child = range.startContainer.childNodes[range.startOffset];
                    if ( child && child.nodeType == 1 && dtd.$empty[child.tagName] ) {
                        node = child;
                    }
                }
            }
            return node;
        },
        /**
         * 根据range选中元素
         */
        select : browser.ie ? function( notInsertFillData ) {

            var collapsed = this.collapsed,
                nativeRange;

            if ( !collapsed )
                this.shrinkBoundary();
            var node = this.getClosedNode();
            if ( node ) {
                try {
                    nativeRange = this.document.body.createControlRange();
                    nativeRange.addElement( node );
                    nativeRange.select();
                } catch( e ) {
                }
                return this;
            }

            var bookmark = this.createBookmark(),
                start = bookmark.start,
                end;

            nativeRange = this.document.body.createTextRange();
            nativeRange.moveToElementText( start );
            nativeRange.moveStart( 'character', 1 );
            if ( !collapsed ) {
                var nativeRangeEnd = this.document.body.createTextRange();
                end = bookmark.end;
                nativeRangeEnd.moveToElementText( end );
                nativeRange.setEndPoint( 'EndToEnd', nativeRangeEnd );

            } else {
                if ( !notInsertFillData && this.startContainer.nodeType != 3 ) {

                    //使用<span>|x<span>固定住光标
                    var fillData = editor.fillData,
                        tmpText,
                        tmp = this.document.createElement( 'span' );

                    try {
                        if ( fillData && fillData.parentNode ) {

                            domUtils.remove( fillData );

                        }

                    } catch( e ) {
                    }

                    tmpText = editor.fillData = this.document.createTextNode( fillChar );
                    tmp.appendChild( this.document.createTextNode( domUtils.fillChar ) );
                    start.parentNode.insertBefore( tmp, start );
                    start.parentNode.insertBefore( tmpText, start );
                    nativeRange.moveStart( 'character', -1 );
                    nativeRange.collapse( true );

                }
            }

            this.moveToBookmark( bookmark );

            nativeRange.select();
            tmp && domUtils.remove( tmp );

            return this;

        } : function( notInsertFillData ) {

            var win = domUtils.getWindow( this.document ),
                sel = win.getSelection(),
                txtNode,child;

            win.focus();

            if ( sel ) {
                sel.removeAllRanges();

                if ( this.collapsed && !notInsertFillData && this.startContainer.nodeType != 3 &&
                   ! ((child = this.startContainer.childNodes[this.startOffset]) && child.nodeType == 1 && child.tagName == 'BR')             
                ) {

                    var fillData = editor.fillData;

                    txtNode = editor.fillData = this.document.createTextNode( fillChar );
                    //跟着前边走
                    this.insertNode( txtNode );
                    if ( fillData &&  fillData.parentNode ) {

                       domUtils.remove( fillData )

                    }
                    this.setStart( txtNode, browser.webkit ? 1 : 0 ).collapse( true );

                }
                var nativeRange = this.document.createRange();
                nativeRange.setStart( this.startContainer, this.startOffset );
                nativeRange.setEnd( this.endContainer, this.endOffset );

                sel.addRange( nativeRange );

            }
            return this;
        }

    };
})();
(function () {
    baidu.editor.dom.Selection = Selection;

    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd,
        ie = baidu.editor.browser.ie;

    function getBoundaryInformation( range, start ) {

        var getIndex = domUtils.getNodeIndex;

        range = range.duplicate();
        range.collapse( start );


        var parent = range.parentElement();

        //如果节点里没有子节点，直接退出
        if ( !parent.hasChildNodes() ) {
            return  {container:parent,offset:0};
        }

        var siblings = parent.children,
            child,
            testRange = range.duplicate(),
            startIndex = 0,endIndex = siblings.length - 1,index = -1,
            distance;

        while ( startIndex <= endIndex ) {
            index = Math.floor( (startIndex + endIndex) / 2 );
            child = siblings[index];
            testRange.moveToElementText( child );
            var position = testRange.compareEndPoints( 'StartToStart', range );


            if ( position > 0 ) {

                endIndex = index - 1;
            } else if ( position < 0 ) {

                startIndex = index + 1;
            } else {

                return  dtd.$empty[child.tagName.toLowerCase()] ?
                {container:parent,offset:getIndex( child )} :
                {container:child,offset:0}

            }
        }

        if ( index == -1 ) {
            testRange.moveToElementText( parent );
            testRange.setEndPoint( 'StartToStart', range );
            distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
            siblings = parent.childNodes;
            if ( !distance ) {
                child = siblings[siblings.length - 1];
                return  {container:child,offset:child.nodeValue.length};
            }

            var i = siblings.length;
            while ( distance > 0 )
                distance -= siblings[ --i ].nodeValue.length;

            return {container:siblings[i],offset:-distance}
        }

        testRange.collapse( position > 0 );
        testRange.setEndPoint( position > 0 ? 'StartToStart' : 'EndToStart', range );
        distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
        if ( !distance ) {
            return  dtd.$empty[child.tagName] ?

            {container : parent,offset:getIndex( child ) + (position > 0 ? 0 : 1)} :
            {container : child,offset: position > 0 ? 0 : child.childNodes.length}
        }

        while ( distance > 0 ) {
            try{
                var pre = child;
                child = child[position > 0 ? 'previousSibling' : 'nextSibling'];
                distance -= child.nodeValue.length;
            }catch(e){
                return {container:parent,offset:getIndex(pre)};
            }

        }
        return  {container:child,offset:position > 0 ? -distance : child.nodeValue.length + distance}
    }

    function transformIERangeToRange( ieRange, range ) {
        if ( ieRange.item ) {
            range.selectNode( ieRange.item( 0 ) );
        } else {
            var bi = getBoundaryInformation( ieRange, true );
            range.setStart( bi.container, bi.offset );
            if ( ieRange.compareEndPoints( 'StartToEnd',ieRange ) != 0 ) {
                bi = getBoundaryInformation( ieRange, false );
                range.setEnd( bi.container, bi.offset );
            }
        }
        return range;
    }

    function _getIERange(sel){
        var ieRange = sel.getNative().createRange();
        var el = ieRange.item ? ieRange.item( 0 ) : ieRange.parentElement();
        if ( ( el.ownerDocument || el ) === sel.document ) {
            return ieRange;
        }
    }
    function Selection( doc ) {
        var me = this, iframe;
        me.document = doc;

        if ( ie ) {
            iframe = domUtils.getWindow(doc).frameElement;
            domUtils.on( iframe, 'beforedeactivate', function () {

                me._bakIERange = me.getIERange();
            } );
            domUtils.on( iframe, 'activate', function () {
                try {
                    if ( !_getIERange(me) && me._bakIERange ) {
                        me._bakIERange.select();
                    }
                } catch ( ex ) {
                }
                me._bakIERange = null;
            } );
        }
        win = doc = null;
    }

    Selection.prototype = {
        /**
         * 获取原生seleciton对象
         * @returns {Selection}
         */
        getNative : function () {
            if ( ie ) {
                return this.document.selection;
            } else {
                return domUtils.getWindow( this.document ).getSelection();
            }
        },



        getIERange : function () {

            var ieRange = _getIERange(this);
            if ( !ieRange ) {
                if ( this._bakIERange ) {
                    return this._bakIERange;
                }
                domUtils.getWindow( this.document ).focus();
                return this.getNative().createRange();
            }
            return ieRange;
        },

        /**
         * 缓存当前选区的range和startElement
         */
        cache : function () {
            this.clear();
            this._cachedRange = this.getRange();
            this._cachedStartElement = this.getStart();
        },

        /**
         * 清空缓存
         */
        clear : function () {
            this._cachedRange = this._cachedStartElement = null;
        },

        /**
         * 获取选区对应的Range
         * @returns {baidu.editor.dom.Range}
         */
        getRange : function () {
            if ( this._cachedRange != null ) {
                return this._cachedRange;
            }
            var range = new baidu.editor.dom.Range( this.document );

            if ( ie ) {
                transformIERangeToRange( this.getIERange(), range );
            } else {
                var sel = this.getNative();
                if ( sel && sel.rangeCount ) {
                    var firstRange = sel.getRangeAt( 0 );
                    var lastRange = sel.getRangeAt( sel.rangeCount - 1 );
                    range.setStart( firstRange.startContainer, firstRange.startOffset ).setEnd( lastRange.endContainer, lastRange.endOffset );
                } else {
                    range.setStart( this.document.body, 0 );

                }
            }

            return range;
        },

        /**
         * 获取开始元素，用于状态反射
         * @returns {Element}
         */
        getStart : function () {
            if ( this._cachedStartElement ) {
                return this._cachedStartElement;
            }
            var range = ie ? this.getIERange() : this.getRange(),
                tmpRange,
                start,tmp,parent;

            if (ie) {
                //control元素
                if (range.item)
                    return range.item(0);

                tmpRange = range.duplicate();
                //修正ie下<b>x</b>[xx] 闭合后 <b>x|</b>xx
                tmpRange.text.length > 0 && tmpRange.moveStart('character',1);
                tmpRange.collapse(1);
                start = tmpRange.parentElement();


                parent = tmp = range.parentElement();
                while (tmp = tmp.parentNode) {
                    if (tmp == start) {
                        start = parent;
                        break;
                    }
                }

            } else {
                range.shrinkBoundary();
                start = range.startContainer;

                if (start.nodeType == 1 && start.hasChildNodes())
                    start = start.childNodes[Math.min(start.childNodes.length - 1, range.startOffset)];

                if (start.nodeType == 3)
                    return start.parentNode;


            }
            return start;

        },
         //得到选区的文本
        getText : function(){
            var nativeSel = this.getNative(),
                nativeRange = baidu.editor.browser.ie ? nativeSel.createRange() : nativeSel.getRangeAt(0);

            return nativeRange.text || nativeRange.toString();
        }
    };


})();
(function () {
    baidu.editor.Editor = Editor;

    var editor = baidu.editor,
        utils = editor.utils,
        EventBase = editor.EventBase,
        domUtils = editor.dom.domUtils,
        Selection = editor.dom.Selection,
        ie = editor.browser.ie,
        uid = 0,
        browser = editor.browser,
        dtd = editor.dom.dtd;

    /**
     * 编辑器类
     * @public
     * @class
     * @extends baidu.editor.EventBase
     * @name baidu.editor.Editor
     * @param {Object} options
     */
    function Editor( options ) {
        var me = this;
        me.uid = uid ++;
        EventBase.call( me );
        me.commands = {};
        me.options = utils.extend( options || {}, Editor.DEFAULT_OPTIONS, true );
        me.initPlugins();
    }

    /**
     * @event
     * @name baidu.editor.Editor#ready
     */
    /**
     * @event
     * @name baidu.editor.Editor#beforeSelectionChange
     */
    /**
     * @event
     * @name baidu.editor.Editor#selectionChange
     */

    Editor.DEFAULT_OPTIONS = {
        initialStyle: '',
        initialContent: '',
        iframeCssUrl: '',
        removeFormatTags : 'a,b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var',
        removeFormatAttributes : 'class,style,lang,width,height,align,hspace,valign',
        enterTag : 'p',
        maxUndoCount : 20,
        maxInputCount : 20,
        minFrameHeight : 400,
        selectedTdClass : 'selectTdClass',
        pasteplain : 0

    };

    Editor.prototype = /**@lends baidu.editor.Editor.prototype*/{

        /**
         * 渲染编辑器的DOM到指定容器，必须且只能调用一次
         * @public
         * @function
         * @param {Element|String} container
         */
        render : function ( container ) {
            if (container.constructor === String) {
                container = document.getElementById(container);
            }
            var iframeId = 'baidu_editor_' + this.uid;
            container.innerHTML = '<iframe id="' + iframeId + '"' +
                'width="100%" height="100%" scroll="no" frameborder="0"></iframe>';
            if (container.style.position != 'absolute') {
                container.style.position = 'relative';
            }
            var iframe = document.getElementById( iframeId ),
                doc = iframe.contentWindow.document;
            this.setup( doc );
        },

        setup: function ( doc ) {
            var options = this.options;
            doc.open();
            var html = ( ie ? '' : '<!DOCTYPE html>' ) +
                '<html xmlns="http://www.w3.org/1999/xhtml"><head><title></title><style type="text/css">' +
                ( ie ? 'body' : 'html' ) + '{ cursor: text; height: 100%; }' + ( options.initialStyle ) + '</style>' +
                ( options.iframeCssUrl ? '<link rel="stylesheet" type="text/css" href="' + utils.unhtml( options.iframeCssUrl ) + '"/>' : '' ) + '</head><body>' +
                '</body></html>';
            doc.write( html );
            doc.close();
            if ( ie ) {
                doc.body.disabled = true;
                doc.body.contentEditable = true;
                doc.body.removeAttribute( 'disabled' );
            } else {
                doc.designMode = 'on';
                doc.body.spellcheck = false;
            }
            this.document = doc;
            this.window = doc.defaultView || doc.parentWindow;

            this.iframe = this.window.frameElement;
            if (this.options.minFrameHeight) {
                this.iframe.style.height = this.options.minFrameHeight + 'px';
            }
            this.body = doc.body;
            this.selection = new Selection( doc );
            this._initEvents();
            this.options.initialContent && this.setContent(this.options.initialContent);
            this.fireEvent( 'ready' );
        },


        /**
         * 获取编辑内容
         * @public
         * @function
         * @returns {String}
         */
        getContent : function () {
            this.fireEvent( 'beforegetcontent' );
            var reg = new RegExp( domUtils.fillChar, 'g' ),
                html = this.document.body.innerHTML.replace(reg,'');
            this.fireEvent( 'aftergetcontent' );
            return html;
        },
        getContentTxt : function(){
            var reg = new RegExp( domUtils.fillChar, 'g' );
            return this.document.body[browser.ie ? 'innerText':'textContent'].replace(reg,'')
        },
        /**
         * 设置编辑内容
         * @public
         * @function
         * @param {String} html
         */
        setContent : function ( html ) {
            var me = this;
            me.fireEvent( 'beforesetcontent' );
            this.document.body.innerHTML = html;
            //给文本节点套p
            var child = this.body.firstChild;
            while(child){
                if(child.nodeType ==3 && !domUtils.isWhitespace(child)){
                    var p = this.document.createElement('p');
                    this.body.insertBefore(p,child);
                    p.appendChild(child);
                    child = p;
                }
                child = child.nextSibling;
            }
            me.fireEvent( 'aftersetcontent' );
        },

        /**
         * 让编辑器获得焦点
         * @public
         * @function
         */
        focus : function () {
            domUtils.getWindow( this.document ).focus();
        },

        /**
         * 加载插件
         * @public
         * @function
         * @param {Array} plugins
         */
        initPlugins : function ( plugins ) {
            var fn,originals = baidu.editor.plugins;
            if ( plugins ) {
                for ( var i = 0,pi; pi = plugins[i++]; ) {
                    if ( utils.indexOf( this.options.plugins, pi ) == -1 && (fn = baidu.editor.plugins[pi]) ) {
                        this.options.plugins.push( pi );
                        fn.call( this )
                    }
                }
            } else {

                plugins = this.options.plugins;

                if ( plugins ) {
                    for ( i = 0; pi = originals[plugins[i++]]; ) {
                        pi.call( this )
                    }
                } else {
                    this.options.plugins = [];
                    for ( pi in originals ) {
                        this.options.plugins.push( pi );
                        originals[pi].call( this )
                    }
                }
            }


        },

        _initEvents : function () {
            var me = this,
                doc = this.document,
                win = domUtils.getWindow( doc );

            var _selectionChange = utils.defer( utils.bind( me._selectionChange, me ), 100, true );
            me._proxyDomEvent = utils.bind( me._proxyDomEvent, me );
            domUtils.on( doc, ['click', 'contextmenu', 'mousedown', 'mouseup', 'keydown', 'keyup','keypress','mouseover','mouseout','selectstart'], me._proxyDomEvent );
            domUtils.on( win, ['focus', 'blur'], me._proxyDomEvent );
            domUtils.on( doc, ['mouseup','keyup'], _selectionChange );

             //处理拖拽
            //ie ff不能从外边拖入
            //chrome只针对从外边拖入的内容过滤
            var innerDrag = 0,source = browser.ie ? me.body : me.document,dragoverHandler;

            domUtils.on(source,'dragstart',function(){
                innerDrag = 1;
            });

            domUtils.on(source,browser.webkit ? 'dragover' : 'drop',function(){
                return browser.webkit ?
                    function(){
                        clearTimeout( dragoverHandler );
                        dragoverHandler = setTimeout( function(){
                            if(!innerDrag){
                                var sel = me.selection,
                                    range = sel.getRange();
                                if(range){
                                    var common = range.getCommonAncestor();
                                    common && me.filter && me.filter.doFilter( common )
                                }
                            }
                            innerDrag = 0;
                        }, 200 );
                    } :
                    function(e){

                        if(!innerDrag){
                            e.preventDefault ? e.preventDefault() :(e.returnValue = false) ;

                        }
                        innerDrag = 0;
                    }

            }());

        },
        _proxyDomEvent: function ( evt ) {
            return this.fireEvent( evt.type.replace( /^on/, '' ), evt );
        },

        _selectionChange : function () {
            var me = this;
            //需要捕获ie回报错误
            try {
                var fillData = editor.fillData,
                    reg = new RegExp( domUtils.fillChar, 'g' ),
                    parent = fillData.parentNode;

                if ( fillData && parent ) {

                    if ( fillData.nodeValue.replace( reg, '' ).length ) {
                        fillData.nodeValue = fillData.nodeValue.replace( reg, '' );
                        editor.fillData = null;
                    }else{
                        var range = this.selection.getRange(),
                            tmp,
                            bookmark;

                        tmp = range.startContainer.nodeType == 3 ? range.startContainer : range.startContainer.childNodes[range.startOffset];
                        if(!(tmp && tmp.nodeType == 3 && tmp.nodeValue.replace(reg,'').length == 0)){
                            // webkit下如果改变节点，选区丢失
                            if(browser.webkit){
                                bookmark = range.createBookmark();
                            }
                            domUtils.remove(fillData);

                            editor.fillData = null;
                            bookmark && range.moveToBookmark(bookmark).select()
                            while(dtd.$removeEmpty[parent.tagName] && parent.childNodes.length == 0){
                                tmp = parent;
                                domUtils.remove(parent);
                                parent = tmp.parentNode;
                            }
                        }
                    }


                }
            } catch( e ) {
            }

           
            me.selection.cache();
            if ( me.selection._cachedRange && me.selection._cachedStartElement ) {
                me.fireEvent( 'beforeselectionchange' );
                me.fireEvent( 'selectionchange' );
                me.selection.clear();
            }

        },

        _callCmdFn: function ( fnName, args ) {
            var cmdName = args[0].toLowerCase(),
                cmd, cmdFn;
            cmdFn = ( cmd = this.commands[cmdName] ) && cmd[fnName] ||
                ( cmd = baidu.editor.commands[cmdName]) && cmd[fnName];
            if ( cmd && !cmdFn && fnName == 'queryCommandState' ) {
                return false;
            } else if ( cmdFn ) {
                return cmdFn.apply( this, args );
            }
        },

        /**
         * 执行编辑命令
         * @public
         * @function
         * @param {String} cmdName
         * @see docs/Commands.html
         */
        execCommand : function ( cmdName ) {

            cmdName = cmdName.toLowerCase();
            var me = this,
                result,
                cmd = me.commands[cmdName] || baidu.editor.commands[cmdName];
            if ( !cmd || !cmd.execCommand ) {
                return;
            }

            if ( !cmd.notNeedUndo && !me.__hasEnterExecCommand ) {
                me.__hasEnterExecCommand = true;
                me.fireEvent( 'beforeexeccommand', cmdName );
                result = this._callCmdFn( 'execCommand', arguments );
                me.fireEvent( 'afterexeccommand', cmdName );
                me.__hasEnterExecCommand = false;
            } else {
                result = this._callCmdFn( 'execCommand', arguments );
            }
            me._selectionChange();
            return result;
        },

        /**
         * 查询命令的状态
         * @public
         * @function
         * @param {String} cmdName
         * @returns {Number|*} -1 : disabled, false : normal, true : enabled.
         * @see docs/Commands.html
         */
        queryCommandState : function ( cmdName ) {
            return this._callCmdFn( 'queryCommandState', arguments );
        },

        /**
         * 查询命令的值
         * @public
         * @function
         * @param {String} cmdName
         * @returns {*}
         * @see docs/Commands.html
         */
        queryCommandValue : function ( cmdName ) {
            return this._callCmdFn( 'queryCommandValue', arguments );
        },
        hasContents : function(){
            var cont = this.body[browser.ie ? 'innerText' : 'textContent'],
                reg = new RegExp('[ \t\n\r'+domUtils.fillChar+']','g');

            return !!cont.replace(reg,'').length
        }

    };
    utils.inherits( Editor, EventBase );
})();

/**
 * b u i等基础功能实现
 * @function
 * @name baidu.editor.commands.basestyle
 * @example sdfsdfdafsdf
 *         123asdfasdfasdf
 * @author zhanyi
*/
(function() {
    var basestyles = {
            'bold':['strong','b'],
            'italic':['em','i'],
            'underline':['u'],
            'strikethrough':['strike'],
            'subscript':['sub'],
            'superscript':['sup']
        },
        domUtils = baidu.editor.dom.domUtils,
        getObj = function(editor,tagNames){
            var start = editor.selection.getStart();
            return  domUtils.findParentByTagName( start, tagNames, true )
        },
        clearclearReduent = function(){

            var tags = ['strong','em','span','u'],
                nodes,
                reg = new RegExp( domUtils.fillChar, 'g' ),
                d = this.document,
                _parent;
                for(var t=0,ti;ti=tags[t++];){
                   nodes = d.getElementsByTagName(ti);
                   for(var i=0,ci;ci=nodes[i++];){
                      if( ci.parentNode && ci[baidu.editor.browser.ie?'innerText':'textContent'].replace(reg,'').length == 0 && ci.children.length == 0 ){
                       _parent = ci.parentNode;

                       domUtils.remove(ci);
                       while(_parent.childNodes.length == 0 && new RegExp(tags.join('|'),'i').test(_parent.tagName)){
                           ci = _parent;
                           _parent = _parent.parentNode;
                             domUtils.remove(ci)

                       }

                      }
                   }
                }

        },
        flag = 0;
    for ( var style in basestyles ) {
        (function( cmd, tagNames ) {
            baidu.editor.commands[cmd] = {
                execCommand : function( cmdName ) {
                    var range = new baidu.editor.dom.Range(this.document),obj = '';
                    //table的处理
                    if(this.currentSelectedArr && this.currentSelectedArr.length > 0){
                        for(var i=0,ci;ci=this.currentSelectedArr[i++];){
                            if(ci.style.display != 'none'){
                                range.selectNodeContents(ci).select();
                                obj === ''  && (obj = getObj(this,tagNames) ? 1 : 0);
                                obj ? range.removeInlineStyle( tagNames ) : range.applyInlineStyle( tagNames[0] )
                            }

                        }
                        range.selectNodeContents(this.currentSelectedArr[0]).select();
                    }else{
                        range = this.selection.getRange();
                        obj = getObj(this,tagNames);

                        if ( range.collapsed ) {
                            if ( obj ) {
                                var tmpText =  this.document.createTextNode('');
                                range.insertNode( tmpText ).removeInlineStyle( tagNames );

                                range.setStartBefore(tmpText);
                                domUtils.remove(tmpText);
                            } else {
                                var tmpNode = range.document.createElement( tagNames[0] );
                                range.insertNode( tmpNode ).setStart( tmpNode, 0 );
                                //执行了上述代码可能产生冗余的html代码，所以要注册 beforecontent去掉这些冗余的代码
                                if(!flag){
                                    this.addListener('beforegetcontent',clearclearReduent);
                                    flag = 1;
                                }
                            }
                            range.collapse( true )

                        } else {
                            obj ? range.removeInlineStyle( tagNames ) : range.applyInlineStyle( tagNames[0] )
                        }

                        range.select();
                    }

                    return true;
                },
                queryCommandState : function() {
                   return getObj(this,tagNames) ? 1 : 0;
                }
            }
        })( style, basestyles[style] );

    }
})();


/**
 * @description 列表
 * @author zhanyi
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
        browser = baidu.editor.browser,
        webkit = browser.webkit,
        gecko = browser.gecko;
    baidu.editor.commands['insertorderedlist'] = baidu.editor.commands['insertunorderedlist'] = {
        execCommand : function( command, style ) {

            var me = this,
                parent = me.queryCommandState( command ),
                doc = this.document,
                range;
            if(browser.ie){
                var start = me.selection.getStart(),
                    blockquote = domUtils.findParent(start,function(node){return node.tagName == 'BLOCKQUOTE'}),
                    hasBlockquote = 0;
                if(blockquote)
                    hasBlockquote = 1;
            }

            style = style && style.toLowerCase() || (command == 'insertorderedlist' ? 'decimal' : 'disc');
            if ( parent && domUtils.getStyle( parent, 'list-style-type' ) == style ) {
                range = me.selection.getRange();
                //整个删除
                if ( !range.collapsed ) {
                    range.shrinkBoundary();
                    var start = range.startContainer,
                        end = range.endContainer,
                        startLi = domUtils.findParentByTagName( start, 'li', true ),
                        endLi = domUtils.findParentByTagName( end, 'li', true );
                    if ( startLi && endLi && !startLi.previousSibling && !endLi.nextSibling ) {
                        var bookmark = range.createBookmark(),
                            pN = startLi.parentNode,
                            frag = doc.createDocumentFragment(),
                            lis = pN.getElementsByTagName( 'li' );
                        for ( var i = 0,ci; ci = lis[i++]; ) {
                            var pNode = doc.createElement( 'p' );
                            while ( ci.firstChild ) {
                                pNode.appendChild( ci.firstChild );
                            }
                            frag.appendChild( pNode );
                        }
                        pN.parentNode.insertBefore( frag, pN );

                        domUtils.remove( pN );
                        range.moveToBookmark( bookmark );
                        return true;
                    }

                }
            }

            
            if ( !parent || domUtils.getStyle( parent, 'list-style-type' ) == style ) {
                doc.execCommand( command, false, null );
            }

            parent = me.queryCommandState( command );
            if ( parent ) {
                if ( gecko ) {
                    parent.removeAttribute( '_moz_dirty' );
                    var nodes = parent.getElementsByTagName( '*' );
                    for ( var i = 0,ci; ci = nodes[i++]; ) {
                        ci.removeAttribute( '_moz_dirty' );
                    }
                }
               
                if ( webkit ) {
                    var lis = parent.getElementsByTagName( 'li' );
//                    for ( var i = 0,ci; ci = lis[i++]; ) {
//                        ci = ci.lastChild;
//                        if ( ci.nodeType == 1 && ci.tagName.toLowerCase() == 'br' )
//                            domUtils.remove( ci );
//                    }

                    if ( parent.parentNode.tagName.toLowerCase() == 'p' ) {
                        range = this.selection.getRange();
                        var bookmark = range.createBookmark();
                        domUtils.remove( parent.parentNode, true );
                        range.moveToBookmark(bookmark).select()

                    }
                }
                parent.style.listStyleType = style;
                if(browser.ie && hasBlockquote && !domUtils.findParent(parent,function(node){return node.tagName == 'BLOCKQUOTE'})){
                    var pp = domUtils.findParent(parent,function(node){return node.tagName == command.toLowerCase() == 'insertorderedlist' ? 'OL' : 'UL'});
                    if(pp){
                        blockquote.innerHTML = '';
                        while(pp.firstChild){
                            blockquote.appendChild(pp.firstChild)
                        }
                        pp.parentNode.insertBefore(blockquote,pp);
                        domUtils.remove(pp)
                    }
                }
            }


        },
        queryCommandState : function( command ) {

            var startNode = this.selection.getStart();
           
            return domUtils.findParentByTagName( startNode, command.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul', true );
        },
        queryCommandValue : function( command ) {

            var node = this.queryCommandState( command );
          
            return node ? domUtils.getStyle( node, 'list-style-type' ) : null;
        }
    }

})();

/**
 * 输入的方向
 * @function
 * @name baidu.editor.commands.execCommand
 * @author zhanyi
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils,
        block = domUtils.isBlockElm ,
        getObj = function(editor){
            var startNode = editor.selection.getStart(),
                parents;
            if ( startNode ) {
                //查找所有的是block的父亲节点
                parents = domUtils.findParents( startNode, true, block, true );
                for ( var i = 0,ci; ci = parents[i++]; ) {
                    if ( ci.getAttribute( 'dir' ) ) {
                        return ci;
                    }

                }
            }
        },
        doDirectionality = function(range,editor,forward){
            var bookmark,
                filterFn = function( node ) {
                    return   node.nodeType == 1 ? !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace(node)
                },

                obj = getObj( editor );

            if ( obj && range.collapsed ) {
                obj.setAttribute( 'dir', forward );
                return range;
            }
            bookmark = range.createBookmark();
            range.enlarge( true );
            var bookmark2 = range.createBookmark(),
                current = domUtils.getNextDomNode( bookmark2.start, false, filterFn ),
                tmpRange = range.cloneRange(),
                tmpNode;
            while ( current &&  !(domUtils.getPosition( current, bookmark2.end ) & domUtils.POSITION_FOLLOWING) ) {
                if ( current.nodeType == 3 || !block( current ) ) {
                    tmpRange.setStartBefore( current );
                    while ( current && current !== bookmark2.end && !block( current ) ) {
                        tmpNode = current;
                        current = domUtils.getNextDomNode( current, false, null, function( node ) {
                            return !block( node )
                        } );
                    }
                    tmpRange.setEndAfter( tmpNode );
                    var common = tmpRange.getCommonAncestor();
                    if ( !domUtils.isBody( common ) && block( common ) ) {
                        //遍历到了block节点
                        common.setAttribute( 'dir', forward );
                        current = common;
                    } else {
                        //没有遍历到，添加一个block节点
                        var p = range.document.createElement( 'p' );
                        p.setAttribute( 'dir', forward );
                        var frag = tmpRange.extractContents();
                        p.appendChild( frag );
                        tmpRange.insertNode( p );
                        current = p;
                    }

                    current = domUtils.getNextDomNode( current, false, filterFn );
                } else {
                    current = domUtils.getNextDomNode( current, true, filterFn );
                }
            }
            return range.moveToBookmark( bookmark2 ).moveToBookmark( bookmark );
        };


    baidu.editor.commands['directionality'] = {
        execCommand : function( cmdName,forward ) {
            var range = new baidu.editor.dom.Range(this.document);
            if(this.currentSelectedArr && this.currentSelectedArr.length > 0){
                for(var i=0,ti;ti=this.currentSelectedArr[i++];){
                    if(ti.style.display != 'none')
                        doDirectionality(range.selectNode(ti),this,forward);
                }
                range.selectNode(this.currentSelectedArr[0]).select()
            }else{
                doDirectionality(range = this.selection.getRange(),this,forward).select()
               

            }
            return true;
        },
        queryCommandValue : function() {
            var node = getObj(this);
            return node ? node.getAttribute('dir') : 'ltr'
        }
    }
})();


/**
 * @description 插入内容
 * @author zhanyi
    */
(function(){
    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd,
        utils = baidu.editor.utils;
    baidu.editor.commands['inserthtml'] = {
        execCommand: function (command,html){
            var editor = this,
                range,deletedElms, i,ci,
                div,
                tds = editor.currentSelectedArr;

            range = editor.selection.getRange();

            div = range.document.createElement( 'div' );
            div.style.display = 'inline';
            div.innerHTML = utils.trim( html );


            if ( !range.collapsed ) {

                range.deleteContents();
                if(range.startContainer.nodeType == 1){
                    var child = range.startContainer.childNodes[range.startOffset],pre;
                    if(child && domUtils.isBlockElm(child) && (pre = child.previousSibling) && domUtils.isBlockElm(pre)){
                        range.setEnd(pre,pre.childNodes.length).collapse();
                        while(child.firstChild){
                            pre.appendChild(child.firstChild);

                        }
                        domUtils.remove(child);
                    }
                }

            }

            if(tds && tds.length){
                for(var i=0,ti;ti=tds[i++];){
                    ti.className = ''
                }
                tds[0].innerHTML = '';
                range.setStart(tds[0],0).collapse(true);
                editor.currentSelectedArr = [];
            }
            var child,parent,pre,tmp,hadBreak = 0;
            while ( child = div.firstChild ) {
                range.insertNode( child );
                if ( !hadBreak && child.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm( child ) ){

                    parent = domUtils.findParent( child,function ( node ){ return domUtils.isBlockElm( node ); } );
                    if ( parent && parent.tagName.toLowerCase != 'body' && !(dtd[parent.tagName][child.nodeName] && child.parentNode === parent)){
                        if(!dtd[parent.tagName][child.nodeName]){
                            pre = parent;
                        }else{
                            tmp = child.parentNode;
                            while (tmp !== parent){
                                pre = tmp;
                                tmp = tmp.parentNode;
    
                            }    
                        }
                        
                       
                        domUtils.breakParent( child, pre || tmp );
                        //去掉break后前一个多余的节点  <p>|<[p> ==> <p></p><div></div><p>|</p>
                        var pre = child.previousSibling;
                        domUtils.trimWhiteTextNode(pre);
                        if(!pre.childNodes.length){
                            domUtils.remove(pre);
                        }
                        hadBreak = 1;
                    }
                }
                var next = child.nextSibling;
                if(!div.firstChild && next && domUtils.isBlockElm(next)){

                    range.setStart(next,0).collapse(true);
                    break;
                }
                range.setEndAfter( child ).collapse();

            }
//            if(!range.startContainer.childNodes[range.startOffset] && domUtils.isBlockElm(range.startContainer)){
//                next = editor.document.createElement('br');
//                range.insertNode(next);
//                range.collapse(true);
//            }
            
            range.select();

            
        }
    };
}());

/**
 * @description 回退
 * @author zhanyi
 */
(function() {

    var fillchar = new RegExp(baidu.editor.dom.domUtils.fillChar + '|<\/hr>','gi');// ie会产生多余的</hr>
    baidu.editor.plugins['undo'] = function() {
        var me = this,
            maxUndoCount = me.options.maxUndoCount,
            maxInputCount = me.options.maxInputCount,
            specialAttr = /\b(?:href|src|name)="[^"]*?"/gi;

        function UndoManager() {

            this.list = [];
            this.index = 0;
            this.hasUndo = false;
            this.hasRedo = false;
            this.undo = function() {

                if ( this.hasUndo ) {
                    var currentScene = this.getScene(),
                        lastScene = this.list[this.index];
                    if ( lastScene.content.replace(specialAttr,'') != currentScene.content.replace(specialAttr,'') ) {
                        this.save();
                    }
                    while ( this.list[this.index].content == this.list[this.index - 1].content ) {
                        this.index--;
                        if ( this.index == 0 ) {
                            return this.restore( 0 )
                        }
                    }
                    this.restore( --this.index );
                }
            };
            this.redo = function() {
                if ( this.hasRedo ) {
                    while ( this.list[this.index].content == this.list[this.index + 1].content ) {
                        this.index++;
                        if ( this.index == this.list.length - 1 ) {
                            return this.restore( this.index )
                        }
                    }
                    this.restore( ++this.index );
                }
            };

            this.restore = function() {
              
                var scene = this.list[this.index];

                me.document.body.innerHTML = scene.bookcontent;
                var range = new baidu.editor.dom.Range( me.document );
                range.moveToBookmark( {
                    start : '_baidu_bookmark_start_',
                    end : '_baidu_bookmark_end_',
                    id : true
                } ).select(true);

                this.update();
                //table的单独处理
                if(me.currentSelectedArr){
                    me.currentSelectedArr = [];
                    var tds = me.document.getElementsByTagName('td');
                    for(var i=0,td;td=tds[i++];){
                        if(td.className == me.options.selectedTdClass){
                             me.currentSelectedArr.push(td);
                        }
                    }
                }
            };
            this.getScene = function() {
                var range = me.selection.getRange(),
                    cont = me.body.innerHTML.replace(fillchar,'');
                baidu.editor.browser.ie && (cont = cont.replace(/>&nbsp;</g,'><').replace(/\s*</g,'').replace(/>\s*/g,'>'));
                var bookmark = range.createBookmark( true, true ),
                    bookCont = me.body.innerHTML.replace(fillchar,'');
                
                range.moveToBookmark( bookmark ).select( true );
                return {
                    bookcontent : bookCont,
                    content : cont
                }
            };
            this.save = function() {

                var currentScene = this.getScene(),
                    lastScene = this.list[this.index];
                //内容相同位置相同不存
                if ( lastScene && lastScene.content == currentScene.content &&
                        lastScene.bookcontent == currentScene.bookcontent
                ) {
                    return;
                }

                this.list = this.list.slice( 0, this.index + 1 );
                this.list.push( currentScene );
                //如果大于最大数量了，就把最前的剔除
                if ( this.list.length > maxUndoCount ) {
                    this.list.shift();
                }
                this.index = this.list.length - 1;
                keycont = 0;
                lastKeyCode = null;
                //跟新undo/redo状态
                this.update()
            };
            this.update = function() {
                this.hasRedo = this.list[this.index + 1] ? true : false;
                this.hasUndo = this.list[this.index - 1] || this.list.length == 1 ? true : false;

            };
            this.reset = function() {
                this.list = [];
                this.index = 0;
                this.hasUndo = false;
                this.hasRedo = false;
            }
        }

        me.undoManger = new UndoManager();
        function saveScene() {

            this.undoManger.save()
        }

        me.addListener( 'beforeexeccommand', saveScene );
        me.addListener( 'afterexeccommand', saveScene );

        // me.addListener('ready',saveScene);
        

        me.commands['redo'] = me.commands['undo'] = {
            execCommand : function( cmdName ) {
                me.undoManger[cmdName]();
            },
            queryCommandState : function( cmdName ) {

                return me.undoManger['has' + (cmdName.toLowerCase() == 'undo' ? 'Undo' : 'Redo')] ? 0 : -1;
            },
            notNeedUndo : 1
        };

        var keys = {
             //  /*Backspace*/ 8:1, /*Delete*/ 46:1,
                /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1,
                37:1, 38:1, 39:1, 40:1,
                13:1 /*enter*/
            },
            keycont = 0,
            lastKeyCode;

        me.addListener( 'keydown', function( type, evt ) {
            var keyCode = evt.keyCode || evt.which;

            if ( !keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey ) {

                if ( keycont == 0 || ((keyCode == 8 ||keyCode == 46) && lastKeyCode != keyCode) ) {
                    me.undoManger.save();
                }
                lastKeyCode = keyCode;
                keycont++;
                if ( keycont > maxInputCount ) {

                    setTimeout( function() {
                        me.undoManger.save();
                    }, 0 );

                }
            }
        } )
    };


})();

(function() {

	var domUtils = baidu.editor.dom.domUtils,
        browser = baidu.editor.browser;

    function getClipboardData( callback ) {

        var doc = this.document;

        if ( doc.getElementById( 'baidu_pastebin' ) ) {
            return;
        }

        var range = this.selection.getRange(),
            bk = range.createBookmark(),
            //创建剪贴的容器div
            pastebin = doc.createElement( 'div' );

        pastebin.id = 'baidu_pastebin';

        // Safari 要求div必须有内容，才能粘贴内容进来
        browser.webkit && pastebin.appendChild( doc.createTextNode( '\xa0' ) );
        doc.body.appendChild( pastebin );
        pastebin.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" +
            //要在现在光标平行的位置加入，否则会出现跳动的问题
            domUtils.getXY( bk.start ).y + 'px';

        range.selectNodeContents( pastebin ).select( true );

        setTimeout( function() {
           
			pastebin.parentNode.removeChild(pastebin);
            range.moveToBookmark( bk ).select(true);
            callback( pastebin );
        }, 0 );


    }

    baidu.editor.plugins['paste'] = function() {
        var me = this;

        var pasteplain = me.options.pasteplain;

        me.commands['pasteplain'] = {
            queryCommandState: function (){
                return pasteplain;
            },
            execCommand: function (){
                pasteplain = !pasteplain|0;
            },
            notNeedUndo : 1
        };

        me.addListener( 'keydown', function( type, e ) {
            var keyCode = e.keyCode || e.which,
                html;

            if ( (e.ctrlKey || e.metaKey) && keyCode == 86 ) {//ctrl+v


                
                getClipboardData.call( me, function( div ) {

                    if ( div.firstChild ) {
                        if(browser.webkit){
                            var spans = div.querySelectorAll('span.Apple-style-span');
                            for(var i=0,ci;ci=spans[i++];){
                                domUtils.remove(ci,true);
                            };
                            var metas = div.querySelectorAll('meta');
                            for(var i=0,ci;ci=metas[i++];){
                                domUtils.remove(ci);
                            };
                        }
                        if(browser.gecko){
                            var dirtyNodes = div.querySelectorAll('[_moz_dirty]')
                            for(i=0;ci=dirtyNodes[i++];){
                                ci.removeAttribute( '_moz_dirty' )
                            }
                        }
                        if(!pasteplain){
                            html = div.innerHTML;

                            var f = me.serialize;
                            if(f){
                                var node =
                                    f.filter(
                                        f.parseHTML(
                                            f.word(html)
                                        )
                                    )


                                if(browser.webkit){
                                    var length = node.children.length,
                                        child
                                    while((child = node.children[length-1]) && child.tag == 'br'){
                                        node.children.splice(length-1,1);
                                        length = node.children.length;
                                    }
                                }
                                html = f.toHTML(node)

                            }
                        }else{
                            html = div[browser.ie ? 'innerText':'textContent'];
                        }
                        me.execCommand( 'insertHtml',html);

                    }
                } );


            }
        } );
        
    }

})();


/**
 * @description 自动伸展
 * @author zhanyi
 */
(function() {

    var browser = baidu.editor.browser;

    baidu.editor.plugins['autoheight'] = function() {
        var editor = this;
        editor.autoHeightEnabled = false;
        
        var timer;
        var bakScroll;
        var bakOverflow;
        editor.enableAutoHeight = function (){
            var iframe = editor.iframe,
                doc = editor.document,
                minHeight = editor.options.minFrameHeight;

            function updateHeight(){
                iframe.style.height = Math.max( browser.ie ? doc.body.scrollHeight :
                        doc.body.offsetHeight + 20, minHeight ) + 'px';
            }
            this.autoHeightEnabled = true;
            bakScroll = iframe.scroll;
            bakOverflow = doc.body.style.overflowY;
            iframe.scroll = 'no';
            doc.body.style.overflowY = 'hidden';
            timer = setTimeout(function (){
                updateHeight();
                timer = setTimeout(arguments.callee);
            });
        };
        editor.disableAutoHeight = function (){
            var iframe = editor.iframe,
                doc = editor.document;
            iframe.scroll = bakScroll;
            doc.body.style.overflowY = bakOverflow;
            clearTimeout(timer);
            this.autoHeightEnabled = false;
        };
        editor.addListener( 'ready', function() {
            editor.enableAutoHeight();
        });
    }

})();

//配置快捷键
baidu.editor.plugins['shortcutkeys'] = function(){
    var editor = this,
        shortcutkeys =  baidu.editor.utils.extend({
    		 "ctrl+66" : "Bold" //^B
        	,"ctrl+90" : "Undo" //undo
        	,"ctrl+89" : "Redo" //redo
       		,"ctrl+73" : "Italic" //^I
       		,"ctrl+85" : "Underline" //^U
        	,"ctrl+shift+67" : "removeformat" //清除格式
        	,"ctrl+shift+76" : "justify:left" //居左
        	,"ctrl+shift+82" : "justify:right" //居右
        	,"ctrl+65" : "selectAll"
//        	,"9"	   : "indent" //tab
    	},editor.options.shortcutkeys);
    editor.addListener('keydown',function(type,e){

        var keyCode = e.keyCode || e.which,value;
		for ( var i in shortcutkeys ) {
		    if ( /^(ctrl)(\+shift)?\+(\d+)$/.test( i.toLowerCase() ) || /^(\d+)$/.test( i ) ) {
		        if ( ( (RegExp.$1 == 'ctrl' ? (e.ctrlKey||e.metaKey) : 0)
                        && (RegExp.$2 != "" ? e[RegExp.$2.slice(1) + "Key"] : 1)
                        && keyCode == RegExp.$3
                    ) ||
                     keyCode == RegExp.$1
                ){

                    value = shortcutkeys[i].split(':');
                    editor.execCommand( value[0],value[1]);
                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);

		        }
		    }
		}
    });

};
/**
 * @description 处理回车
 * @author zhanyi
 */
(function() {

    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils;
    baidu.editor.plugins['enterkey'] = function() {
        var me = this,
            tag = me.options.enterTag,
            flag = 0;
        me.addListener( 'keyup', function( type, evt ) {
            var keyCode = evt.keyCode || evt.which;
            if ( keyCode == 13 && me.undoManger && flag ) {
                flag = 0;
                me.undoManger.save()
            }
        } );
        me.addListener( 'keypress', function( type, evt ) {
            var keyCode = evt.keyCode || evt.which;
            if ( keyCode == 13 ) {//回车
                if ( me.undoManger ) {
                    me.undoManger.save();
                    flag = 1
                }
                var range = me.selection.getRange();

                range.shrinkBoundary();
                //li不处理
                if ( domUtils.findParentByTagName( range.startContainer, ['ol','ul'], true ) ) {
                    return;
                }
                if ( !range.collapsed ) {
                    //跨td不能删
                    var start = range.startContainer,
                        end = range.endContainer,
                        startTd = domUtils.findParentByTagName( start, 'td', true ),
                        endTd = domUtils.findParentByTagName( end, 'td', true );
                    if ( startTd && endTd && startTd !== endTd || !startTd && endTd || startTd && !endTd ) {
                        evt.preventDefault ? evt.preventDefault() : ( evt.returnValue = false);
                        return;
                    }
                }
                if ( tag == 'p' ) {
                    if ( !browser.ie ) {
                        start = domUtils.findParentByTagName( range.startContainer, ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], true );
                        if ( !start ) {
                            me.document.execCommand( 'formatBlock', false, '<p>' );
                            if ( browser.gecko ) {
                                range = me.selection.getRange();
                                start = domUtils.findParentByTagName( range.startContainer, 'p', true );
                                start && domUtils.removeDirtyAttr( start );
                            }
                        } else {
                            start.tagName.toLowerCase() == 'p' && browser.gecko && domUtils.removeDirtyAttr( start );
                        }

                    }

                } else {
                    evt.preventDefault ? evt.preventDefault() : ( evt.returnValue = false);
                    if ( !range.collapsed ) {
                        range.deleteContents();
                        start = range.startContainer;
                        if ( start.nodeType == 1 && (start = start.childNodes[range.startOffset]) ) {
                            while ( start.nodeType == 1 ) {
                                if ( baidu.editor.dom.dtd.$empty[start.tagName] ) {
                                    range.setStartBefore( start ).setCursor();
                                    if ( me.undoManger ) {
                                        me.undoManger.save()
                                    }
                                    return false;
                                }
                                if ( !start.firstChild ) {
                                    var br = range.document.createElement( 'br' );
                                    start.appendChild( br );
                                    range.setStart( start, 0 ).setCursor();
                                    if ( me.undoManger ) {
                                        me.undoManger.save()
                                    }
                                    return false;
                                }
                                start = start.firstChild
                            }
                            if ( start === range.startContainer.childNodes[range.startOffset] ) {
                                br = range.document.createElement( 'br' );
                                range.insertNode( br ).setCursor();

                            } else {
                                range.setStart( start, 0 ).setCursor();
                            }


                        } else {
                            br = range.document.createElement( 'br' );
                            range.insertNode( br ).setStartAfter( br ).setCursor();
                        }


                    } else {
                        br = range.document.createElement( 'br' );
                        range.insertNode( br );
                        var parent = br.parentNode;
                        if ( parent.lastChild === br ) {
                            br.parentNode.insertBefore( br.cloneNode( true ), br );
                            range.setStartBefore( br )
                        } else {
                            range.setStartAfter( br )
                        }
                        range.setCursor();

                    }

                }
                if ( me.undoManger ) {
                    me.undoManger.save()
                }
            }
        } );
    }

})();

/*
 *   处理特殊键的兼容性问题
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
        browser = baidu.editor.browser,
        dtd = baidu.editor.dom.dtd,
        flag = 0;
    baidu.editor.plugins['keystrokes'] = function() {
        var me = this;
        me.addListener( 'keydown', function( type, evt ) {
            var keyCode = evt.keyCode || evt.which;
            //处理space/del
            if ( keyCode == 8 || keyCode == 46) {
                
                //修中ie中li下的问题
                var range = me.selection.getRange();
                if(browser.ie && range.collapsed && !range.startOffset){

                    var li = domUtils.findParentByTagName(range.startContainer,'li',true),pre,
                        tmpRange = range.cloneRange();
                    tmpRange.trimBoundary();
                    //要在li的最左边，才能处理
                    if(!tmpRange.startOffset){
                        if(li && (pre = li.previousSibling)){
                            if(keyCode == 46 && li.childNodes.length)
                                return;
                            me.undoManger && me.undoManger.save();
                            range.setEnd(pre,pre.childNodes.length).collapse();
                            while(li.firstChild){
                                pre.appendChild(li.firstChild)
                            }
                            domUtils.remove(li);
                            range.select();
                            me.undoManger && me.undoManger.save();
                            evt.returnValue = false;

                        }
                        //只有<ul><li>|</li></ul>才能删除
                        var tmpRange = range.cloneRange();
                        tmpRange.trimBoundary();
                        
                        if( keyCode == 8 && (li && pre || li && li.childNodes.length) ){
                            evt.returnValue = false;
                        }
                    }

                  
                }
                if ( me.undoManger ) {

                    if ( !range.collapsed ) {
                        me.undoManger.save();
                        flag = 1;
                    }
                }

            }
        } );
        me.addListener( 'keyup', function( type, evt ) {
            var keyCode = evt.keyCode || evt.which;

            if ( keyCode == 8 || keyCode == 46  ) {

                var range,body,start,parent,
                    tds = this.currentSelectedArr;
                if(tds && tds.length > 0){
                    for(var i=0,ti;ti=tds[i++];){
                        ti.innerHTML = browser.ie ? ( browser.version < 9 ? '&#65279' : '' ) : '<br/>';

                    }
                    range = new baidu.editor.dom.Range(this.document);
                    range.setStart(tds[0],0).setCursor();
                    if(flag){
                        me.undoManger.save();
                        flag = 0;
                    }
                    //阻止chrome执行默认的动作
                    if(browser.webkit){
                        evt.preventDefault();
                    }
                    return;
                }

                range = me.selection.getRange();
                //ctrl+a 后全部删除做处理
                if ( domUtils.isBody( range.startContainer ) && !range.startOffset ) {
                    body = me.document.body;
                    if ( body.childNodes.length == 1 && body.firstChild.nodeType == 1 && body.firstChild.tagName.toLowerCase() == 'br' && me.options.enterTag == 'p' || me.body.innerHTML == '') {
                        me.document.execCommand( 'formatBlock', false, '<p>' );
                        if ( browser.gecko ) {
                            range = me.selection.getRange();
                            start = domUtils.findParentByTagName( range.startContainer, 'p', true );
                            start && domUtils.removeDirtyAttr( start )
                        }
                        me.undoManger.save();
                        return;

                    }
                }

                //处理删除不干净的问题
                start = range.startContainer;
                
                while ( start.nodeType == 1 && dtd.$removeEmpty[start.tagName] ) {
                    if ( domUtils.getChildCount( start, function( n ) {
                        return n.nodeType != 1 || n.tagName.toLowerCase() != 'br'
                    } ) > 0 ) {
                        break;
                    }
                    parent = start.parentNode;
                    domUtils.remove( start );
                    start = parent;
                }
                if ( start.nodeType == 1 && start.childNodes.length == 0 ) {

                    //ie下的问题，虽然没有了相应的节点但一旦你输入文字还是会自动把删除的节点加上，
                    if ( browser.ie ) {

                        var span = range.document.createElement('span');
                        start.appendChild(span);
                        range.setStart(span,0).setCursor();

                    }else{
                        var br = range.document.createElement('br');
                        start.appendChild(br);
                        range.setStart(start,0).setCursor();
                    }

                    setTimeout( function() {
                        if(browser.ie){
                            domUtils.remove(span);
                        }
                        //range.setStart( start, 0 ).setCursor();
                        if(flag){
                            me.undoManger.save();
                            flag = 0;
                        }
                    }, 0)
                } else {

                    if(flag){
                        me.undoManger.save();
                        flag = 0;
                    }

                }
            }
        } )
    }
})();
(function (){

var dtd = baidu.editor.dom.dtd;
var EMPTY_TAG = dtd.$empty;
var unhtml = baidu.editor.utils.unhtml;

var parseHTML = function (){

    var RE_PART = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g;
    var RE_ATTR = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g;

    var EMPTY_ATTR = {checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};
    var CDATA_TAG = {script:1,style: 1};
    var NEED_PARENT_TAG = {
        "li": { "$": 'ul', "ul": 1, "ol": 1 },
        "dd": { "$": "dl", "dl": 1 },
        "dt": { "$": "dl", "dl": 1 },
        "option": { "$": "select", "select": 1 },
        "td": { "$": "tr", "tr": 1 },
        "tr": { "$": "tbody", "tbody": 1, "thead": 1, "tfoot": 1, "table": 1 },
        "tbody": { "$": "table", "table": 1 },
        "thead": { "$": "table", "table": 1 },
        "tfoot": { "$": "table", "table": 1 },
        "col": { "$": "colgroup" }
    };
    var NEED_CHILD_TAG = {
        "table": "td", "tbody": "td", "thead": "td", "tfoot": "td", "tr": "td",
        "colgroup": "col",
        "ul": "li", "ol": "li",
        "dl": "dd",
        "select": "option"
    };

    function parse(html, callbacks){

        var match,
            nextIndex = 0,
            tagName,
            cdata;
        RE_PART.exec("");
        while ((match = RE_PART.exec(html))) {
            var tagIndex = match.index;
            if (tagIndex > nextIndex) {
                var text = html.slice(nextIndex, tagIndex);
                if (cdata) {
                    cdata.push(text);
                } else {
                    callbacks.onText(text);
                }
            }
            nextIndex = RE_PART.lastIndex;
            if ((tagName = match[1])) {
                tagName = tagName.toLowerCase();
                if (cdata && tagName == cdata._tag_name) {
                    callbacks.onCDATA(cdata.join(''));
                    cdata = null;
                }
                if (!cdata) {
                    callbacks.onTagClose(tagName);
                    continue;
                }
            }
            if (cdata) {
                cdata.push(match[0]);
                continue;
            }
            if ((tagName = match[3])) {
                if (/="/.test(tagName)) {
                    continue;
                }
                tagName = tagName.toLowerCase();
                var attrPart = match[4],
                    attrMatch,
                    attrMap = {},
                    selfClosing = attrPart && attrPart.slice(-1) == '/';
                if (attrPart) {
                    RE_ATTR.exec("");
                    while ((attrMatch = RE_ATTR.exec(attrPart))) {
                        var attrName = attrMatch[1].toLowerCase(),
                            attrValue = attrMatch[2] || attrMatch[3] || attrMatch[4] || '';
                        if (!attrValue && EMPTY_ATTR[attrName]) {
                            attrValue = attrName;
                        }
                        attrMap[attrName] = attrValue;
                    }
                }
                callbacks.onTagOpen(tagName, attrMap, selfClosing);
                if (!cdata && CDATA_TAG[tagName]) {
                    cdata = [];
                    cdata._tag_name = tagName;
                }
                continue;
            }
            if ((tagName = match[2])) {
                callbacks.onComment(tagName);
            }
        }
        if (html.length > nextIndex) {
            callbacks.onText(html.slice(nextIndex, html.length));
        }
    }
    return function (html){
        var fragment = {
            type: 'fragment',
            parent: null,
            children: []
        };
        var currentNode = fragment;
        function addChild(node){
            node.parent = currentNode;
            currentNode.children.push(node);
        }
        function addElement(element, open){
            var node = element;
            // 遇到结构化标签的时候
            if (NEED_PARENT_TAG[node.tag]) {
                // 考虑这种情况的时候, 结束之前的标签
                // e.g. <table><tr><td>12312`<tr>`4566
                while (NEED_PARENT_TAG[currentNode.tag] && NEED_PARENT_TAG[currentNode.tag][node.tag]){
                    currentNode = currentNode.parent;
                }
                // 如果前一个标签和这个标签是同一级, 结束之前的标签
                // e.g. <ul><li>123<li>
                if (currentNode.tag == node.tag) {
                    currentNode = currentNode.parent;
                }
                // 向上补齐父标签
                while (NEED_PARENT_TAG[node.tag]) {
                    if (NEED_PARENT_TAG[node.tag][currentNode.tag]) break;
                    node = node.parent = {
                        type: 'element',
                        tag: NEED_PARENT_TAG[node.tag]['$'],
                        attributes: {},
                        children: [node]
                    };
                }
            }
            // 如果遇到这个标签不能放在前一个标签内部，则结束前一个标签
            while (!(dtd[currentNode.tag] || dtd['div'])[node.tag]) {
                if (tagEnd(currentNode)) continue;
                if (!currentNode.parent) break;
                currentNode = currentNode.parent;
            }
            node.parent = currentNode;
            currentNode.children.push(node);
            if (open) {
                currentNode = element;
            }
            return element;
        }
        // 结束一个标签的时候，需要判断一下它是否缺少子标签
        // e.g. <table></table>
        function tagEnd(node){
            var needTag;
            if (!node.children.length && (needTag = NEED_CHILD_TAG[node.tag])) {
                addElement({
                    type: 'element',
                    tag: needTag,
                    attributes: {},
                    children: []
                }, true);
                return true;
            }
            return false;
        }
        parse(html, {
            onText: function (text){
                while (!dtd[currentNode.tag || 'div']['#']) {
                    if (tagEnd(currentNode)) continue;
                    currentNode = currentNode.parent;
                }
                // TODO: 注意这里会去掉空白节点
                if (/\S/.test(text)) {
                    addChild({
                        type: 'text',
                        data: text
                    });
                }
            },
            onComment: function (text){
                addChild({
                    type: 'comment',
                    data: text
                });
            },
            onCDATA: function (text){
                while (!dtd[currentNode.tag || 'div']['#']) {
                    if (tagEnd(currentNode)) continue;
                    currentNode = currentNode.parent;
                }
                addChild({
                    type: 'cdata',
                    data: text
                });
            },
            onTagOpen: function (tag, attrs, closed){
                closed = closed || EMPTY_TAG[tag];
                addElement({
                    type: 'element',
                    tag: tag,
                    attributes: attrs,
                    closed: closed,
                    children: []
                }, !closed);
            },
            onTagClose: function (tag){
                var node = currentNode;
                // 向上找匹配的标签, 这里不考虑dtd的情况是因为tagOpen的时候已经处理过了, 这里不会遇到
                while (node && tag != node.tag) {
                    node = node.parent;
                }
                if (node) {
                    // 关闭中间的标签
                    for (var tnode=currentNode; tnode!==node.parent; tnode=tnode.parent) {
                        tagEnd(tnode);
                    }
                    currentNode = node.parent;
                } else {
                    // 如果没有找到开始标签, 则创建新标签
                    // eg. </div> => <div></div>
                    node = {
                        type: 'element',
                        tag: tag,
                        attributes: {},
                        children: []
                    };
                    addElement(node, true);
                    tagEnd(node);
                    currentNode = node.parent;
                }
            }
        });
        // 处理这种情况, 只有开始标签没有结束标签的情况, 需要关闭开始标签
        // eg. <table>
        while (currentNode !== fragment) {
            tagEnd(currentNode);
            currentNode = currentNode.parent;
        }
        return fragment;
    };
}();

//b|i|font ==> strong|em|span 放在toHTML节省在遍历的时间
var transObj = {'b':1,'i':1,'font':1};
function transNode(node){
    var sizeMap = [0, 10, 12, 16, 18, 24, 32, 48],
        attr;
    switch(node.tag){
        case 'b':
            node.tag = node.name = 'strong';
            break;
        case 'i':
            node.tag = node.name = 'em';
            break;
        case 'font':
            node.tag = node.name = 'span';
            attr = node.attributes;
            node.attributes = {
                'style': (attr.size ? 'font-size:' + (sizeMap[attr.size] || 12) + 'px' : '')
                + ';' + (attr.color ? 'color:'+ attr.color : '')
                + ';' + (attr.face ? 'font-family:'+ attr.face : '')
                + ';' + (attr.style||'')
            }
           
            
    }
}
var unhtmltag = function (){
    var map = { '<': '&lt;', '>': '&gt;' };
    function rep( m ){ return map[m]; }
    return function ( str ) {
        return str ? str.replace( /[<>]/g, rep ) : '';
    };
}();
var toHTML = function (){
    function printChildren(node){
        var children = node.children;
        var buff = [];
        for (var i=0; i<children.length; i++) {
            buff.push(toHTML(children[i]));
        }
        return buff.join('');
    }
    function printAttrs(attrs){
        var buff = [];
        for (var k in attrs) {
            buff.push(k + '="' + unhtml(attrs[k]) + '"');
        }
        return buff.join(' ');
    }
    function printData(node){ return unhtmltag(node.data); }
    function printElement(node){
        //节点转换
        if(transObj[node.tag]){
            transNode(node);
        }
        var tag = node.tag;
        var attrs = printAttrs(node.attributes);
        var html = '<' + tag + (attrs ? ' ' + attrs : '') + (EMPTY_TAG[tag] ? ' />' : '>');
        if (!EMPTY_TAG[tag]) {
            html += printChildren(node);
            html += '</' + tag + '>';
        }
        return html;
    }

    return function (node){
        if (node.type == 'fragment') {
            return printChildren(node);
        } else if (node.type == 'element') {
            return printElement(node);
        } else if (node.type == 'text' || node.type == 'cdata') {
            return printData(node);
        } else if (node.type == 'comment') {
            return '<!--' + node.data + '-->';
        }
        return '';
    };
}();

/////////////////
// WORD /////////
/////////////////
var transformWordHtml = function (){
    function isWordDocument( strValue ) {
        var re = new RegExp( /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument)/ig );
        return re.test( strValue );
    }

    function ensureUnits( v ) {
        v = v.replace(/([\d.]+)([\w]+)?/g, function (m, p1, p2){
            return (Math.round(parseFloat(p1)) || 1) + (p2 || 'px');
        });
        return v;
    }

    function filterPasteWord( str ) {
        //remove link break
        str = str.replace( /\r\n|\n|\r/ig, "" );
        //remove &nbsp; entities at the start of contents
        str = str.replace( /^\s*(&nbsp;)+/ig, "" );
        //remove &nbsp; entities at the end of contents
        str = str.replace( /(&nbsp;|<br[^>]*>)+\s*$/ig, "" );
        // Word comments like conditional comments etc
        str = str.replace( /<!--[\s\S]*?-->/ig, "" );
        // Remove comments, scripts (e.g., msoShowComment), XML tag, VML content, MS Office namespaced tags, and a few other tags
        str = str.replace( /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi, "" );

        //convert word headers to strong
        str = str.replace( /<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>" );
        //remove lang attribute
        str = str.replace( /(lang)\s*=\s*([\'\"]?)[\w-]+\2/ig, "" );
        // Examine all styles: delete junk, transform some, and keep the rest
        str = str.replace( /(<[a-z][^>]*)\sstyle="([^"]*)"/gi, function( str, tag, style ) {
            var n = [],
                    i = 0,
                    s = style.replace( /^\s+|\s+$/, '' ).replace( /&quot;/gi, "'" ).split( /;\s*/g );

            // Examine each style definition within the tag's style attribute
            for ( var i = 0; i < s.length; i++ ) {
                var v = s[i];
                var name, value,
                        parts = v.split( ":" );

                if ( parts.length == 2 ) {
                    name = parts[0].toLowerCase();
                    value = parts[1].toLowerCase();
                    // Translate certain MS Office styles into their CSS equivalents
                    switch ( name ) {
                        case "mso-padding-alt":
                        case "mso-padding-top-alt":
                        case "mso-padding-right-alt":
                        case "mso-padding-bottom-alt":
                        case "mso-padding-left-alt":
                        case "mso-margin-alt":
                        case "mso-margin-top-alt":
                        case "mso-margin-right-alt":
                        case "mso-margin-bottom-alt":
                        case "mso-margin-left-alt":
    //                        case "mso-border-alt":
    //                        case "mso-border-top-alt":
    //                        case "mso-border-right-alt":
    //                        case "mso-border-bottom-alt":
    //                        case "mso-border-left-alt":
                        case "mso-table-layout-alt":
                        case "mso-height":
                        case "mso-width":
                        case "mso-vertical-align-alt":
                            n[i++] = name.replace( /^mso-|-alt$/g, "" ) + ":" + ensureUnits( value );
                            continue;

                        case "horiz-align":
                            n[i++] = "text-align:" + value;
                            continue;

                        case "vert-align":
                            n[i++] = "vertical-align:" + value;
                            continue;

                        case "font-color":
                        case "mso-foreground":
                            n[i++] = "color:" + value;
                            continue;

                        case "mso-background":
                        case "mso-highlight":
                            n[i++] = "background:" + value;
                            continue;

                        case "mso-default-height":
                            n[i++] = "min-height:" + ensureUnits( value );
                            continue;

                        case "mso-default-width":
                            n[i++] = "min-width:" + ensureUnits( value );
                            continue;

                        case "mso-padding-between-alt":
                            n[i++] = "border-collapse:separate;border-spacing:" + ensureUnits( value );
                            continue;

                        case "text-line-through":
                            if ( (value == "single") || (value == "double") ) {
                                n[i++] = "text-decoration:line-through";
                            }
                            continue;

                        case "mso-zero-height":
                            if ( value == "yes" ) {
                                n[i++] = "display:none";
                            }
                            continue;
                    }
                    // Eliminate all MS Office style definitions that have no CSS equivalent by examining the first characters in the name
                    if ( /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test( name ) ) {
                        continue;
                    }
                    // If it reached this point, it must be a valid CSS style
                    n[i] = name + ":" + parts[1];        // Lower-case name, but keep value case
                }
            }
            // If style attribute contained any valid styles the re-write it; otherwise delete style attribute.
            if ( i > 0 ) {
                return tag + ' style="' + n.join( ';' ) + '"';
            } else {
                return tag;
            }
        } );
        str = str.replace( /([ ]+)<\/span>/ig, function ( m, p ) {
            return new Array( p.length + 1 ).join( '&nbsp;' ) + '</span>';
        } );

        return str;
    }
    return function (html){
        if (isWordDocument(html)) {
            html = filterPasteWord(html);
        }
        return html.replace(/>\s*</g,'><');
    };
}();
var NODE_NAME_MAP = {
    'text': '#text',
    'comment': '#comment',
    'cdata': '#cdata-section',
    'fragment': '#document-fragment'
};
function childrenAccept(node, visit, ctx){
    if (!node.children) {
        return node;
    }
    var children = node.children;
    for (var i=0; i<children.length; i++) {
        var newNode = visit(children[i], ctx);
        if (newNode.type == 'fragment') {
            var args = [i, 1];
            args.push.apply(args, newNode.children);
            children.splice.apply(children, args);
            i --;
        } else {
            children[i] = newNode;
        }
    }
    return node;
}
function Serialize(rules){
    this.rules = rules;
}
Serialize.prototype = {
    // NOTE: selector目前只支持tagName
    rules: null,
    // NOTE: node必须是fragment
    filter: function (node){
        var whiteList = this.rules && this.rules.whiteList;
        var blackList = this.rules && this.rules.blackList;
        function visitNode(node, parent){
            node.name = node.type == 'element' ?
                    node.tag : NODE_NAME_MAP[node.type];
            if (parent == null) {
                return childrenAccept(node, visitNode, node);
            }
            if (blackList && blackList[node.name]) {
                return {
                    type: 'fragment',
                    children: []
                };
            }
            if (whiteList) {
                if (node.type == 'element') {
                    if (parent.type == 'fragment' ? whiteList[node.name] : whiteList[node.name] && whiteList[parent.name][node.name]) {
                        var props;
                        if ((props = whiteList[node.name].$)) {
                            var oldAttrs = node.attributes;
                            var newAttrs = {};
                            for (var k in props) {
                                if (oldAttrs[k]) {
                                    newAttrs[k] = oldAttrs[k];
                                }
                            }
                            node.attributes = newAttrs;
                        }
                    } else {
                        node.type = 'fragment';
                        // NOTE: 这里算是一个hack
                        node.name = parent.name;
                    }
                } else {
                    // NOTE: 文本默认允许
                }
            }
            if (blackList || whiteList) {
                childrenAccept(node, visitNode, node);
            }
            return node;
        }
        return visitNode(node, null);
    },
    transformInput: function (node, wrapInline){
        return node;
    },
    transformOutput: function (node){
        return node;
    },
    toHTML: toHTML,
    parseHTML: parseHTML,
    word: transformWordHtml
};

baidu.editor.plugins['serialize'] = function () {
    var editor = this;
    editor.serialize = new Serialize(editor.options.serialize);
};

})();

var baidu = baidu || {};
baidu.editor = baidu.editor || {};
baidu.editor.ui = {};
(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils;

    var magic = '$EDITORUI';
    var root = window[magic] = {};
    var uidMagic = 'ID' + magic;
    var uidCount = 0;
    
    var uiUtils = baidu.editor.ui.uiUtils = {
        uid: function (obj){
            return (obj ? obj[uidMagic] || (obj[uidMagic] = ++ uidCount) : ++ uidCount);
        },
        hook: function ( fn, callback ) {
            var dg;
            if (fn && fn._callbacks) {
                dg = fn;
            } else {
                dg = function (){
                    var q;
                    if (fn) {
                        q = fn.apply(this, arguments);
                    }
                    var callbacks = dg._callbacks;
                    var k = callbacks.length;
                    while (k --) {
                        var r = callbacks[k].apply(this, arguments);
                        if (q === undefined) {
                            q = r;
                        }
                    }
                    return q;
                };
                dg._callbacks = [];
            }
            dg._callbacks.push(callback);
            return dg;
        },
        createElementByHtml: function (html){
            var el = document.createElement('div');
            el.innerHTML = html;
            el = el.firstChild;
            el.parentNode.removeChild(el);
            return el;
        },
        getViewportElement: function (){
            return (browser.ie && browser.quirks) ?
                document.body : document.documentElement;
        },
        getClientRect: function (element){
            var bcr = element.getBoundingClientRect();
            var rect = {
                left: bcr.left | 0,
                top: bcr.top | 0,
                height: (bcr.bottom - bcr.top) | 0,
                width: (bcr.right - bcr.left) | 0
            };
            while (element  = domUtils.getWindow(element).frameElement) {
                bcr = element.getBoundingClientRect();
                rect.left += bcr.left;
                rect.top += bcr.top;
            }
            rect.bottom = rect.top + rect.height;
            rect.right = rect.left + rect.width;
            return rect;
        },
        getViewportRect: function (){
            var viewportEl = uiUtils.getViewportElement();
            var width = viewportEl.clientWidth | 0;
            var height = viewportEl.clientHeight | 0;
            return {
                left: 0,
                top: 0,
                height: height,
                width: width,
                bottom: height,
                right: width
            };
        },
        setViewportOffset: function (element, offset){
            var left = parseInt(element.style.left) | 0;
            var top = parseInt(element.style.top) | 0;
            var rect = uiUtils.getClientRect(element);
            left = left + offset.left - rect.left;
            top = top + offset.top - rect.top;
            element.style.left = left + 'px';
            element.style.top = top + 'px';
        },
        getEventOffset: function (evt){
            var el = evt.target || evt.srcElement;
            var rect = uiUtils.getClientRect(el);
            var offset = uiUtils.getViewportOffsetByEvent(evt);
            return {
                left: offset.left - rect.left,
                top: offset.top - rect.top
            };
        },
        getViewportOffsetByEvent: function (evt){
            var el = evt.target || evt.srcElement;
            var frameEl = domUtils.getWindow(el).frameElement;
            var offset = {
                left: evt.clientX,
                top: evt.clientY
            };
            if (frameEl) {
                var rect = uiUtils.getClientRect(frameEl);
                offset.left += rect.left;
                offset.top += rect.top;
            }
            return offset;
        },
        setGlobal: function (id, obj){
            root[id] = obj;
            return magic + '["' + id  + '"]';
        },
        unsetGlobal: function (id){
            delete root[id];
        },
        copyAttributes: function (tgt, src){
            var attributes = src.attributes;
            var k = attributes.length;
            while (k --) {
                var attrNode = attributes[k];
                if ( attrNode.nodeName != 'style' && attrNode.nodeName != 'class' && (!browser.ie || attrNode.specified) ) {
                    tgt.setAttribute(attrNode.nodeName, attrNode.nodeValue);
                }
            }
            if (src.className) {
                tgt.className += ' ' + src.className;
            }
            if (src.style.cssText) {
                tgt.style.cssText += ';' + src.style.cssText;
            }
        },
        contains: function (elA, elB){
            return elA && elB && (elA === elB ? false : (
                elA.contains ? elA.contains(elB) :
                    elA.compareDocumentPosition(elB) & 16
                ));
        },
        startDrag: function (evt, callbacks){
            var doc = document;
            var startX = evt.clientX;
            var startY = evt.clientY;
            function handleMouseMove(evt){
                var x = evt.clientX - startX;
                var y = evt.clientY - startY;
                callbacks.ondragmove(x, y);
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                } else {
                    evt.cancelBubble = true;
                }
            }
            if (doc.addEventListener) {
                function handleMouseUp(evt){
                    doc.removeEventListener('mousemove', handleMouseMove, true);
                    doc.removeEventListener('mouseup', handleMouseMove, true);
                    callbacks.ondragstop();
                }
                doc.addEventListener('mousemove', handleMouseMove, true);
                doc.addEventListener('mouseup', handleMouseUp, true);
                evt.preventDefault();
            } else {
                var elm = evt.srcElement;
                elm.setCapture();
                function releaseCaptrue(){
                    elm.releaseCapture();
                    elm.detachEvent('onmousemove', handleMouseMove);
                    elm.detachEvent('onmouseup', releaseCaptrue);
                    elm.detachEvent('onlosecaptrue', releaseCaptrue);
                    callbacks.ondragstop();
                }
                elm.attachEvent('onmousemove', handleMouseMove);
                elm.attachEvent('onmouseup', releaseCaptrue);
                elm.attachEvent('onlosecaptrue', releaseCaptrue);
                evt.returnValue = false;
            }
            callbacks.ondragstart();
        },
        getFixedLayer: function (){
            var layer = document.getElementById('edui_fixedlayer');
            if (layer == null) {
                layer = document.createElement('div');
                layer.id = 'edui_fixedlayer';
                document.body.appendChild(layer);
                if (browser.ie && browser.version <= 8) {
                    layer.style.position = 'absolute';
                    bindFixedLayer();
                    setTimeout(updateFixedOffset);
                } else {
                    layer.style.position = 'fixed';
                }
                layer.style.left = '0';
                layer.style.top = '0';
                layer.style.width = '0';
                layer.style.height = '0';
            }
            return layer;
        },
        makeUnselectable: function (element){
            if (browser.opera || (browser.ie && browser.version < 9)) {
                element.unselectable = 'on';
                if (element.hasChildNodes()) {
                    for (var i=0; i<element.childNodes.length; i++) {
                        if (element.childNodes[i].nodeType == 1) {
                            uiUtils.makeUnselectable(element.childNodes[i]);
                        }
                    }
                }
            } else {
                if (element.style.MozUserSelect !== undefined) {
                    element.style.MozUserSelect = 'none';
                } else if (element.style.WebkitUserSelect !== undefined) {
                    element.style.WebkitUserSelect = 'none';
                } else if (element.style.KhtmlUserSelect !== undefined) {
                    element.style.KhtmlUserSelect = 'none';
                }
            }
        }
    };
    function updateFixedOffset(){
        var layer = document.getElementById('edui_fixedlayer');
        uiUtils.setViewportOffset(layer, {
            left: 0,
            top: 0
        });
        layer.style.display = 'none';
        layer.style.display = 'block';
    }
    function bindFixedLayer(adjOffset){
        domUtils.on(window, 'scroll', updateFixedOffset);
    }
})();

(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        EventBase = baidu.editor.EventBase,
        UIBase = baidu.editor.ui.UIBase = function (){};

    UIBase.prototype = {
        className: '',
        uiName: '',
        initOptions: function (options){
            var me = this;
            for (var k in options) {
                me[k] = options[k];
            }
            this.id = this.id || 'edui' + uiUtils.uid();
        },
        initUIBase: function (){
            this._globalKey = utils.unhtml( uiUtils.setGlobal(this.id, this) );
        },
        render: function (holder){
            var html = this.renderHtml();
            var el = uiUtils.createElementByHtml(html);
            var seatEl = this.getDom();
            if (seatEl != null) {
                seatEl.parentNode.replaceChild(el, seatEl);
                uiUtils.copyAttributes(el, seatEl);
            } else {
                if (typeof holder == 'string') {
                    holder = document.getElementById(holder);
                }
                holder = holder || uiUtils.getFixedLayer();
                holder.appendChild(el);
            }
            this.postRender();
        },
        getDom: function (name){
            if (!name) {
                return document.getElementById( this.id );
            } else {
                return document.getElementById( this.id + '_' + name );
            }
        },
        postRender: function (){

        },
        getHtmlTpl: function (){
            return '';
        },
        formatHtml: function (tpl){
            var prefix = 'edui-' + this.uiName;
            return (tpl
                .replace(/##/g, this.id)
                .replace(/%%-/g, this.uiName ? prefix + '-' : '')
                .replace(/%%/g, (this.uiName ? prefix : '') + ' ' + this.className)
                .replace(/\$\$/g, this._globalKey));
        },
        renderHtml: function (){
            return this.formatHtml(this.getHtmlTpl());
        },
        dispose: function (){
            var box = this.getDom();
            if (box) domUtils.remove( box );
            uiUtils.unsetGlobal(this.id);
        }
    };
    utils.inherits(UIBase, EventBase);
})();

(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils;
    
    var TPL_STATEFUL = 'onmousedown="$$.Stateful_onMouseDown(event, this);"' +
        ' onmouseup="$$.Stateful_onMouseUp(event, this);"' +
        ( browser.ie ? (
        ' onmouseenter="$$.Stateful_onMouseEnter(event, this);"' +
        ' onmouseleave="$$.Stateful_onMouseLeave(event, this);"' )
        : (
        ' onmouseover="$$.Stateful_onMouseOver(event, this);"' +
        ' onmouseout="$$.Stateful_onMouseOut(event, this);"' ));
    
    baidu.editor.ui.Stateful = {
        Stateful_init: function (){
            this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
            this.getHtmlTpl = this.Stateful_getHtmlTpl;
        },
        Stateful_getHtmlTpl: function (){
            var tpl = this._Stateful_dGetHtmlTpl();
            // 使用function避免$转义
            return tpl.replace(/stateful/g, function (){ return TPL_STATEFUL; });
        },
        Stateful_onMouseEnter: function (evt, el){
            if (!this.isDisabled()) {
                this.addState('hover');
                this.fireEvent('over');
            }
        },
        Stateful_onMouseLeave: function (evt, el){
            if (!this.isDisabled()) {
                this.removeState('hover');
                this.removeState('active');
                this.fireEvent('out');
            }
        },
        Stateful_onMouseOver: function (evt, el){
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseEnter(evt, el);
            }
        },
        Stateful_onMouseOut: function (evt, el){
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseLeave(evt, el);
            }
        },
        Stateful_onMouseDown: function (evt, el){
            if (!this.isDisabled()) {
                this.addState('active');
            }
        },
        Stateful_onMouseUp: function (evt, el){
            if (!this.isDisabled()) {
                this.removeState('active');
            }
        },
        hasState: function (state){
            return domUtils.hasClass(this.getStateDom(), 'edui-state-' + state);
        },
        addState: function (state){
            this.getStateDom().className += ' edui-state-' + state;
        },
        removeState: function (state){
            domUtils.removeClasses(this.getStateDom(), ['edui-state-' + state]);
        },
        getStateDom: function (){
            return this.getDom('state');
        },
        isChecked: function (){
            return this.hasState('checked');
        },
        setChecked: function (checked){
            if (checked) {
                this.addState('checked');
            } else {
                this.removeState('checked');
            }
        },
        isDisabled: function (){
            return this.hasState('disabled');
        },
        setDisabled: function (disabled){
            if (disabled) {
                this.removeState('hover');
                this.removeState('active');
                this.addState('disabled');
            } else {
                this.removeState('disabled');
            }
        }
    };
})();

(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Sparator = baidu.editor.ui.Separator = function (options){
            this.initOptions(options);
            this.initSparator();
        };
    Sparator.prototype = {
        uiName: 'sparator',
        initSparator: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%"></div>';
        }
    };
    utils.inherits(Sparator, UIBase);

})();

(function (){
    var utils = baidu.editor.utils,
        browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        uiUtils = baidu.editor.ui.uiUtils;
    
    var Mask = baidu.editor.ui.Mask = function (options){
        this.initOptions(options);
        this.initUIBase();
    };
    Mask.prototype = {
        getHtmlTpl: function (){
            return '<div id="##" class="edui-mask %%" onmousedown="return $$._onMouseDown(event, this);"></div>';
        },
        postRender: function (){
            var me = this;
            domUtils.on(window, 'resize', function (){
                if (!me.isHidden()) {
                    me._fill();
                }
            });
        },
        show: function (){
            this._fill();
            this.getDom().style.display = '';
        },
        hide: function (){
            this.getDom().style.display = 'none';
        },
        isHidden: function (){
            return this.getDom().style.display == 'none';
        },
        _onMouseDown: function (){
            return false;
        },
        _fill: function (){
            var el = this.getDom();
            var vpRect = uiUtils.getViewportRect();
            el.style.width = vpRect.width + 'px';
            el.style.height = vpRect.height + 'px';
        }
    };
    utils.inherits(Mask, UIBase);
})();

(function () {
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        Popup = baidu.editor.ui.Popup = function (options){
            this.initOptions(options);
            this.initPopup();
        };

    var allPopups = [];
    function closeAllPopup( el ){
        var newAll = [];
        for ( var i = 0; i < allPopups.length; i++ ) {
            var pop = allPopups[i];
            if (!pop.isHidden()) {
                if (pop.queryAutoHide(el) !== false) {
                    pop.hide();
                }
            }
        }
    }

    Popup.postHide = closeAllPopup;

    var ANCHOR_CLASSES = ['edui-anchor-topleft','edui-anchor-topright',
        'edui-anchor-bottomleft','edui-anchor-bottomright'];
    Popup.prototype = {
        SHADOW_RADIUS: 5,
        content: null,
        _hidden: false,
        initPopup: function (){
            this.initUIBase();
            allPopups.push( this );
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-popup %%">' +
                ' <div id="##_body" class="edui-popup-body" onmousedown="return false;">' +
                '  <div class="edui-shadow"></div>' +
                '  <div id="##_content" class="edui-box edui-popup-content">' +
                this.getContentHtmlTpl() +
                '  </div>' +
                ' </div>' +
                '</div>';
        },
        getContentHtmlTpl: function (){
            if (typeof this.content == 'string') {
                return this.content;
            }
            return this.content.renderHtml();
        },
        postRender: function (){
            if (this.content instanceof UIBase) {
                this.content.postRender();
            }
            this.hide();
        },
        mesureSize: function (){
            var box = this.getDom('content');
            return uiUtils.getClientRect(box);
        },
        fitSize: function (){
            var popBodyEl = this.getDom('body');
            popBodyEl.style.width = '';
            popBodyEl.style.height = '';
            var size = this.mesureSize();
            popBodyEl.style.width = size.width + 'px';
            popBodyEl.style.height = size.height + 'px';
            return size;
        },
        showAnchor: function ( element, hoz ){
            this.showAnchorRect( uiUtils.getClientRect( element ), hoz );
        },
        showAnchorRect: function ( rect, hoz ){
            var vpRect = uiUtils.getViewportRect();
            var popSize = this.fitSize();
            
            var sideLeft, sideUp, left, top;
            if (hoz) {
                sideLeft = (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
                sideUp = (rect.top + popSize.height > vpRect.bottom && rect.bottom > popSize.height);
                left = (sideLeft ? rect.left - popSize.width : rect.right);
                top = (sideUp ? rect.bottom - popSize.height : rect.top);
            } else {
                sideLeft = (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
                sideUp = (rect.bottom + popSize.height > vpRect.bottom && rect.top > popSize.height);
                left = (sideLeft ? rect.right - popSize.width : rect.left);
                top = (sideUp ? rect.top - popSize.height : rect.bottom);
            }
            
            var popEl = this.getDom();
            uiUtils.setViewportOffset(popEl, {
                left: left,
                top: top
            });
            domUtils.removeClasses(popEl, ANCHOR_CLASSES);
            popEl.className += ' ' + ANCHOR_CLASSES[(sideUp ? 1 : 0) * 2 + (sideLeft ? 1 : 0)];
            this._show();
        },
        showAt: function (offset) {
            var left = offset.left;
            var top = offset.top;
            var rect = {
                left: left,
                top: top,
                right: left,
                bottom: top,
                height: 0,
                width: 0
            };
            this.showAnchorRect(rect);
        },
        _show: function (){
            if (this._hidden) {
                var box = this.getDom();
                box.style.visibility = 'visible';
                this._hidden = false;
//                if (box.setActive) {
//                    box.setActive();
//                }
                this.fireEvent('show');
            }
        },
        isHidden: function (){
            return this._hidden;
        },
        show: function (){
            this._show();
        },
        hide: function (){
            if (!this._hidden) {
//                this.getDom().style.visibility = 'hidden';
                this.getDom().style.left = '-32768px';
                this.getDom().style.top = '-32768px';
                this._hidden = true;
                this.fireEvent('hide');
            }
        },
        queryAutoHide: function (el){
            return !el || !uiUtils.contains(this.getDom(), el);
        }
    };
    utils.inherits(Popup, UIBase);
    
    domUtils.on( document, 'mousedown', function ( evt ) {
        var el = evt.target || evt.srcElement;
        closeAllPopup( el );
    } );
    domUtils.on( window, 'scroll', function () {
        closeAllPopup();
    } );

//    var lastVpRect = uiUtils.getViewportRect();
//    domUtils.on( window, 'resize', function () {
//        var vpRect = uiUtils.getViewportRect();
//        if (vpRect.width != lastVpRect.width || vpRect.height != lastVpRect.height) {
//            closeAllPopup();
//        }
//    } );

})();

(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Stateful = baidu.editor.ui.Stateful,
        Button = baidu.editor.ui.Button = function (options){
            this.initOptions(options);
            this.initButton();
        };
    Button.prototype = {
        uiName: 'button',
        label: '',
        title: '',
        initButton: function (){
            this.initUIBase();
            this.Stateful_init();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%">' +
                '<div id="##_state" stateful>' +
                '<div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : '') +
                ' class="%%-body" onmousedown="return false;" onclick="return $$._onClick();">' + this.label + '</div></div>' +
                '</div></div>';
        },
        _onClick: function (){
            if (!this.isDisabled()) {
                this.fireEvent('click');
            }
        }
    };
    utils.inherits(Button, UIBase);
    utils.extend(Button.prototype, Stateful);

})();

(function (){
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Stateful = baidu.editor.ui.Stateful,
        Popup = baidu.editor.ui.Popup,
        Mask = baidu.editor.ui.Mask,
        SplitButton = baidu.editor.ui.SplitButton = function (options){
            this.initOptions(options);
            this.initSplitButton();
        };
    SplitButton.prototype = {
        popup: null,
        uiName: 'splitbutton',
        title: '',
        initSplitButton: function (){
            this.initUIBase();
            this.Stateful_init();
            var me = this;
        },
        postRender: function (){
            this.popup.className = this.className;
            this.popup.render();
            this.popup.addListener('show', utils.bind(this._onPopupShow, this));
            this.popup.addListener('hide', utils.bind(this._onPopupHide, this));
            this.popup.getDom('body').appendChild(
                uiUtils.createElementByHtml('<div id="' +
                    this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' +
                    (uiUtils.getClientRect(this.getDom()).width - 2) + 'px"></div>')
                );
        },
        _onPopupShow: function (){
            this.addState('opened');
        },
        _onPopupHide: function (){
            this.removeState('opened');
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%">' +
                '<div '+ (this.title ? 'title="' + this.title + '"' : '') +' id="##_state" stateful><div class="%%-body">' +
                '<div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"></div>' +
                '<div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div>' +
                '</div></div></div>';
        },
        showPopup: function (){
            // 当popup往上弹出的时候，做特殊处理
            var rect = uiUtils.getClientRect(this.getDom());
            rect.top -= this.popup.SHADOW_RADIUS;
            rect.height += this.popup.SHADOW_RADIUS;
            this.popup.showAnchorRect(rect);
        },
        _onArrowClick: function (event, el){
            if (!this.isDisabled()) {
                this.showPopup();
            }
        },
        _onButtonClick: function (){
            if (!this.isDisabled()) {
                this.fireEvent('buttonclick');
            }
        }
    };
    utils.inherits(SplitButton, UIBase);
    utils.extend(SplitButton.prototype, Stateful, true);

})();

(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Toolbar = baidu.editor.ui.Toolbar = function (options){
            this.initOptions(options);
            this.initToolbar();
        };
    Toolbar.prototype = {
        items: null,
        initToolbar: function (){
            this.items = this.items || [];
            this.initUIBase();
        },
        add: function (item){
            this.items.push(item);
        },
        getHtmlTpl: function (){
            var buff = [];
            for (var i=0; i<this.items.length; i++) {
                buff[i] = this.items[i].renderHtml();
            }
            return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' +
                buff.join('') +
                '</div>'
        },
        postRender: function (){
            var box = this.getDom();
            for (var i=0; i<this.items.length; i++) {
                this.items[i].postRender();
            }
            uiUtils.makeUnselectable(box);
        },
        _onMouseDown: function (){
            return false;
        }
    };
    utils.inherits(Toolbar, UIBase);

})();

(function (){
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Popup = baidu.editor.ui.Popup,
        Stateful = baidu.editor.ui.Stateful,
        Menu = baidu.editor.ui.Menu = function (options){
            this.initOptions(options);
            this.initMenu();
        };
    
    Menu.prototype = {
        items: null,
        uiName: 'menu',
        initMenu: function (){
            this.items = this.items || [];
            this.initPopup();
            this.initItems();
        },
        initItems: function (){
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                if (!(item instanceof MenuItem)) {
                    this.items[i] = this.createItem(item);
                }
            }
        },
        createItem: function (item){
            return new MenuItem(item);
        },
        getContentHtmlTpl: function (){
            var buff = [];
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                buff[i] = item.renderHtml();
            }
            return ('<ul class="edui-box %%-body">' + buff.join('') + '</ul>');
        },
        _Popup_postRender: Popup.prototype.postRender,
        postRender: function (){
            var me = this;
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                item.ownerMenu = this;
                item.postRender();
            }
            domUtils.on(this.getDom(), 'mouseover', function (evt){
                evt = evt || event;
                var rel = evt.relatedTarget || evt.fromElement;
                var el = me.getDom();
                if (!uiUtils.contains(el, rel) && el !== rel) {
                    me.fireEvent('over');
                }
            });
            this._Popup_postRender();
        },
        queryAutoHide: function (el){
            if (el) {
                if (uiUtils.contains(this.getDom(), el)) {
                    return false;
                }
                for (var i=0; i<this.items.length; i++) {
                    var item = this.items[i];
                    if (item.queryAutoHide(el) === false) {
                        return false;
                    }
                }
            }
        }
    };
    utils.inherits(Menu, Popup);
    
    var MenuItem = baidu.editor.ui.MenuItem = function (options){
        this.initOptions(options);
        this.initUIBase();
        this.Stateful_init();
        if (this.subMenu && !(this.subMenu instanceof Menu)) {
            this.subMenu = new Menu(this.subMenu);
        }
    };
    MenuItem.prototype = {
        label: '',
        subMenu: null,
        ownerMenu: null,
        uiName: 'menuitem',
        getHtmlTpl: function (){
            return '<li id="##" class="edui-box %%" stateful onclick="$$._onClick(event, this);">' +
                '<div class="%%-body">' +
                this.renderLabelHtml() +
                '</div>' +
                '</li>';
        },
        postRender: function (){
            if (this.subMenu) {
                this.getDom().className += ' edui-hassubmenu';
                this.subMenu.render();
                var me = this;
                this.addListener('over', function (){
                    if (!me.isDisabled()) {
                        me.addState('opened');
                        me.showSubMenu();
                    }
                });
                this.addListener('out', function (){
                    if (!me.isDisabled()) {
                        me.removeState('opened');
                        me._closingTimer = setTimeout(function (){
                            if (!me.hasState('opened')) {
                                me.hideSubMenu();
                            }
                        }, 250);
                    }
                });
                this.subMenu.addListener('over', function (){
                    clearTimeout(me._closingTimer);
                    me.addState('opened');
                });
                this.ownerMenu.addListener('hide', function (){
                    me.hideSubMenu();
                });
            }
            this.getDom().style.tabIndex = '-1';
            uiUtils.makeUnselectable(this.getDom());
        },
        renderLabelHtml: function (){
            return '<div class="edui-label %%-label">' + (this.label || '') + '</div>';
        },
        getStateDom: function (){
            return this.getDom();
        },
        queryAutoHide: function (el){
            if (this.subMenu && this.hasState('opened')) {
                return this.subMenu.queryAutoHide(el);
            }
        },
        _onClick: function (event, this_){
            if (this.fireEvent('click', event, this_) !== false) {
                if (this.subMenu) {
                    this.showSubMenu();
                } else {
                    Popup.postHide();
                }
            }
        },
        showSubMenu: function (){
            var rect = uiUtils.getClientRect(this.getDom());
            rect.right -= 5;
            rect.left += 2;
            rect.width -= 7;
            rect.top -= 4;
            rect.bottom += 4;
            rect.height += 8;
            this.subMenu.showAnchorRect(rect, true);
        },
        hideSubMenu: function (){
            this.subMenu.hide();
        }
    };
    utils.inherits(MenuItem, UIBase);
    utils.extend(MenuItem.prototype, Stateful, true);
})();
