/**
 * @author liuyong07
 */
T.dom.ready(function(){
	var button = T.dom.query('span',T.q('editor-btn-ct')[0]);
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
//		T.event.on(item,'click',function(e){
//			//alert(T.dom.hasClass(item,prefix+'active'));
//			if(T.dom.hasClass(item,prefix+'active')){
//				T.dom.setAttr(item,'class',prefix+'default');
//			}else{
//				T.dom.setAttr(item,'class','');
//				T.dom.setAttr(item,'class',prefix+'active');
//			}
//		});
	});

    var rules = function (){
        var X = baidu.editor.utils.extend;
        var inline = {strong:1,em:1,b:1,i:1,u:1,span:1};
        var block = X(inline, {p:1,div:1,blockquote:1,$:{style:1,dir:1}});
        return {
            blackList: {style:1,script:1,form:1,input:1,textarea:1,iframe:1},
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
                a: X(inline, {$:{href:1,target:1}}),
                ul: {li:1,$:{style:1}},
                ol: {li:1,$:{style:1}},
                li: block
            }
        };
    }();
    // 编辑器初始化
    var editor = new baidu.editor.Editor({
       
        iframeCssUrl: 'editor-iframe.css',
        enterTag: 'p',
        serialize: rules
    });
    editor.render('editor_iframe_holder');

    var execCmdList = ['bold','italic','underline','insertorderedlist','insertunorderedlist','blockquote','removeformat'];
    T.array.each(execCmdList, function (cmd){
        var btn = T.g('editor_btn_' + cmd);
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
            var btn = T.g('editor_btn_' + cmd);
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
    makeUnselectable(T.q('editor-btn-ct')[0]);
});
