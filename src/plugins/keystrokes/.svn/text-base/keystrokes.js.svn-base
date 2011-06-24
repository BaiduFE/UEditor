/*
 *   处理特殊键的兼容性问题
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
        browser = baidu.editor.browser,
        dtd = baidu.editor.dom.dtd,
        utils = baidu.editor.utils,
        flag = 0,
        keys = domUtils.keys,
        trans = {
            'B' : 'strong',
            'I' : 'em',
            'FONT' : 'span'
        },
        sizeMap = [0, 10, 12, 16, 18, 24, 32, 48];

    baidu.editor.plugins['keystrokes'] = function() {
        var me = this;
        me.addListener( 'keydown', function( type, evt ) {
            var keyCode = evt.keyCode || evt.which;



            //处理space/del
            if ( keyCode == 8 || keyCode == 46) {
                 

                var range = me.selection.getRange(),
                    tmpRange,
                    start,end;

                //解决选中control元素不能删除的问题
                if(start = range.getClosedNode()){
                    me.undoManger && me.undoManger.save();
                    range.setStartBefore(start);
                    domUtils.remove(start);
                    range.setCursor();
                    me.undoManger && me.undoManger.save();
                    evt.preventDefault? evt.preventDefault() : (evt.returnValue = false);
                    return;
                }
                //阻止在table上的删除
                if(!browser.ie){

                    start= domUtils.findParentByTagName(range.startContainer,'table',true);
                    end = domUtils.findParentByTagName(range.endContainer,'table',true);
                    if(start && !end  || !start && end || start!==end ){
                        evt.preventDefault();
                        return;
                    }
                    if(browser.webkit && range.collapsed && start){
                        tmpRange = range.cloneRange().txtToElmBoundary();
                        start = tmpRange.startContainer;
                        
                        if(domUtils.isBlockElm(start) && start.nodeType == 1 && !dtd.$tableContent[start.tagName] && !domUtils.getChildCount(start,function(node){
                            return node.nodeType == 1 ? node.tagName !=='BR' : 1;
                        }) ){

                            tmpRange.setStartBefore(start).setCursor();
                            domUtils.remove(start,true);
                            evt.preventDefault();
                            return;
                        }
                    }
                }
                //修中ie中li下的问题
                if(browser.ie && range.collapsed && !range.startOffset){

                    var li = domUtils.findParentByTagName(range.startContainer,'li',true),pre;
                    tmpRange = range.cloneRange().trimBoundary();

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
            //修复ie/chrome <strong><em>x|</em></strong> 当点退格后在输入文字后会出现  <b><i>x</i></b> 
            if ( !browser.gecko && !keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey ){
                range = me.selection.getRange();
                if(range.collapsed){
                    var start = range.startContainer,
                        lastNode,
                        isFixed = 0;

                    while(!domUtils.isBlockElm(start)){
                        if(start.nodeType == 1 && utils.indexOf(['FONT','B','I'],start.tagName)!=-1){
                            
                            var tmpNode = me.document.createElement(trans[start.tagName]);
                            if(start.tagName == 'FONT'){
                                //chrome only remember color property
                                tmpNode.style.cssText = (start.getAttribute('size') ? 'font-size:' + (sizeMap[start.getAttribute('size')] || 12) + 'px' : '')
                                    + ';' + (start.getAttribute('color') ? 'color:'+ start.getAttribute('color') : '')
                                    + ';' + (start.getAttribute('face') ? 'font-family:'+ start.getAttribute('face') : '')
                                    + ';' + start.style.cssText;
                            }
                            while(start.firstChild){
                                tmpNode.appendChild(start.firstChild)
                            }
                            start.parentNode.insertBefore(tmpNode,start);
                            domUtils.remove(start);
                            if(!isFixed){
                                range.setEnd(tmpNode,tmpNode.childNodes.length).collapse(true)

                            };
                            start = tmpNode;
                            isFixed = 1;
                        }
                        start = start.parentNode;

                    }

                   isFixed &&  range.select()
              
                }
            }

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