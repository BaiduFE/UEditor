(function (){

var dtd = baidu.editor.dom.dtd;
var EMPTY_TAG = dtd.$empty;

var parseHTML = function (){

    var RE_PART = /<(?:(?:\/([^>]+)>\s*)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>\s*))/g;
    var RE_ATTR = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g;

    var EMPTY_ATTR = {checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};
    var CDATA_TAG = {script:1,style: 1};
    var NEED_PARENT_TAG = {
        "li": { "$": 'ul', "ul": 1, "ol": 1 },
        "dd": { "$": "dl", "dl": 1 },
        "dt": { "$": "dl", "dl": 1 },
        "option": { "$": "select", "select": 1 },
        "td": { "$": "tr", "tr": 1 },
        "tr": { "$": "tbody", "tbody": 1, "thead": 1, "tfoot": 1, "table": 1 },
        "tbody": { "$": "table", "table": 1 },
        "thead": { "$": "table", "table": 1 },
        "tfoot": { "$": "table", "table": 1 },
        "col": { "$": "colgroup" }
    };
    var NEED_CHILD_TAG = {
        "table": "td", "tbody": "td", "thead": "td", "tfoot": "td", "tr": "td",
        "colgroup": "col",
        "ul": "li", "ol": "li",
        "dl": "dd",
        "select": "option"
    };

    function parse(html, callbacks){

        var match,
            nextIndex = 0,
            tagName,
            cdata;
        RE_PART.exec("");
        while ((match = RE_PART.exec(html))) {
            var tagIndex = match.index;
            if (tagIndex > nextIndex) {
                var text = html.slice(nextIndex, tagIndex);
                if (cdata) {
                    cdata.push(text);
                } else {
                    callbacks.onText(text);
                }
            }
            nextIndex = RE_PART.lastIndex;
            if ((tagName = match[1])) {
                tagName = tagName.toLowerCase();
                if (cdata && tagName == cdata._tag_name) {
                    callbacks.onCDATA(cdata.join(''));
                    cdata = null;
                }
                if (!cdata) {
                    callbacks.onTagClose(tagName);
                    continue;
                }
            }
            if (cdata) {
                cdata.push(match[0]);
                continue;
            }
            if ((tagName = match[3])) {
                if (/="/.test(tagName)) {
                    continue;
                }
                tagName = tagName.toLowerCase();
                var attrPart = match[4],
                    attrMatch,
                    attrMap = {},
                    selfClosing = attrPart && attrPart.slice(-1) == '/';
                if (attrPart) {
                    RE_ATTR.exec("");
                    while ((attrMatch = RE_ATTR.exec(attrPart))) {
                        var attrName = attrMatch[1].toLowerCase(),
                            attrValue = attrMatch[2] || attrMatch[3] || attrMatch[4] || '';
                        if (!attrValue && EMPTY_ATTR[attrName]) {
                            attrValue = attrName;
                        }
                        attrMap[attrName] = attrValue;
                    }
                }
                callbacks.onTagOpen(tagName, attrMap, selfClosing);
                if (!cdata && CDATA_TAG[tagName]) {
                    cdata = [];
                    cdata._tag_name = tagName;
                }
                continue;
            }
            if ((tagName = match[2])) {
                callbacks.onComment(tagName);
            }
        }
        if (html.length > nextIndex) {
            callbacks.onText(html.slice(nextIndex, html.length));
        }
    }
    return function (html){
        var fragment = {
            type: 'fragment',
            parent: null,
            children: []
        };
        var currentNode = fragment;
        function addChild(node){
            node.parent = currentNode;
            currentNode.children.push(node);
        }
        function addElement(element, open){
            var node = element;
            // 遇到结构化标签的时候
            if (NEED_PARENT_TAG[node.tag]) {
                // 考虑这种情况的时候, 结束之前的标签
                // e.g. <table><tr><td>12312`<tr>`4566
                while (NEED_PARENT_TAG[currentNode.tag] && NEED_PARENT_TAG[currentNode.tag][node.tag]){
                    currentNode = currentNode.parent;
                }
                // 如果前一个标签和这个标签是同一级, 结束之前的标签
                // e.g. <ul><li>123<li>
                if (currentNode.tag == node.tag) {
                    currentNode = currentNode.parent;
                }
                // 向上补齐父标签
                while (NEED_PARENT_TAG[node.tag]) {
                    if (NEED_PARENT_TAG[node.tag][currentNode.tag]) break;
                    node = node.parent = {
                        type: 'element',
                        tag: NEED_PARENT_TAG[node.tag]['$'],
                        attributes: {},
                        children: [node]
                    };
                }
            }
            // 如果遇到这个标签不能放在前一个标签内部，则结束前一个标签
            while (dtd[node.tag] && !(dtd[currentNode.tag] || dtd['div'])[node.tag]) {
                if (tagEnd(currentNode)) continue;
                if (!currentNode.parent) break;
                currentNode = currentNode.parent;
            }
            node.parent = currentNode;
            currentNode.children.push(node);
            if (open) {
                currentNode = element;
            }
            return element;
        }
        // 结束一个标签的时候，需要判断一下它是否缺少子标签
        // e.g. <table></table>
        function tagEnd(node){
            var needTag;
            if (!node.children.length && (needTag = NEED_CHILD_TAG[node.tag])) {
                addElement({
                    type: 'element',
                    tag: needTag,
                    attributes: {},
                    children: []
                }, true);
                return true;
            }
            return false;
        }
        parse(html, {
            onText: function (text){
                while (!(dtd[currentNode.tag] || dtd['div'])['#']) {
                    if (tagEnd(currentNode)) continue;
                    currentNode = currentNode.parent;
                }
                // TODO: 注意这里会去掉空白节点
                if (/\S/.test(text)) {
                    addChild({
                        type: 'text',
                        data: text
                    });
                }
            },
            onComment: function (text){
                addChild({
                    type: 'comment',
                    data: text
                });
            },
            onCDATA: function (text){
                while (!(dtd[currentNode.tag] || dtd['div'])['#']) {
                    if (tagEnd(currentNode)) continue;
                    currentNode = currentNode.parent;
                }
                addChild({
                    type: 'cdata',
                    data: text
                });
            },
            onTagOpen: function (tag, attrs, closed){
                closed = closed || EMPTY_TAG[tag];
                addElement({
                    type: 'element',
                    tag: tag,
                    attributes: attrs,
                    closed: closed,
                    children: []
                }, !closed);
            },
            onTagClose: function (tag){
                var node = currentNode;
                // 向上找匹配的标签, 这里不考虑dtd的情况是因为tagOpen的时候已经处理过了, 这里不会遇到
                while (node && tag != node.tag) {
                    node = node.parent;
                }
                if (node) {
                    // 关闭中间的标签
                    for (var tnode=currentNode; tnode!==node.parent; tnode=tnode.parent) {
                        tagEnd(tnode);
                    }
                    currentNode = node.parent;
                } else {
                    // 如果没有找到开始标签, 则创建新标签
                    // eg. </div> => <div></div>
                    node = {
                        type: 'element',
                        tag: tag,
                        attributes: {},
                        children: []
                    };
                    addElement(node, true);
                    tagEnd(node);
                    currentNode = node.parent;
                }
            }
        });
        // 处理这种情况, 只有开始标签没有结束标签的情况, 需要关闭开始标签
        // eg. <table>
        while (currentNode !== fragment) {
            tagEnd(currentNode);
            currentNode = currentNode.parent;
        }
        
        return fragment;
    };
}();

//b|i|font ==> strong|em|span 放在toHTML节省在遍历的时间
var transObj = {'b':1,'i':1,'font':1};
function transNode(node){
    var sizeMap = [0, 10, 12, 16, 18, 24, 32, 48],
        attr;
    switch(node.tag){
        case 'b':
            node.tag = node.name = 'strong';
            break;
        case 'i':
            node.tag = node.name = 'em';
            break;
        case 'font':
            node.tag = node.name = 'span';
            attr = node.attributes;
            node.attributes = {
                'style': (attr.size ? 'font-size:' + (sizeMap[attr.size] || 12) + 'px' : '')
                + ';' + (attr.color ? 'color:'+ attr.color : '')
                + ';' + (attr.face ? 'font-family:'+ attr.face : '')
                + ';' + (attr.style||'')
            }
           
            
    }
}
var unhtml1 = function (){
    var map = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    function rep( m ){ return map[m]; }
    return function ( str ) {
        return str ? str.replace( /[<>"']/g, rep ) : '';
    };
}();
var toHTML = function (){
    function printChildren(node){
        var children = node.children;
        var buff = [];
        for (var i=0; i<children.length; i++) {
            buff.push(toHTML(children[i]));
        }
        return buff.join('');
    }
    function printAttrs(attrs){
        var buff = [];
        for (var k in attrs) {
            buff.push(k + '="' + unhtml1(attrs[k]) + '"');
        }
        return buff.join(' ');
    }
    function printData(node){ return unhtml1(node.data); }
    function printElement(node){
        //节点转换
        if(transObj[node.tag]){
            transNode(node);
        }
        var tag = node.tag;
        var attrs = printAttrs(node.attributes);
        var html = '<' + tag + (attrs ? ' ' + attrs : '') + (EMPTY_TAG[tag] ? ' />' : '>');
        if (!EMPTY_TAG[tag]) {
            html += printChildren(node);
            html += '</' + tag + '>';
        }
        return html;
    }

    return function (node){
        if (node.type == 'fragment') {
            return printChildren(node);
        } else if (node.type == 'element') {
            return printElement(node);
        } else if (node.type == 'text' || node.type == 'cdata') {
            return printData(node);
        } else if (node.type == 'comment') {
            return '<!--' + node.data + '-->';
        }
        return '';
    };
}();

/////////////////
// WORD /////////
/////////////////
var transformWordHtml = function (){
    function isWordDocument( strValue ) {
        var re = new RegExp( /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument)/ig );
        return re.test( strValue );
    }

    function ensureUnits( v ) {
        v = v.replace(/([\d.]+)([\w]+)?/g, function (m, p1, p2){
            return (Math.round(parseFloat(p1)) || 1) + (p2 || 'px');
        });
        return v;
    }

    function filterPasteWord( str ) {
        //remove link break
        str = str.replace( /\r\n|\n|\r/ig, "" );
        //remove &nbsp; entities at the start of contents
        str = str.replace( /^\s*(&nbsp;)+/ig, "" );
        //remove &nbsp; entities at the end of contents
        str = str.replace( /(&nbsp;|<br[^>]*>)+\s*$/ig, "" );
        // Word comments like conditional comments etc
        str = str.replace( /<!--[\s\S]*?-->/ig, "" );
        // Remove comments, scripts (e.g., msoShowComment), XML tag, VML content, MS Office namespaced tags, and a few other tags
        str = str.replace( /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|img|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "" );

        //convert word headers to strong
        str = str.replace( /<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>" );
        //remove lang attribute
        str = str.replace( /(lang)\s*=\s*([\'\"]?)[\w-]+\2/ig, "" );
        // Examine all styles: delete junk, transform some, and keep the rest
        str = str.replace( /(<[a-z][^>]*)\sstyle="([^"]*)"/gi, function( str, tag, style ) {
            var n = [],
                    i = 0,
                    s = style.replace( /^\s+|\s+$/, '' ).replace( /&quot;/gi, "'" ).split( /;\s*/g );

            // Examine each style definition within the tag's style attribute
            for ( var i = 0; i < s.length; i++ ) {
                var v = s[i];
                var name, value,
                        parts = v.split( ":" );

                if ( parts.length == 2 ) {
                    name = parts[0].toLowerCase();
                    value = parts[1].toLowerCase();
                    // Translate certain MS Office styles into their CSS equivalents
                    switch ( name ) {
                        case "mso-padding-alt":
                        case "mso-padding-top-alt":
                        case "mso-padding-right-alt":
                        case "mso-padding-bottom-alt":
                        case "mso-padding-left-alt":
                        case "mso-margin-alt":
                        case "mso-margin-top-alt":
                        case "mso-margin-right-alt":
                        case "mso-margin-bottom-alt":
                        case "mso-margin-left-alt":
    //                        case "mso-border-alt":
    //                        case "mso-border-top-alt":
    //                        case "mso-border-right-alt":
    //                        case "mso-border-bottom-alt":
    //                        case "mso-border-left-alt":
                        case "mso-table-layout-alt":
                        case "mso-height":
                        case "mso-width":
                        case "mso-vertical-align-alt":
                            n[i++] = name.replace( /^mso-|-alt$/g, "" ) + ":" + ensureUnits( value );
                            continue;

                        case "horiz-align":
                            n[i++] = "text-align:" + value;
                            continue;

                        case "vert-align":
                            n[i++] = "vertical-align:" + value;
                            continue;

                        case "font-color":
                        case "mso-foreground":
                            n[i++] = "color:" + value;
                            continue;

                        case "mso-background":
                        case "mso-highlight":
                            n[i++] = "background:" + value;
                            continue;

                        case "mso-default-height":
                            n[i++] = "min-height:" + ensureUnits( value );
                            continue;

                        case "mso-default-width":
                            n[i++] = "min-width:" + ensureUnits( value );
                            continue;

                        case "mso-padding-between-alt":
                            n[i++] = "border-collapse:separate;border-spacing:" + ensureUnits( value );
                            continue;

                        case "text-line-through":
                            if ( (value == "single") || (value == "double") ) {
                                n[i++] = "text-decoration:line-through";
                            }
                            continue;

                        case "mso-zero-height":
                            if ( value == "yes" ) {
                                n[i++] = "display:none";
                            }
                            continue;
                    }
                    // Eliminate all MS Office style definitions that have no CSS equivalent by examining the first characters in the name
                    if ( /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test( name ) ) {
                        continue;
                    }
                    // If it reached this point, it must be a valid CSS style
                    n[i] = name + ":" + parts[1];        // Lower-case name, but keep value case
                }
            }
            // If style attribute contained any valid styles the re-write it; otherwise delete style attribute.
            if ( i > 0 ) {
                return tag + ' style="' + n.join( ';' ) + '"';
            } else {
                return tag;
            }
        } );
        str = str.replace( /([ ]+)<\/span>/ig, function ( m, p ) {
            return new Array( p.length + 1 ).join( '&nbsp;' ) + '</span>';
        } );

        return str;
    }
    return function (html){
        if (isWordDocument(html)) {
            html = filterPasteWord(html);
        }
        return html.replace(/>\s*</g,'><');
    };
}();
var NODE_NAME_MAP = {
    'text': '#text',
    'comment': '#comment',
    'cdata': '#cdata-section',
    'fragment': '#document-fragment'
};
function childrenAccept(node, visit, ctx){
    if (!node.children) {
        return node;
    }
    var children = node.children;
    for (var i=0; i<children.length; i++) {
        var newNode = visit(children[i], ctx);
        if (newNode.type == 'fragment') {
            var args = [i, 1];
            args.push.apply(args, newNode.children);
            children.splice.apply(children, args);
            i --;
        } else {
            children[i] = newNode;
        }
    }
    return node;
}
function Serialize(rules){
    this.rules = rules;
}
Serialize.prototype = {
    // NOTE: selector目前只支持tagName
    rules: null,
    // NOTE: node必须是fragment
    filter: function (node){
        var whiteList = this.rules && this.rules.whiteList;
        var blackList = this.rules && this.rules.blackList;
        function visitNode(node, parent){
            node.name = node.type == 'element' ?
                    node.tag : NODE_NAME_MAP[node.type];
            if (parent == null) {
                return childrenAccept(node, visitNode, node);
            }
            if (blackList && blackList[node.name]) {
                return {
                    type: 'fragment',
                    children: []
                };
            }
            if (whiteList) {
                if (node.type == 'element') {
                    if (parent.type == 'fragment' ? whiteList[node.name] : whiteList[node.name] && whiteList[parent.name][node.name]) {
                        var props;
                        if ((props = whiteList[node.name].$)) {
                            var oldAttrs = node.attributes;
                            var newAttrs = {};
                            for (var k in props) {
                                if (oldAttrs[k]) {
                                    newAttrs[k] = oldAttrs[k];
                                }
                            }
                            node.attributes = newAttrs;
                        }
                    } else {
                        node.type = 'fragment';
                        // NOTE: 这里算是一个hack
                        node.name = parent.name;
                    }
                } else {
                    // NOTE: 文本默认允许
                }
            }
            if (blackList || whiteList) {
                childrenAccept(node, visitNode, node);
            }
            return node;
        }
        return visitNode(node, null);
    },
    transformInput: function (node, wrapInline){
        return node;
    },
    transformOutput: function (node){
        return node;
    },
    toHTML: toHTML,
    parseHTML: parseHTML,
    word: transformWordHtml
};
baidu.editor.serialize = new Serialize({});

baidu.editor.plugins['serialize'] = function () {
    var editor = this;
    editor.serialize = new Serialize(editor.options.serialize);
};

})();
