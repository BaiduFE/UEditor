/**
 * Created by .
 * User: zhuwenxuan
 * Date: 11-6-13
 * Time: 下午3:29
 * To change this template use File | Settings | File Templates.
 */
(function(){
    function setRange(range,node){
        range.setStart(node,0).setCursor();
    }
    baidu.editor.commands['cleardoc'] = {
        execCommand : function( cmdName) {
            if(confirm("确定清空文档吗？")){
                var me = this,
                    enterTag = me.options.enterTag,
                    browser = baidu.editor.browser,
                    range = this.selection.getRange();
                if(enterTag == "br"){
                    this.body.innerHTML = "<br/>";
                    setRange(range,this.body);
                }else{
                    //不用&nbsp;也能定位，所以去掉，chrom也可以不要br,ff不行再想定位回去不行了，需要br
                    this.body.innerHTML = "<p>"+(browser.ie ? "" : "<br/>")+"</p>";
                    me.focus();
                    setRange(range,me.body.firstChild);

                }
            }

        }
    };
})()
