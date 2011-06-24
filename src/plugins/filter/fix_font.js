baidu.editor.plugins['fix_font'] = function (){
    var editor = this;
    var sizeMap = [0, 10, 12, 16, 18, 24, 32, 48];
    function font2span(font){
        var doc = font.ownerDocument;
        var span = doc.createElement('span');
        span.style.cssText = (font.getAttribute('size') ? 'font-size:' + (sizeMap[font.getAttribute('size')] || 12) + 'px;' : '')
            + ';' + (font.getAttribute('color') ? 'color:'+ font.getAttribute('color') : '')
            + ';' + (font.getAttribute('face') ? 'font-family:'+ font.getAttribute('face') : '')
            + ';' + font.style.cssText;
        return span;
    }
    editor.fixFont = function (dom){
        var font;
        while (font = dom.getElementsByTagName('font')[0]) {
            font.parentNode.replaceChild(font2span(font), font);
        }
    };
};
