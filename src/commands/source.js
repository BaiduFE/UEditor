/**
 * @description 源码编辑
 * @author zhanyi
 */
(function() {
    var textArea = document.createElement('textarea'),
        txtState = 0,
        domUtils = baidu.editor.dom.domUtils;

        baidu.editor.commands['source'] = {
            execCommand : function( cmdName ) {
                var me = this,
                    ifm = me.iframe;

                !textArea.parentNode && ifm.parentNode.insertBefore(textArea,ifm);

                if(!txtState){

                    //手动触发save
                    me.undoManger && me.undoManger.save();
                     textArea.value = me.getContent();
                    var height = this.options.minFrameHeight || ifm.offsetHeight;
                    textArea.style.cssText = 'border:0;padding:0;display:block;width:'+(ifm.offsetWidth)+'px;height:'+(height)+'px;z-index:' + (ifm.style.zIndex+1);

                    ifm.style.cssText = ';position:absolute;left:-32768px;top:-32768px;';
                    txtState = 1;

                }else{
                    me.setContent(textArea.value);
                    //textArea.focus();
                    textArea.style.display = 'none';

                    

                    ifm.style.position = '';
                    txtState = 0;
                    if(me.currentSelectedArr){
                        me.currentSelectedArr = [];
                        for(var i=0,ti,tds = domUtils.getElementsByTagName(me.document,'td');ti=tds[i++];){
                            if(ti.className == me.options.selectedTdClass){
                                ti.className = '';
                            }
                        }
                    }
                    //要在ifm为显示时ff才能取到selection,否则报错
                    me.undoManger && me.undoManger.save();

                }
            },
            queryCommandState : function(){
                if (this.isFullScreen) {
                    return -1;
                }
                return txtState;
            },
            notNeedUndo : 1

        }


})();
