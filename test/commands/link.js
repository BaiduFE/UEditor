module( "link" );

var e;
//1 no opt
test(
        'no opt',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<b><i>xxxx</i></b>' );
            range.setStart(
                    d.getElementsByTagName( 'i' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'i' )[0].firstChild, 2 )
                    .select();
            editor.execCommand( 'link' );//没有附加属性
            equal( ua.getChildHTML( editor.queryCommandValue( 'link' ) ), "<b><i>xx</i></b>", "queryCommandValue('link')='<b><i>xx</i></b>'" );
            equal( ua.getChildHTML( db ), "<a><b><i>xx</i></b></a><b><i>xx</i></b>", "after linking" );
            editor.execCommand( 'unlink' );
            equal(ua.getChildHTML(db),'<b><i>xx</i></b><b><i>xx</i></b>', "after unlinking" );
        } );
//2 with opt
test(
        'with opt',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<b><i>xxxx</i></b>' );
            range.setStart(
                    d.getElementsByTagName( 'i' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'i' )[0].firstChild, 2 )
                    .select();
            var opt = {href:'http://www.baidu.com/index.php?tn=sogouie_dg',target:"_blank"};
            editor.execCommand( 'link', opt );//有附加属性
            equal( ua.getChildHTML( editor.queryCommandValue( 'link' ) ), "<b><i>xx</i></b>", "queryCommandValue('link')='<b><i>xx</i></b>'" );
            e=(ua.getChildHTML(db)=="<a target=\"_blank\" href=\"http://www.baidu.com/index.php?tn=sogouie_dg\"><b><i>xx</i></b></a><b><i>xx</i></b>")||(ua.getChildHTML(db)=="<a href=\"http://www.baidu.com/index.php?tn=sogouie_dg\" target=\"_blank\"><b><i>xx</i></b></a><b><i>xx</i></b>");
            ok(e,"after linking");
            editor.execCommand( 'unlink' );
            equal( ua.getChildHTML( db ), "<b><i>xx</i></b><b><i>xx</i></b>", "after unlinking" );
        } );
//3 range=xxxx<a></a>
test(
        'range=xxxx<a></a>',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<span><b><i>xxxx</i></b></span><a>aa</a>' );
            range.setStart(
                    d.getElementsByTagName( 'i' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'a' )[0].firstChild, 2 )
                    .select();
            editor.execCommand( 'unlink' );
            equal( ua.getChildHTML( db ), "<span><b><i>xxxx</i></b></span>aa", "after unlinking" );

            editor.setContent( '<span><b><i>xxxx</i></b></span><a href="www.baidu.com">aa</a>' );
            range.setStart(
                    d.getElementsByTagName( 'i' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'a' )[0].firstChild, 2 )
                    .select();
            var opt = {href:"www.sina.com"};
            editor.execCommand( 'link', opt );
            equal( ua.getChildHTML( editor.queryCommandValue( 'link' ) ), "<span><b><i>xxxx</i></b></span>aa", "queryCommandValue('link')='<span><b><i>xxxx</i></b></span>aa'" );
            equal( ua.getChildHTML( db ), "<a href=\"www.sina.com\"><span><b><i>xxxx</i></b></span>aa</a>", "after linking" );
        } );
//4 collapse=true
test(
        'collapse=true',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<b><i>xxxx</i></b>' );
            range.setStart(
                    d.getElementsByTagName( 'i' )[0].firstChild, 0 )
                    .collapse( true ).select();
            var opt = {href:'http://www.baidu.com/index.php?tn=sogouie_dg',target:"_blank"};
            editor.execCommand( 'link', opt );
            equal( ua.getChildHTML( editor.queryCommandValue( 'link' ) ), "http://www.baidu.com/index.php?tn=sogouie_dg", "queryCommandValue('link')='http://www.baidu.com/index.php?tn=sogouie_dg'" );
            e=(ua.getChildHTML( db )=="<b><i><a href=\"http://www.baidu.com/index.php?tn=sogouie_dg\" target=\"_blank\">http://www.baidu.com/index.php?tn=sogouie_dg</a>xxxx</i></b>")||(ua.getChildHTML( db )=="<b><i><a target=\"_blank\" href=\"http://www.baidu.com/index.php?tn=sogouie_dg\">http://www.baidu.com/index.php?tn=sogouie_dg</a>xxxx</i></b>");
            ok(e,"after linking");
            editor.execCommand( 'unlink' );
            equal( ua.getChildHTML( db ), "<b><i>http://www.baidu.com/index.php?tn=sogouie_dgxxxx</i></b>", "after unlinking" );
        } );
//5 range=<a>1</a>2<a></a>
test(
        'range=<a>1</a>2<a></a>',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<span><b><a href="www.baidu.com">1</a><a href="www.sina.com">2</a></b></span>' );
            range.setStart(
                    d.getElementsByTagName( 'b' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'b' )[0].lastChild, 1 )
                    .select();
            editor.execCommand( 'unlink' );
            equal( ua.getChildHTML( db ), "<span><b>12</b></span>", "after unlinking" );
            var opt = {href:"www.xiaonei.com"};
            editor.execCommand( 'link', opt );
            equal( ua.getChildHTML( editor.queryCommandValue( 'link' ) ), "<span><b>12</b></span>", "queryCommandValue('link')='12'" );
            equal( ua.getChildHTML( db ), "<a href=\"www.xiaonei.com\"><span><b>12</b></span></a>", "after linking" );
            editor.execCommand( 'unlink' );
            equal( ua.getChildHTML( db ), "<span><b>12</b></span>", "after unlinking" );
        } );
//6 range=<img></img>
test(
        'range=<img></img>',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<img src="a.jpg" alt="This is an image"/>' );
            range.selectNode( d.getElementsByTagName( 'img' )[0] ).select();
            editor.execCommand( 'link' );
            e=(ua.getChildHTML(editor.queryCommandValue('link'))=="<img src=\"a.jpg\" alt=\"this is an image\">")||(ua.getChildHTML(editor.queryCommandValue('link'))=="<img alt=\"this is an image\" src=\"http://localhost/editor/test/tools/br/a.jpg\">");
            ok(e,"after linking queryCommandValue");           
            e=(ua.getChildHTML(db)=="<a><img src=\"a.jpg\" alt=\"this is an image\"></a>")||(ua.getChildHTML(db)=="<a><img alt=\"this is an image\" src=\"http://localhost/editor/test/tools/br/a.jpg\"></a>");
            ok(e,"after linking");
            editor.execCommand( 'unlink' );
            e=(ua.getChildHTML(db)=="<img src=\"a.jpg\" alt=\"this is an image\">")||(ua.getChildHTML(db)=="<img alt=\"this is an image\" src=\"http://localhost/editor/test/tools/br/a.jpg\">");
            ok(e,"after linking");
        } );
//7 range=<td></td>
test(
        'range=<td></td>',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<table><tr><td>11</td><td>22</td></tr></table>' );
            range.selectNode( d.getElementsByTagName( "td" )[0].firstChild ).select();
            editor.execCommand( 'link' );
            equal( ua.getChildHTML( editor.queryCommandValue( 'link' ) ), "11", "queryCommandValue('link')=11" );
            equal( ua.getChildHTML( db ), "<table><tbody><tr><td><a>11</a></td><td>22</td></tr></tbody></table>", "after linking" );
            editor.execCommand( 'unlink' );
            equal( ua.getChildHTML( db ), "<table><tbody><tr><td>11</td><td>22</td></tr></tbody></table>", "after unlinking" );
        } );