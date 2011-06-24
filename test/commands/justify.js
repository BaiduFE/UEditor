module( "justify" );

//range is blockelement
test(
        'range is blockelement',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<p>xxxx</p><span>ssss</span>' );
            range.setStart( d.getElementsByTagName( 'p' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'p' )[0].lastChild, 4 ).select();
            equal( editor.queryCommandValue( "justify" ), "left", "by default text-align=left" );//by default ,text-align="left"
            editor.execCommand( 'justify', 'right' );
            equal( editor.queryCommandValue( "justify" ), "right", "text-align=right" );

            editor.execCommand( 'justify', 'justify' );
            equal( editor.queryCommandValue( "justify" ), "justify", "text-align=justify" );

            editor.execCommand( 'justify', 'center' );
            equal( editor.queryCommandValue( "justify" ), "center", "text-align=center" );
             
            editor.execCommand( 'justify', 'left' );
            equal( editor.queryCommandValue( "justify" ), "left", "text-align=left" );
            
        } );
//range is not blockelement
test(
        'range is not blockelement',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<p><i>xxxx</i></p><span>ssss</span>' );
            range.setStart( d.getElementsByTagName( 'span' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'span' )[0].lastChild, 1 ).select();
            equal( editor.queryCommandValue( "justify" ), "left", "by default text-align=left" );//by default ,text-align="left"
            editor.execCommand( 'justify', 'right' );
            equal( editor.queryCommandValue( "justify" ), "right", "text-align=right" );

            editor.execCommand( 'justify', 'justify' );
            equal( editor.queryCommandValue( "justify" ), "justify", "text-align=justify" );

            editor.execCommand( 'justify', 'center' );
            equal( editor.queryCommandValue( "justify" ), "center", "text-align=center" );

            editor.execCommand( 'justify', 'left' );
            equal( editor.queryCommandValue( "justify" ), "left", "text-align=left" );

        } );
//range is between blockelement and unblockelement
test(
        'range is between blockelement and unblockelement',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<p><i>xxxx</i></p><span>ssss</span>' );
            range.setStart( d.getElementsByTagName( 'p' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'span' )[0].firstChild,4).select();
            equal( editor.queryCommandValue( "justify" ), "left", "by default text-align=left" );//by default ,text-align="left"
            editor.execCommand( 'justify', 'right' );
            equal( editor.queryCommandValue( "justify" ), "right", "text-align=right" );            

            editor.execCommand( 'justify', 'justify' );
            equal( editor.queryCommandValue( "justify" ), "justify", "text-align=justify" );
            
            editor.execCommand( 'justify', 'center' );
            equal( editor.queryCommandValue( "justify" ), "center", "text-align=center" );

            editor.execCommand( 'justify', 'left' );
            equal( editor.queryCommandValue( "justify" ), "left", "text-align=left" );
            
        } );
//range is collapsed and in blockelement
test(
        'range is collapsed and in blockelement',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<p><i>xxxx</i></p><span>ssss</span>' );
            range.setStart( d.getElementsByTagName( 'p' )[0].firstChild, 0 ).collapse(true).select();
            equal( editor.queryCommandValue( "justify" ), "left", "by default text-align=left" );//by default ,text-align="left"
            editor.execCommand( 'justify', 'right' );
            equal( editor.queryCommandValue( "justify" ), "right", "text-align=right" );

            editor.execCommand( 'justify', 'justify' );
            equal( editor.queryCommandValue( "justify" ), "justify", "text-align=justify" );

            editor.execCommand( 'justify', 'center' );
            equal( editor.queryCommandValue( "justify" ), "center", "text-align=center" );

            editor.execCommand( 'justify', 'left' );
            equal( editor.queryCommandValue( "justify" ), "left", "text-align=left" );

        } );
//range is collapsed and not in blockelement
test(
        'range is collapsed and not in blockelement',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<p><i>xxxx</i></p><span>ssss</span>' );
            range.setStart( d.getElementsByTagName( 'span' )[0].firstChild, 1 ).collapse(true).select();
            equal( editor.queryCommandValue( "justify" ), "left", "by default text-align=left" );//by default ,text-align="left"
            editor.execCommand( 'justify', 'right' );
            equal( editor.queryCommandValue( "justify" ), "right", "text-align=right" );
            
            editor.execCommand( 'justify', 'justify' );
            equal( editor.queryCommandValue( "justify" ), "justify", "text-align=justify" );

            editor.execCommand( 'justify', 'center' );
            equal( editor.queryCommandValue( "justify" ), "center", "text-align=center" );

            editor.execCommand( 'justify', 'left' );
            equal( editor.queryCommandValue( "justify" ), "left", "text-align=left" );
            
        } );
//table
test(
		'justify table',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1];
			editor
					.setContent('<table><tr><td>xxx</td><td>xxx</td></tr></table>');
			range.setStart(d.getElementsByTagName('td')[0].firstChild, 0).setEnd(
					d.getElementsByTagName('td')[1].firstChild, 3).select();
			equals(editor.queryCommandValue('justify'),"left","td align=left");
			editor.execCommand('justify', 'center');
			equals(editor.queryCommandValue('justify'),"center","td align=center");
			editor.execCommand('justify', 'justify');
			equals(editor.queryCommandValue('justify'),"justify","td align=justify");
			editor.execCommand('justify', 'right');
			equals(editor.queryCommandValue('justify'),"right","td align=right");
			editor.execCommand('justify', 'left');
			equals(editor.queryCommandValue('justify'),"left","td align=left");
		});
//br
test(
		'justify br',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor
					.setContent('xxx<br>');
			range.setStart(db.firstChild, 0).setEnd(
					db.lastChild, 0).select();
			equals(editor.queryCommandValue('justify'),"left","align=left");
			editor.execCommand('justify', 'center');
			equal(ua.getChildHTML(d.getElementsByTagName("p")[0]),"xxx<br>","center");
			equals(editor.queryCommandValue('justify'),"center","align=center");
			
			editor.execCommand('justify', 'justify');
			equals(editor.queryCommandValue('justify'),"justify","align=justify");
			
			
			editor.execCommand('justify', 'right');
			equals(editor.queryCommandValue('justify'),"right","align=right");
			
			
			editor.execCommand('justify', 'left');
			equals(editor.queryCommandValue('justify'),"left","align=left");
			
		});
