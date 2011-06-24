var editor;
(function (){
    var serializeConfig = function (){
        var blockAtt = {style:1,align:1,dir:1};
        var blockDtd = {div:1,p:1,span:1,strong:1,b:1,em:1,i:1,u:1,img:1,embed:1,table:1,ul:1,ol:1,blockquote:1,$:blockAtt};
        var inlineDtd = {span:1,strong:1,b:1,em:1,i:1,u:1,img:1,$:{}};
        var X = baidu.editor.utils.extend;

        return {
            blackList: {style:1,script:1,input:1,textarea:1,iframe:1,'#comment':1}
//            whiteList: {
//                '#document-fragment': blockDtd,
//                div: X(blockDtd, {$:{style:1,align:1,dir:1}}),
//                span: X(inlineDtd, {$:{style:1}}),
//                strong: inlineDtd,
//                em: inlineDtd,
//                b: inlineDtd,
//                i: inlineDtd,
//                u: inlineDtd,
//                table: {tr:1,tbody:1,thead:1,tfoot:1, $:{style:1,cellpadding:1,cellspacing:1,border:1,bgcolor:1}},
//                tbody: {tr:1, $:{style:1,bgcolor:1,cellpadding:1,cellspacing:1}},
//                thead: {tr:1, $:{style:1,bgcolor:1,cellpadding:1,cellspacing:1}},
//                tfoot: {tr:1, $:{style:1,bgcolor:1,cellpadding:1,cellspacing:1}},
//                td: X(blockDtd,{$:X(blockAtt,{bgcolor:1,rowspan:1,colspan:1})}),
//                th: X(blockDtd,{$:X(blockAtt,{bgcolor:1,rowspan:1,colspan:1})}),
//                ul: {li:1,$:{style:1}},
//                ol: {li:1,$:{style:1}},
//                li: blockDtd,
//                blockquote: blockDtd,
//                img: {$:{style:1,width:1,height:1,src:1,alt:1,title:1}}
//            }
        };
    }();
    
    editor = new baidu.editor.Editor({
        initialContent: '通用编辑器ui示例',
        initialStyle :'.selectTdClass{background-color:#3399FF !important}',
        serialize: serializeConfig
    });

    var editorui = baidu.editor.ui;
    
    var toolbar = new editorui.Toolbar({
        id: 'editor_toolbar'
    });

    var sourceBtn = new editorui.Source(editor,'源代码');
    var sourceMode = 0;
    editor.addListener('selectionchange', function (){
        var mode = editor.queryCommandState('source');
        if (mode != -1 && mode !== sourceMode) {
            sourceMode = mode;
            if (mode) {
                setTimeout(function (){
                    for (var i=0; i<toolbar.items.length; i++) {
                        var item = toolbar.items[i];
                        if (item !== sourceBtn && item !== btnFullScreen && item.setDisabled) {
                            item.setDisabled(true);
                        }
                    }
                });
                document.getElementById('editor_breadcrumb').style.display = 'none';
//                btnFullScreen.setDisabled(true);
            } else {
                document.getElementById('editor_breadcrumb').style.display = '';
//                btnFullScreen.setDisabled(false);
            }
        }
    });
    toolbar.add(sourceBtn);
    toolbar.add(new editorui.Preview(editor, '预览'));
    toolbar.add(new editorui.ClearDoc(editor, '清空文档'));
    toolbar.add(new editorui.Separator());
    toolbar.add(new editorui.Undo(editor, '撤销'));
    toolbar.add(new editorui.Redo(editor, '重做'));
    toolbar.add(new editorui.Separator());
    toolbar.add(new editorui.Bold(editor,'粗体'));
    toolbar.add(new editorui.Italic(editor,'斜体'));
    toolbar.add(new editorui.Underline(editor,'下划线'));
    toolbar.add(new editorui.StrikeThrough(editor,'删除线'));
    toolbar.add(new editorui.Subscript(editor,'下标'));
    toolbar.add(new editorui.Superscript(editor,'上标'));
    toolbar.add(new editorui.RemoveFormat(editor,'清除格式'));
    toolbar.add(new editorui.Separator());
//    toolbar.add(new editorui.Cut(editor,'剪切'));
//    toolbar.add(new editorui.Copy(editor,'复制'));
//    toolbar.add(new editorui.Paste(editor,'粘贴'));
    toolbar.add(new editorui.PastePlain(editor,'纯文本粘贴模式'));

    toolbar.add(new editorui.Separator());
    toolbar.add(new editorui.ForeColor(editor,'字体颜色'));
    toolbar.add(new editorui.BackColor(editor,'背景颜色'));
    toolbar.add(new editorui.Separator());

      toolbar.add(new editorui.BlockQuote(editor,'引用'));
//    toolbar.add(new editorui.Indent(editor,'向左缩进'));
//    toolbar.add(new editorui.Outdent(editor,'向右缩进'));
    toolbar.add(new editorui.InsertOrderedList(editor,'有序列表'));
    toolbar.add(new editorui.InsertUnorderedList(editor,'无序列表'));
      toolbar.add(new editorui.directionality(editor,'ltr','左到右'));
    toolbar.add(new editorui.directionality(editor,'rtl','右到左'));

    toolbar.add(new editorui.Separator());
    toolbar.add(new editorui.Justify(editor, 'left','左对齐'));
    toolbar.add(new editorui.Justify(editor, 'center','居中对齐'));
    toolbar.add(new editorui.Justify(editor, 'right','右对齐'));
    toolbar.add(new editorui.Justify(editor, 'justify','两端对齐'));
    toolbar.add(new editorui.Separator());
//    toolbar.add(new editorui.ImageChar(editor));
//    toolbar.add(new editorui.ImageLeft(editor));
//    toolbar.add(new editorui.ImageRight(editor));
    toolbar.add(new editorui.FontFamily(editor, ['宋体', '楷体', '隶书', '黑体','andale mono','arial','arial black','comic sans ms','impact','symbol','times new roman'],'字体'));
    toolbar.add(new editorui.FontSize(editor, [10, 11, 12, 14, 16, 18, 20, 24, 36],'字号'));
    toolbar.add(new editorui.Paragraph(editor, ['p:Paragraph', 'h1:Heading 1', 'h2:Heading 2', 'h3:Heading 3', 'h4:Heading 4', 'h5:Heading 5', 'h6:Heading 6'],'格式'));
    

    toolbar.add(new editorui.Separator());
    toolbar.add(new editorui.InsertTable(editor, '../src/ui/dialogs/table/table.html', '表格'));
    toolbar.add(new editorui.InsertRow(editor, '前插入行'));
    toolbar.add(new editorui.InsertCol(editor, '前插入列'));
    toolbar.add(new editorui.MergeRight(editor, '右合并单元格'));
    toolbar.add(new editorui.MergeDown(editor, '下合并单元格'));
    toolbar.add(new editorui.DeleteRow(editor, '删除行'));
    toolbar.add(new editorui.DeleteCol(editor, '删除列'));
    toolbar.add(new editorui.SplittoRows(editor, '拆分成行'));
    toolbar.add(new editorui.SplittoCols(editor, '拆分成列'));
    toolbar.add(new editorui.SplittoCells(editor, '完全拆分单元格'));
    toolbar.add(new editorui.MergeCells(editor, '合并多个单元格'));
    toolbar.add(new editorui.DeleteTable(editor, '删除表格'));
    toolbar.add(new editorui.Separator());


    toolbar.add(new editorui.Horizontal(editor,'分隔线'));
    toolbar.add(new editorui.Time(editor,'时间'));
    toolbar.add(new editorui.Date(editor,'日期'));
    toolbar.add(new editorui.Separator());

    toolbar.add(new editorui.Link(editor, '../src/ui/dialogs/link/link.html','链接'));
    toolbar.add(new editorui.Unlink(editor,'祛除链接'));
    toolbar.add(new editorui.Image(editor, '../src/ui/dialogs/image/image.html','图片'));
    toolbar.add(new editorui.Emoticon(editor, '../src/ui/dialogs/emoticon/emoticon.html','表情'));
    toolbar.add(new editorui.Spechars(editor, '../src/ui/dialogs/spechars/spechars.html','特殊符号'));
    toolbar.add(new editorui.Separator());
    toolbar.add(new editorui.SelectAll(editor, '全选'));
    toolbar.add(new editorui.SearchReplace(editor, '../src/ui/dialogs/searchreplace/searchreplace.html', '查找替换'));
    toolbar.add(new editorui.Print(editor, '打印'));
    toolbar.add(new editorui.Map(editor, '../src/ui/dialogs/map/map.html','地图'));
    toolbar.add(new editorui.Video(editor, '../src/ui/dialogs/video/video.html','视频'));
    toolbar.add(new editorui.Help(editor, '../src/ui/dialogs/help/help.html','帮助'));

    // 全屏处理
    var IS_FULL_SCREEN = false;
    var bakOverflow;
    var bakOverflow1;
    var bakCssText;
    var bakCssText1;
    var bakAutoHeight;
    function updateSize(){
        if (IS_FULL_SCREEN) {
            var vpRect = baidu.editor.ui.uiUtils.getViewportRect();
            document.getElementById('editor').style.cssText = 'border:0;position:absolute;left:0;top:0;width:'+vpRect.width+'px;height:'+vpRect.height+'px;';
//            var container =  document.getElementById('editor_iframe_holder');
//            container.style.cssText = 'overflow:hidden;';
//            container.firstChild.style.height = container.offsetHeight+'px';
//            container.lastChild.style.height = container.offsetHeight+'px';
            editor.setHeight(vpRect.height - document.getElementById('editor_toolbar_box').offsetHeight - 23);
        }
    }
    var btnFullScreen = new editorui.Button({
        className: 'edui-for-fullscreen',
        title: '全屏',
        onclick: function (){
            IS_FULL_SCREEN = !IS_FULL_SCREEN;
            var container = document.getElementById('editor');
            var container1 = document.getElementById('editor_iframe_holder');
            var iframe = container1.firstChild;
            if (IS_FULL_SCREEN) {
                bakOverflow = document.documentElement.style.overflow;
                bakOverflow1 = document.body.style.overflow;
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
                bakCssText = container.style.cssText;
                bakCssText1 = container1.style.cssText;
                bakAutoHeight = editor.autoHeightEnabled;
                editor.disableAutoHeight();
                updateSize();
                this.addState('checked');
                editor.isFullScreen = true;
            } else {
                document.documentElement.style.overflow = bakOverflow;
                document.body.style.overflow = bakOverflow1;
                container.style.cssText = bakCssText;
                container1.style.cssText = bakCssText1;
                if (bakAutoHeight) {
                    editor.enableAutoHeight();
                }
                this.removeState('checked');
                editor.isFullScreen = false;
            }
//            editor.fireEvent('selectionchange');
        }
    });
    baidu.editor.dom.domUtils.on(window, 'resize', updateSize);
    toolbar.add(btnFullScreen);

    toolbar.render();

//    var menu = new baidu.editor.ui.Menu({
//        items: [{
//            label: '表格',
//            subMenu: {
//                items: [{
//                    label: '合并',
//                    onClick: function (){
//                    }
//                },{
//                    label: '拆分'
//                }]
//            }
//        },{
//            label: '剪切'
//        },{
//            label: '复制'
//        },{
//            label: '粘贴'
//        }]
//    });
//    menu.render();
//    editor.addListener('contextmenu', function (t, evt){
//        var offset = baidu.editor.ui.uiUtils.getViewportOffsetByEvent(evt);
//        menu.showAt(offset);
//        baidu.editor.dom.domUtils.preventDefault(evt);
//    });

    // 超链接的编辑器浮层
    var linkDialog = new baidu.editor.ui.Dialog({
        iframeUrl: '../src/ui/dialogs/link/link.html',
        autoReset: true,
        draggable: true,
        editor: editor,
        className: 'edui-for-link',
        title: '超链接',
        buttons: [{
            className: 'edui-okbutton',
            label: '确认',
            onclick: function (){
                linkDialog.close(true);
            }
        }, {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function (){
                linkDialog.close(false);
            }
        }],
        onok: function (){},
        oncancel: function (){},
        onclose: function (t,ok){
            if (ok) {
                return this.onok();
            } else {
                return this.oncancel();
            }
        }

    });
    linkDialog.render();
    // 超链接的编辑器浮层
    var imgDialog = new baidu.editor.ui.Dialog({
        iframeUrl: '../src/ui/dialogs/image/image.html',
        autoReset: true,
        draggable: true,
        editor: editor,
        className: 'edui-for-image',
        title: '图片',
        buttons: [{
            className: 'edui-okbutton',
            label: '确认',
            onclick: function (){
                imgDialog.close(true);
            }
        }, {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function (){
                imgDialog.close(false);
            }
        }],
        onok: function (){},
        oncancel: function (){},
        onclose: function (t,ok){
            if (ok) {
                return this.onok();
            } else {
                return this.oncancel();
            }
        }

    });
    imgDialog.render();
    var linkPopup = new baidu.editor.ui.Popup({
        content: '',
        _onEditButtonClick: function (){
            this.hide();
            linkDialog.open();
        },
        _onRemoveButtonClick: function (){
            this.hide();
            editor.execCommand('unlink');
        },
        queryAutoHide: function (el){
            if (el && el.ownerDocument == editor.document) {
                if (baidu.editor.dom.domUtils.findParentByTagName(el, 'a', true)) {
                    return false;
                }
            }
            return baidu.editor.ui.Popup.prototype.queryAutoHide.call(this, el);
        }
    });
    linkPopup.render();
    var imgPopup = new baidu.editor.ui.Popup({
        content: '',
        _onEditButtonClick: function (){
            this.hide();
            imgDialog.open();
        },
        _onSetFloat: function(event,value){
            var nodeStart = editor.selection.getStart();
            var img = parent.baidu.editor.dom.domUtils.findParentByTagName(nodeStart,"img",true);
            if(img){
                switch(value){
                    case 0:
                        if(!!window.ActiveXObject){
                            img.style.removeAttribute("display");
                            img.style.styleFloat = "left";
                        }else{
                            img.style.removeProperty("display");
                            img.style.cssFloat = "left";
                        }
                        break;
                    case 1:
                        if(!!window.ActiveXObject){
                            img.style.removeAttribute("display");
                            img.style.styleFloat = "right";
                        }else{
                            img.style.removeProperty("display");
                            img.style.cssFloat = "right";
                        }
                        break;
                    case 2:
                        if(!!window.ActiveXObject){
                            img.style.styleFloat = "";
                            img.style.display = "block";
                        }else{
                            img.style.cssFloat = "";
                            img.style.display = "block";
                        }

                }
            }
            this.hide();
        },
        queryAutoHide: function (el){
            if (el && el.ownerDocument == editor.document) {
                if (baidu.editor.dom.domUtils.findParentByTagName(el, 'img', true)) {
                    return false;
                }
            }
            return baidu.editor.ui.Popup.prototype.queryAutoHide.call(this, el);
        }
    });
    imgPopup.render();
    editor.addListener('mousedown', function (t, evt){
        var el = evt.target || evt.srcElement;
        var link = baidu.editor.dom.domUtils.findParentByTagName(el, 'a', true);
        if (link != null) {
            var url = link.getAttribute('href', 2),
                txt = url;
            if(url.length>30){
                txt = url.substring(0,20)+"...";
            }
            linkPopup.getDom('content').innerHTML = linkPopup.formatHtml(
                '<nobr><a href="'+url+'" target="_blank" >跳转</a> - <a target="_blank" href="'+ url +'" title="'+url+'" >' + txt + '</a>' +
                ' <span onclick="$$._onEditButtonClick(event, this);">修改</span>' +
                ' <span onclick="$$._onRemoveButtonClick(event, this);"> 清除</span></nobr>');
            linkPopup.showAnchor(link);
        } else {
            linkPopup.hide();
            var img = baidu.editor.dom.domUtils.findParentByTagName(el, 'img', true);
            if(img != null){
                imgPopup.getDom('content').innerHTML = imgPopup.formatHtml(
                    '<nobr><span onclick=$$._onSetFloat(event,0) >左浮动</span>&nbsp;&nbsp;<span onclick=$$._onSetFloat(event,1)>右浮动</span>&nbsp;&nbsp;'+
                    '<span onclick=$$._onSetFloat(event,2)>独占一行</span>' +
                    ' <span onclick="$$._onEditButtonClick(event, this);">修改</span></nobr>');
                imgPopup.showAnchor(img);
                
            }else{
                imgPopup.hide();
            }
        }
    });

    // todo: 这里使用了全局变量
    editor.addListener('selectionchange', function (){
        var list = editor.queryCommandValue('elementpath');
        var buff = [];
        for(var i=0,ci;ci=list[i];i++){
            buff[i] = '<span unselectable="on" onclick="editor.execCommand(&quot;elementpath&quot;, &quot;'+ i +'&quot;);">' + ci + '</span>'
        }
        document.getElementById('editor_breadcrumb').innerHTML = 'path: ' + buff.join(' &gt; ');
    });
    baidu.editor.ui.uiUtils.makeUnselectable(document.getElementById('editor_foot'));
    
    editor.addListener('mousedown', function (t, evt){
        var el = evt.target || evt.srcElement;
        baidu.editor.ui.Popup.postHide(el);
    });
    editor.addListener('ready', function (){
        editor.fireEvent('selectionchange');
    });
    editor.render('editor_iframe_holder');
})();
