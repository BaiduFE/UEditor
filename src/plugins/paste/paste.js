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
                            var divs = div.querySelectorAll('div #baidu_pastebin'),p;
                            for(var i=0,di;di=divs[i++];){
                                p = me.document.createElement('p');
                                while(di.firstChild){
                                    p.appendChild(di.firstChild)
                                }
                                di.parentNode.insertBefore(p,di);
                                domUtils.remove(di,true)
                            }
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

