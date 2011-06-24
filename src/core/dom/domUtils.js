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

        keys : {
            /*Backspace*/ 8:1, /*Delete*/ 46:1,
            /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1,
            37:1, 38:1, 39:1, 40:1,
            13:1 /*enter*/
        },
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
                while ( node && node.tagName && node.nodeType != 9 ) {
                   
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
        mergChild : function( node,tagName,attrs ) {
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
                    ci.style.cssText  =  node.style.cssText + ';' + ci.style.cssText;
                    if(attrs){
                        var style = attrs.style;
                        if(style){
                            style = style.split(';');
                            for(var j=0,s;s=style[j++];){
                               ci.style[utils.cssStyleToDomStyle(s.split(':')[0])] = s.split(':')[1];
                            }
                        }
                    }
                    if(domUtils.isSameStyle(ci,node)){
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
        },
        /**
         * 清除冗余的inline标签
         * @param node node下的冗余节点
         * @param tags 清除的节点的列表
         * @example <div><b><i></i></b></div> ==> <div></div>
         */
        clearReduent : function(node,tags){

            var nodes,
                reg = new RegExp( domUtils.fillChar, 'g' ),
                _parent;
            for(var t=0,ti;ti=tags[t++];){
                   nodes = node.getElementsByTagName(ti);
                  
                   for(var i=0,ci;ci=nodes[i++];){
                      if( ci.parentNode && ci[browser.ie?'innerText':'textContent'].replace(reg,'').length == 0 && ci.children.length == 0 ){

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
        isEmptyNode : function(node){
            var first = node.firstChild;
            return !first || node.childNodes.length == 1 &&
                   (first.nodeType == 1 ? first.tagName == 'BR' : domUtils.isWhitespace(first));
        },
        clearSelectedArr : function(nodes){
            var node;
            while(node = nodes.pop()){
                node.className = ''
            }
        }

    };
})();
