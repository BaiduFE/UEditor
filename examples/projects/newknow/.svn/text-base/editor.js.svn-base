/**
 * @author caopuwei
 */
T.dom.ready(function(){
    
    T.lang.module("nk.editor");
    nk.editor = {
        getContent : function(value){
//          value = T.string.trim(value);
//          value = value.replace(/[<br\/>|<br>|<\/br>]+$/gi,"");
//          var regx = /(<BR>[\s\S]+?<\/BR>)|<\/BR>/gi;
//          try{
//              var result = value.match(regx)||[];
//              for(var i=0,len = result.length;i<len;i++){
//                  value = value.replace(regx,"");
//              }
//          }catch(e){
//          }finally{
//              return value;
//          }
            return value;
        }
    }
    
    function bindEditorStateEvt(panel){
        var button = T.dom.query('span',T.q('editor-btn-ct',panel,"div")[0]);
        T.array.each(button,function(item,index){
            var classname = T.dom.getAttr(item,'class');
            var prefix = classname.substring(0,(classname.indexOf('-')+1));
            T.event.on(item,'mouseover',function(e){
                if(T.dom.hasClass(item,prefix+'active')){
                    return;
                }
                T.dom.setAttr(item,'class',prefix+'hover');
            });
            T.event.on(item,'mouseout',function(e){
                var classname = T.dom.getAttr(item,'class');
                if(T.dom.hasClass(item,prefix+'active')){
                    return;
                }
                T.dom.setAttr(item,'class',prefix+'default');
            });
//          T.event.on(item,'click',function(e){
//              //alert(T.dom.hasClass(item,prefix+'active'));
//              if(T.dom.hasClass(item,prefix+'active')){
//                  T.dom.setAttr(item,'class',prefix+'default');
//              }else{
//                  T.dom.setAttr(item,'class','');
//                  T.dom.setAttr(item,'class',prefix+'active');
//              }
//          });
        });     
    }
    
    /*
     *      focus editor iframe
     */
function makeUnselectable(element){
        var nodes = element.childNodes,
            i,
            node = element;
        setStyle();
        for(i = 0; i < nodes.length; i++){
            node = nodes[i];
            if(node.hasChildNodes()){
                makeUnselectable(node);
                setStyle();
            }else{
                node.nodeType == 1 && setStyle();
            }
        }

        function setStyle(){
            if(baidu.browser.isGecko){
                node.style.MozUserSelect = 'none';
            }else if(baidu.browser.isWebkit){
                node.style.KhtmlUserSelect = 'none';
            }else if(baidu.ie || baidu.browser.opera){
                node.unselectable = 'off';
            }
            switch(node.tagName.toLowerCase()){
                case 'iframe' :
                case 'textarea' :
                case 'input' :
                case 'select' :
                    break;
                default :
                    node.unselectable = 'on';
            }
        }
    }   


    // 编辑器初始化
    T.lang.module("common.editor",{});
    common.editor.Base =  T.lang.createClass(
        function(opt){
            this.namespace = opt.namespace||"editor_btn_";
            opt.panel.innerHTML = renderEditor(
                T.object.extend(
                    {
                        namespace : this.namespace,
                        btnPanel : opt.btnPanel
                    },
                    opt.renderObj||{}
                )
            );
            this.editorPanel = T.g(this.namespace+"editor-panel");
            bindEditorStateEvt(this.editorPanel);
        },{
            superClass : T.lang.Class
        }).extend({
            createInstance:function(){
                var _self = this;
                var rules = function (){
                    var X = baidu.editor.utils.extend;
                    var inline = {strong:1,em:1,b:1,i:1,u:1,span:1};
                    var block = X(inline, {p:1,div:1,blockquote:1,$:{style:1,dir:1}});
                    return {
                        blackList: {style:1,script:1,form:1,input:1,textarea:1,iframe:1,"#command":1},
                        whiteList: {
                            br: {$:{}},
                            span: X(inline, {$:{style:1}}),
                            strong: inline,
                            em: inline,
                            b: inline,
                            i: inline,
                            u: inline,
                            div: block,
                            p: block,
                            blockquote: block,
                            ul: {li:1,$:{style:1}},
                            ol: {li:1,$:{style:1}},
                            li: block
                        }
                    };
                }();
                var editor = new baidu.editor.Editor({
                    initialContent: T.browser.ie ? "<p>&nbsp;</p>" : "<p><br/></p>",
                    iframeCssUrl: '/static/common/css/component/editor-iframe.css',
                    enterTag: 'p',
                    minFrameHeight:200,
                    serialize: rules
                });
                editor.addListener("aftersetcontent",function(type,e){
                    if(!editor.getContent()){
                        editor.setContent(editor.options.initialContent);
                    }
                    var range = editor.selection.getRange();
                    range.setStart(editor.body.firstChild,0);
                });
                editor.addListener('beforegetcontent',function(type,e){
                    var arr = editor.document.getElementsByTagName("a"),i=0,ai;
                    for(;ai=arr[i];i++){
                        ai.href = ai.href.replace(/\/$/,"");
                        ai.setAttribute("target","_blank");
                    }
                });
                editor.render(this.namespace+'editor_iframe_holder');
                var execCmdList = ['bold','italic','underline','insertorderedlist','insertunorderedlist','blockquote','removeformat'];
                T.array.each(execCmdList, function (cmd){
                    var btn = T.g(_self.namespace + cmd);
                    T.on(btn, 'click', function (){
                        editor.execCommand(cmd);
                    });
                });
                var queryCmdList = execCmdList.slice(0, 5);
                editor.addListener('selectionchange', function (){
                    function setState(item, state){
                        var classname = T.dom.getAttr(item,'class');
                        var prefix = classname.substring(0,(classname.indexOf('-')+1));
                        T.dom.setAttr(item,'class',prefix+state);
                    }
                    T.array.each(execCmdList, function (cmd){
                        var btn = T.g(_self.namespace + cmd);
                        if (!btn) return;
                        var state = editor.queryCommandState(cmd);
                        if (state == -1) {
                            setState(btn, 'disabled');
                        } else if (state) {
                            setState(btn, 'active');
                        } else {
                            setState(btn, 'default');
                        }
                    });
                });
                makeUnselectable(this.editorPanel);
                return editor;
            }
        });
    
    
    /*
     *  @description 回答问题
     */ 
    var rpEditorPanel = T.g("editor-replySubmit-panel");
    if(rpEditorPanel){
        var rpEditor = new common.editor.Base({
                namespace:"editor_btn_",
                panel:rpEditorPanel,
                btnPanel:"publish",
                renderObj:{
                    isToask : quesData.isToask
                }
            }).createInstance();
        T.event.on("editor_btn_editor-btn","click",function(){
            var editorValue = T.string.trim(rpEditor.getContent());
            var valValue = editorValue.replace(/&nbsp;/ig,"");
            valValue = T.string.trim(valValue);
            if(valValue!="" && valValue!="<br>"){
                var anonyBtn = T.g("anony-btn");
                nk.evtCenter.dispatch("submit.cmd",{
                    no:100100,
                    param:{
                        qid:quesData.qid,
                        content:editorValue,
                        anony:(anonyBtn && anonyBtn.checked)?1:0,
                        introid:quesData.replyIntroId
                    },
                    onSuccess:function(){
                        location.reload(true);
                    },
                    onFail:function(code,errno,text){
                        nk.evtCenter.dispatch("common.tips.show",{
                            content: text
                        }); 
                    }
                });             
            }else {
                nk.evtCenter.dispatch("common.tips.show",{
                    content: "回答内容不能为空！"
                }); 
            }
        });
    } 
});
