module( 'core.dom.domUtils' );

test( 'getPosition--A和B是同一个节点', function() {
    var div = te.dom[0];
    div.innerHTML = "<span>span</span><img  /><b>bbb</b>xxx";
    var span_text = div.firstChild.firstChild;
    var domUtils = te.obj[1];
    equal( domUtils.getPosition( span_text, span_text ), 0, 'identical node' );
} );


test( 'getPosition--A和B是兄弟节点', function() {
    var div = te.dom[0];
    div.innerHTML = "<span>span</span><img  /><b>bbb</b>xxx";
    var span_text = div.firstChild.firstChild;
    var div_text = div.lastChild;
    var domUtils = te.obj[1];
    /*span_text在div_text前面*/
    equal( domUtils.getPosition( span_text, div_text ), domUtils.POSITION_PRECEDING, 'preceding node' );
    /*div_text在span_text后面*/
    equal( domUtils.getPosition( div_text, span_text ), domUtils.POSITION_FOLLOWING, 'following node' );
} );


test( 'getPosition--A是B的祖先', function() {
    var div = te.dom[0];
    div.innerHTML = "<span>span</span><img  /><b>bbb</b>xxx";
    var span_text = div.firstChild.firstChild;
    var domUtils = te.obj[1];
    /*A是B的祖先*/
    equal( domUtils.getPosition( div, span_text ), domUtils.POSITION_CONTAINS + domUtils.POSITION_PRECEDING, 'preceding node' );
    /*A是B的子孙*/
    equal( domUtils.getPosition( span_text, div ), domUtils.POSITION_IS_CONTAINED + domUtils.POSITION_FOLLOWING, 'following node' );
} );

test( 'getPosition--A和B在不同dom树上', function() {
    stop();
    expect( 1 );
    var div = te.dom[0];
    div.innerHTML = "<span>span</span><img  /><b>bbb</b>xxx";
    var iframe = te.dom[1];
    setTimeout( function() {
        var frame_doc = iframe.contentWindow.document || iframe.contentDocument;
        var frame_div = frame_doc.createElement( 'div' );
        frame_doc.body.appendChild( frame_div );
        var domUtils = te.obj[1];
        /*A和B在不同dom树上*/
        equal( domUtils.getPosition( div, frame_div ), domUtils.POSITION_DISCONNECTED, 'A和B不在同一个dom树上' );
        start();
    }, 50 );

} );

test( 'getNodeIndex', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<strong>ddddd</strong><!----><!--hhhhh--><span></span><b>xxxxx</b><p id="p"><br /><img /><table id="table"><tr><td>dddd</td></tr></table></p>'
    var comment = div.firstChild.nextSibling.nextSibling;
    equal( domUtils.getNodeIndex( comment ), 2, 'check commnet index' );
    var td_text = document.getElementById( 'table' ).firstChild.firstChild.firstChild;
    equal( domUtils.getNodeIndex( td_text ), 0, 'check textNode index' );
    equal( domUtils.getNodeIndex( div.firstChild ), 0, 'check strong label index' );
    equal( domUtils.getNodeIndex( (document.getElementById( 'p' )) ), 5, 'check p label index' );
} );

test( 'findParent--body', function() {
    var domUtils = te.obj[1];
    equal( domUtils.findParent( document.body ), null, 'find parent for body' );
} );

/*找符合条件的上一个节点，如果条件为空则找父节点*/
test( 'findParent--tester为空', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<strong>ddddd</strong><!----><!--hhhhh--><span id="span">span</span><b>xxxxx</b><p id="p"><br /><img /><table id="table"><tr><td>dddd</td></tr></table></p>';
    var span_text = document.getElementById( 'span' ).firstChild;
    same( domUtils.findParent( span_text ), span_text.parentNode, 'find parent' );
} );

test( 'findParent--tester不为空', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<strong>ddddd</strong><!----><!--hhhhh--><span id="span">span</span><b>xxxxx</b><p id="p"><br /><img /><table id="table"><tr><td>dddd</td></tr></table></p>';
    var span_text = document.getElementById( 'span' ).firstChild;
    same( domUtils.findParent( span_text, function( node ) {
        if ( node.id == "test" )
            return true;
        return false;
    } ), div, 'find parent' );
} );


/*不考虑includeSelf的时候取body的parent的情况*/
test( 'findParentByTagName--body', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    same( domUtils.findParentByTagName( document.body, 'body' ), null, 'parent is self' );
} );


test( 'findParentByTagName--tagName为字符串', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<strong>ddddd</strong><!----><!--hhhhh--><span id="span">span</span><b>xxxxx</b><p id="p"><br /><img /><table id="table"><tr><td>dddd</td></tr></table></p>';
    var br = document.getElementById( 'p' ).firstChild;
    same( domUtils.findParentByTagName( br, 'div' ), div, 'tagName为字符串' );
    same( domUtils.findParentByTagName( br, 'em' ), null, 'tagName为字符串返回null' );
} );

test( 'findParentByTagName--tagName为字符串数组', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<strong>ddddd</strong><!----><!--hhhhh--><span id="span">span</span><b>xxxxx</b><p id="p"><br /><img /><table id="table"><tr><td>dddd</td></tr></table></p>';
    var br = document.getElementById( 'p' ).firstChild;
    var tagName = ['em','p','div'];
    same( domUtils.findParentByTagName( br, tagName ), document.getElementById( 'p' ), 'tagName为字符串数组，找出第一个符合条件的父节点' );
} );


test( 'findParentByTagName--文本节点', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<strong>ddddd</strong><!----><!--hhhhh--><span id="span">span</span><b>xxxxx</b><p id="p"><br /><img /><table id="table"><tr><td>dddd</td></tr></table></p>';
    var span_text = document.getElementById( 'span' ).firstChild;
    var tagName = ['em','p','div'];
    same( domUtils.findParentByTagName( span_text, tagName ), div, '文本节点' );
} );

test( 'findParents', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<strong>ddddd</strong><!----><!--hhhhh--><span id="span">span</span><b>xxxxx</b><p id="p"><br /><img /><table id="table"><tr><td>dddd</td></tr></table></p>';
    var span_text = document.getElementById( 'span' ).firstChild;
    /*includeSelf*/
    var parents = domUtils.findParents( span_text, true );
    equal( parents.length, 4, 'check parent count' );
    same( parents[0], document.body, 'first  parent is body' );
    same( parents[1], div, 'second parent is div' );
    same( parents[2], span_text.parentNode, 'third parent is span' );
    same( parents[3], span_text, 'last parent is self' );
    /*不逆序存放祖先节点,closerFirst=false*/
    parents = domUtils.findParents( span_text, false, null, true );
    equal( parents.length, 3, 'check parent count' );
    same( parents[0], span_text.parentNode, 'first parent is span' );
    same( parents[1], div, 'second parent is div' );
    same( parents[2], document.body, 'last parent is body' );
} );


test( 'findParents--tester', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<div><p id="p"><br /><img id="img" /><table id="table"><tr><td>dddd</td></tr></table></p></div>';
    var img = document.getElementById( 'img' );
    var parents = domUtils.findParents( img, false, function( node ) {
        if ( node.tagName.toLowerCase() == 'div' || node.tagName.toLowerCase() == 'body' )
            return false;
        return true;
    } );
    equal( parents.length, 1, 'check parent count' );
    same( parents[0], div.firstChild.firstChild, 'first  parent is p' );
} );

test( 'insertAfter', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    var textNode = document.createTextNode( 'text' );
    domUtils.insertAfter( div, textNode );
    te.dom.push( textNode );
    equal( textNode, div.nextSibling, 'insertAfter' );
} );

test( 'remove--not keep children', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = "<p>xxx<span><em>xxxx</em>xxxx</span></p><div>xxxx</div>";
    var text = div.firstChild.firstChild;
    var p = div.firstChild;
    /*删除文本节点*/
    var node = domUtils.remove( text );
    equal( ua.getChildHTML( div ), '<p><span><em>xxxx</em>xxxx</span></p><div>xxxx</div>' );
    same( text, node, 'check removed textNode' );
    /*删除有孩子的节点*/
    node = domUtils.remove( p );
    equal( ua.getChildHTML( div ), '<div>xxxx</div>' );
    same( node, p, 'check removed p' );
} );

test( 'remove-- keep children', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<p id="p">xxx<span><em>xxxx</em>xxxx</span><img /></p><div>xxxx</div>';
    var text = div.firstChild.firstChild;
    var p = div.firstChild;
    /*删除文本节点*/
    var node = domUtils.remove( text, true );
    equal( ua.getChildHTML( div ), '<p id="p"><span><em>xxxx</em>xxxx</span><img></p><div>xxxx</div>' );
    same( text, node, 'check removed textNode' );
    /*删除有孩子的节点*/
    node = domUtils.remove( p, true );
    equal( ua.getChildHTML( div ), '<span><em>xxxx</em>xxxx</span><img><div>xxxx</div>' );
    same( node.id, p.id, 'check removed p' );
} );

test( 'getNext/previousDomNode--没有filter', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<p id="p">p_text<span><em>xxxx</em>xxxx</span><img /></p><div>xxxx</div>';
    var p = div.firstChild;
    var divChild = div.lastChild;
    /*直接查找兄弟节点*/
    same( domUtils.getNextDomNode( p ), div.lastChild, '后兄弟节点' );
    same( domUtils.getPreviousDomNode( divChild ), p, '前一个兄弟节点' )
    /*startFromChild=true，查找孩子结点*/
    equal( domUtils.getNextDomNode( p, true ).data, 'p_text', 'text node' );
    equal( domUtils.getPreviousDomNode( p, true ), p.lastChild, 'text node' );
} );


test( 'getNext/peviousDomNode--有filter', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<div id="p"><span><em>xxxx</em>xxxx</span><p>xx</p><img /></div><div>xxxx</div>';
    document.body.insertBefore(document.createElement('span'),div);
    var span = div.firstChild.firstChild;
    var filter = function( node ) {
        if ( $( node ).css( 'display' ) == 'block' )
            return false;
        return true;
    };
    same( domUtils.getNextDomNode( span, false, filter ), div.firstChild.lastChild, '找到第一个不为block元素的兄弟节点' );
    same( domUtils.getPreviousDomNode( div, true, filter ), div.previousSibling, '孩子中没有block元素，则找父亲的previousSibling节点' );
    te.obj.push(div.previousSibling);
} );
test( 'getPreviousDomNode-没有兄弟或孩子', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    div.innerHTML = '<p id="p">p_text<span><em>xxxx</em>xxxx</span><img /></p><div>xxxx</div>';
    var p = div.firstChild;
    /*直接查找兄弟节点*/
    same( domUtils.getPreviousDomNode( p ), div.previousSibling, '前面木有兄弟' );
    same( domUtils.getNextDomNode( div.lastChild ), div.nextSibling, '后面木有兄弟' );
} );

test( 'isBookmarkNode', function() {
    var domUtils = te.obj[1];
    var div = te.dom[0];
    var range = te.obj[0];
    div.innerHTML = '<span><em>xxxx</em>xxxx</span><img><div>xxxx</div>';
    range.setStart( div, 0 ).setEnd( div, 1 );
    range.createBookmark();
    ok( domUtils.isBookmarkNode( div.firstChild ), 'is BookmarkNode' );
    ok( !domUtils.isBookmarkNode( div.firstChild.nextSibling ), 'not BookmarkNode' )

} );

test( 'getWindow', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    var w = domUtils.getWindow( div );
    ok( w === self.window, 'check window' );
} );

test( 'getWindow--iframe', function() {
    var f = te.dom[1];
    var domUtils = te.obj[1];
    expect( 1 );
    var frame_doc = f.contentWindow.document || f.contentDocument;
    stop();
    setTimeout( function() {
        var frame_div = frame_doc.createElement( 'div' );
        frame_doc.body.appendChild( frame_div );
        var w = domUtils.getWindow( frame_div );
        ok( f.contentWindow === w, 'same window' );
        start();
    } );

} );

test( 'getCommonAncestor--body', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    equal( domUtils.getCommonAncestor( div, document.body ).tagName.toLocaleLowerCase(), 'body', '第二个参数是body' );
    equal( domUtils.getCommonAncestor( document.body, div ).tagName.toLocaleLowerCase(), 'body', '第一个参数是body' );
} );

test( 'getCommonAncestor--自己', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    same( domUtils.getCommonAncestor( div, div ), div, '自己和自己的公共祖先' );

} );

test( 'getCommonAncestor--兄弟节点', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<span>xxxx</span><p><table><tr><td id="td">dddd</td></tr></table></p>';
    var span_text = div.firstChild.firstChild;
    var td = document.getElementById( 'td' );
    same( domUtils.getCommonAncestor( span_text, td ), div, '兄弟节点' );
} );

test( 'getCommonAncestor--不在一个dom树', function() {
    stop();
    expect( 1 );
    var div = te.dom[0];
    var f = te.dom[1];
    setTimeout( function() {
        var domUtils = te.obj[1];
        var frame_doc = f.contentWindow.document || f.contentDocument;
        var frame_div = frame_doc.createElement( 'div' );
        frame_doc.body.appendChild( frame_div );
        same( domUtils.getCommonAncestor( frame_div, div ), null, '不在一个dom树' );
        start();
    }, 50 );

} );

test( 'isWhitespace', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = "aaa\ufeff\u200B\t\t\n\r";
    ok( !domUtils.isWhitespace( div.firstChild ), 'not whiteSpace' );
    div.innerHTML = baidu.editor.browser.ie && baidu.editor.browser.version == '6' ? '\ufeff' : '\u200B' + '\t\t\n\r';
    ok( domUtils.isWhitespace( div.firstChild ), 'is whiteSpace' );
} );

test( 'isEmptyInlineElement', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<span><b><i><b>\n\r</b>xxxx</i></b><i></i></span>';
    var b1 = div.firstChild.firstChild;
    ok( !domUtils.isEmptyInlineElement( b1 ), 'not empty inline' );
    ok( domUtils.isEmptyInlineElement( b1.firstChild.firstChild ), 'is emtpy inline element' );
} );

test( 'isEmptyInlineElement-nodeType!=1', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<span><b>\n\r</b>xxxx<i></i></span>';
    ok( !domUtils.isEmptyInlineElement( div.firstChild.firstChild.firstChild ), 'textNode not inline element' );
} );

test( 'isEmptyInlineElement-block element', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<span><b><i><b>\n\r</b>xxxx</i></b><i></i></span>';
    ok( !domUtils.isEmptyInlineElement( div ), 'not inline element' );
} );


test( 'clearEmptySibling', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<p>xxx<span><u><i><b></b></i></u>xxxxx</span><img /></p><table><tr><td><i></i></td></tr></table>';
    var text = div.firstChild.firstChild;
    /*没有空sibling*/
    domUtils.clearEmptySibling( text );
    equal( ua.getChildHTML( div ), '<p>xxx<span><u><i><b></b></i></u>xxxxx</span><img></p><table><tbody><tr><td><i></i></td></tr></tbody></table>', '没有空sibling' );
    var span = text.nextSibling;
    domUtils.clearEmptySibling( span );
    equal( ua.getChildHTML( div ), '<p>xxx<span><u><i><b></b></i></u>xxxxx</span><img></p><table><tbody><tr><td><i></i></td></tr></tbody></table>' );
    /*左边有空sibling*/
    domUtils.clearEmptySibling( span.lastChild );
    equal( ua.getChildHTML( div ), '<p>xxx<span>xxxxx</span><img></p><table><tbody><tr><td><i></i></td></tr></tbody></table>', '左边有空sibling' );
    /*左右边有空sibling*/
    div.innerHTML = '<p><i></i>\n<b>\t<i><u>\n\t\r</u></i></b>xxxx<b></b></p>';
    domUtils.clearEmptySibling( div.firstChild.lastChild.previousSibling );

    //TODO 有空白文本的时候是否需要删除
    equal( div.innerHTML.toLocaleLowerCase(), '<p>xxxx</p>', '左右边有空sibling' );
    /*左右多个连续的空inline sibling*/
    div.innerHTML = '<span><b></b><i>\t\t</i><div id="div"></div><var></var></span>';
    var div_new = document.getElementById( 'div' );
    domUtils.clearEmptySibling( div_new );
    equal( ua.getChildHTML( div ), '<span><div id="div"></div></span>', '连续空inline sibling' );
    /*左右边有空块元素*/
    div.innerHTML = '<div><p></p>xxxx<b></b></div>';
    domUtils.clearEmptySibling( div.firstChild.firstChild.nextSibling );
    equal( ua.getChildHTML( div ), '<div><p></p>xxxx</div>', '左右边有空块元素' );
} );

/*不能误删bookmark*/
test( 'clearEmptySibling--bookmark', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    var r = te.obj[0];
    div.innerHTML = '<span><a>link</a></span>';
    var a = div.firstChild.firstChild;
    var link = a.firstChild;
    r.selectNode( link );
    r.createBookmark();
    /*bookmark节点*/
    domUtils.clearEmptySibling( link );
    ok( /_baidu_bookmark_end/.test( link.nextSibling.id ), '右边的bookmark sibling没有删掉' );
    ok( /_baidu_bookmark_start/.test( link.previousSibling.id ), '左边的bookmark sibling没有删掉' );
} );

test( 'clearEmptySibling--ignoreNext/ignorePrevious', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    /*ignoreNext*/
    div.innerHTML = '<p><i></i>\n<b>\t<i><u>\n\t\r</u></i></b>xxxx<b></b></p>';
    domUtils.clearEmptySibling( div.firstChild.lastChild.previousSibling, true );
    equal( div.innerHTML.toLocaleLowerCase(), '<p>xxxx<b></b></p>', 'ignore next' );
    /*ignorePrevious*/
    div.innerHTML = '<p><i></i>\n<b>\t<i><u>\n\t\r</u></i></b>xxxx<b></b></p>';
    domUtils.clearEmptySibling( div.firstChild.lastChild.previousSibling, false, true );
    equal( ua.getChildHTML( div ), '<p><i></i><b><i><u></u></i></b>xxxx</p>', 'ignore next' );
    /*ignorePrevious&&ignoreNext*/
    div.innerHTML = '<p><i></i>\n<b>\t<i><u>\n\t\r</u></i></b>xxxx<b></b></p>';
    domUtils.clearEmptySibling( div.firstChild.lastChild.previousSibling, true, true );
    equal( ua.getChildHTML( div ), '<p><i></i><b><i><u></u></i></b>xxxx<b></b></p>', 'ignore next&&previous' );
} );

test( 'split--offset正常', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<span>span</span> >';
    var span = div.firstChild;
    domUtils.split( span.firstChild, 2 );
    equal( span.childNodes.length, 2, 'check child count' );
    equal( span.childNodes[0].data, 'sp', 'check firstChild' );
    equal( span.childNodes[1].data, 'an', 'check secondChild' );
} );

test( 'split--offset=0', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<span>span</span> >';
    var span = div.firstChild;
    domUtils.split( span.firstChild, 0 );
    equal( span.childNodes.length, 2, 'check child count' );
    equal( span.childNodes[0].data, '', 'check firstChild' );
    equal( span.childNodes[1].data, 'span', 'check secondChild' );
} );

test( 'split--offset=data.length', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<span>span</span> >';
    var span = div.firstChild;
    domUtils.split( span.firstChild, 4 );
    equal( span.childNodes.length, 2, 'check child count' );
    equal( span.childNodes[0].data, 'span', 'check firstChild' );
    equal( span.childNodes[1].data, '', 'check secondChild' );
} );

/*求相对视窗的位置而不是实际位置*/
test( 'getXY', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    equal( domUtils.getXY( div )['x'], ua.findPosition( div )[0] - document.documentElement.scrollLeft, 'check X' );
    equal( domUtils.getXY( div )['y'], ua.findPosition( div )[1] - document.documentElement.scrollTop, 'check Y' );

} );


test( 'on--跨iframe加载', function() {
    expect( 1 );
    var domUtils = te.obj[1];
    var op = {
        onafterstart : function( f ) {
            domUtils.on( f, 'load', function() {
                ok( true, 'on load of iframe success' );
            } );
        },
        ontest : function() {
            this.finish();
        }
    };
    ua.frameExt( op );
} );

/*绑定多个事件*/
test( 'on', function() {
    var domUtils = te.obj[1];
    expect( 2 );
    domUtils.on( te.dom[0], ['mouseover','keypress'], function( e ) {
        ok( true, e.type + ' event triggered' );
    } );
    ua.mouseover( te.dom[0] );
    ua.keypress( te.dom[0] );
} );
test( "test case sensitive", function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    if ( ua.browser.ie ) {
        ok( true, 'IE下不支持诸如DOMNodeInserted等mutation事件' );
        return;
    }
    // ok(false, 'TODO: 添加大小写敏感事件的on绑定和un取消用例,比如DOMMouseScroll');
    expect( 2 );
    domUtils.on( div, 'DOMNodeInserted', function() {
        ok( true, '用DOMNodeInserted测试大小写敏感事件的on绑定' );
        domUtils.un( div, 'DOMNodeInserted' );
    } );
    div.appendChild( document.createElement( 'div' ) );
    div.appendChild( document.createElement( 'div' ) );
} );

test( "un--取消注册unload事件", function() {
    expect( 1 );
    var domUtils = te.obj[1];
    var div = te.dom[0];
    var handle_a = function() {
        ok( true, "check unload" );
    };
    domUtils.on( div, "click", handle_a );
    /* 直接调用ua提供的接口跨浏览器接口，屏蔽浏览器之间的差异 */
    ua.click( div );
    domUtils.un( div, "click", handle_a );
    ua.click( div );
} );


/** * 跨frame on然后un */
test( "window resize", function() {
    expect( 1 );
    var domUtils = te.obj[1];
    ua.frameExt( {        onafterstart : function( f ) {
        $( f ).css( 'width', 200 );
    },        ontest : function( w, f ) {
        var op = this;
        var fn = function() {
            ok( true );
        };
        domUtils.on( w, 'resize', fn );
        $( f ).css( 'width', 220 );
        /* 貌似通过jquery触发窗体变化会存在延时 */
        setTimeout( function() {
            domUtils.un( w, 'resize', fn );
            $( f ).css( 'width', 240 );
            setTimeout( op.finish, 100 );
        }, 500 );
    }    } );
} );


test( 'isSameElement--compare with self', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    $( div ).attr( 'name', 'div_name' ).attr( 'class', 'div_class' ).css( 'background-color', 'red' ).css( 'border', '1px' ).css( 'font-size', '12px' ).css( 'height', '12px' ).css( 'width', '20px' );
    ok( domUtils.isSameElement( div, div ), 'compare with self' );
} );

test( 'isSameElement--tagName不一样', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.appendChild( document.createElement( 'span' ) );
    $( div ).attr( 'name', 'div_name' ).attr( 'class', 'div_class' ).css( 'background-color', 'red' ).css( 'border', '1px' ).css( 'font-size', '12px' ).css( 'height', '12px' ).css( 'width', '20px' );
    ok( !domUtils.isSameElement( div, div.firstChild ), 'different tagName' );
} );

test( 'isSameElement', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    $( div ).attr( 'name', 'div_name' ).attr( 'class', 'div_class' ).css( 'background-color', 'red' ).css( 'border', '1px' ).css( 'font-size', '12px' ).css( 'height', '12px' ).css( 'width', '20px' );
    var div_new = document.createElement( 'div' );
    document.body.appendChild( div_new );
    te.dom.push( div_new );
    div_new.innerHTML = '<div id="test" class="div_class" name="div_name" style="border:1px;font-size:12px;background-color:red;width:20px;height:12px;"></div>';
    ok( domUtils.isSameElement( div_new.firstChild, div ), 'is sameElement' );
    /*防止前后顺序引起的问题*/
    ok( domUtils.isSameElement( div, div_new.firstChild ), 'is sameElement' );
} );

/*暂时不会对颜色不同表达方式做转换*/
//test( 'isSameElement--style描述方式不同', function() {
//    var div = te.dom[0];
//    var domUtils = te.obj[1];
//    $( div ).attr( 'name', 'div_name' ).attr( 'class', 'div_class' ).css( 'background-color', 'red' ).css( 'border', '1px' ).css( 'font-size', '12px' ).css( 'height', '12px' ).css( 'width', '20px' );
//    var div_new = document.createElement( 'div' );
//    document.body.appendChild( div_new );
//    te.dom.push( div_new );
//    div_new.innerHTML = '<div id="test" class="div_class" name="div_name" style="border:1px;font-size:12px;background-color:rgb(255,0,0);width:20px;height:12px;"></div>';
//    ok( domUtils.isSameElement( div_new.firstChild, div ), 'A and B are sameElement' );
//    div_new.innerHTML = '<div id="test" class="div_class" name="div_name" style="border:1px;font-size:12px;background-color:#ff0000;width:20px;height:12px;"></div>';
//    ok( domUtils.isSameElement( div, div_new.firstChild ), 'B and A sameElement' );
//} );

test( 'isSameElement--A比B多一个style属性', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    $( div ).attr( 'name', 'div_name' ).attr( 'class', 'div_class' ).css( 'background-color', 'red' ).css( 'border', '1px' ).css( 'font-size', '12px' ).css( 'height', '12px' ).css( 'width', '20px' );
    var div_new = document.createElement( 'div' );
    document.body.appendChild( div_new );
    te.dom.push( div_new );
    div_new.innerHTML = '<div id="test" class="div_class" name="div_name" style="border:1px;font-size:12px;background-color:rgb(255,0,0);width:20px;height:12px;left:12px"></div>';
    ok( !domUtils.isSameElement( div_new.firstChild, div ), 'A and B is not sameElement' );
    ok( ! domUtils.isSameElement( div, div_new.firstChild ), 'B and A is not sameElement' );
} );

test( 'isRedundantSpan--非span', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = 'text';
    ok( !domUtils.isRedundantSpan( div ), 'not span' );
    ok( !domUtils.isRedundantSpan( div.firstChild ), 'text node is not span' );
} );

test( 'isRedundentSpan', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    div.innerHTML = '<span></span><span name="span" style="font-size:12px"></span>';
    ok( domUtils.isRedundantSpan( div.firstChild ), 'is redundentSapn' );
    ok( !domUtils.isRedundantSpan( div.lastChild ), 'is not redundentSpan' );
    var span = document.createElement( 'span' );
    div.appendChild( span );
    ok( domUtils.isRedundantSpan( span ), 'is redundent span' );
} );

/*rd说实际应用情况会按照固定的方式设置样式，因此不考虑兼容rgb(255,0,0),#ff0000,red这三者的差别*/
test( 'isSameStyle', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    /*分号，空格*/
    div.innerHTML = '<span style="font-size:12px; background-color:rgb(255,0,0);"></span><span name="span" style="font-size:12px;background-color:rgb(255,0,0) "></span>';
    ok( domUtils.isSameStyle( div.firstChild, div.lastChild ), 'have same style' );
} );

test( 'isSameStyle--float', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    /*分号，空格*/
    div.innerHTML = '<span style=" float:left;font-size:12px; "></span><span name="span" style="font-size:12px;float:left"></span>';
    ok( domUtils.isSameStyle( div.firstChild, div.lastChild ), 'have same style' );
    div.firstChild.style.cssText = "float:left;font-size:12px;background-color:red";
    ok( ! domUtils.isSameStyle( div.firstChild, div.lastChild ), 'have differtnt style' );
} );


test( 'isBlockElm', function() {
    var div = te.dom[0];
    var domUtils = te.obj[1];
    /isindex,noframes是特例，在这里不做验证/
    var blockElms = ['address','blockquote','center','dir','div','dl','fieldset','form','h1','h2','h3','h4','h5','h6','hr','menu','ol','p','pre','table','ul'];
    var k = blockElms.length;
    while ( k ) {
        var elm = document.createElement( blockElms[k - 1] );
        div.appendChild( elm );
        ok( domUtils.isBlockElm( elm ), elm.tagName + ' is block elm' );
        k--;
    }
    blockElms = ['a','abbr','acronym','b','bdo','big','br','cite','code','dfn','em','font','i','img','input','kbd','label','q','s','samp','select','small','span','strike','strong','sub','sp','textarea','tt','u','noscript' ];
    k = blockElms.length;
    while ( k ) {
        var elm = document.createElement( blockElms[k - 1] );
        div.appendChild( elm );
        ok( !domUtils.isBlockElm( elm ), elm.tagName + ' is not block elm' );
        k--;
    }
} );

test( 'isbody', function() {
    var domUtils = te.obj[1];
    ok( domUtils.isBody( document.body ), 'is body' );
} );

/*parent参数是 node的直接父亲*/
test( 'breakParent--一级祖先', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<p><span>xxxx</span><u><i>uitext</i></u><br /></p><div>xxxx</div>';
    var br = div.firstChild.lastChild;
    var returnNode = domUtils.breakParent( br, div.firstChild );
    equal( ua.getChildHTML( div ), '<p><span>xxxx</span><u><i>uitext</i></u></p><br><p></p><div>xxxx</div>' );
    equal( returnNode.tagName.toLowerCase(), 'br', 'check return value' );
} );

/*parent参数是 node的祖先节点*/
test( 'breakParent--二级祖先', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<p><span>xxxx</span><u><i>uitext</i></u><br /></p><div>xxxx</div>';
    domUtils.breakParent( div.firstChild.firstChild.firstChild, div.firstChild );
    equal( ua.getChildHTML( div ), '<p><span></span></p>xxxx<p><span></span><u><i>uitext</i></u><br></p><div>xxxx</div>' );
} );
/*bookMark已在clearEmptySibling中验证*/
test( 'isEmptyInlineElement', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<p><u><em></em></u><span>xxxx</span><u><i>uitext</i></u><br /></p><div>xxxx</div><div></div>';
    var p = div.firstChild;
    /*非空元素*/
    ok( !domUtils.isEmptyInlineElement( p ), 'is not empty' );
    /*空inline元素*/
    ok( domUtils.isEmptyInlineElement( p.firstChild ), 'u is empty' );
    ok( domUtils.isEmptyInlineElement( p.firstChild.firstChild ), 'em is empty' );
    /*块元素*/
    ok( !domUtils.isEmptyInlineElement( p.lastChild ), 'empty div is not inline' );
} );

test( 'trimWhiteTextNode', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '\n\t    <p><u><em></em></u><span>xxxx</span><u><i>uitext</i></u><br /></p><div>xxxx</div>    ';
    domUtils.trimWhiteTextNode( div );
    equal( ua.getChildHTML( div ), '<p><u><em></em></u><span>xxxx</span><u><i>uitext</i></u><br></p><div>xxxx</div>', 'trim white textnode' );
} );

/*适用于inline节点*/
test( 'mergeChild--span', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;

    var div_new = document.createElement( 'div' );
    div_new.id = 'test';
    div.innerHTML = '<span style="background-color:blue;"><span style="font-size:12px;color:red">span_1<span style="font-size:12px">span_2</span></span></span>';
    domUtils.mergChild( div.firstChild.firstChild );
    /*span套span则进行合并*/
    div_new.innerHTML = '<span style="background-color:blue;"><span style=" font-size:12px;color:red">span_1span_2</span></span>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), 'span套span则合并' );

    div.innerHTML = '<p><span style="font-size:12px;color:red">span_1<span style="font-size:12px">span_2</span></span></p>';
    domUtils.mergChild( div.firstChild.firstChild );
    /*父节点style比子节点多，删去子节点*/
    div_new.innerHTML = '<p><span style="font-size:12px;color:red">span_1span_2</span></p>' || ua.getChildHTML( div ) == '<p><span style="color:red;font-size:12px">span_1span_2</span></p>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), '父节点style比子节点多' );
    /*子节点style比父节点多，则不作调整*/
    div.innerHTML = '<p><span style="font-size:12px">span_1<span style="font-size:12px;color:red">span_2</span></span></p>';
    var span = div.firstChild.firstChild;
    domUtils.mergChild( span );
    /*创建一个div，div的innerHTML与预期的结果相同，比较div_new与div的所有属性，从而判断style为预期结果*/
    var div_new = document.createElement( 'div' );
    div_new.id = 'test';
    div_new.innerHTML = '<p><span style="font-size:12px">span_1<span style="font-size:12px;color:red">span_2</span></span></p>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), '子节点style比父节点多' );

    /*多个子节点和兄弟节点，有的子节点style比父节点多，有的少，有的不同*/
    div.innerHTML = '<p><span style="font-size:12px;color:red;left:10px">span_1<span style="font-size:12px">span_2</span><span style="top:10px">span_3</span><span style="color:red;left:10px;right:10px">span_4</span></span><span style="font-size:12px"></span></p>';
    domUtils.mergChild( div.firstChild.firstChild );
    div_new.innerHTML = '<p><span style="font-size:12px;color:red;left:10px">span_2<span style="font-size:12px;color:red;left:10px;top:10px">span_3</span><span style="font-size:12px;color:red;left:10px;right:10px">span_4</span></span><span style="font-size:12px"></span></p>';
    var span1 = div_new.firstChild.firstChild;
    span1.insertBefore( document.createTextNode( 'span_1' ), span1.firstChild );
    ok( ua.haveSameAllChildAttribs( div, div_new ), '多个子节点和兄弟节点，有的子节点style比父节点多，有的少，有的不同' );
} );


test( 'mergeChild--非span', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    /*父节点和子节点属性不同*/
    div.innerHTML = '<b style="color:red;font-size:12px">b1<b style="font-size:12px;">b2</b></b>';
    var div_new = document.createElement( 'div' );
    div_new.id = 'test';
    div_new.innerHTML = '<b style="color:red;font-size:12px">b1<b style="font-size:12px;">b2</b></b>';
    domUtils.mergChild( div.firstChild );
    ok( ua.haveSameAllChildAttribs( div, div_new ), '父节点和子节点属性不同，则不操作' );
    /*父节点和子节点属性相同*/
    div.innerHTML = '<b style="color:red;font-size:12px">b1<b style="font-size:12px;color:red;">b2</b></b>';
    var div_new = document.createElement( 'div' );
    div_new.id = 'test';
    div_new.innerHTML = '<b style="color:red;font-size:12px">b1</b>';
    domUtils.mergChild( div.firstChild );
    div_new.firstChild.appendChild( document.createTextNode( 'b2' ) );
    ok( ua.haveSameAllChildAttribs( div, div_new ), '父节点和子节点属性相同，则删子节点' );
} );

test( 'getElementsByTagName', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<p><u><em></em></u><span>xxxx</span><u><i>uitext</i></u><br /></p><div>xxxx</div> <p>xxxx</p>';
    var elms = domUtils.getElementsByTagName( div, 'p' );
    equal( elms.length, 2, 'check elem count' );
    equal( elms[0].innerHTML.toLowerCase(), '<u><em></em></u><span>xxxx</span><u><i>uitext</i></u><br>', 'check first p' );
    equal( elms[1].innerHTML, 'xxxx', 'check second p' );
} );

test( 'mergToParent--一个span孩子', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<span style="color:red;font-size:12px;"><span style="left:10px;right:20px;"></span></span>';
    domUtils.mergToParent( div.firstChild.firstChild );
    var div_new = document.createElement( 'div' );
    div_new.innerHTML = '<span style=color:red;font-size:12px;left:10px;right:20px;></span>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), 'mergeTo parent' );
} );

test( 'mergToParent--一个span孩子，孩子css样式与父节点相同', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<span style="color:red;font-size:12px;"><span style="font-size:12px;color:red;">xxxxx</span></span>';
    domUtils.mergToParent( div.firstChild.firstChild );
    var div_new = document.createElement( 'div' );
    div_new.innerHTML = '<span style="color:red;font-size:12px">xxxxx</span>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), 'mergeTo parent，删除样式相同的子节点' );
} );

test( 'mergToParent--多个span孩子,祖先节点不可被合并', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<span style="color:red;font-size:12px;"><span style="left:10px;right:20px;"></span><span style="top:10px"></span></span>';
    domUtils.mergToParent( div.firstChild.firstChild );
    var div_new = document.createElement( 'div' );
    div_new.innerHTML = '<span style="color:red;font-size:12px;"><span style="left:10px;right:20px;"></span><span style="top:10px"></span></span>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), 'mergeTo parent--多个span孩子,' );
} );


test( 'mergToParent--其他inline节点', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<b>xxx<i>xxx<u>xxxx<em>xxx<i id="secondI"><b>xxxxxx</b></i></em></u></i></b>';
    var i = document.getElementById( 'secondI' );
    domUtils.mergToParent( i.firstChild );
    ok( ua.getChildHTML( div ), '<b>xxx<i>xxx<u>xxxx<em>xxx<i>xxxxxx</i></em></u></i></b>' );
    domUtils.mergToParent( i );
    ok( ua.getChildHTML( div ), '<b>xxx<i>xxx<u>xxxx<em>xxxxxxxxx</em></u></i></b>' );
} );

/*合并兄弟节点中有相同属性包括style的节点*/
test( 'mergSibling--左边没有兄弟', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<b>b1</b><b>b2</b><b id="b3">b3</b>';
    domUtils.mergSibling( div.firstChild );
    ok( ua.getChildHTML( div ), '<b>b1b2</b><b id="b3">b3</b>' );
} );

test( 'mergSibling--右边没有兄弟', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<b>b1</b><b>b2</b><b>b3</b>';
    domUtils.mergSibling( div.lastChild );
    ok( ua.getChildHTML( div ), '<b>b1b2</b><b id="b3">b3</b>' );
} );


test( 'mergSibling--兄弟节点没有孩子', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<b></b><b>b2</b><b id="b3">b3</b>';
    domUtils.mergSibling( div.firstChild.nextSibling );
    ok( ua.getChildHTML( div ), '<b>b2</b><b id="b3">b3</b>' );
} );


test( 'unselectable--检查赋值是否成功', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div><p>xxxx<span><b><i>xxx</i></b>xxxx</span></p>dddd<p><img /><a>aaaa</a></p></div>';
    domUtils.unselectable( div );
    if ( baidu.editor.browser.gecko || baidu.editor.browser.webkit ) {
        equal( div.style.MozUserSelect || div.style.KhtmlUserSelect, 'none', 'webkit or gecko unselectable' );
    } else {
        equal( div.unselectable, 'on', '检查unselectable属性' );
        for ( var i = 0,ci; ci = div.all[i++]; ) {
            equal( ci.unselectable, 'on', '检查子节点unselectable属性' );
        }
    }
} );

test( 'unselectable--检查是否真的不能选中', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<p>xxx</p>';
    //TODO ie下如何选中文本节点需要重新想一想，用程序选择文本貌似不会考虑unselectable属性，都是可以选中的
    if ( ! ua.browser.ie ) {
//        var rng = document.body.createTextRange();
//          domUtils.unselectable( div );
//        rng.moveToElementText( div )
//        /*开始位置处向前移动一个字符，结束位置处向后移动一个字符*/
//        rng.moveEnd( 'character', 1 );
//        rng.moveStart( 'character', -1 );
//        rng.select();
//        equal( rng.text, '', 'after unselectable' );
//    } else {
        var r = te.obj[0];
        r.selectNode( div.firstChild ).select();
        equal( ua.getSelectedText(), 'xxx', 'before unselectable' );
        /*禁止选中*/
        domUtils.unselectable( div );
        r.selectNode( div.firstChild ).select();
        equal( ua.getSelectedText(), '', 'after unselectable' );
    }
} );

test( 'removeAttributes--删除一个属性', function() {
    var div = te.dom[0];
    div.innerHTML = '<div class="div_class" name="div_name"></div>';
    var domUtils = baidu.editor.dom.domUtils;
    domUtils.removeAttributes( div.firstChild, 'class' );
    equal( ua.getChildHTML( div ), '<div name="div_name"></div>' );
} );

test( 'removeAttributes--删除多个属性，包括style', function() {
    var div = te.dom[0];
    div.innerHTML = '<div class="div_class" name="div_name" style="color:red;font-size:12px"></div>';
    var domUtils = baidu.editor.dom.domUtils;
    domUtils.removeAttributes( div.firstChild, ['class','name','style'] );
    equal( ua.getChildHTML( div ), '<div></div>' );
} );

test( 'setAttributes--设置class,style', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div></div>';
    domUtils.setAttributes( div.firstChild, {'class':'div_class','id':'div_id','style':'color:red;font-size:12px;'} );
    var div_new = document.createElement( 'div' );
    div_new.id = 'test';
    div_new.innerHTML = '<div class="div_class" id="div_id" style="color:red;font-size:12px"></div>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), 'check attributes' );
} );

test( 'getComputedStyle', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div class="div_class" name="div_name" style="color:red;font-size:12px"></div><span></span>';
    equal( domUtils.getComputedStyle( div.firstChild, 'font-size' ), '9pt' );
    equal( domUtils.getComputedStyle( div.firstChild, 'display' ), 'block' );
    equal( domUtils.getComputedStyle( div.lastChild, 'display' ), 'inline' );
} );

test( 'removeClasses--一个class', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div class="div_class" name="div_name" style="color:red;font-size:12px"></div>';
    domUtils.removeClasses( div.firstChild, 'div_class' );
    ok( ua.getChildHTML( div ) == '<div name="div_name" style="color:red;font-size:12px"></div>' || ua.getChildHTML( div ) == '<div name="div_name" style="font-size:12px;color:red;"></div>' )
} );

test( 'removeClasses--多个class', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div class="div_class div_class2 div_class3" name="div_name" style="color:red;font-size:12px"></div>';
    var divChild = div.firstChild;
    domUtils.removeClasses( divChild, ['div_class2' ,'div_class3','div_class'] );
    equal( divChild.className, "", 'check className' );
    equal( $( divChild ).attr( 'name' ), 'div_name', 'check name' );
    equal( $( divChild ).css( 'font-size' ), '12px', 'check font-size' );
    equal( $( divChild ).css( 'color' ), 'red', 'check red' );
} );

test( 'removeStyle--style不为空', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div name="div_name" style="color:red;font-size:12px"></div>';
    domUtils.removeStyle( div.firstChild, 'font-size' );
    var div_new = document.createElement( 'div' );
    div_new.id = 'test';
    div_new.innerHTML = '<div name="div_name" style="color:red; "></div>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), 'check removed style' );

} );

test( 'removeStyle--style为空', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div name="div_name"></div>';
    domUtils.removeStyle( div.firstChild, 'color' );
    equal( ua.getChildHTML( div ), '<div name="div_name"></div>', ' style为空' );
} );

test( 'hasClass', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div class="div_class div_class2 div_class3" name="div_name" style="color:red;font-size:12px"></div>';
    var divChild = div.firstChild;
    ok( domUtils.hasClass( divChild, 'div_class3' ), '有这个class' );
    ok( !domUtils.hasClass( divChild, 'div' ), '木有这个class' );
} );

test( "preventDefault", function() {
    expect( 1 );
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    /*img用来撑大页面*/
    var img = document.createElement( 'img' );
    img.src = upath + 'test.jpg';
    img.style.height = "2000px";
    div.appendChild( img );
    document.body.appendChild( div );
    var a = document.createElement( 'a' );
    a.setAttribute( "href", "#" );
    a.innerHTML = 'ToTop';
    a.target = '_self';
    document.body.appendChild( a );
    window.scrollTo( 0, document.body.scrollHeight );

    UserAction.beforedispatch = function( e ) {
        e = e || window.event;
        domUtils.preventDefault( e );
    };
    UserAction.click( a );
    var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    ok( top != 0, "preventDefault" );
    document.body.removeChild( a );
} );

test( 'getStyle--color is red', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div class="div_class div_class2 div_class3" name="div_name" style="top:13px;color:red;font-size:12px"></div>';
    equal( domUtils.getStyle( div.firstChild, 'color' ), 'red', 'check color' );
    equal( domUtils.getStyle( div.firstChild, 'font-size' ), '12px', 'check font size' );
    equal( domUtils.getStyle( div.firstChild, 'top' ), '13px', 'check top' );
} );

test( 'getStyle--color is rgb', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div class="div_class div_class2 div_class3" name="div_name" style="top:13px;color:rgb(255,0,0);font-size:12px"></div>';
    equal( domUtils.getStyle( div.firstChild, 'color' ), '#FF0000', 'check color' );
    equal( domUtils.getStyle( div.firstChild, 'font-size' ), '12px', 'check font size' );
    equal( domUtils.getStyle( div.firstChild, 'top' ), '13px', 'check top' );
} );

test( 'getStyle--color is #ff0000', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div class="div_class div_class2 div_class3" name="div_name" style="top:13px;color:#ff0000;font-size:12px"></div>';
    equal( domUtils.getStyle( div.firstChild, 'color' ).toUpperCase(), '#FF0000', 'check color' );
    equal( domUtils.getStyle( div.firstChild, 'font-size' ), '12px', 'check font size' );
    equal( domUtils.getStyle( div.firstChild, 'top' ), '13px', 'check top' );
} );

test( 'removeDirtyAttr', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div><span>xxx</span><img /></div>xx';
    var divChild = div.firstChild;
    $( div ).attr( '_moz_dirty', 'xxxx' );
    for ( var i = 0,ci,nodes = div.getElementsByTagName( '*' ); ci = nodes[i++]; ) {
        $( ci ).attr( '_moz_dirty', 'xxx' );
    }
    domUtils.removeDirtyAttr( div );

    for ( var i = 0,ci,nodes = div.getElementsByTagName( '*' ); ci = nodes[i++]; ) {
        equal( $( ci ).attr( '_moz_dirty' ), undefined, 'check  dirty attr ' );
    }
    equal( $( div ).attr( '_moz_dirty' ), undefined, 'check  dirty attr' );
} );

test( 'getChildCount', function() {
    var div = te.dom[0];
    var domUtils = baidu.editor.dom.domUtils;
    div.innerHTML = '<div name="div_name" style="top:13px;color:#ff0000;font-size:12px"><p><span>xxx<b><u></u></b></span></p><span>xxxx</span>xxx<img/>xxx</div>';
    var divChild = div.firstChild;
    equal( domUtils.getChildCount( div ), 1, 'one childNode' );
    equal( domUtils.getChildCount( divChild ), 5, '5 childs' );
    equal( domUtils.getChildCount( divChild.firstChild.firstChild ), 2, 'inline span' );
    equal( domUtils.getChildCount( divChild.lastChild ), 0, 'text node have no child' );
    equal( domUtils.getChildCount( divChild.lastChild.previousSibling ), 0, 'img have no child' );

} )
