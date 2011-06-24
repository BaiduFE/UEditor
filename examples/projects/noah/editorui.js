(function (){
    var serializeConfig = function (){
        var blockAtt = {style:1,align:1,dir:1};
        var blockDtd = {div:1,p:1,span:1,strong:1,b:1,em:1,i:1,u:1,img:1,embed:1,table:1,ul:1,ol:1,blockquote:1,$:blockAtt};
        var inlineDtd = {span:1,strong:1,b:1,em:1,i:1,u:1,img:1,$:{}};
        var X = baidu.editor.utils.extend;

        return {
            blackList: {style:1,script:1},
            whiteList: {
                '#document-fragment': blockDtd,
                div: X(blockDtd, {$:{style:1,align:1,dir:1}}),
                span: X(inlineDtd, {$:{style:1}}),
                strong: inlineDtd,
                em: inlineDtd,
                b: inlineDtd,
                i: inlineDtd,
                u: inlineDtd,
                table: {tr:1,tbody:1,thead:1,tfoot:1, $:{style:1,cellpadding:1,cellspacing:1,border:1,bgcolor:1}},
                tbody: {tr:1, $:{style:1,bgcolor:1,cellpadding:1,cellspacing:1}},
                thead: {tr:1, $:{style:1,bgcolor:1,cellpadding:1,cellspacing:1}},
                tfoot: {tr:1, $:{style:1,bgcolor:1,cellpadding:1,cellspacing:1}},
                td: X(blockDtd,{$:X(blockAtt,{bgcolor:1,rowspan:1,colspan:1})}),
                th: X(blockDtd,{$:X(blockAtt,{bgcolor:1,rowspan:1,colspan:1})}),
                ul: {li:1,$:{style:1}},
                ol: {li:1,$:{style:1}},
                li: blockDtd,
                blockquote: blockDtd,
                img: {$:{style:1,width:1,height:1,src:1,alt:1,title:1}}
            }
        };
    }();
    var utils = baidu.editor.utils;
    var editorui = baidu.editor.ui;
    var k, cmd;

    var btnCmds = ['Undo', 'Redo','ClearDoc',
        'Bold', 'Italic', 'Underline', 'StrikeThrough','Unlink','SelectAll',
        'InsertRow','InsertCol','MergeRight','MergeDown','DeleteRow','DeleteCol','SplittoRows','SplittoCols','SplittoCells','MergeCells','DeleteTable'];
    k = btnCmds.length;
    while (k --) {
        cmd = btnCmds[k];
        editorui[cmd] = function (cmd){
            return function (editor, title){
                var ui = new editorui.Button({
                    className: 'edui-for-' + cmd.toLowerCase(),
                    title: title,
                    onclick: function (){
                        switch (cmd){
                            case 'Cut':
                                alert('请使用CTRL+X进行剪切！');
                                ui.removeState('hover');
                                break;
                            case 'Copy':
                                alert('请使用CTRL+C进行复制！');
                                ui.removeState('hover');
                                break;
                            case 'Paste':
                                alert('请使用CTRL+V进行粘贴！');
                                ui.removeState('hover');
                                break;
                            default:
                                editor.execCommand(cmd);
                        }

                    }
                });
                editor.addListener('selectionchange', function (){
                    var state = editor.queryCommandState(cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                        ui.setChecked(false);
                    } else {
                        ui.setDisabled(false);
                        ui.setChecked(state);
                    }
                });
                return ui;
            };
        }(cmd);
    }
    editorui.Justify = function (editor, side, title){
        side = (side || 'left').toLowerCase();
        var ui = new editorui.Button({
            className: 'edui-for-justify' + side.toLowerCase(),
            title: title,
            onclick: function (){
                editor.execCommand('Justify', side);
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('Justify');
            ui.setDisabled(state == -1);
            var value = editor.queryCommandValue('Justify');
            ui.setChecked(value == side);
        });
        return ui;
    };

    editorui.InsertOrderedList = function (editor, title){
        var _onMenuClick = function(){
            editor.execCommand("InsertOrderedList", this.value);
        };
        var ui = new editorui.MenuButton({
            cmd : "InsertOrderedList",
            title : title,
            items :
                [{
                    label: '1,2,3...',
                    value: 'decimal',
                    onclick : _onMenuClick
                },{
                    label: 'a,b,c ...',
                    value: 'lower-alpha',
                    onclick : _onMenuClick
                },{
                    label: 'i,ii,iii...',
                    value: 'lower-roman',
                    onclick : _onMenuClick
                },{
                    label: 'A,B,C',
                    value: 'upper-alpha',
                    onclick : _onMenuClick
                },{
                    label: 'I,II,III...',
                    value: 'upper-roman',
                    onclick : _onMenuClick
                }],
            onbuttonclick: function (){
                editor.execCommand("InsertOrderedList", this.value);
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('InsertOrderedList');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
                var value = editor.queryCommandValue('InsertOrderedList');
                ui.setValue(value);
            }
        });
        return ui;
    };

    editorui.InsertUnorderedList = function (editor, title){
        var _onMenuClick = function(){
            editor.execCommand("InsertUnorderedList", this.value);
        };
        var ui = new editorui.MenuButton({
            cmd : 'InsertUnorderedList',
            title: title,
            items:
                [{
                    label: '○ 小圆圈',
                    value: 'circle',
                    onclick : _onMenuClick
                },{
                    label: '● 小圆点',
                    value: 'disc',
                    onclick : _onMenuClick
                },{
                    label: '■ 小方块',
                    value: 'square',
                    onclick : _onMenuClick
                }],
            onbuttonclick: function (){
                editor.execCommand("InsertUnorderedList", this.value);
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('InsertUnorderedList');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
                var value = editor.queryCommandValue('InsertUnorderedList');
                ui.setValue(value);
            }
        });
        return ui;
    };
    var colorCmds = ['BackColor', 'ForeColor'];
    k = colorCmds.length;
    while (k --) {
        cmd = colorCmds[k];
        editorui[cmd] = function (cmd){
            return function (editor, title){
                var ui = new editorui.ColorButton({
                    className: 'edui-for-' + cmd.toLowerCase(),
                    color: 'default',
                    title: title,
                    onpickcolor: function (t, color){
                        editor.execCommand(cmd, color);
                    },
                    onpicknocolor: function (){
                        editor.execCommand(cmd, 'default');
                        this.setColor('transparent');
                        this.color = 'default';
                    },
                    onbuttonclick: function (){
                        editor.execCommand(cmd, this.color);
                    }
                });
                editor.addListener('selectionchange', function (){
                    var state = editor.queryCommandState(cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                    } else {
                        ui.setDisabled(false);
                    }
                });
                return ui;
            };
        }(cmd);
    }
    var FONT_MAP = {
        '宋体': ['宋体', 'SimSun'],
        '楷体': ['楷体', '楷体_GB2312', 'SimKai'],
        '黑体': ['黑体', 'SimHei'],
        '隶书': ['隶书', 'SimLi'],
        'andale mono' : ['andale mono'],
        'arial' : ['arial','helvetica','sans-serif'],
        'arial black' : ['arial black','avant garde'],
        'comic sans ms' : ['comic sans ms','sans-serif'],
        'impact' : ['impact','chicago'],
        'symbol' : ['symbol'],
        'times new roman' : ['times new roman']
    };
    editorui.FontFamily = function (editor, list, title){
        var items = [];
        for (var i=0; i<list.length; i++) {
            var font = list[i];
            var fonts = FONT_MAP[font];
            var value = '"' + font + '"';
            var regex = new RegExp(font, 'i');
            if (fonts) {
                value = '"' + fonts.join('","') + '"';
                regex = new RegExp(fonts.join('|'), 'i');
            }
            items.push({
                label: font,
                value: value,
                regex: regex,
                renderLabelHtml: function (){
                    return '<div class="edui-label %%-label" style="font-family:' +
                        utils.unhtml(this.value) + '">' + (this.label || '') + '</div>';
                }
            });
        }
        var ui = new editorui.Combox({
            items: items,
            onselect: function (t,index){
                editor.execCommand('FontFamily', this.items[index].value);
            },
            onbuttonclick: function (){
                this.showPopup();
            },
            title: title,
            className: 'edui-for-fontfamily',
            indexByValue: function (value){
                value = value.replace(/,.*/, '').replace(/"/g, '');
                for (var i=0; i<this.items.length; i++) {
                    var item = this.items[i];
                    if (item.regex.test(value)) {
                        return i;
                    }
                }
                return -1;
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('FontFamily');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
                var value = editor.queryCommandValue('FontFamily');
                ui.setValue(value);
            }
        });
        return ui;
    };
    editorui.InsertTable = function (editor, url, title){
        var dialog = new editorui.Dialog({
            iframeUrl: url,
            autoReset: true,
            draggable: true,
            editor: editor,
            className: 'edui-for-inserttable',
            title: title,
            buttons: [{
                className: 'edui-okbutton',
                label: '确认',
                onclick: function (){
                    dialog.close(true);
                }
            }, {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function (){
                    dialog.close(false);
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
        dialog.render();

        var ui = new editorui.TableButton({
            title: title,
            className: 'edui-for-inserttable',
            onpicktable: function (t,numCols, numRows){
                editor.execCommand('InsertTable', {numRows:numRows, numCols:numCols});
            },
            onmore: function (){
                dialog.open();
            },
            onbuttonclick: function (){
                dialog.open();
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('inserttable');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
            }
        });
        return ui;
    };
    var dialogCmds = ['Link', 'Image'];
    k = dialogCmds.length;
    while (k --) {
        cmd = dialogCmds[k];
        editorui[cmd] = function (cmd){
            cmd = cmd.toLowerCase();
            return function (editor, iframeUrl, title){
                var dialog = new editorui.Dialog({
                    iframeUrl: iframeUrl,
                    autoReset: true,
                    draggable: true,
                    editor: editor,
                    className: 'edui-for-' + cmd,
                    title: title,
                    buttons: [{
                        className: 'edui-okbutton',
                        label: '确认',
                        onclick: function (){
                            dialog.close(true);
                        }
                    }, {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function (){
                            if(baidu.editor.browser.ie){
                                editor.selection._bakIERange.select();
                            }
                            dialog.close(false);
                        }
                    }],
                    onok: function (){},
                    oncancel: function (){},
                    onclose: function (t, ok){
                        if (ok) {
                            return this.onok();
                        } else {
                            return this.oncancel();
                        }
                    }
                });
                dialog.render();
                var ui = new editorui.Button({
                    className: 'edui-for-' + cmd,
                    title: title,
                    onclick: function (){
                        if (cmd == 'link') {
                            var link = editor.queryCommandValue('link');
                            dialog.link = {};
                            if (link != null) {
                                dialog.link.href = link.getAttribute('href', 2);
                                dialog.link.title = link.getAttribute('title',2);
                                dialog.link.target = link.getAttribute('target',2);
                            }
                        }else if(cmd == "image"){
                            var image = editor.queryCommandState('image');
                            dialog.image= {};
                            if (image != null) {
                                dialog.image.src = image.getAttribute('src', 2);
                                dialog.image.width = image.getAttribute('width',2);
                                dialog.image.height = image.getAttribute('height',2);
                            }
                        }
                        dialog.open();
                    }
                });
                editor.addListener('selectionchange', function (){
                    var state = editor.queryCommandState(cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                    } else {
                        ui.setDisabled(false);
                    }
                });
                return ui;
            };
        }(cmd);
    }
})();
