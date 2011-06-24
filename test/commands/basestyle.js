module( "basestyle" );

test('execCommand',function(){

})

//1 bold&&collapsed&&in"b"
test( 'bold&&collapsed&&in"b"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<b>xxxx</b><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'b' )[0].firstChild ).collapse( true ).select();//闭合到b节点里面

    editor.execCommand( 'bold' );
    equal( editor.queryCommandState( 'bold' ), 0, "<strong> not exist" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "aa<b>xxxx</b><span>ssss</span>", "bold&&collapsed&&in'b'" );
} );

//2 bold&&collapsed&&notin'b'
test( 'bold&&collapsed&&notin"b"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<b>xxxx</b><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'b' )[0] ).collapse( true ).select();//闭合到b节点外面

    editor.execCommand( 'bold' );
    equal( editor.queryCommandState( 'bold' ), 1, "<strong> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "<strong>aa</strong><b>xxxx</b><span>ssss</span>", "bold&&collapsed&&notin'b'" );
} );

//3 notbold&&collapsed
test( 'notbold&&collapsed', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<b>xxxx</b><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'span' )[0].firstChild ).collapse( true ).select();
    editor.execCommand( 'bold' );
    equal( editor.queryCommandState( 'bold' ), 1, "<strong> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'strong' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ),
            "<b>xxxx</b><span><strong>strong</strong>ssss</span>",
            "notbold&&collapsed" );
} );

//4 italic&&collapsed&&in'em'
test( 'italic&&collapsed&&in"em"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<em>xxxx</em><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'em' )[0].firstChild )
            .collapse( true ).select();
    editor.execCommand( 'italic' );
    equal( editor.queryCommandState( 'italic' ), 0, "<em>  not exist" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "aa<em>xxxx</em><span>ssss</span>", "italic&&collapsed&&in'em'" );
} );
//5 italic&&collapsed&&notin'em'
test( 'italic&&collapsed&&notin"em"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<em>xxxx</em><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'em' )[0] ).collapse(
            true ).select();
    editor.execCommand( 'italic' );
    equal( editor.queryCommandState( 'italic' ), 1, "<em> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "<em>aa</em><em>xxxx</em><span>ssss</span>", "italic&&collapsed&&notin'em'" );
} );
//6 notitalic&&collapsed
test( 'notitalic&&collapsed', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( "aa<em>xxxx</em><span>ssss</span>" );
    range.selectNode( d.getElementsByTagName( 'span' )[0].firstChild ).collapse( true ).select();
    editor.execCommand( 'italic' );
    equal( editor.queryCommandState( 'italic' ), 1, "<em> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'italic' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "aa<em>xxxx</em><span><em>italic</em>ssss</span>", "notitalic&&collapsed" );
} );
//7 underline&&collapsed&&in"u"
test( 'underline&&collapsed&&in"u"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<u>xxxx</u><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'u' )[0].firstChild )
            .collapse( true ).select();
    editor.execCommand( 'underline' );
    equal( editor.queryCommandState( 'underline' ), 0, "<u> not exist" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "aa<u>xxxx</u><span>ssss</span>", "underline&&collapsed&&in'u" );
} );
//8 underline&&collapsed&&notin"u"
test( 'underline&&collapsed&&notin"u"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<u>xxxx</u><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'u' )[0] ).collapse(
            true ).select();
    editor.execCommand( 'underline' );
    equal( editor.queryCommandState( 'underline' ), 1, "<u> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "<u>aa</u><u>xxxx</u><span>ssss</span>", "underline&&collapsed&&notin'u'" );
} );
//9 notunderline&&collapsed
test( 'underline collapsed==true', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'aa<u>xxxx</u><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'span' )[0].firstChild ).collapse( true ).select();
    editor.execCommand( 'underline' );
    equal( editor.queryCommandState( 'underline' ), 1, "<u> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'underline' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ),
            "aa<u>xxxx</u><span><u>underline</u>ssss</span>",
            "notunderline&&collapsed" );
} );
//10 strikethrough&&collapsed&&in"strike"
test( 'strikethrough&&collapsed&&in"strike"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<strike>xxxx</strike><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'strike' )[0].firstChild ).collapse( true ).select();
    editor.execCommand( 'strikethrough' );
    equal( editor.queryCommandState( 'strikethrough' ), 0,
            "<strike> not exist" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ),
            "aa<strike>xxxx</strike><span>ssss</span>",
            "strikethrough&&collapsed&&in'strike'" );
} );
//11 strikethrough&&collapsed&&notin"strike"
test( 'strikethrough&&collapsed&&notin"strike"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<strike>xxxx</strike><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'strike' )[0] )
            .collapse( true ).select();
    editor.execCommand( 'strikethrough' );
    equal( editor.queryCommandState( 'strikethrough' ), 1,
            "<STRIKE> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ),
            "<strike>aa</strike><strike>xxxx</strike><span>ssss</span>",
            "strikethrough&&collapsed&&notin'strike'" );
} );
//12 notstrikethrough&&collapsed
test( 'notstrikethrough&&collapsed', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'aa<strike>xxxx</strike><span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'span' )[0].firstChild )
            .collapse( true ).select();
    editor.execCommand( 'strikethrough' );
    equal( editor.queryCommandState( 'strikethrough' ), 1,
            "<strike>  exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'strikethrough' ) );
    ua.manualDeleteFillData();
    equal(
            ua.getChildHTML( db ),
            "aa<strike>xxxx</strike><span><strike>strikethrough</strike>ssss</span>",
            "notstrikethrough&&collapsed" );
} );
//13 subscript&&collapsed&&in"sub"
test( 'subscript&&collapsed&&in"sub"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<sub>xxxx</sub><span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'sub' )[0].firstChild )
            .collapse( true ).select();
    editor.execCommand( 'subscript' );
    equal( editor.queryCommandState( 'subscript' ), 0,
            "<sub> not exist" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ),
            "aa<sub>xxxx</sub><span>ssss</span>",
            "subscript&&collapsed&&in'sub'" );
} );
//14 subscript&&collapsed&&notin"sub"
test( 'subscript&&collapsed&&notin"sub"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<sub>xxxx</sub><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'sub' )[0] )
            .collapse( true ).select();
    editor.execCommand( 'subscript' );
    equal( editor.queryCommandState( 'subscript' ), 1,
            "<SUB> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ),
            "<sub>aa</sub><sub>xxxx</sub><span>ssss</span>",
            "subscript&&collapsed&&notin'sub'" );
} );
//15 notsubscript&&collapsed
test( 'notsubscript&&collapsed', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'aa<sub>xxxx</sub><span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'span' )[0].firstChild )
            .collapse( true ).select();
    editor.execCommand( 'subscript' );
    equal( editor.queryCommandState( 'subscript' ), 1, "<sub> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'subscript' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ),
            "aa<sub>xxxx</sub><span><sub>subscript</sub>ssss</span>",
            "notsubscript&&collapsed" );
} );
//16 superscript&&collapsed&&in"sup"
test( 'superscript&&collapsed&&in"sup"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<sup>xxxx</sup><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'sup' )[0].firstChild )
            .collapse( true ).select();
    editor.execCommand( 'superscript' );
    equal( editor.queryCommandState( 'superscript' ), 0, "<sup> not exist" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "aa<sup>xxxx</sup><span>ssss</span>",
            "superscript&&collapsed&&in'sup'" );
} );
//17 superscript&&collapsed&&notin"sup"
test( 'superscript&&collapsed&&notin"sup"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<sup>xxxx</sup><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'sup' )[0] ).collapse(
            true ).select();
    editor.execCommand( 'superscript' );
    equal( editor.queryCommandState( 'superscript' ), 1,
            "<sup> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'aa' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ), "<sup>aa</sup><sup>xxxx</sup><span>ssss</span>",
            "superscript&&collapsed&&notin'sup'" );
} );
//18 notsuperscript&&collapsed
test( 'notsuperscript&&collapsed', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'aa<sup>xxxx</sup><span>ssss</span>' );
    range
            .selectNode(
            d.getElementsByTagName( 'span' )[0].firstChild )
            .collapse( true ).select();
    editor.execCommand( 'superscript' );
    equal( editor.queryCommandState( 'superscript' ), 1, "<sup> exists" );
    range = editor.selection.getRange();
    range.insertNode( range.document.createTextNode( 'superscript' ) );
    ua.manualDeleteFillData();
    equal( ua.getChildHTML( db ),
            "aa<sup>xxxx</sup><span><sup>superscript</sup>ssss</span>",
            "notsuperscript&&collapsed" );
} );
// 19 bold&&!collapsed&&in"b"
test( 'bold&&!collapsed&&in"b"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<p><b>xxxx</b><span>ssss</span></p>' );
    range.selectNode(
            d.getElementsByTagName( 'b' )[0].firstChild )
            .select();
    editor.execCommand( 'bold' );
    equal( editor.queryCommandState( 'bold' ), 0,
            "<strong>or<b>  not exist" );
    equal( ua.getChildHTML( db ),
            "<p>xxxx<span>ssss</span></p>", "bold&&!collapsed&&in'b'" );
} );
//20 bold&&!collapsed&&notin"b"
test( 'bold&&!collapsed&&notin"b"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<p>xxxx<span>ssss</span></p>' );
    range.selectNode(
            d.getElementsByTagName( 'span' )[0].firstChild )
            .select();
    editor.execCommand( 'bold' );
    equal( ua.getChildHTML( db ),
            "<p>xxxx<strong><span>ssss</span></strong></p>",
            "bold&&!collapsed&&notin'b'" );
    equal( editor.queryCommandState( 'bold' ), 1,
            "<strong>or<b>  exists" );
} );
//21 bold&&!collapsed&&between
test( 'bold&&!collapsed&&between', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<span>aa<b>xxxx</b></span>' );
    range.setStart( d.getElementsByTagName( 'span' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'span' )[0].lastChild.firstChild, 3 ).select();
    editor.execCommand( 'bold' );
    equal( editor.queryCommandState( 'bold' ), 1,
            "<strong>or<b>  exists" );
    equal(
            ua.getChildHTML( db ),
            "<strong><span>aa<b>xxx</b></span></strong><span><b>x</b></span>",
            "bold&&!collapsed&&between" );
} );
//22 italic&&!collapsed&&in"i"
test( 'italic&&!collapsed&&in"i"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<i>xxxx</i><span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'i' )[0].firstChild )
            .select();
    editor.execCommand( 'italic' );
    equal( editor.queryCommandState( 'italic' ), 0,
            "<em>or<i>  not exist" );
    equal( ua.getChildHTML( db ), "xxxx<span>ssss</span>",
            "italic&&!collapsed&&in'i'" );
} );
//23 italic&&!collapsed&&notin"i"
test( 'italic&&!collapsed&&notin"i"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'xxxx<span>ssss</span' );
    range.selectNode(
            d.getElementsByTagName( 'span' )[0].firstChild )
            .select();
    editor.execCommand( 'italic' );
    equal( editor.queryCommandState( 'italic' ), 1,
            "<em>or<i>  not exist" );
    equal( ua.getChildHTML( db ),
            "xxxx<em><span>ssss</span></em>",
            "italic&&!collapsed&&notin'i'" );
} );
//24 italic&&!collapsed&&between
test( 'italic&&!collapsed&&between', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<span>aa<em>xxxx</em></span><span>ssss</span>' );
    range.setStart( d.getElementsByTagName( 'span' )[0].firstChild, 0 ).setEnd(
            d.getElementsByTagName( 'span' )[0].lastChild.firstChild, 3 ).select();
    editor.execCommand( 'italic' );
    equal( editor.queryCommandState( 'italic' ), 1,
            "<em>or<i>  not exist" );
    equal(
            ua.getChildHTML( db ),
            "<em><span>aaxxx</span></em><span><em>x</em></span><span>ssss</span>",
            "italic&&!collapsed&&between" );
} );
//25 underline&&!collapsed&&in"u"
test( 'underline&&!collapsed&&in"u"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<u>xxxx</u><span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'u' )[0].firstChild )
            .select();
    editor.execCommand( 'underline' );
    equal( editor.queryCommandState( 'underline' ), 0, "<u> not exist" );
    equal( ua.getChildHTML( db ), "xxxx<span>ssss</span>",
            "underline&&!collapsed&&in'u'" );
} );
//26 underline&&!collapsed&&notin"u"
test( 'underline&&!collapsed&&notin"u"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'xxxx<span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'span' )[0].firstChild )
            .select();
    editor.execCommand( 'underline' );
    equal( editor.queryCommandState( 'underline' ), 1,
            "<u>  exists" );
    equal( ua.getChildHTML( db ),
            "xxxx<span><u>ssss</u></span>",
            "underline&&!collapsed&&notin'u'" );
} );
//27 underline&&!collapsed&&between
test( 'underline&&!collapsed&&between', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<span>aa<u>xxxx</u></span><span>ssss</span>' );
    range.setStart(
            d.getElementsByTagName( 'span' )[0].firstChild, 0 ).setEnd(
            d.getElementsByTagName( 'span' )[0].lastChild.firstChild,
            3 ).select();
    editor.execCommand( 'underline' );
    equal( editor.queryCommandState( 'underline' ), 1,
            "<u> exists" );
    equal( ua.getChildHTML( db ),
            "<span><u>aaxxxx</u></span><span>ssss</span>",
            "underline&&!collapsed&&between" );
} );
//28 strikethrough&&!collapsed&&in"strike"
test( 'strikethrough&&!collapsed&&in"strike"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<strike>xxxx</strike><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'strike' )[0].firstChild ).select();
    editor.execCommand( 'strikethrough' );
    equal( editor.queryCommandState( 'strikethrough' ), 0,
            "<strike> not exist" );
    equal( ua.getChildHTML( db ), "xxxx<span>ssss</span>",
            "strikethrough&&!collapsed&&in'strike'" );
} );
//29 strikethrough&&!collapsed&&notin"strike"
test( 'strikethrough&&!collapsed&&notin"strike"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'xxxx<span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'span' )[0].firstChild ).select();
    editor.execCommand( 'strikethrough' );
    equal( editor.queryCommandState( 'strikethrough' ), 1,
            "<strike>  exists" );
    equal( ua.getChildHTML( db ),
            "xxxx<strike><span>ssss</span></strike>",
            "strikethrough&&!collapsed&&notin'strike'" );
} );
//30 strikethrough&&!collapsed&&between
test( 'strikethrough&&!collapsed&&between', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<span>aa<strike>xxxx</strike></span><span>ssss</span>' );
    range.setStart( d.getElementsByTagName( 'span' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'span' )[0].lastChild.firstChild, 3 ).select();
    editor.execCommand( 'strikethrough' );
    equal( editor.queryCommandState( 'strikethrough' ), 1,
            "<strike>  exists" );
    equal(
            ua.getChildHTML( db ),
            "<strike><span>aaxxx</span></strike><span><strike>x</strike></span><span>ssss</span>",
            "strikethrough&&!collapsed&&between" );
} );
//31 subscript&&!collapsed&&in"sub"
test( 'subscript&&!collapsed&&in"sub"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'aa<sub>xxxx</sub><span>ssss</span>' );
    range.selectNode( d.getElementsByTagName( 'sub' )[0].firstChild ).select();
    editor.execCommand( 'subscript' );
    equal( editor.queryCommandState( 'subscript' ), 0, "<sub> not exist" );
    equal( ua.getChildHTML( db ), "aaxxxx<span>ssss</span>",
            "subscript&&!collapsed&&in'sub'" );
} );
//32 subscript&&!collapsed&&notin"sub"
test( 'subscript&&!collapsed&&notin"sub"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'aaxxxx<span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'span' )[0].firstChild ).select();
    editor.execCommand( 'subscript' );
    equal( ua.getChildHTML( db ),
            "aaxxxx<sub><span>ssss</span></sub>",
            "subscript&&!collapsed&&notin'sub'" );
    equal( editor.queryCommandState( 'subscript' ), 1,
            "<sub>  exists" );
} );
//33 subscript&&!collapsed&&between
test( 'subscript&&!collapsed&&between', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<span>aa<sub>xxxx</sub></span><span>ssss</span>' );
    range.setStart( d.getElementsByTagName( 'span' )[0].firstChild, 0 ).setEnd(
            d.getElementsByTagName( 'span' )[0].lastChild.firstChild,
            3 ).select();
    editor.execCommand( 'subscript' );
    equal( editor.queryCommandState( 'subscript' ), 1,
            "<sub> exists" );
    equal( ua.getChildHTML( db ),
            "<sub><span>aaxxx</span></sub><span><sub>x</sub></span><span>ssss</span>",
            "subscript&&!collapsed&&between" );
} );
//34 superscript&&!collapsed&&in"sup"
test( 'superscript&&!collapsed&&in"sup"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'aa<sup>xxxx</sup><span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'sup' )[0].firstChild )
            .select();
    editor.execCommand( 'superscript' );
    equal( editor.queryCommandState( 'superscript' ), 0, "<sup> exists" );
    equal( ua.getChildHTML( db ), "aaxxxx<span>ssss</span>",
            "superscript&&!collapsed&&in'sup'" );
} );
//35 superscript&&!collapsed&&notin"sup"
test( 'superscript&&!collapsed&&notin"sup"', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( 'aaxxxx<span>ssss</span>' );
    range.selectNode(
            d.getElementsByTagName( 'span' )[0].firstChild )
            .select();
    editor.execCommand( 'superscript' );
    equal( editor.queryCommandState( 'superscript' ), 1,
            "<sup> exists" );
    equal( ua.getChildHTML( db ),
            "aaxxxx<sup><span>ssss</span></sup>",
            "superscript&&!collapsed&&notin'sup'" );
} );

//36 superscript&&!collapsed&&between
test( 'superscript&&!collapsed&&between', function() {
    var editor = te.obj[0],d = editor.document,range = te.obj[1],db = editor.body;
    editor.setContent( '<span>aa<sup>xxxx</sup></span><span>ssss</span>' );
    range.setStart( d.getElementsByTagName( 'span' )[0].firstChild, 0 ).setEnd(
            d.getElementsByTagName( 'span' )[0].lastChild.firstChild, 3 ).select();
    editor.execCommand( 'superscript' );
    equal( editor.queryCommandState( 'superscript' ), 1,
            "<sup> exists" );
    equal(
            ua.getChildHTML( db ),
            "<sup><span>aaxxx</span></sup><span><sup>x</sup></span><span>ssss</span>",
            "superscript&&!collapsed&&between" );
} );

