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
