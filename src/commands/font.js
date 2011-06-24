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
        },
        reg = new RegExp(domUtils.fillChar,'g'),
        browser = baidu.editor.browser,
        flag = 0;

    for ( var p in fonts ) {
        (function( cmd, style ) {
            baidu.editor.commands[cmd] = {
                execCommand : function( cmdName, value ) {

                    var me = this,
                        range = this.selection.getRange();
                    //执行了上述代码可能产生冗余的html代码，所以要注册 beforecontent去掉这些冗余的代码
                    if(!flag){
                        me.addListener('beforegetcontent',function(){
                            domUtils.clearReduent(me.document,['span'])
                        });
                        flag = 1;
                    }
                    if ( value == 'default' ) {

                        if(range.collapsed){
                            var txt = me.document.createTextNode('&nbsp;');
                            range.insertNode(txt).select();

                        }
                        me.execCommand( 'removeFormat', 'span', style, null, true );
                        if(txt){
                            range.setStartBefore(txt).collapse(true);
                            domUtils.remove(txt);
                            range.select()
                        }
                       

                    } else {
                        if(me.currentSelectedArr && me.currentSelectedArr.length > 0){
                            for(var i=0,ci;ci=me.currentSelectedArr[i++];){
                                range.selectNodeContents(ci);
                                range.applyInlineStyle( 'span', {'style':style + ':' + value} );

                            }
                            range.selectNodeContents(this.currentSelectedArr[0]).select();
                        }else{
                            if ( !range.collapsed ) {
                                range.applyInlineStyle( 'span', {'style':style + ':' + value} ).select();
                            } else {
                                
                                var span = domUtils.findParentByTagName(range.startContainer,'span',true);

                                if(span && !span.children.length && !span[browser.ie ? 'innerText':'textContent'].replace(reg,'').length){
                                    span.style.cssText = span.style.cssText +  ';' + style + ':' + value;
                                }else{
                                    span = range.document.createElement( 'span' );
                                    span.style.cssText = style + ':' + value;
                                    //ff会把空的span干掉
                                    baidu.editor.browser.gecko && span.appendChild(me.document.createTextNode(''));
                                    //span不能套在u下边
                                    var u = domUtils.findParentByTagName(range.startContainer,'u',true);
                                    if(u){
                                        var bookmark = range.createBookmark(),
                                            frg = range.selectNode(u).extractContents();
                                        span.appendChild(frg);
                                        range.insertNode(span).moveToBookmark(bookmark).select()

                                    }else{
                                        range.insertNode( span ).setStart( span, 0 ).setCursor();
                                    }

                                }

                            }
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