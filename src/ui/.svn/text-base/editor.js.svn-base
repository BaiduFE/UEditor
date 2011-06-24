(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase;

    var defaultToolbars = [
        ['FullScreen','Source','ClearDoc','|','Undo','Redo','|',
         'Bold','Italic','Underline','StrikeThrough','Superscript','Subscript','RemoveFormat','|',
         'ForeColor','BackColor','InsertOrderedList','InsertUnorderedList','|',
         'Paragraph','FontFamily','FontSize','|',
         'JustifyLeft','JustifyCenter','JustifyRight','JustifyJustify','|',
         'Link','InsertTable','Emoticon','Video','Map','|','Help']
    ];

    function EditorUI(options){
        this.initOptions(options);
        this.initEditorUI();
    }
    EditorUI.prototype = {
        uiName: 'editor',
        initEditorUI: function (){
            this.initUIBase();
            this._initToolbars();
            var editor = this.editor;
            editor.addListener('ready', function (){
                editor.fireEvent('selectionchange');
            });
            editor.addListener('mousedown', function (){
                baidu.editor.ui.Popup.postHide();
            });
            var me = this;
            editor.addListener('selectionchange', function (){
                me._updateElementPath();
            });
        },
        _initToolbars: function (){
            var editor = this.editor;
            var toolbars = this.toolbars || defaultToolbars;
            var toolbarUis = [];
            for (var i=0; i<toolbars.length; i++) {
                var toolbar = toolbars[i];
                var toolbarUi = new baidu.editor.ui.Toolbar();
                for (var j=0; j<toolbar.length; j++) {
                    var toolbarItem = toolbar[j];
                    var toolbarItemUi = null;
                    if (typeof toolbarItem == 'string') {
                        if (toolbarItem == '|') {
                            toolbarItem = 'Separator';
                        }
                        if (baidu.editor.ui[toolbarItem]) {
                            toolbarItemUi = new baidu.editor.ui[toolbarItem](editor);
                        }
                    } else {
                        toolbarItemUi = toolbarItem;
                    }
                    if (toolbarItemUi) {
                        toolbarUi.add(toolbarItemUi);
                    }
                }
                toolbarUis[i] = toolbarUi;
            }
            this.toolbars = toolbarUis;
        },
        getHtmlTpl: function (){
            return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' +
                this.renderToolbarBoxHtml() + '</div><div id="##_iframeholder" class="%%-iframeholder"></div>' +
                    '<div id="##_bottombar" class="%%-bottombar"></div></div>';
        },
        renderToolbarBoxHtml: function (){
            var buff = [];
            for (var i=0; i<this.toolbars.length; i++) {
                buff.push(this.toolbars[i].renderHtml());
            }
            return buff.join('');
        },
        setFullScreen: function (fullscreen){
            if (this._fullscreen != fullscreen) {
                this._fullscreen = fullscreen;
                if (fullscreen) {
                    this._bakHtmlOverflow = document.documentElement.style.overflow;
                    this._bakBodyOverflow = document.body.style.overflow;
                    this._bakAutoHeight = this.editor.autoHeightEnabled;
                    if (this._bakAutoHeight) {
                        this.editor.disableAutoHeight();
                    }
                    document.documentElement.style.overflow = 'hidden';
                    document.body.style.overflow = 'hidden';
                    this._bakCssText = this.getDom().style.cssText;
                    this._bakCssText1 = this.getDom('iframeholder').style.cssText;
                    this._updateFullScreen();
                } else {
                    document.documentElement.style.overflow = this._bakHtmlOverflow;
                    document.body.style.overflow = this._bakBodyOverflow;
                    this.getDom().style.cssText = this._bakCssText;
                    this.getDom('iframeholder').style.cssText = this._bakCssText1;
                    if (this._bakAutoHeight) {
                        this.editor.enableAutoHeight();
                    }
                }
            }
        },
        _updateFullScreen: function (){
            if (this._fullscreen) {
                var vpRect = baidu.editor.ui.uiUtils.getViewportRect();
                this.getDom().style.cssText = 'border:0;position:absolute;left:0;top:0;width:'+vpRect.width+'px;height:'+vpRect.height+'px;';
                this.editor.setHeight(vpRect.height - this.getDom('toolbarbox').offsetHeight - this.getDom('bottombar').offsetHeight);
            }
        },
        _updateElementPath: function (){
            var list = this.editor.queryCommandValue('elementpath');
            var buff = [];
            for(var i=0,ci;ci=list[i];i++){
                buff[i] = '<span unselectable="on" onclick="editor.execCommand(&quot;elementpath&quot;, &quot;'+ i +'&quot;);">' + ci + '</span>'
            }
            this.getDom('bottombar').innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">path: ' + buff.join(' &gt; ') + '</div>';
        },
        isFullScreen: function (){
            return this._fullscreen;
        },
        postRender: function (){
            UIBase.prototype.postRender.call(this);
            for (var i=0; i<this.toolbars.length; i++) {
                this.toolbars[i].postRender();
            }
            var me = this;
            baidu.editor.dom.domUtils.on(window, 'resize', function (){
                me._updateFullScreen();
            });
        }
    };
    utils.inherits(EditorUI, baidu.editor.ui.UIBase);

    baidu.editor.ui.Editor = function (options){
        options = options || {};
        var editor = new baidu.editor.Editor(options);
        var uiOptions = options.ui || {};
        if (options.id) {
            uiOptions.id = options.id;
        }
        uiOptions.editor = editor;
        editor.ui = new EditorUI(uiOptions);
        var oldRender = editor.render;
        editor.render = function (holder){
            editor.ui.render(holder);
            var iframeholder = editor.ui.getDom('iframeholder');
            return oldRender.call(this, iframeholder);
        };
        return editor;
    };
})();