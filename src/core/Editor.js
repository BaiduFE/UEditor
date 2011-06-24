(function () {
    baidu.editor.Editor = Editor;

    var editor = baidu.editor,
        utils = editor.utils,
        EventBase = editor.EventBase,
        domUtils = editor.dom.domUtils,
        Selection = editor.dom.Selection,
        ie = editor.browser.ie,
        uid = 0,
        browser = editor.browser,
        dtd = editor.dom.dtd;

    /**
     * 编辑器类
     * @public
     * @class
     * @extends baidu.editor.EventBase
     * @name baidu.editor.Editor
     * @param {Object} options
     */
    function Editor( options ) {
        var me = this;
        me.uid = uid ++;
        EventBase.call( me );
        me.commands = {};
        me.options = utils.extend( options || {}, Editor.DEFAULT_OPTIONS, true );
        me.initPlugins();
    }

    /**
     * @event
     * @name baidu.editor.Editor#ready
     */
    /**
     * @event
     * @name baidu.editor.Editor#beforeSelectionChange
     */
    /**
     * @event
     * @name baidu.editor.Editor#selectionChange
     */

    Editor.DEFAULT_OPTIONS = {
        initialStyle: '',
        initialContent: '',
        iframeCssUrl: '',
        removeFormatTags : 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var',
        removeFormatAttributes : 'class,style,lang,width,height,align,hspace,valign',
        enterTag : 'p',
        maxUndoCount : 20,
        maxInputCount : 20,
        minFrameHeight : 400,
        selectedTdClass : 'selectTdClass',
        pasteplain : 0

    };

    Editor.prototype = /**@lends baidu.editor.Editor.prototype*/{

        /**
         * 渲染编辑器的DOM到指定容器，必须且只能调用一次
         * @public
         * @function
         * @param {Element|String} container
         */
        render : function ( container ) {
            if (container.constructor === String) {
                container = document.getElementById(container);
            }
            var iframeId = 'baidu_editor_' + this.uid;
            container.innerHTML = '<iframe id="' + iframeId + '"' +
                'width="100%" height="100%" scroll="no" frameborder="0"></iframe>';
            if (domUtils.getComputedStyle(container, 'position') != 'absolute') {
                container.style.position = 'relative';
            }
            container.style.overflow = 'hidden';
            var iframe = document.getElementById( iframeId ),
                doc = iframe.contentWindow.document;
            this.setup( doc );
        },

        setup: function ( doc ) {
            var options = this.options;
            doc.open();
            var html = ( ie ? '' : '<!DOCTYPE html>' ) +
                '<html xmlns="http://www.w3.org/1999/xhtml"><head><title></title><style type="text/css">' +
                ( ie ? 'body' : 'html' ) + '{ cursor: text; height: 100%; }' + ( options.initialStyle ) + '</style>' +
                ( options.iframeCssUrl ? '<link rel="stylesheet" type="text/css" href="' + utils.unhtml( options.iframeCssUrl ) + '"/>' : '' ) + '</head><body>' +
                '</body></html>';
            doc.write( html );
            doc.close();
            if ( ie ) {
                doc.body.disabled = true;
                doc.body.contentEditable = true;
                doc.body.removeAttribute( 'disabled' );
            } else {
                doc.designMode = 'on';
                doc.body.spellcheck = false;
            }
            this.document = doc;
            this.window = doc.defaultView || doc.parentWindow;

            this.iframe = this.window.frameElement;
            if (this.options.minFrameHeight) {
                this.setHeight(this.options.minFrameHeight);
            }
            this.body = doc.body;
            this.selection = new Selection( doc );
            this._initEvents();
            this.options.initialContent && this.setContent(this.options.initialContent);
            this.fireEvent( 'ready' );
        },

        setHeight: function (height){
            this.iframe.parentNode.style.height = height + 'px';
        },

        /**
         * 获取编辑内容
         * @public
         * @function
         * @returns {String}
         */
        getContent : function () {
            this.fireEvent( 'beforegetcontent' );
            var reg = new RegExp( domUtils.fillChar, 'g' ),
                html = this.document.body.innerHTML.replace(reg,'');
            this.fireEvent( 'aftergetcontent' );
            return this.serialize ? this.serialize.toHTML(this.serialize.parseHTML(html)) : html;
        },
        
        getContentTxt : function(){
            var reg = new RegExp( domUtils.fillChar, 'g' );
            return this.document.body[browser.ie ? 'innerText':'textContent'].replace(reg,'')
        },
        /**
         * 设置编辑内容
         * @public
         * @function
         * @param {String} html
         */
        setContent : function ( html ) {
            var me = this;
            me.fireEvent( 'beforesetcontent' );
            this.document.body.innerHTML = html;
            //给文本或者inline节点套p标签
            if(me.options.enterTag == 'p'){
                var child = this.body.firstChild,
                    p = me.document.createElement('p'),
                    tmpNode;

                while(child){
                    if(child.nodeType ==3 || child.nodeType == 1 && dtd.p[child.tagName]){
                        tmpNode = child.nextSibling;

                        p.appendChild(child);
                        child = tmpNode;
                        if(!child){
                            me.body.appendChild(p)
                        }
                    }else{
                        if(p.firstChild){
                            me.body.insertBefore(p,child);
                            p = me.document.createElement('p')

                            
                        }
                        child = child.nextSibling


                    }


                }   
            }

            me.fireEvent( 'aftersetcontent' );
        },

        /**
         * 让编辑器获得焦点
         * @public
         * @function
         */
        focus : function () {
            domUtils.getWindow( this.document ).focus();
        },

        /**
         * 加载插件
         * @public
         * @function
         * @param {Array} plugins
         */
        initPlugins : function ( plugins ) {
            var fn,originals = baidu.editor.plugins;
            if ( plugins ) {
                for ( var i = 0,pi; pi = plugins[i++]; ) {
                    if ( utils.indexOf( this.options.plugins, pi ) == -1 && (fn = baidu.editor.plugins[pi]) ) {
                        this.options.plugins.push( pi );
                        fn.call( this )
                    }
                }
            } else {

                plugins = this.options.plugins;

                if ( plugins ) {
                    for ( i = 0; pi = originals[plugins[i++]]; ) {
                        pi.call( this )
                    }
                } else {
                    this.options.plugins = [];
                    for ( pi in originals ) {
                        this.options.plugins.push( pi );
                        originals[pi].call( this )
                    }
                }
            }


        },

        _initEvents : function () {
            var me = this,
                doc = this.document,
                win = domUtils.getWindow( doc );

            var _selectionChange = utils.defer( utils.bind( me._selectionChange, me ), 100, true );
            me._proxyDomEvent = utils.bind( me._proxyDomEvent, me );
            domUtils.on( doc, ['click', 'contextmenu', 'mousedown', 'mouseup', 'keydown', 'keyup','keypress','mouseover','mouseout','selectstart'], me._proxyDomEvent );
            domUtils.on( win, ['focus', 'blur'], me._proxyDomEvent );
            var _undoSave = utils.defer(function (){
                me.undoManger && me.undoManger.save();
                me._selectionChange();
            }, 300, true);
            domUtils.on( doc, ['mouseup','keyup'], function(evt){
                var keyCode = evt.keyCode || evt.which;
                if(evt.type == 'keyup' && !domUtils.keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey){
                    _undoSave();
                } else {
                    _selectionChange();
                }
            });

             //处理拖拽
            //ie ff不能从外边拖入
            //chrome只针对从外边拖入的内容过滤
            var innerDrag = 0,source = browser.ie ? me.body : me.document,dragoverHandler;

            domUtils.on(source,'dragstart',function(){
                innerDrag = 1;
            });

            domUtils.on(source,browser.webkit ? 'dragover' : 'drop',function(){
                return browser.webkit ?
                    function(){
                        clearTimeout( dragoverHandler );
                        dragoverHandler = setTimeout( function(){
                            if(!innerDrag){
                                var sel = me.selection,
                                    range = sel.getRange();
                                if(range){
                                    var common = range.getCommonAncestor();
                                    common && me.filter && me.filter.doFilter( common )
                                }
                            }
                            innerDrag = 0;
                        }, 200 );
                    } :
                    function(e){

                        if(!innerDrag){
                            e.preventDefault ? e.preventDefault() :(e.returnValue = false) ;

                        }
                        innerDrag = 0;
                    }

            }());

        },
        _proxyDomEvent: function ( evt ) {
            return this.fireEvent( evt.type.replace( /^on/, '' ), evt );
        },

        _selectionChange : function () {
            var me = this;
            //需要捕获ie回报错误
            try {
                var fillData = editor.fillData,
                    reg = new RegExp( domUtils.fillChar, 'g' ),
                    parent = fillData.parentNode;

                if ( fillData && parent ) {

                    if ( fillData.nodeValue.replace( reg, '' ).length ) {
                        fillData.nodeValue = fillData.nodeValue.replace( reg, '' );
                        editor.fillData = null;
                    }

                }
            } catch( e ) {
            }
           

            me.selection.cache();
            if ( me.selection._cachedRange && me.selection._cachedStartElement ) {
                me.fireEvent( 'beforeselectionchange' );
                me.fireEvent( 'selectionchange' );
                me.selection.clear();
            }

        },

        _callCmdFn: function ( fnName, args ) {
            var cmdName = args[0].toLowerCase(),
                cmd, cmdFn;
            cmdFn = ( cmd = this.commands[cmdName] ) && cmd[fnName] ||
                ( cmd = baidu.editor.commands[cmdName]) && cmd[fnName];
            if ( cmd && !cmdFn && fnName == 'queryCommandState' ) {
                return false;
            } else if ( cmdFn ) {
                return cmdFn.apply( this, args );
            }
        },

        /**
         * 执行编辑命令
         * @public
         * @function
         * @param {String} cmdName
         * @see docs/Commands.html
         */
        execCommand : function ( cmdName ) {

            cmdName = cmdName.toLowerCase();
            var me = this,
                result,
                cmd = me.commands[cmdName] || baidu.editor.commands[cmdName];
            if ( !cmd || !cmd.execCommand ) {
                return;
            }

            if ( !cmd.notNeedUndo && !me.__hasEnterExecCommand ) {
                me.__hasEnterExecCommand = true;
                me.fireEvent( 'beforeexeccommand', cmdName );
                result = this._callCmdFn( 'execCommand', arguments );
                me.fireEvent( 'afterexeccommand', cmdName );
                me.__hasEnterExecCommand = false;
            } else {
                result = this._callCmdFn( 'execCommand', arguments );
            }
            me._selectionChange();
            return result;
        },

        /**
         * 查询命令的状态
         * @public
         * @function
         * @param {String} cmdName
         * @returns {Number|*} -1 : disabled, false : normal, true : enabled.
         * @see docs/Commands.html
         */
        queryCommandState : function ( cmdName ) {
            return this._callCmdFn( 'queryCommandState', arguments );
        },

        /**
         * 查询命令的值
         * @public
         * @function
         * @param {String} cmdName
         * @returns {*}
         * @see docs/Commands.html
         */
        queryCommandValue : function ( cmdName ) {
            return this._callCmdFn( 'queryCommandValue', arguments );
        },
        hasContents : function(){
            var cont = this.body[browser.ie ? 'innerText' : 'textContent'],
                reg = new RegExp('[ \t\n\r'+domUtils.fillChar+']','g');

            return !!cont.replace(reg,'').length
        }

    };
    utils.inherits( Editor, EventBase );
})();
