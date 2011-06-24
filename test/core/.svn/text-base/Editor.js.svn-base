module( "Editor" );


test( "render-- element", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    equal( div.innerHTML, "", "before render" );
    editor.render( div );
    equal( div.firstChild.tagName.toLocaleLowerCase(), 'iframe', 'check iframe' );
    ok( /baidu_editor_/.test( div.firstChild.id ), 'check iframe id' );
} );

test( "render-- elementid", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div.id );
    equal( div.firstChild.tagName.toLocaleLowerCase(), 'iframe', 'check iframe' );
    ok( /baidu_editor_/.test( div.firstChild.id ), 'check iframe id' );
} );

test( "render-- options", function() {
    var options = {'initialContent':'<span>xxx</span><div>xxx<p></p></div>'};
    var editor = new baidu.editor.Editor( options );
    var div = te.dom[0];
    editor.render( div );
    equal( ua.getChildHTML( editor.body ), '<span>xxx</span><div>xxx<p></p></div>', 'check initialContent' );
} );

//test( "setup--ready event", function() {
//    expect( 1 );
//    var editor = te.obj[1];
//    editor.addListener( 'ready', function() {
//        ok( true, 'load ready' );
//    } );
//    var div = te.dom[0];
//    editor.render( div );
//    var doc = editor.iframe.contentDocument.documentElement;
//    //todo
//} );

test( "getContent--去除无用的空标签", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    var innerHTML = '<span><span></span><strong>xx</strong><em>em</em><em></em><u></u></span><div>xxxx</div>';
    editor.setContent( innerHTML );
    equal( editor.getContent(), '<span><strong>xx</strong><em>em</em></span><div>xxxx</div>', "clear useless tags" );
} );


test( "setContent", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    expect( 3 );
    editor.addListener( "beforesetcontent", function() {
        ok( true, "beforesetcontent" );
    } );
    editor.addListener( "aftersetcontent", function() {
        ok( true, "aftersetcontent" );
    } );
    var html = '<span><span></span><strong>xx</strong><em>em</em><em></em><u></u></span><div>xxxx</div>';
    editor.setContent( html );
    equal( ua.getChildHTML( editor.body ), html, "setContent xxxx" );
} );


test( "focus", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    expect( 1 );
    /*设置onfocus事件,必须同步处理，否则在ie下onfocus会在用例执行结束后才会触发*/
    stop();
    editor.window.onfocus = function() {
        ok( true, 'onfocus event dispatched' );
        start();
    };
    editor.focus();
} );

test( "initPlugins", function() {
//TODO 考虑放在plugins里测
} );

test( "_initEvents,_proxyDomEvent--mouse event", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    expect( 1 );
    stop();
    editor.addListener( 'mouseover', function() {
        ok( true, 'mouse over event dispatched' );
        start();
    } );
    ua.mouseover( editor.document );
} );

test( "_initEvents,_proxyDomEvent--focus", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    stop();
    expect( 1 );
    editor.addListener( 'focus', function() {
        ok( true, 'focus event dispatched' );
        start();
    } );
    editor.focus();
} );

/*测试拖拽问题*/
test( "_initEvents--drag event", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    //TODO 从老版本迁移过来，RD说可以先不管
} );

test( "_selectionChange--测试event是否被触发", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    expect( 2 );
    stop();
    editor.addListener( 'beforeselectionchange', function() {
        ok( true, 'before selection change' );
    } );
    editor.addListener( 'selectionchange', function() {
        ok( true, 'selection changed' );
    } );

    ua.mousedown( editor.document, {clientX:0,clientY:0} );
    ua.mouseup( editor.document, {clientX:0,clientY:0} );
    /*_selectionChange有一定的延时才会触发，所以需要等一会*/
    setTimeout( function() {
        start();
    }, 100 );

} );

test( "_selectionChange--fillData", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    //TODO fillData干嘛用的
} );

/*按钮高亮、正常和灰色*/
test( "queryCommandState", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    editor.setContent( "<p><b>xxx</b>xxx</p>" );
    var p = editor.document.getElementsByTagName( 'p' )[0];
    var r = new baidu.editor.dom.Range( editor.document );
    r.setStart( p.firstChild, 0 ).setEnd( p.firstChild, 1 ).select();
    equal( editor.queryCommandState( 'bold' ), 1, '加粗状态为1' );
    r.setStart( p, 1 ).setEnd( p, 2 ).select();
    equal( editor.queryCommandState( 'bold' ), 0, '加粗状态为0' );
} );

test( "queryCommandValue", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    editor.setContent( '<p style="text-align:left">xxx</p>' );
    var range = new baidu.editor.dom.Range( editor.document );
    var p = editor.document.getElementsByTagName( "p" )[0];
    range.selectNode( p ).select();
    equal( editor.queryCommandValue( 'justify' ), 'left', 'text align is left' );
} );


test( "execCommand", function() {
    var editor = te.obj[1];
    var div = te.dom[0];

    editor.render( div );
    editor.focus();
    editor.setContent( "<span>xx</span><p>xxx</p>" );
    var doc = editor.document;
    var range = new baidu.editor.dom.Range( doc );
    var span = doc.getElementsByTagName( 'span' )[0];
    var p = span.nextSibling;
    range.setStart( p, 0 ).setEnd( p, 1 ).select();
    editor.execCommand( 'justify', 'right' );
    equal( $( p ).css( 'text-align' ), 'right', 'execCommand align' );
    /*给span加style不会重复添加span*/
    range.selectNode( span ).select();
    editor.execCommand( "forecolor", "red" );
    /*span发生了变化，需要重新获取*/
    span = doc.getElementsByTagName( 'span' )[0];
    equal( $( span ).css( 'color' ), 'red', 'check execCommand color' );
    var div_new = document.createElement( 'div' );
    div_new.innerHTML = '<span style="color: red; ">xx</span><p style="text-align: right; ">xxx</p>';
    ok( ua.haveSameAllChildAttribs( div_new, editor.body ), 'check style' );
} );


test( "hasContents", function() {
    var editor = te.obj[1];
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    ok( !editor.hasContents(), "have't content" );
    editor.setContent( "xxx" );
    ok( editor.hasContents(), "has contents" );
} );
