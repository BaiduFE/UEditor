module( "horizontal" );

//normal
test(
        'horizontal',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<b><i>top</i></b><p>bottom</p>' );
            range.setStart(
                    d.getElementsByTagName( 'i' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'p' )[0].firstChild, 5 )
                    .select();
            equal( editor.queryCommandState( "horizontal" ), 0, "边界不在table里" );
            editor.execCommand( 'horizontal' );
            equal( ua.getChildHTML( db ), "<b><i></i></b><hr><p>m</p>", "边界不在table里" );
        } );
//table
test(
        'horizontal in table',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<table><tr><td>1</td></tr><tr><td>2</td></tr></table>' );
            range.setStart(
                    d.getElementsByTagName( 'tr' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'tr' )[1].firstChild, 0 )
                    .select();
            equal( editor.queryCommandState( "horizontal" ), -1, "边界在table里" );
        } );
//collapsed=true
test(
        'horizontal&&collapsed',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<b><i>top</i></b><p>bottom</p>' );
            range.setStart(
                    d.getElementsByTagName( 'p' )[0].firstChild, 0 ).collapse( true ).select();
            equal( editor.queryCommandState( "horizontal" ), 0, "边界不在table里" );
            editor.execCommand( 'horizontal' );
            equal( ua.getChildHTML( db ), "<b><i>top</i></b><p></p><hr><p>bottom</p>", "边界不在table里" );
        } );
