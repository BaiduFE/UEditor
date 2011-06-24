/**
 * Created by .
 * User: zhuwenxuan
 * Date: 11-5-30
 * Time: 上午11:02
 */


baidu.editor.commands['time'] = {
    execCommand : function( cmdName) {
        var date = new Date,
            arr = [date.getHours(),date.getMinutes(),date.getSeconds()];
        this.execCommand('insertHtml',arr.join(":"));
        return true;
    }
};
baidu.editor.commands['date'] = {
    execCommand : function( cmdName ) {
        var date = new Date,
            arr = [date.getFullYear(),date.getMonth()+1,date.getDate()];
        this.execCommand('insertHtml',arr.join("-"));
        return true;
    }
};


