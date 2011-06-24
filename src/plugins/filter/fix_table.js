baidu.editor.plugins['fix_table'] = function (){
    var editor = this;
    editor.fixTable = function (html){
        if (/<(table|tr|th|td|tbody|thead|tfoot)/i.test(html)) {
            var tag = RegExp.$1.toLowerCase();
            if (tag == 'td' || tag == 'th') {
                html = '<tr>' + html + '</tr>';
                tag = 'tr';
            }
            if (tag == 'tr') {
                html = '<tbody>' + html + '</tbody>';
                tag = 'tbody';
            }
            if (tag == 'tbody' || tag == 'thead' || tag == 'tfoot') {
                html = '<table>' + html + '</table>';
            }
        }
        return html;
    };
};
