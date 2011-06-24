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
            flag = 0,
            inlineParents;
        me.addListener( 'keyup', function( type, evt ) {

            var keyCode = evt.keyCode || evt.which;
            if ( keyCode == 13 ) {
                //修正回车不能把inline样式绑定下来的问题
                if( inlineParents && inlineParents.length>0){

                    var range = me.selection.getRange(),
                        start = range.startContainer;
                    if(!range.startOffset && start.nodeType == 1 &&  domUtils.isBlockElm(start)){
                        if(browser.ie ? domUtils.isEmptyNode(start) : start.firstChild.tagName == 'BR'){

                            var frag = me.document.createDocumentFragment(),
                            level = frag,
                            node;
                            while((node = inlineParents.pop()) && node.nodeType == 1 ){

                                level.appendChild(node.cloneNode(false));
                                level = level.firstChild;
                            }
                            if(frag.firstChild){
                                start.innerHTML = '';
                                range.insertNode(frag).setStart(level,0).setCursor();
                                if ( me.undoManger ) {
                                    me.undoManger.save()
                                }
                            }
                        }

                    }



                }
                
            }
        } );

        me.addListener( 'keypress', function( type, evt ) {
            var keyCode = evt.keyCode || evt.which;
            if ( keyCode == 13 ) {//回车
                //chrome 在回车时，保存现场会有问题
                if ( !browser.webkit && me.undoManger ) {
                    me.undoManger.save()
                }
                var range = me.selection.getRange();
                inlineParents = [];
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
               me.currentSelectedArr && domUtils.clearSelectedArr(me.currentSelectedArr);

                if ( tag == 'p' ) {
                    //修正ff不能把内联样式放到新的换行里的问题,先记录有那些节点
                    if( range.collapsed){
                         inlineParents = domUtils.findParents(range.startContainer,true,function(node){
                            return !domUtils.isBlockElm(node)
                        },true)
                    }
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
                if (  !browser.webkit && me.undoManger ) {
                    me.undoManger.save()
                }
            }
        } );
    }

})();
