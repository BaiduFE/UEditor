baidu.editor.commands['preview'] = {
    execCommand : function(){
        var me = this;
        var w = window.open('', '_blank', "");
        var d = w.document;
        d.open();
        d.write(me.getContent());
        d.close();
    },
    notNeedUndo : 1
};
