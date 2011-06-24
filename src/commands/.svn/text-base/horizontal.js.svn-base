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
                var range = this.selection.getRange(),
                    start = range.startContainer;
                if(start.nodeType == 1 && !domUtils.isBlockElm(start) && !start.childNodes[range.startOffset]){
                    var tmp;
                    if(this.options.enterTag == 'p'){
                        tmp = this.document.createElement('p');
                        range.insertNode(tmp);
                        range.setStart(tmp,0).setCursor();

                    }else{
                        tmp = this.document.createElement('br');
                        range.insertNode(tmp);
                        range.setStartBefore(tmp).setCursor();
                    }
                }
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
