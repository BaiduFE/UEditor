/**
 * 添加基本样式
 * @function
 * @name baidu.editor.commands.basestyle
 * @example
 * 	xx[xx]x (加粗) xx<b>[xx]</b>
 *  xx|xx (加粗)  xx<b>|</b>xx 再输入的文字是加粗的状态
 *  <b>x[xx]</b> (加粗)  <b>x</b>[xx]
 *	<b><i><u>x[xx]x</u></i></b> (斜体)<b><i><u>x</u></i><u>[xx]</u><i><u>x</u></i></b>
 *	<b><i><u>[xxxx]</u></i></b> (斜体)<b><u>[xxxx]</u></b>
 *	Xx|xx (加粗斜体下划线) xx<b><i><u>|</u></i></b>xx
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
        };
    for ( var style in basestyles ) {
        (function( cmd, tagNames ) {
            baidu.editor.commands[cmd] = {
                execCommand : function( cmdName ) {
                    var range = this.selection.getRange(),
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
                        }
                        range.collapse( true )

                    } else {
                        obj ? range.removeInlineStyle( tagNames ) : range.applyInlineStyle( tagNames[0] )
                    }

                    range.select();
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
 * 
 * 引用模块实现
 * @function
 * @name baidu.editor.commands.blockquate
 * @author zhanyi
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd,
        getObj = function(editor){
            var startNode = editor.selection.getStart();
            return domUtils.findParentByTagName( startNode, 'blockquote', true )
        };

    baidu.editor.commands['blockquote'] = {
        execCommand : function( cmdName, attrs ) {
          
            var range = this.selection.getRange(),
                obj = getObj(this),
                blockquote = dtd.blockquote,
                bookmark = range.createBookmark();
            if ( obj ) {
                if ( range.collapsed ) {
                    domUtils.remove( obj, true )
                } else {

                    var common = domUtils.getCommonAncestor( obj, bookmark.end );

                    if ( obj === common ) {
                        domUtils.remove( obj, true );
                    } else {
                        for ( var i = 0,ci,blockquotes = domUtils.getElementsByTagName( common, 'blockquote' ); ci = blockquotes[i++]; ) {
                            if ( domUtils.getPosition( ci, bookmark.end ) & domUtils.POSITION_FOLLOWING )
                                break;
                            domUtils.remove( ci, true );

                        }
                    }
                }
            } else {

                var tmpRange = range.cloneRange(),
                    node = tmpRange.startContainer.nodeType == 1 ? tmpRange.startContainer : tmpRange.startContainer.parentNode,
                    preNode = node;

                //调整开始
                while ( 1 ) {
                    if ( domUtils.isBody(node) ) {
                        if ( preNode !== node ) {
                            if ( range.collapsed ) {
                                tmpRange.selectNode( preNode )
                            } else {
                                tmpRange.setStartBefore( preNode );
                            }
                        }else{
                            tmpRange.setStart(node,0)
                        }

                        break;
                    }
                    if ( !blockquote[node.tagName] ) {
                        if ( range.collapsed ) {
                            tmpRange.selectNode( preNode )
                        } else
                            tmpRange.setStartBefore( preNode);
                        break;
                    }

                    preNode = node;
                    node = node.parentNode;
                }
                //调整结束
              //  if ( !range.collapsed ) {
                    preNode = node =  node = tmpRange.endContainer.nodeType == 1 ? tmpRange.endContainer : tmpRange.endContainer.parentNode;
                    while ( 1 ) {

                        if ( domUtils.isBody( node ) ) {
                            if ( preNode !== node ) {

                                    tmpRange.setEndAfter( preNode );
                                
                            } else {
                                tmpRange.setEnd( node, node.childNodes.length )
                            }

                            break;
                        }
                        if ( !blockquote[node.tagName] ) {
                            tmpRange.setEndAfter( preNode );
                            break;
                        }

                        preNode = node;
                        node = node.parentNode;
                    }

              //  }


                node = range.document.createElement( 'blockquote' );
                domUtils.setAttributes( node, attrs );
                node.appendChild( tmpRange.extractContents() );
                tmpRange.insertNode( node );
            }
            range.moveToBookmark( bookmark ).select()
        },
        queryCommandState : function() {

            return getObj(this) ? 1 : 0;
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
        };


    baidu.editor.commands['directionality'] = {
        execCommand : function( cmdName,forward ) {

            var range = this.selection.getRange(),
                bookmark,
                filterFn = function( node ) {
                    return   node.nodeType == 1 ? !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace(node)
                },

                obj = getObj( this );

            if ( obj && range.collapsed ) {
                obj.setAttribute( 'dir', forward );
                return true;
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
            range.moveToBookmark( bookmark2 ).moveToBookmark( bookmark ).select();
            return true;
        },
        queryCommandValue : function() {
            var node = getObj(this);
            return node ? node.getAttribute('dir') : 'ltr'
        }
    }
})();

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
/**
 * @description 字体
 * @author zhanyi
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
        fonts = {
            'forecolor':'color',
            'backcolor':'background-color',
            'fontsize':'font-size',
            'fontfamily':'font-family'
        };
    for ( var p in fonts ) {
        (function( cmd, style ) {
            baidu.editor.commands[cmd] = {
                execCommand : function( cmdName, value ) {
                    var me = this,
                        range = this.selection.getRange();

                    if ( value == 'default' ) {
                        if ( !this.commands['removeformat'] && !baidu.editor.commands['removeformat'] ) {
                            throw new Error( '需要removeformat命令' )
                        }
                        me.execCommand( 'removeFormat', 'span', style, null, true );

                    } else {
                        if ( !range.collapsed ) {
                            range.applyInlineStyle( 'span', {'style':style + ':' + value} ).select();
                        } else {
                            var span = range.document.createElement( 'span' );
                            span.style.cssText = style + ':' + value;
                            range.insertNode( span ).setStart( span, 0 ).setCursor();
                        }
                    }
                    return true;
                },
                queryCommandValue : function () {
                    var startNode = this.selection.getStart();

                    return  domUtils.getComputedStyle( startNode, style );
                }
            }
        })( p, fonts[p] );
    }

})();
/*
 ** @description 分割线
 * @author zhanyi
 */
(function (){
    var domUtils = baidu.editor.dom.domUtils;
    baidu.editor.commands['horizontal'] = {
        execCommand : function( cmdName ) {
            if(this.queryCommandState(cmdName)!==-1){
                this.execCommand('insertHtml','<hr>');
                return true;
            }

        },
        //边界在table里不能加分隔线
        queryCommandState : function() {
            var range = this.selection.getRange();
            return domUtils.findParentByTagName(range.startContainer,'table') ||
                domUtils.findParentByTagName(range.endContainer,'table') ? -1 : 0;
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
                div;

            range = editor.selection.getRange();

            div = range.document.createElement( 'div' );
            div.style.display = 'inline';
            div.innerHTML = utils.trim( html );

            if ( !range.collapsed ) {
                //startContainer or endContainer in table,only delete content in td,remain td tag
                if ( domUtils.findParentByTagName( range.startContainer, ['td','tr','table'], true ) ||
                    domUtils.findParentByTagName( range.endContainer, ['td','tr','table'], true ) ) {
                    range.applyInlineStyle( 'del' );
                    deletedElms = range.document.getElementsByTagName( 'del' );
                    range.setStartBefore( deletedElms[0] );
                    for(i=0;ci=deletedElms[i++];){
                        domUtils.remove( ci );
                    }
                } else {
                    range.deleteContents();
                }
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
                        hadBreak = 1;
                    }
                }
                range.setEndAfter( child ).collapse();
            }

            range.select(true);
        }
    };
}());
/**
 * @description 居左右中
 * @author zhanyi
 */
(function(){
    var domUtils = baidu.editor.dom.domUtils,
        block = domUtils.isBlockElm,
        defaultValue = {
            left : 1,
            right : 1,
            center : 1,
            justify : 1
        };
    baidu.editor.commands['justify'] =  {
        execCommand : function( cmdName,align ) {

            var range = this.selection.getRange(),
                bookmark = range.createBookmark(),
                filterFn = function( node ) {
                    return node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' &&  !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace( node )
                };

            range.enlarge(true);
            var bookmark2 = range.createBookmark(),
                current = domUtils.getNextDomNode(bookmark2.start,false,filterFn),
                tmpRange = range.cloneRange(),
                tmpNode;
            while(current &&  !(domUtils.getPosition(current,bookmark2.end)&domUtils.POSITION_FOLLOWING)){
                if(current.nodeType == 3 || !block(current)){
                    tmpRange.setStartBefore(current);
                    while(current && current!==bookmark2.end &&  !block(current)){
                        tmpNode = current;
                        current = domUtils.getNextDomNode(current,false,null,function(node){
                            return !block(node)
                        });
                    }
                    tmpRange.setEndAfter(tmpNode);
                    var common = tmpRange.getCommonAncestor();
                    if( !domUtils.isBody(common) && block(common)){
                        common.style.textAlign = align;
                        current = common;
                    }else{
                        var p = range.document.createElement('p');
                        p.style.textAlign = align;
                        var frag = tmpRange.extractContents();
                        p.appendChild(frag);
                        tmpRange.insertNode(p);
                        current = p;
                    }
                    current = domUtils.getNextDomNode(current,false,filterFn);
                }else{
                    current = domUtils.getNextDomNode(current,true,filterFn);
                }
            }
            range.moveToBookmark(bookmark2).moveToBookmark(bookmark).select();
            return true;
        },
        queryCommandValue : function() {
            var startNode = this.selection.getStart(),
                value = domUtils.getComputedStyle(startNode,'text-align');
            return defaultValue[value] ? value : 'left';
        }
    }



})();
/**
 * @description link
 * @author zhanyi
 */
(function() {
    var dom = baidu.editor.dom,
        dtd = dom.dtd,
        domUtils = dom.domUtils;

    function optimize( range ) {
        var start = range.startContainer,end = range.endContainer;

        if ( start = domUtils.findParentByTagName( start, 'a', true ) ) {
            range.setStartBefore( start )
        }
        if ( end = domUtils.findParentByTagName( end, 'a', true ) ) {
            range.setEndAfter( end )
        }
    }

    baidu.editor.commands['unlink'] = {
        execCommand : function() {
            var range = this.selection.getRange(),

                bookmark = range.createBookmark();

            optimize( range );
            range.removeInlineStyle( 'a' ).moveToBookmark( bookmark ).select();
        }
    };
    baidu.editor.commands['link'] = {
        execCommand : function( cmdName, opt ) {
            var range = this.selection.getRange();



            optimize( range );

            range.removeInlineStyle( 'a' );


            if ( range.collapsed ) {

                var a = range.document.createElement( 'a' );
                domUtils.setAttributes( a, opt );
                a.innerHTML = a.href;
                range.insertNode( a ).selectNode( a ).select();
            } else {
                range.applyInlineStyle( 'a', opt ).select()
            }
        },
        queryCommandValue : function() {

            var range = this.selection.getRange(),
                node;


            if ( range.collapsed ) {
                node = this.selection.getStart();
                if ( node && (node = domUtils.findParentByTagName( node, 'a', true )) ) {
                    return node;
                }
            } else {
                var start = range.startContainer.nodeType  == 3 || !range.startContainer[range.startOffset] ? range.startContainer : range.startContainer[range.startOffset],
                    end =  range.endContainer.nodeType == 3 || range.endOffset == 0 ? range.endContainer : range.endContainer[range.endOffset-1],

                    common = range.getCommonAncestor();


                node = domUtils.findParentByTagName( common, 'a', true );
                if ( !node && common.nodeType == 1){

                    var as = common.getElementsByTagName( 'a' ),
                        ps,pe;

                    for ( var i = 0,ci; ci = as[i++]; ) {
                        ps = domUtils.getPosition( ci, start ),pe = domUtils.getPosition( ci,end);
                        if ( (ps & domUtils.POSITION_FOLLOWING || ps & domUtils.POSITION_CONTAINS)
                            &&
                            (pe & domUtils.POSITION_PRECEDING || pe & domUtils.POSITION_CONTAINS)
                            ) {
                            node = ci;
                            break;
                        }
                    }
                }

                return node;
            }

        }
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
                    for ( var i = 0,ci; ci = lis[i++]; ) {
                        ci = ci.lastChild;
                        if ( ci.nodeType == 1 && ci.tagName.toLowerCase() == 'br' )
                            domUtils.remove( ci );
                    }
                    if ( parent.parentNode.tagName.toLowerCase() == 'p' ) {
                        domUtils.remove( parent.parentNode, true )
                    }
                }
                parent.style.listStyleType = style
            }


        },
        queryCommandState : function( command ) {
            var startNode = this.selection.getStart();
            return domUtils.findParentByTagName( startNode, command == 'insertorderedlist' ? 'ol' : 'ul', true );
        },
        queryCommandValue : function( command ) {
            var node = this.queryCommandState( command );
            return node ? domUtils.getStyle( node, 'list-style-type' ) : null;
        }
    }

})();
/**
 * @description 段落样式
 * @author zhanyi
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
            block = domUtils.isBlockElm;
    baidu.editor.commands['paragraph'] = {
        execCommand : function( cmdName, style ) {
            var range = this.selection.getRange(),
                    bookmark = range.createBookmark(),
                    filterFn = function( node ) {
                        return  !domUtils.isBookmarkNode(node)
                    },
                    para;

            range.enlarge( true );
            var bookmark2 = range.createBookmark(),
                current = domUtils.getNextDomNode( bookmark2.start, false, filterFn ),
                tmpRange = range.cloneRange(),
                tmpNode;
            while ( current && !(domUtils.getPosition( current, bookmark2.end ) & domUtils.POSITION_FOLLOWING) ) {
                if ( current.nodeType == 3 || !block( current ) ) {
                    tmpRange.setStartBefore( current );
                    while ( current && current !== bookmark2.end && !block( current ) ) {
                        tmpNode = current;
                        current = domUtils.getNextDomNode( current, false, null, function( node ) {
                            return !block( node )
                        } );
                    }
                    tmpRange.setEndAfter( tmpNode );

                    para = range.document.createElement( style );

                    para.appendChild( tmpRange.extractContents() );

                    tmpRange.insertNode( para );
                    var parent = para.parentNode;
                    //如果para上一级是一个block元素且不是body,td就删除它
                    if ( block( parent ) && !domUtils.isBody( para.parentNode ) && parent.tagName !== 'TD') {
                        //存储dir,textalign
                        para.setAttribute('dir',parent.getAttribute('dir'));
                        para.style.textAlign = parent.style.textAlign;

                        domUtils.remove( para.parentNode, true );

                    }
                    if( parent.tagName == 'TD'){
                        current = parent;
                    }else{
                       current = para;
                    }


                    current = domUtils.getNextDomNode( current, false, filterFn );
                } else {
                    current = domUtils.getNextDomNode( current, true, filterFn );
                }
            }
            range.moveToBookmark( bookmark2 ).moveToBookmark( bookmark ).select();
            return true;
        },
        queryCommandValue : function() {
            var startNode = this.selection.getStart(),
                parent =  domUtils.findParentByTagName( startNode, ['p','h1','h2','h3','h4','h5','h6'], true );

            return  parent && parent.tagName.toLowerCase();
        }
    }


})();
baidu.editor.commands['preview'] = {
    execCommand : function(){
        var w = window.open('', '_blank');
        var d = w.document;
        d.open();
        d.write(this.getContent());
        d.close();
    },
    notNeedUndo : 1
};

(function() {
    baidu.editor.commands['print'] = {
        execCommand : function(){
            this.window.print();
        },
        notNeedUndo : 1
    }
})();

/**
 * @description 清除样式
 * @author zhanyi
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd;
    baidu.editor.commands['removeformat'] = {
        execCommand : function( cmdName, tags, style, attrs, notEnlarge ) {
            var tagReg = new RegExp( '^(?:' + (tags || this.options.removeFormatTags).replace( /,/g, '|' ) + ')$', 'i' ) ,
                removeFormatAttributes = style ? [] : (attrs || this.options.removeFormatAttributes).split( ',' ),
                range = this.selection.getRange(),
                bookmark,node,parent,
                filter = function( node ) {
                    return node.nodeType == 1;
                };
            if ( range.collapsed && !notEnlarge ) {
                range.enlarge( true );
            }

            bookmark = range.createBookmark();

            node = bookmark.start;
            //切开始
            while ( (parent = node.parentNode) && !domUtils.isBlockElm( parent ) ) {
                domUtils.breakParent( node, parent );
                domUtils.clearEmptySibling( node );
            }
            if ( bookmark.end ) {
                //切结束
                node = bookmark.end;
                while ( (parent = node.parentNode) && !domUtils.isBlockElm( parent ) ) {
                    domUtils.breakParent( node, parent );
                    domUtils.clearEmptySibling( node );
                }

                //开始去除样式
                var current = domUtils.getNextDomNode( bookmark.start, false, filter ),
                    next;
                while ( current ) {
                    if ( current == bookmark.end ) {
                        break;
                    }

                    next = domUtils.getNextDomNode( current, true, filter );
                    if ( !dtd.$empty[current.tagName.toLowerCase()] && !domUtils.isBookmarkNode( current ) ) {
                        if ( tagReg.test( current.tagName ) ) {
                            if ( style ) {
                                domUtils.removeStyle( current, style );
                                if ( domUtils.isRedundantSpan( current ) )
                                    domUtils.remove( current, true );
                            } else {
                                domUtils.remove( current, true )
                            }

                        } else {
                            domUtils.removeAttributes( current, removeFormatAttributes );
                            if ( domUtils.isRedundantSpan( current ) )
                                domUtils.remove( current, true );

                        }
                    }
                    current = next;
                }
            }
            range.moveToBookmark( bookmark ).select();
        }

    }
})();
(function(){
    var first = 0;

    baidu.editor.commands['searchreplace'] = {
            execCommand : function(cmdName,opt){
               	var editor = this,
                    sel = editor.selection,
                    range,
                    nativeRange;
                opt = baidu.editor.utils.extend(opt,{
                    replaceStr : null,
                    all : false,
                    casesensitive : false,
                    dir : 1
                });


                if(baidu.editor.browser.ie){
                    while(1){
                        var tmpRange;
                        nativeRange = editor.document.selection.createRange();
                        tmpRange = nativeRange.duplicate();
                        tmpRange.moveToElementText(editor.document.body);
                        if(opt.all && !first ){
                            first = 1;
                            opt.dir = 1;

                        }else{
                            tmpRange.setEndPoint(opt.dir == -1 ? 'EndToStart' : 'StartToEnd',nativeRange);
                        }
                        nativeRange = tmpRange.duplicate();


                        if(!tmpRange.findText(opt.searchStr,opt.dir,opt.casesensitive ? 4 : 0)){
                            first = 0;
                            tmpRange = editor.document.selection.createRange();
                            tmpRange.scrollIntoView();
                            return false;
                        }

                        tmpRange.select();
                        //替换
                        if(opt.replaceStr !== null){
                            range = sel.getRange();
                            range.deleteContents().insertNode(range.document.createTextNode(opt.replaceStr)).select();

                        }
                        if(!opt.all)break;
                    }
                }else{
                    var w = editor.window,nativeSel = sel.getNative();

                    while(1){
                        if(opt.all && !first){
                            nativeRange  = editor.document.createRange();
                            nativeRange.setStart(editor.document.body,0);
                            nativeRange.collapse(true);
                            nativeSel.removeAllRanges();
                            nativeSel.addRange( nativeRange );
                            first = 1;
                            opt.dir = 1;
                        }

                        if(!w.find(opt.searchStr,opt.casesensitive,opt.dir < 0 ? true : false)) {
                            first = 0;
                            return false;
                        }
                        range = w.getSelection().getRangeAt(0);
                        if(!range.collapsed){
                            if(opt.replaceStr){
                                range.deleteContents();
                                var text = w.document.createTextNode(opt.replaceStr);
                                range.insertNode(text);
                                range.selectNode(text);
                                nativeSel.addRange(range);
                            }
                        }
                        if(!opt.all)break;
                    }

                }
                return true;
            }
    }

})();
/**
 * 选中所有
 * @function
 * @name execCommand
 * @author zhanyi
*/
(function() {
    baidu.editor.commands['selectall'] = {
        execCommand : function(){
            this.document.execCommand('selectAll',false,null);
        },
        notNeedUndo : 1
    }
})();

/**
 * @description 字体
 * @author zhanyi
 */
(function() {
    var browser = baidu.editor.browser,
        textArea;
        baidu.editor.commands['source'] = {
            execCommand : function( cmdName ) {
                var me = this,
                    ifm = me.iframe;
                if(!textArea){
                    textArea = document.createElement('textarea');
                    ifm.parentNode.insertBefore(textArea,ifm);
                }

                if(ifm.style.display !== 'none'){
                    textArea.value = me.getContent();
                    textArea.style.cssText = 'display:block;width:'+(ifm.offsetWidth-5)+'px;height:'+me.body.offsetHeight+'px';
                    ifm.style.display = 'none';
                }else{
                    me.setContent(textArea.value);
                    textArea.style.display = 'none';
                    ifm.style.display = 'block';

                }
            }

        }


})();
(function () {
    var browser = baidu.editor.browser,
            domUtils = baidu.editor.dom.domUtils;

    /**
     * 插入表格
     * @param numRows 行数
     * @param numCols 列数
     */
    baidu.editor.commands['inserttable'] = {
        queryCommandState: function () {
            var range = this.selection.getRange();
            return (domUtils.findParentByTagName(range.startContainer, 'table', true)
                    || domUtils.findParentByTagName(range.endContainer, 'table', true)) ? -1 : 0;
        },
        execCommand: function (cmdName, numRows, numCols) {
            if (this.queryCommandState('inserttable') == -1) {
                return;
            }
            var div = this.document.createElement('div'),
                    rows = [];
            var j = numRows;
            if (j) while (j --) {
                var cols = [];
                var k = numCols;
                while (k --) {
                    cols[k] = '<td style="padding:5px; min-height: 20px; width:20px; min-width:20px;">' +
                            (browser.ie ? ( browser.version < 9 ? '&#65279' : '' ) : '<br/>') + '</td>';
                }
                rows.push('<tr>' + cols.join('') + '</tr>');
            }
            div.innerHTML = '<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse; word-wrap: break-word;">' + rows.join('') + '</table>';
            var range = this.selection.getRange();
            range.deleteContents();
            var table = div.firstChild;
            range.insertNode(table).setStart(table.rows[0].cells[0], 0).setCursor();
        }
    };

    /**
     * 删除表格
     */
    baidu.editor.commands['deletetable'] = {
        queryCommandState:function() {
            var range = this.selection.getRange();
            return (domUtils.findParentByTagName(range.startContainer, 'table', true)
                    && domUtils.findParentByTagName(range.endContainer, 'table', true)) ? 0 : -1;
        },
        execCommand:function() {
            if (this.queryCommandState('deletetable') == -1) {
                return;
            }

            var range = this.selection.getRange(),
                    start = range.startContainer,
                    table = domUtils.findParentByTagName(start, 'table', true);
            table && domUtils.remove(table);
        }
    };

    /**
     * 将一个cellFrom中的内容移动到cellTo中
     * @param cellTo 目标cell
     * @param cellFrom  源cell
     */
    function moveContent(cellTo, cellFrom) {

        var firstChild = cellFrom.firstChild,
                isEmpty = function(node) {
                    return node.childNodes.length == 1 &&
                            (node.firstChild.nodeName == "BR" || (baidu.editor.browser.ie && node.firstChild.nodeValue.length == 1 ))
                };
        if (isEmpty(cellFrom)) {
            return;
        }
        var lastChild = cellTo.lastChild;
        if (browser.webkit && lastChild.nodeName != "BR") {
            cellTo.appendChild(cellTo.ownerDocument.createElement("br"));
        }
        //如果cellTo本身是空的，那么删除掉cellTo中原来存在的占位符
        if (isEmpty(cellTo)) {
            domUtils.remove(cellTo.childNodes[0]);
        } else if (cellTo.lastChild.nodeName != "BR" && firstChild.nodeName != "BR") {
            cellTo.appendChild(cellTo.ownerDocument.createElement("br"));
        }

        while (firstChild = cellFrom.firstChild) {
            cellTo.appendChild(firstChild);
        }
    }

    /**
     * 检测当前cell是否被隐藏
     * @param cell
     */
    function isHide(cell) {
        return cell.style.display == "none";
    }

    /**
     * 向右合并单元格
     */
    baidu.editor.commands['mergeright'] = {
        queryCommandState : function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true);

            if (!td) {
                return -1;
            }
            var tr = td.parentNode;

            //最右边行不能向右合并
            var rightCellIndex = td.cellIndex + td.colSpan;
            if (rightCellIndex >= tr.cells.length) {
                return -1;
            }
            //单元格不在同一行不能向右合并
            var rightCell = tr.cells[rightCellIndex];
            if (isHide(rightCell)) {
                return -1;
            }
            return td.rowSpan == rightCell.rowSpan ? 0 : -1;

        },
        execCommand : function() {

            if (this.queryCommandState('mergeright') == -1) {
                return;
            }

            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true),
                    tr = td.parentNode,
                    rows = tr.parentNode.parentNode.rows;

            //找到当前行右边未被隐藏的单元格
            var rightNodeRowIndex = tr.rowIndex,
                rightNodeCellIndex = td.cellIndex + td.colSpan,
                rightNode = rows[rightNodeRowIndex].cells[rightNodeCellIndex];

            //在隐藏的原生td对象上增加两个属性，分别表示当前td对应的真实td坐标
            for(var i = rightNodeRowIndex; i < rightNodeRowIndex + rightNode.rowSpan; i++){
                for(var j = rightNodeCellIndex; j < rightNodeCellIndex + rightNode.colSpan; j++){
                    var tmp = rows[i].cells[j];
                    tmp.rootRowIndex= tr.rowIndex;
                    tmp.rootCellIndex = td.cellIndex;
                }
            }
            //合并单元格
            td.colSpan += rightNode.colSpan || 1;

            //合并内容
            moveContent(td, rightNode);

            //删除被合并的单元格，此处用隐藏方式实现来提升性能
            rightNode.style.display = "none";

            //重新让单元格获取焦点
            range.setStart(td, 0).setCursor();
        }
    };

    /**
     * 向下合并单元格
     */
    baidu.editor.commands['mergedown'] = {
        queryCommandState : function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, 'td', true);
            if (!td) {
                return -1;
            }
            var tr = td.parentNode,
                    table = tr.parentNode.parentNode,
                    rows = table.rows;

            //已经是最底行,不能向下合并
            var downCellRowIndex = tr.rowIndex + td.rowSpan;
            if (downCellRowIndex >= rows.length) {
                return -1;
            }

            //如果下一个单元格是隐藏的，表明他是由左边span过来的，不能向下合并
            var downCell = rows[downCellRowIndex].cells[td.cellIndex];
            if (isHide(downCell)) {
                return -1;
            }

            //只有列span都相等时才能合并
            return td.colSpan == downCell.colSpan ? 0 : -1;

        },
        execCommand : function() {

            if (this.queryCommandState('mergedown') == -1) {
                return;
            }

            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true),
                    tr = td.parentNode,
                    rows = tr.parentNode.parentNode.rows;


            var downNodeRowIndex = td.parentNode.rowIndex + td.rowSpan,
                downNodeCellIndex = td.cellIndex,
                downNode = rows[downNodeRowIndex].cells[downNodeCellIndex];

            //找到当前列的下一个未被隐藏的单元格
            for (var i = downNodeRowIndex; i < downNodeRowIndex + downNode.rowSpan; i++) {
                for(var j = downNodeCellIndex; j< downNodeCellIndex + downNode.colSpan; j++) {
                    var tmp = rows[i].cells[j];
                  //  tmp.setAttribute('rootRowIndex',tr.rowIndex);
                    tmp.rootRowIndex = tr.rowIndex;
                    tmp.rootCellIndex = td.cellIndex;
                }

            }

            //合并单元格
            td.rowSpan += downNode.rowSpan || 1;

            //合并内容
            moveContent(td, downNode);

            //删除被合并的单元格，此处用隐藏方式实现来提升性能
            downNode.style.display = "none";

            //重新让单元格获取焦点
            range.setStart(td, 0).setCursor();
        }

    };

    /**
     * 删除行
     */
    baidu.editor.commands['deleterow'] = {
        queryCommandState : function() {
        },
        execCommand : function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true),
                    tr = td.parentNode,
                    table = tr.parentNode.parentNode;

            var cells = tr.cells,
                    rows = table.rows,
                    rowIndex = tr.rowIndex,
                    cellIndex = td.cellIndex;

            /*
             * 从最左边开始扫描并隐藏当前行的所有单元格
             * 若当前单元格的display为none,往上找到它所在的真正单元格，获取colSpan和rowSpan，
             *  将rowspan减一，并跳转到cellIndex+colSpan列继续处理
             * 若当前单元格的display不为none,分两种情况：
             *  1、rowspan == 1 ，直接设置display为none，跳转到cellIndex+colSpan行继续处理
             *  2、rowspan > 1  , 修改当前单元格的下一个单元格的display为"",
             *    并将当前单元格的rowspan-1赋给下一个单元的rowspan，当前单元格的colspan赋给下一个单元格的colspan，
             *    然后隐藏当前单元格，跳转到cellIndex+colSpan继续处理
             */
            for (var currentCellIndex = 0; currentCellIndex < cells.length;) {
                var currentNode = cells[currentCellIndex];

                if (isHide(currentNode)) {

                    //找到当前单元格真正所属于的单元格
                    var topRowIndex = rowIndex;
                    while (topRowIndex--) {
                        var topNode = rows[topRowIndex].cells[currentCellIndex];
                        if (!isHide(topNode)) {
                            break;
                        }
                    }

                    topNode.rowSpan--;
                    currentCellIndex += topNode.colSpan;

                } else {

                    if (currentNode.rowSpan == 1) {
                        currentNode.style.display = "none";
                        currentCellIndex += currentNode.colSpan;
                    } else {
                        var downNode = rows[rowIndex + 1].cells[currentCellIndex];
                        downNode.style.display = "";
                        downNode.rowSpan = currentNode.rowSpan - 1;
                        downNode.colSpan = currentNode.colSpan;
                        currentNode.style.display = "none";
                        currentCellIndex += currentNode.colSpan;
                    }
                }
            }
            //完成td删除后再删除外层包裹的tr
            domUtils.remove(tr);

            //重新定位焦点
            var topRowTd, focusTd, downRowTd;
            if (rowIndex == rows.length) { //如果被删除的行是最后一行,这里之所以没有-1是因为已经删除了一行

                //如果删除的行也是第一行，那么表格总共只有一行，删除整个表格
                if (rowIndex == 0) {
                    domUtils.remove(table);
                    return;
                }

                //如果上一单元格未隐藏，则直接定位，否则定位到最近的上一个非隐藏单元格,N多步骤。。。
                var preRowIndex = rowIndex - 1;
                topRowTd = rows[rowIndex - 1].cells[ cellIndex];
                if (!isHide(topRowTd)) {
                    focusTd = topRowTd;
                } else { //对当前单元格左边的所有包含本行单元格的单元格进行循环扫描，直到找到该单元格包含当前单元格为止

                    //从当前单元格的最左边开始扫描
                    for (var tmpCellIndex = 0; tmpCellIndex <= cellIndex;) {
                        var tmpRowIndex = preRowIndex;
                        //初始Node
                        var tmpNode = rows[tmpRowIndex].cells[tmpCellIndex];

                        //找到初始NODE所属的真正单元格
                        if (isHide(tmpNode)) {
                            while (tmpRowIndex--) {
                                tmpNode = rows[tmpRowIndex].cells[tmpCellIndex];
                                if (!isHide(tmpNode)) {
                                    break;
                                }
                            }
                        }

                        //判断找到的单元格是否包含当前单元格，
                        //如果包含，直接返回；如果不包含，跳转到tmpCellIndex + tmpNode.colSpan列继续处理
                        if (tmpCellIndex + tmpNode.colSpan > cellIndex && (tmpRowIndex + tmpNode.rowSpan) == rowIndex) {
                            focusTd = tmpNode;
                            break;
                        } else {
                            tmpCellIndex += tmpNode.colSpan;
                        }
                    }
                }

            } else { //如果被删除的不是最后一行，则光标定位到下一行

                //找到下一行中最近一个非隐藏单元格
                var downCellIndex = cellIndex;
                while (downCellIndex >= 0) {
                    downRowTd = table.rows[rowIndex].cells[downCellIndex];
                    if (!isHide(downRowTd)) {
                        break;
                    }
                    downCellIndex--;
                }
                focusTd = downRowTd;
            }
            range.setStart(focusTd, 0).setCursor();
        }
    };

    /**
     * 删除列
     */
    baidu.editor.commands['deletecol'] = {
        queryCommandState:function() {
        },
        execCommand:function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true),
                    tr = td.parentNode,
                    table = tr.parentNode.parentNode;

            var cellIndex = td.cellIndex,
                    rows = table.rows,
                    cells = tr.cells,
                    rowIndex = tr.rowIndex;

            /*
             * 从第一行开始扫描并隐藏当前列的所有单元格
             * 若当前单元格的display为none，表明它是由左边Span过来的，
             *  将左边第一个非none单元格的colSpan减去1并删去对应的单元格后跳转到rowIndex + rowspan行继续处理；
             * 若当前单元格的display不为none，分两种情况，
             *  1、当前单元格的colspan == 1 ， 则直接删除该节点，跳转到rowIndex + rowspan行继续处理
             *  2、当前单元格的colsapn >  1, 修改当前单元格右边单元格的display为"",
             *      并将当前单元格的colspan-1赋给它的colspan，当前单元格的rolspan赋给它的rolspan，
             *      然后删除当前单元格，跳转到rowIndex+rowSpan行继续处理
             */
            for (var currentRowIndex = 0; currentRowIndex < rows.length;) {

                var currentNode = rows[currentRowIndex].cells[cellIndex];

                if (isHide(currentNode)) {

                    //找到左边第一个非隐藏单元格
                    var leftCellIndex = cellIndex;
                    while (leftCellIndex--) {
                        var leftNode = rows[currentRowIndex].cells[leftCellIndex];
                        if (!isHide(leftNode)) {
                            break;
                        }
                    }

                    //依次删除对应的单元格
                    for (var i = 0; i < leftNode.rowSpan; i++) {
                        var delNode = rows[currentRowIndex + i].cells[cellIndex];
                        domUtils.remove(delNode);
                    }

                    //修正被删后的单元格信息
                    leftNode.colSpan--;

                    currentRowIndex += leftNode.rowSpan;

                } else {

                    if (currentNode.colSpan == 1) {
                        currentRowIndex += currentNode.rowSpan;
                        domUtils.remove(currentNode);
                    } else {
                        var rightNode = rows[currentRowIndex].cells[cellIndex + 1];
                        rightNode.style.display = "";
                        rightNode.rowSpan = currentNode.rowSpan;
                        rightNode.colSpan = currentNode.colSpan - 1;
                        currentRowIndex += currentNode.rowSpan;
                        domUtils.remove(currentNode);
                    }

                }
            }

            //重新定位焦点
            var preColTd, focusTd, nextColTd;

            if (cellIndex == cells.length) { //如果当前列是最后一列，光标定位到当前列的前一列,同样，这里没有减去1是因为已经被删除了一列

                //如果当前列也是第一列，则删除整个表格
                if (cellIndex == 0) {
                    domUtils.remove(table);
                    return;
                }

                //找到当前单元格前一列中和本单元格最近的一个未隐藏单元格
                //分两种情况，一种是前一个单元格就是未隐藏单元格，直接返回；另一种是隐藏单元格，需要。。。N多步骤:``
                var preCellIndex = cellIndex - 1;
                preColTd = rows[rowIndex].cells[preCellIndex];
                if (!isHide(preColTd)) {
                    focusTd = preColTd;
                } else { //对当前单元格上方的所有包含本列单元格的单元格进行循环扫描，直到找到该单元格包含当前单元格为止

                    //包含当前单元格所在列的单元格,初始从当前列的顶部开始扫描
                    for (var tmpRowIndex = 0; tmpRowIndex <= rowIndex;) {
                        var tmpCellIndex = preCellIndex;
                        //初始node
                        var tmpNode = rows[tmpRowIndex].cells[preCellIndex];

                        //当初始node并合并时，找到对应的真正NONE
                        if (isHide(tmpNode)) {
                            while (tmpCellIndex--) {
                                tmpNode = rows[tmpRowIndex].cells[tmpCellIndex];
                                if (!isHide(tmpNode)) {
                                    break;
                                }
                            }
                        }

                        //如果找的tmpNode包含当前单元格，则该单元格就是最后要定位的单元格，否则将rowIndex+tmpNode.rowSpan后再继续重复处理
                        if ((tmpRowIndex + tmpNode.rowSpan) > rowIndex && (tmpCellIndex + tmpNode.colSpan) == cellIndex) {
                            focusTd = tmpNode;
                            break;
                        } else {
                            tmpRowIndex += tmpNode.rowSpan;
                        }
                    }
                }

            } else { //如果当前列不是最后一列，则光标定位到当前列的后一列

                var nextRowIndex = rowIndex;
                while (nextRowIndex >= 0) {
                    nextColTd = rows[nextRowIndex].cells[cellIndex];
                    if (!isHide((nextColTd))) {
                        break;
                    }
                    nextRowIndex--;
                }
                focusTd = nextColTd;
            }

            range.setStart(focusTd, 0).setCursor();
        }
    };

    /**
     * 完全拆分单元格
     */
    baidu.editor.commands['split2cells'] = {
        queryCommandState:function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true);
            return td && ( td.rowSpan > 1 || td.colSpan > 1 ) ? 0 : -1;
        },
        execCommand:function() {
            if (this.queryCommandState('split2cells')) {
                return;
            }

            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true),
                    tr = td.parentNode,
                    table = tr.parentNode.parentNode;

            var rowIndex = tr.rowIndex,
                cellIndex = td.cellIndex,
                rowSpan = td.rowSpan,
                colSpan = td.colSpan;


            for (var i = 0; i < rowSpan; i++) {
                for (var j = 0; j < colSpan; j++) {
                    var node = table.rows[rowIndex + i].cells[cellIndex + j];
                    node.rowSpan = 1;
                    node.colSpan = 1;
                    if (isHide(node)) {
                        node.style.display = "";
                    }
                }
            }
        }
    };

    /**
     * 将单元格拆分成行
     */
    baidu.editor.commands['split2rows'] = {
        queryCommandState:function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, 'td', true);
            return td && ( td.rowSpan > 1) ? 0 : -1;
        },
        execCommand:function() {
            if (this.queryCommandState('split2rows')) {
                return;
            }

            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, 'td', true),
                    tr = td.parentNode,
                    table = tr.parentNode.parentNode;

            var rowIndex = tr.rowIndex,
                cellIndex = td.cellIndex,
                rowSpan = td.rowSpan,
                colSpan = td.colSpan;

            for (var i = 0; i < rowSpan; i++) {
                var node = table.rows[rowIndex + i].cells[cellIndex];
                node.rowSpan = 1;
                node.colSpan = colSpan;
                if (isHide(node)) {
                    node.style.display = "";
                }
            }
        }
    };

    /**
     * 将单元格拆分成列
     */
    baidu.editor.commands['split2cols'] = {
        queryCommandState:function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true);
            return td && ( td.colSpan > 1) ? 0 : -1;
        },
        execCommand:function() {
            if (this.queryCommandState('split2cols')) {
                return;
            }

            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true),
                    tr = td.parentNode,
                    table = tr.parentNode.parentNode;

            var rowIndex = tr.rowIndex,
                cellIndex = td.cellIndex,
                rowSpan = td.rowSpan,
                colSpan = td.colSpan;

            for (var i = 0; i < colSpan; i++) {
                var node = table.rows[rowIndex].cells[cellIndex + i];
                node.rowSpan = rowSpan;
                node.colSpan = 1;
                if (isHide(node)) {
                    node.style.display = "";
                }
            }
        }
    };

    /**
     * 插入行
     */
    baidu.editor.commands['insertrow'] = {
        queryCommandState:function() {
        },
        execCommand:function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    tr = domUtils.findParentByTagName(start, 'tr', true),
                    table = tr.parentNode.parentNode;


            var rowIndex = tr.rowIndex;

            //记录插入位置原来所有的单元格
            var cells = table.rows[rowIndex].cells;

            //插入新的一行
            var newRow = table.insertRow(rowIndex);
            var newNode;

            //遍历表格中待插入位置中的所有单元格，检查其状态，并据此修正新插入行的单元格状态
            for (var cellIndex = 0; cellIndex < cells.length;) {
                var tmpNode = cells[cellIndex];

                //如果当前单元格是隐藏的，表明当前单元格由其上部span过来，找到其上部单元格
                if (isHide(tmpNode)) {
                    var topRowIndex = rowIndex;
                    while (topRowIndex--) {
                        var topNode = table.rows[topRowIndex].cells[cellIndex];
                        if (!isHide(topNode)) {
                            break;
                        }
                    }
                    //增加一行，并将所有新插入的单元格隐藏起来
                    topNode.rowSpan++;
                    for (var i = 0; i < topNode.colSpan; i++) {
                        newNode = newRow.insertCell(cellIndex + i);
                        newNode.style.display = "none";
                    }
                    cellIndex += topNode.colSpan;

                } else {
                    //若当前单元格未隐藏，则在其上行插入colspan个单元格
                    for (var j = 0; j < tmpNode.colSpan; j++) {
                        newNode = newRow.insertCell(cellIndex + j);

                        if (!browser.ie) {
                            newNode.innerHTML = "<br/>";
                        }
                        newNode.style.cssText = " height:20px; width:20px;padding:5px;";
                    }
                    cellIndex += tmpNode.colSpan;
                }
            }
        }
    };

    /**
     * 插入列
     */
    baidu.editor.commands['insertcol'] = {
        queryCommandState:function() {
        },
        execCommand:function() {
            var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true),
                    table = td.parentNode.parentNode.parentNode;

            var cellIndex = td.cellIndex,
                    rows = table.rows,
                    newNode;

            //遍历当前列中的所有单元格，检查其状态，并据此修正新插入列的单元格状态
            for (var rowIndex = 0; rowIndex < rows.length;) {
                var tmpNode = rows[rowIndex].cells[cellIndex];

                //如果当前单元格是隐藏的，表明当前单元格由其左边span过来，找到其左边单元格
                if (isHide(tmpNode)) {
                    var leftCellIndex = cellIndex;
                    while (leftCellIndex--) {
                        var leftNode = rows[rowIndex].cells[leftCellIndex];
                        if (!isHide(leftNode)) {
                            break;
                        }
                    }
                    leftNode.colSpan++;
                    for (var i = 0; i < leftNode.rowSpan; i++) {
                        newNode = rows[rowIndex].insertCell(cellIndex + i);
                        newNode.style.display = "none";
                    }
                    rowIndex += leftNode.rowSpan;

                } else { //若当前单元格未隐藏，则在其左边插入rowspan个单元格

                    for (var j = 0; j < tmpNode.rowSpan; j++) {
                        newNode = rows[rowIndex].insertCell(cellIndex + j);

                        if (!browser.ie) {
                            newNode.innerHTML = "<br/>";
                        }
                        newNode.style.cssText = " height:20px; width:20px;padding:5px;";
                    }
                    rowIndex += tmpNode.rowSpan;
                }
            }
        }
    };

    /**
     * 根据两个单元格来获取中间包含的所有单元格集合选区
     * @param cellA
     * @param cellB
     * @return {Object} 选区的左上和右下坐标
     */
    function _getCellsRange(cellA, cellB) {

        var trA = cellA.parentNode,
            trB = cellB.parentNode,
            aRowIndex = trA.rowIndex,
            bRowIndex = trB.rowIndex,
            table = cellA.parentNode.parentNode.parentNode;

        if (cellA == cellB) {
            return {
                beginRowIndex: aRowIndex,
                beginCellIndex: cellA.cellIndex,
                endRowIndex: aRowIndex + cellA.rowSpan,
                endCellIndex: cellA.cellIndex + cellA.colSpan
            }
        }

        var beginRowIndex = Math.min(aRowIndex, bRowIndex),
            beginCellIndex = Math.min(cellA.cellIndex, cellB.cellIndex),
            endRowIndex = Math.max(aRowIndex + cellA.rowSpan, bRowIndex + cellB.rowSpan),
            endCellIndex = Math.max(cellA.cellIndex + cellA.colSpan, cellB.cellIndex + cellB.colSpan);

        // 检查是否有超出TableRange左边界的情况
//        if (beginCellIndex > 0) {
////            for (var rowIndex = beginRowIndex + 1; rowIndex < endRowIndex; rowIndex++) {
////                var downNode = table.rows[rowIndex].cells[beginCellIndex];
////                if(isHide(downNode)){
////                    var leftNodeCellIndex = downNode.cellIndex;
////
////                }
////                var leftCellInfo = infoGrid[rowIndex][beginColIndex];
////                var leftColIndex = leftCellInfo.colIndex;
////                if (leftColIndex < beginColIndex) {
////                    overflowColIndex = Math.min(leftCellInfo.colIndex, overflowColIndex);
////                }
////            }
//        }

        //返回选区的起始和结束坐标
        return {
            beginRowIndex:  beginRowIndex,
            beginCellIndex: beginCellIndex,
            endRowIndex:    endRowIndex,
            endCellIndex:   endCellIndex
        }
    }

    /**
     * 合并多个单元格，通过两个cell将当前包含的所有横纵单元格进行合并
     */
    baidu.editor.commands['mergecells'] = {
        queryCommandState:function() {

        },
        execCommand:function() {
            var range = this.selection.getRange(),
                start = range.startContainer,
                end = range.endContainer;

            //将非FF浏览器中的选区调整为类似FF中的选区
            if(start.nodeName != "TR" ){
                var startTd = domUtils.findParentByTagName(start,'td',true);
                range.startContainer = startTd.parentNode;
                range.startOffset = startTd.cellIndex;
                start = range.startContainer;
            }


            if(end.nodeName != "TR"){
                var endTd = domUtils.findParentByTagName(end,'td',true);
                range.endContainer = endTd.parentNode;
                range.endOffset = endTd.cellIndex;
                end = range.endContainer;
            }

            var tableA = start.parentNode.parentNode,
                tableB = end.parentNode.parentNode;
            if (tableA != tableB) return;

            var cellA = start.cells[range.startOffset],
                cellB = end.cells[range.endOffset - 1],
                cellRange = _getCellsRange(cellA, cellB),
                startRowIndex = start.rowIndex,
                startCellIndex = cellA.cellIndex,
                rowsLength = cellRange.endRowIndex - cellRange.beginRowIndex,
                cellLength = cellRange.endCellIndex - cellRange.beginCellIndex;


            for (var i = 0, ri; (ri = tableA.rows[startRowIndex + i++]) && i <= rowsLength;) {
                for (var j = 0, ci; (ci = ri.cells[startCellIndex + j++]) && j <= cellLength;) {
                    if (i == 1 && j == 1) {
                        ci.style.display = "";
                        ci.rowSpan = rowsLength;
                        ci.colSpan = cellLength;
                    } else {
                        ci.style.display = "none";
                        ci.rowSpan = 1;
                        ci.colSpan = 1;
                    }

                }
            }

        }
    };

})();
