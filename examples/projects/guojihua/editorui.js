(function (){

    var utils = baidu.editor.utils;
    var editorui = baidu.editor.ui;
    var k, cmd;

    var btnCmds = ['Undo', 'Redo',
        'Bold', 'Italic', 'Underline'];
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
    editorui.directionality = function (editor, side, title){
        side = (side || 'left').toLowerCase();
        var ui = new editorui.Button({
            className: 'edui-for-directionality' + side.toLowerCase(),
            title: title,
            onclick: function (){
                editor.execCommand('directionality', side);
            },
            type : side
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('Justify');
            ui.setDisabled(state == -1);
            var value = editor.queryCommandValue('directionality');
            ui.setChecked(value == ui.type);
        });
        return ui;
    };

    editorui.InsertOrderedList = function (editor, title){
        function _onMenuClick(){
            editor.execCommand('InsertOrderedList', this.value);
        }
        var ui = new editorui.SplitButton({
            title: title,
            className: 'edui-for-insertorderedlist',
            value: 'decimal',
            popup: new editorui.Menu({
                className: 'edui-for-insertorderedlist',
                items: [{
                    label: '1,2,3...',
                    value: 'decimal',
                    onclick: _onMenuClick
                },{
                    label: 'a,b,c ...',
                    value: 'lower-alpha',
                    onclick: _onMenuClick
                },{
                    label: 'i,ii,iii...',
                    value: 'lower-roman',
                    onclick: _onMenuClick
                },{
                    label: 'A,B,C',
                    value: 'upper-alpha',
                    onclick: _onMenuClick
                },{
                    label: 'I,II,III...',
                    value: 'upper-roman',
                    onclick: _onMenuClick
                }]
            }),
            onbuttonclick: function (){
                editor.execCommand('InsertUnorderedList', this.value);
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('InsertOrderedList');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
                var value = editor.queryCommandValue('InsertOrderedList');
                var list = ui.popup;
                for (var i=0; i<list.items.length; i++) {
                    list.items[i].removeState('checked');
                    if (list.items[i].value == value) {
                        list.items[i].addState('checked');
                        ui.value = value;
                    }
                }
            }
        });
        return ui;
    };

    editorui.InsertUnorderedList = function (editor, title){
        function _onMenuClick(){
            editor.execCommand('InsertUnorderedList', this.value);
        }
        var ui = new editorui.SplitButton({
            className: 'edui-for-insertunorderedlist',
            title: title,
            value: 'disc',
            popup: new editorui.Menu({
                className: 'edui-for-insertunorderedlist',
                items: [{
                    label: '○ 小圆圈',
                    value: 'circle',
                    onclick: _onMenuClick
                },{
                    label: '● 小圆点',
                    value: 'disc',
                    onclick: _onMenuClick
                },{
                    label: '■ 小方块',
                    value: 'square',
                    onclick: _onMenuClick
                }]
            }),
            onbuttonclick: function (){
                editor.execCommand('InsertUnorderedList', this.value);
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('InsertUnorderedList');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
                var value = editor.queryCommandValue('InsertUnorderedList');
                var list = ui.popup;
                for (var i=0; i<list.items.length; i++) {
                    list.items[i].removeState('checked');
                    if (list.items[i].value == value) {
                        list.items[i].addState('checked');
                        ui.value = value;
                    }
                }
            }
        });
        return ui;
    };
})();
