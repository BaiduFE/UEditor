(function (){
    
    var utils = baidu.editor.utils,
        browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils;
    
    function FilterRule() {
        this.attributesMap = {};
        this.allowMap = {};
        // 标记此标签为结构化标签
        this.unity = false;
        this.keep = false;
    }

    /**
     * 过滤器
     * @public
     * @class
     * @name baidu.editor.Filter
     * @extends baidu.editor.EventBase
     * @param rules
     */
    function Filter( rules ) {
        this._ruleMap = {};
        // 预定义入口规则
        this.addRule( { tag: '^', allow: '*,#' }, true );
        // 预定义结构化标签
        this.addRule( { tag: 'table,tbody,thead,tfoot,colgroup,tr,ul,ol,dl,select', unity: true }, true );
        
        if ( rules && rules.length ) {
            for ( var i=0; i<rules.length; i++ ) {
                this.addRule( rules[i] );
            }
        }
    }
    utils.inherits( Filter, baidu.editor.EventBase );
    /**
     * 添加规则
     * @public
     * @function
     * @param {Object} def
     * @param {Boolean} predefine 是否仅用于预定义
     */
    Filter.prototype.addRule = function ( def, predefine ) {
        var tags = def.tag.toLowerCase().split( ',' ),
            k = tags.length;
        var rule;
        while ( k -- ) {
            var tag = tags[k];
            if ( !this._ruleMap[tag] ) {
                this._ruleMap[tag] = new FilterRule();
            }
            rule = this._ruleMap[tag];
            rule.keep = rule.keep || !predefine;
            rule.unity = rule.unity || def.unity;
            utils.extend( rule.allowMap, utils.listToMap( ( def.allow || '').toLowerCase() ) );
            utils.extend( rule.attributesMap, utils.listToMap( ( def.attributes || '').toLowerCase() ) );
        }
    };

    Filter.prototype.processElement = function ( element ) {
        var tagName = element.tagName.toLowerCase();
        var rule = this._ruleMap[tagName];
        if (!rule) {
            element.parentNode.replaceChild(
                element.ownerDocument.createElement( element.tagName ), element );
            return;
        }
        var attributesMap =  rule.attributesMap;
        if ( !attributesMap['*'] ) {
            var attributes = element.attributes;
            var k = attributes.length;
            if ( k ) while ( k -- ) {
                var attribute = attributes[k];
                if ( !browser.ie || attribute.specified ) {
                    if ( !attributesMap[attribute.name.toLowerCase()] ) {
                        element.removeAttribute(attribute.name);
                    }
                }
            }
        }
        if(!baidu.editor.dom.dtd.$empty[tagName])
            this.processContents( element, rule );
    };
    Filter.prototype.processContents = function ( parent, rule ){
        var allowMap = rule.allowMap;
        var keepText = allowMap['#'];
        var unity = rule.unity;
        var node = parent.firstChild;
        while ( node ) {
            var next = node.nextSibling;
            if ( node.nodeType == 3 ) {
                if ( !keepText ) {
                    parent.removeChild( node );
                }
            } else if ( node.nodeType == 1 ) {
                var tagName = node.tagName.toLowerCase();
                rule = this._ruleMap[tagName];
                if ( allowMap[tagName] || ( allowMap['*'] && rule && rule.keep ) ) {
                    this.processElement( node );
                } else if ( !unity && ( !rule || !rule.unity ) ) {
                    // 上面的if判断是为了不将结构化的标签拆散
                    var newNext = node.firstChild;
                    domUtils.remove(node,true);
                    if (newNext) {
                        next = newNext;
                    }
                } else if ( allowMap['#'] ) {
                    parent.replaceChild( node.ownerDocument.createTextNode(
                        node.textContent || node.innerText || ''
                        ), node );
                } else {
                    parent.removeChild( node );
                }
            } else {
                parent.removeChild( node );
            }
            node = next;
        }
    };

    /**
     * 执行过滤
     * @public
     * @function
     * @param {Element} parent 父节点
     */
    Filter.prototype.doFilter = function ( parent ) {
        if (this.fireEvent( 'beforeFilter', parent ) !== false ) {
            if (parent.nodeType == 1) {
                var oldDisplay = parent.style.display;
                parent.style.display = 'none';
                this.processContents( parent, this._ruleMap['^'] );
                parent.style.display = oldDisplay;
            } else {
                this.processContents( parent, this._ruleMap['^'] );
            }
            this.fireEvent( 'afterFilter', parent );
        }
    };

    baidu.editor.plugins['filter'] = function (){
        var editor = this;
        editor.filter = new Filter( editor.options['filter'] );
    };
    baidu.editor.Filter = Filter;
})();

