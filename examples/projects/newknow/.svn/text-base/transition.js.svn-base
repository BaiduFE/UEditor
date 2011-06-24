/**
 * Created by .
 * User: zhuwenxuan
 * Date: 11-6-9
 * Time: 下午7:25
 * To change this template use File | Settings | File Templates.
 */
baidu.editor.plugins['transition'] = function(){
    var editor = this;
    editor.addListener('beforegetcontent',function(type,e){
        var arr = editor.document.getElementsByTagName("a"),i=0,ai;
        for(;ai=arr[i];i++){
            ai.href = ai.href.replace(/\/$/,"");
            ai.setAttribute("target","_blank");
        }
    });
};