(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.Utils,
        Popup = baidu.editor.ui.Popup,
        UIBase = baidu.editor.ui.UIBase,
        ColorPicker = baidu.editor.ui.ColorPicker = function (options){
            this.initOptions(options);
            this.noColorText = this.noColorText || '不设置颜色';
            this.initUIBase();
        };

    ColorPicker.prototype = {
        getHtmlTpl: function (){
            return genColorPicker(
                this.noColorText
                );
        },
        _onTableClick: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.fireEvent('pickcolor', color);
            }
        },
        _onTableOver: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.getDom('preview').style.backgroundColor = color;
            }
        },
        _onTableOut: function (){
            this.getDom('preview').style.backgroundColor = '';
        },
        _onPickNoColor: function (){
            this.fireEvent('picknocolor');
        }
    };
    utils.inherits(ColorPicker, UIBase);

    var COLORS = (
        'ff0000,ffa900,ffff00,99e600,00cc22,00ffff,00aaff,0055ff,5500ff,aa00ff,ff007f,ffffff,' +
        'ffe5e5,fff2d9,ffffcc,eeffcc,d9ffe0,d9ffff,d9f2ff,d9e6ff,e6d9ff,f2d9ff,ffd9ed,d9d9d9,' +
        'e68a8a,e6c78a,ffff99,bfe673,99eea0,a1e6e6,99ddff,8aa8e6,998ae6,c78ae6,e68ab9,b3b3b3,' +
        'cc5252,cca352,d9d957,a7cc39,57ce6d,52cccc,52a3cc,527acc,6652cc,a352cc,cc5291,8c8c8c,' +
        '991f1f,99701f,99991f,59800d,0f9932,1f9999,1f7099,1f4799,471f99,701f99,991f5e,404040,' +
        '660000,664b14,666600,3b5900,005916,146666,144b66,143066,220066,301466,66143f,000000').split(',');

    function genColorPicker(noColorText){
        var html = '<div id="##" class="edui-colorpicker %%">' +
            '<div class="edui-colorpicker-topbar edui-clearfix">' +
             '<div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div>' +
             '<div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">'+ noColorText +'</div>' +
            '</div>' +
            '<table class="edui-box" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0">' +
            '<tr class="edui-colorpicker-tablefirstrow">';
        for (var i=0; i<COLORS.length; i++) {
            if (i && i%12 === 0) {
                html += '</tr><tr>';
            }
            html += '<td><a hidefocus onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell"' +
                        ' data-color="#'+ COLORS[i] +'"'+
                        ' style="background-color:#'+ COLORS[i] +';"' +
                    '></a></td>';
        }
        html += '</tr></table></div>';
        return html;
    }
})();
