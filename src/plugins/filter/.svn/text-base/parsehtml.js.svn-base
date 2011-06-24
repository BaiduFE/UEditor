(function (){
    var RE_PART = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'>])*)\/?>))/g;
    var RE_ATTR = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g;

    var EMPTY_ATTR = {checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};
    var CDATA_TAG = {script:1,style: 1};
    var dtd = baidu.editor.dom.dtd;
    var EMPTY_TAG = dtd.$empty;
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

    // todo: stack,
    // startTag, endTag
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
    function parseHtml(html){
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
                        children: [node]
                    };
                }
            }
            // 如果遇到这个标签不能放在前一个标签内部，则结束前一个标签
            while (!dtd[currentNode.tag || 'div'][node.tag]) {
                if (tagEnd(currentNode)) continue;
                currentNode = currentNode.parent;
            }
            node.parent = currentNode;
            currentNode.children.push(node);
            if (open) {
                currentNode = element;
            }
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
                while (!dtd[currentNode.tag || 'div']['#']) {
                    if (tagEnd(currentNode)) continue;
                    currentNode = currentNode.parent;
                }
                addChild({
                    type: 'text',
                    data: text
                });
            },
            onComment: function (text){
                addChild({
                    type: 'comment',
                    data: text
                });
            },
            onCDATA: function (text){
                while (!dtd[currentNode.tag || 'div']['#']) {
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
                        parent: currentNode,
                        tag: tag,
                        attributes: {},
                        closed: true,
                        children: []
                    };
                    tagEnd(node);
                    currentNode.children.push(node);
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
    }

//    var unhtml = baidu.editor.dom.domUtils.unhtml;
    var printHTML = function (){
        function printChildren(node){
            var children = node.children;
            var buff = [];
            for (var i=0; i<children.length; i++) {
                buff.push(printHTML(children[i]));
            }
            return buff.join('');
        }
        function printAttrs(attrs){
            var buff = [];
            for (var k in attrs) {
                buff.push(k + '="' + attrs[k] + '"');
            }
            return buff.join(' ');
        }
        function printData(node){ return node.data; }
        function printElement(node){
            var tag = node.tag;
            var attrs = printAttrs(node.attributes);
            var html = '<' + tag + (attrs ? ' ' + attrs : '') + (EMPTY_TAG[tag] ? '/>' : '>');
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
    function childrenAccept(node, visitor){
        var children = node.children;
        for (var i=0; i<children.length; i++) {
            children[i] = visitor(children[i]);
        }
        return node;
    }
    function byTag(walkers){
        return function (node){
            if (node.type == 'fragment') {
                childrenAccept(node, arguments.callee);
            } else if (node.type == 'element') {
                if (walkers[node.tag]) {
                    var newNode = walkers[node.tag](node);
                    if (newNode) {
                        return newNode;
                    }
                }
                childrenAccept(node, arguments.callee);
            }
            return node;
        };
    }

    var sizeMap = [0, 10, 12, 16, 18, 24, 32, 48];
    var fixFont = byTag({
        "font": function (node){
            var attrs = node.attributes;
            return {
                type: 'element',
                tag: 'span',
                attributes: {
                    style: (attrs.face ? 'font-family:' + attrs.face + ';' : '') +
                        (attrs.size ? 'font-size:' + (sizeMap[attrs.size] || 12) + ';' : '') +
                        (attrs.color ? 'color:' + attrs.color : '') + (attrs.style || '')
                },
                children: []
            };
        }
    });

    // todo: 非IE浏览器block结尾添加<br/>标签
    // 用于inserthtml时
    var forEditing = function (){

    };
    // todo:
    // 用于getContent
    var forDisplay = function (){

    };
    // todo: 增加p标签给body子级的inline节点
    var fixForBody = function (){

    };

    var fixWord = function (){

    };
    function createRuleFilter(rules){
        return function (){

        };
    }

    function processHTML(html, processor){
        var node = parseHtml(html);
        node = processor(node) || node;
        return printHTML(node);
    }

    var filter = {
        setRulesForEditing: function (rules){
            this.ruleFilter = createRuleFilter(rules);
        },
        processHTMLForEditing: function (html, options){
            options = options || {};
            var processors = [];
            if (options.word) {
                processors.push(fixWord);
            }
            if (options.body) {
                processors.push(fixForBody);
            }
            return processHTML(html, processors);
        },
        setRulesForDisplay: function (rules){
            this.ruleFilterForDisplay = createRuleFilter(rules);
        },
        processHTMLForDisplay: function (html){
            return processHTML(html, [this.ruleFilterForDisplay]);
        }
    };

    baidu.editor.plugins['filter'] = function (){
        var editor = this;
        editor.filter = filter;
    };
})();
