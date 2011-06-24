module( "list" );

var e;
//command has no stylevalue
test( 'nostylevalue', function() {
	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
    editor.setContent( '<b><i>xxxx</i></b>' );
    range.setStart( d.getElementsByTagName( 'i' )[0].firstChild, 2 ).setEnd( d.getElementsByTagName( "i" )[0].firstChild, 4 ).select();
    equal( editor.
            queryCommandState( "insertorderedlist" ), null, "before executing the insertorderedlist command" );
    equal( editor.queryCommandValue( "insertorderedlist" ), null, "before executing the insertorderedlist command" );
    editor.execCommand( 'insertorderedlist' );
    equal( editor.queryCommandState( "insertorderedlist" ).tagName.toLowerCase(), "ol", "after executing the insertorderedlist command" );
    equal( editor.queryCommandValue( "insertorderedlist" ), "decimal", "after executing the insertorderedlist command" );//by default,list-style-type='decimal' in orderedlist
    ua.manualDeleteFillData();
    e=(ua.getChildHTML( db )=="<ol style=\"list-style-type: decimal;\"><li><b><i>xxxx</i></b></li></ol>")||(ua.getChildHTML( db )=="<ol style=\"list-style-type: decimal\"><li><b><i>xxxx</i></b></li></ol>")||("<ol style=\"list-style-type: decimal; \"><li><b><i>xxxx</i></b></li></ol>");
    ok(e,"after executing the insertorderedlist command");   
    
    editor.execCommand( "insertunorderedlist" );
    equal( editor.queryCommandState( "insertunorderedlist" ).tagName.toLowerCase(), "ul", "after executing the insertunorderedlist command" );
    equal( editor.queryCommandValue( "insertunorderedlist" ), "disc", "after executing the insertunorderedlist command" );//by default ,list-style-type='disc' in unorderedlist
    ua.manualDeleteFillData();
    e=(ua.getChildHTML( db )=="<ul style=\"list-style-type: disc;\"><li><b><i>xxxx</i></b></li></ul>")||(ua.getChildHTML( db )=="<ul style=\"list-style-type: disc\"><li><b><i>xxxx</i></b></li></ul>")||("<ul style=\"list-style-type: disc; \"><li><b><i>xxxx</i></b></li></ul>");
    ok(e,"after executing the insertunorderedlist command"); 

    editor.execCommand( "insertunorderedlist" );
    equal( editor.queryCommandState( "insertunorderedlist" ), null, "list-style-type=null" );
    equal( editor.queryCommandValue( "insertunorderedlist" ), null, "after executing the insertunorderedlist command" );
    ua.manualDeleteFillData();
    equals( ua.getChildHTML( db ), '<p><b><i>xxxx</i></b></p>', "after executing the insertunorderedlist command" );
} );
//command has stylevalue
test( 'withstylevalue', function() {
	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
    editor.setContent( '<b><i>xxxx</i></b>' );
    range.setStart( d.getElementsByTagName( 'i' )[0].firstChild, 2 ).setEnd( d.getElementsByTagName( "i" )[0].firstChild, 4 ).select();
    //insert ordered list
    editor.execCommand( 'insertorderedlist', "lower-alpha" );//list-style-type='lower-alpha'
    equal( editor.queryCommandState( "insertorderedlist" ).tagName.toLowerCase(), "ol", "insertorderedlist lower-alpha queryCommandState" );
    equal( editor.queryCommandValue( "insertorderedlist" ), "lower-alpha", "insertorderedlist lower-alpha queryCommandValue" );
    ua.manualDeleteFillData();
    e=(ua.getChildHTML( db )=="<ol style=\"list-style-type: lower-alpha;\"><li><b><i>xxxx</i></b></li></ol>")||(ua.getChildHTML( db )=="<ol style=\"list-style-type: lower-alpha\"><li><b><i>xxxx</i></b></li></ol>")||("<ol style=\"list-style-type: lower-alpha; \"><li><b><i>xxxx</i></b></li></ol>");
    ok(e,"after executing the insertorderedlist command");    

    editor.execCommand( 'insertorderedlist', "upper-alpha" );//list-style-type='upper-alpha'
    equal( editor.queryCommandValue( "insertorderedlist" ), "upper-alpha", "insertorderedlist upper-alpha queryCommandValue" );

    editor.execCommand( 'insertorderedlist', "lower-roman" );//list-style-type='lower-roman'
    equal( editor.queryCommandValue( "insertorderedlist" ), "lower-roman", "insertorderedlist lower-roman queryCommandValue" );

    editor.execCommand( 'insertorderedlist', "upper-roman" );//list-style-type='upper-roman'
    equal( editor.queryCommandValue( "insertorderedlist" ), "upper-roman", "insertorderedlist upper-roman queryCommandValue" );

    //insert unordered list
    editor.execCommand( 'insertunorderedlist', "circle" );//list-style-type='circle'
    equal( editor.queryCommandState( "insertunorderedlist" ).tagName.toLowerCase(), "ul", "insertunorderedlist circle queryCommandState" );
    equal( editor.queryCommandValue( "insertunorderedlist" ), "circle", "insertunorderedlist circle queryCommandValue" );

    editor.execCommand( 'insertunorderedlist', "square" );//list-style-type='square'
    equal( editor.queryCommandValue( "insertunorderedlist" ), "square", "insertunorderedlist square queryCommandValue" );

} );
//collapsed=true
test( 'collapsed=true', function() {
	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
    editor.setContent( '<b><i>xxxx</i></b>' );
    range.setStart( d.getElementsByTagName( 'i' )[0].firstChild, 0 ).collapse( true ).select();
    editor.execCommand( 'insertorderedlist' );
    equal( editor.queryCommandState( "insertorderedlist" ).tagName.toLowerCase(), "ol", "after executing the insertorderedlist command" );
    equal( editor.queryCommandValue( "insertorderedlist" ), "decimal", "after executing the insertorderedlist command" );
    ua.manualDeleteFillData();
    e=(ua.getChildHTML( db )=="<ol style=\"list-style-type: decimal;\"><li><b><i>xxxx</i></b></li></ol>")||("<ol style=\"list-style-type: decimal\"><li><b><i>​xxxx</i></b></li></ol>")||("<ol style=\"list-style-type: decimal; \"><li><b><i>xxxx</i></b></li></ol>");
    ok(e,"after executing the insertorderedlist command");    

    editor.execCommand( "insertunorderedlist" );
    equal( editor.queryCommandState( "insertunorderedlist" ).tagName.toLowerCase(), "ul", "after executing the insertunorderedlist command" );
    equal( editor.queryCommandValue( "insertunorderedlist" ), "disc", "after executing the insertunorderedlist command" );
    ua.manualDeleteFillData();
    e=ua.getChildHTML( editor.body )==("<ul style=\"list-style-type: disc;\"><li><b><i>xxxx</i></b></li></ul>")||(ua.getChildHTML( db )=="<ul style=\"list-style-type: disc\"><li><b><i>​xxxx</i></b></li></ul>")||("<ul style=\"list-style-type: disc; \"><li><b><i>xxxx</i></b></li></ul>");
    ok(e,"after executing the insertunorderedlist command");
} );
//range=<p><p>
test( 'range=p', function() {
	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
    editor.setContent( '<p>xxxx</p><p>pppss</p>' );
    range.setStart( d.getElementsByTagName( 'p' )[0].firstChild, 2 ).setEnd( d.getElementsByTagName( "p" )[1].firstChild, 4 ).select();
    editor.execCommand( 'insertorderedlist' );
    equal( editor.queryCommandState( "insertorderedlist" ).tagName.toLowerCase(), "ol", "after executing the insertorderedlist command" );
    equal( editor.queryCommandValue( "insertorderedlist" ), "decimal", "after executing the insertorderedlist command" );
    ua.manualDeleteFillData();
    e=(ua.getChildHTML( db )=="<ol style=\"list-style-type: decimal;\"><li>xxxx</li><li>pppss</li></ol>")||(ua.getChildHTML( db )=="<ol style=\"list-style-type: decimal\"><li>xxxx</li><li>pppss</li></ol>")||("<ol style=\"list-style-type: decimal; \"><li>xxxx</li><li>pppss</li></ol>");
    ok(e,"after executing the insertorderedlist command");
    
    editor.execCommand( "insertunorderedlist" );
    equal( editor.queryCommandState( "insertunorderedlist" ).tagName.toLowerCase(), "ul", "after executing the insertunorderedlist command" );
    equal( editor.queryCommandValue( "insertunorderedlist" ), "disc", "after executing the insertunorderedlist command" );
    ua.manualDeleteFillData();
    e=(ua.getChildHTML( db )=="<ul style=\"list-style-type: disc;\"><li>xxxx</li><li>pppss</li></ul>")||(ua.getChildHTML( db )=="<ul style=\"list-style-type: disc\"><li>xxxx</li><li>pppss</li></ul>")||("<ul style=\"list-style-type: disc; \"><li>xxxx</li></ul><ol style=\"list-style-type: decimal; \"><li>pppss</li></ol>");
    ok(e,"after executing the insertunorderedlist command");
} );

