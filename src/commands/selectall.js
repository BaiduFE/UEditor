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

