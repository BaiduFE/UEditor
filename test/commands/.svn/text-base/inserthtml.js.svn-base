module( "inserthtml" );

var co;
//1 insertblockElement2table&&!collapsed
test(
        'insertblockElement2table&&!collapsed',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( 'xx<table border="1"><tr><td>1</td><td>2</td></tr></table>' );
            var ht = "<p>xxxx</p>";
            range.setStart( d.getElementsByTagName( 'td' )[0], 0 )
                    .setEnd( d.getElementsByTagName( 'td' )[1], 0 ).select();
            editor.execCommand( 'inserthtml', ht );
            equal( ua.getChildHTML( db ), "xx<table border=\"1\"><tbody><tr><td><p>xxxx</p></td><td>2</td></tr></tbody></table>", "insertblockElement2table&&!collapsed" );
        } );
//2 insertunblockElement2table&&collapsed
test(
        'insertunblockElement2table&&collapsed',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( 'xx<table><tr><td>1</td><td>2</td></tr></table>' );
            var ht = "<b>xxxx</b>";
            range.setStart( d.getElementsByTagName( 'td' )[0], 0 ).collapse( true ).select();
            editor.execCommand( 'inserthtml', ht );
            ua.manualDeleteFillData();
            co=(d.getElementsByTagName( 'td' )[0].innerHTML=="<b>xxxx</b>1")||(d.getElementsByTagName( 'td' )[0].innerHTML=="<B>xxxx</B>1");
            ok(co,"insertunblockElement2table&&collapsed");
        } );
//3  insertblockelement2unblockelement&&!collapsed
test(
        'insertblockElement2unblockelement&&!collapsed',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<u>uuuu</u><p>sss</p>' );
            var ht = "<p>xxxx</p>";
            range.setStart( d.getElementsByTagName( 'u' )[0].firstChild, 0 )
                    .setEnd( d.getElementsByTagName( 'p' )[0].firstChild, 2 ).select();
            editor.execCommand( 'inserthtml', ht );
            equal( ua.getChildHTML( db ), "<u></u><p>xxxx</p><p>s</p>", "insertblockElement2unblockelement&&!collapsed" );
        } );
//4  insert'a'2table&&!collapsed
test(
        'insert"a"2table&&!collapsed',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( 'xx<table border="1"><tr><td>1</td><td>2</td></tr></table>' );
            var ht = "<a style='display:block'>ssss</a>";
            range.setStart( d.getElementsByTagName( 'td' )[0], 0 )
                    .setEnd( d.getElementsByTagName( 'td' )[1], 1 ).select();
            editor.execCommand( 'inserthtml', ht );
            co=(ua.getChildHTML(db)=="xx<table border=\"1\"><tbody><tr><td></td><a style=\"display:block\">ssss</a><td></td><td><del>2</del></td></tr></tbody></table>")||(ua.getChildHTML(db)=='xx<table border="1"><tbody><tr><td></td><a style="display:block">ssss</a><td><br></td><td><del>2</del></td></tr></tbody></table>')
            ||(ua.getChildHTML(db)=="xx<table border=\"1\"><tbody><tr><td></td><a style=\"display: block\">ssss</a><td></td><td><del>2</del></td></tr></tbody></table>");
            ok(co,"insert'a'2table&&!collapsed");
        } );
//5 insert'img'2unblockelement&&!collapsed
test(
        'insert"img"2unblockelement&&!collapsed',
        function() {
        	var editor = te.obj[0],range=te.obj[1],db=editor.body;
            editor.setContent( 'xxxx' );
            var ht = "<img src='a.jpg' alt='This is an image'/>";
            range.setStart(db.firstChild,2).setEnd(db.firstChild,4).select();
            editor.execCommand( 'inserthtml', ht );
            co=(ua.getChildHTML(db)=="xx<img src=\"a.jpg\" alt=\"this is an image\">")||(ua.getChildHTML(db)=="xx<img alt=\"this is an image\" src=\"http://localhost/editor/test/tools/br/a.jpg\">");
            ok(co,"insert'img'2unblockelement&&!collapsed");
        } );
