module( "selectall" );

//1
test(
        'normal',
        function() {
        	var editor = te.obj[0],db=editor.body;
            editor.setContent( '<p><i>xxxx</i></p><span>ssss</span>' );
            editor.execCommand( 'selectAll' );
            equal( baidu.editor.commands['selectall'].notNeedUndo, 1, "notNeedUndo==1" );
            editor.execCommand( "bold" );
            equal( ua.getChildHTML( db ), "<p><strong><i>xxxx</i></strong></p><strong><span>ssss</span></strong>", "after calling selectAll command" );
        } );
//2
test(
        'a part of the content is selected',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<p><i>xxxx</i></p><span>ssss</span>' );
            range.selectNode(
                    d.getElementsByTagName( 'span' )[0].firstChild )
                    .select();
            editor.execCommand( "bold" );
            equal( ua.getChildHTML( db ), "<p><i>xxxx</i></p><strong><span>ssss</span></strong>", "before calling selectAll command" );
            editor.execCommand( 'selectAll' );
            equal( baidu.editor.commands['selectall'].notNeedUndo, 1, "notNeedUndo==1" );
            editor.execCommand( "bold" );
            equal( ua.getChildHTML( db ), "<p><strong><i>xxxx</i></strong></p><strong><span>ssss</span><span></span></strong>", "after calling selectAll command" );
        } );
//3
test(
        'content has table',
        function() {
            var editor = te.obj[0];
            editor
                    .setContent( 'xxxx<table><tr><td>xxx</td><td>xxx</td></tr></table>' );
            editor.execCommand( 'selectAll' );
            equal( baidu.editor.commands['selectall'].notNeedUndo, 1, "notNeedUndo==1" );
            editor.execCommand( "bold" );
            equal( ua.getChildHTML( editor.body ), "<strong>xxxx</strong><table><tbody><tr><td><strong>xxx</strong></td><td><strong>xxx</strong></td></tr></tbody></table>", "after calling selectAll command" );

        } );
//4
test(
		'content is null',
		function() {
			var editor = te.obj[0];
			editor.execCommand('selectAll');
            equal(ua.getChildHTML(editor.body),"","content is null");
            equal(baidu.editor.commands['selectall'].notNeedUndo,1,"notNeedUndo==1");
            editor.execCommand("bold");
            ua.manualDeleteFillData();
            equal(ua.getChildHTML(editor.body),"<strong></strong>","after calling command bold");
		});