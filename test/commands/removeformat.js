module( "removeformat" );

//1 notagname&&nostyle&&noattrs
test(
        'notagname&&nostyle&&noattrs',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<b><i>xxxx</i></b>' );
            range.setStart(d.getElementsByTagName( 'i' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'i' )[0].firstChild, 2 ) .select();//collapsed=false
            editor.execCommand( 'removeformat' );
            equals( ua.getChildHTML( db ), 'xx<b><i>xx</i></b>', "after removing the format" );

            editor.setContent( '<b><i>xxxx</i></b>' );
            range.setStart(d.getElementsByTagName( 'i' )[0].firstChild,0 ).setEnd(d.getElementsByTagName( 'i' )[0].firstChild,4).collapse(true).select() ; //collapsed=true
            editor.execCommand( 'removeformat');
            ua.manualDeleteFillData();
            equals( ua.getChildHTML( db ),  "xxxx", "after removing the format" );

            editor.setContent( 'xxxx' );
            range.setStart(db.firstChild,0).setEnd(db.firstChild,4).select();
            editor.execCommand( 'removeformat');
            equals( ua.getChildHTML( db ), 'xxxx', "after removing the format" );
        } );
//2 tagname&&nostyle&&noattrs
test(
        'tagname&&nostyle&&noattrs',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<b><i>xxxx</i></b>' );
            range.setStart(
                    d.getElementsByTagName( 'i' )[0].firstChild, 0 ).setEnd( d.getElementsByTagName( 'i' )[0].firstChild, 2)
                    .select();
            editor.execCommand( 'removeformat',"b");
            equals( ua.getChildHTML( db ), '<i>xx</i><b><i>xx</i></b>', "after removing the format b" );

            editor.setContent( '<b><i><span>xx</span><span></span>xx</i></b>' );
            range.selectNode(d.getElementsByTagName("i")[0]).select();
            editor.execCommand( 'removeformat',"i");
            equals( ua.getChildHTML( db ), '<b>xxxx</b>', "after removing the format i" );

            editor.setContent( '<b><i><span>xx</span><span></span>xx</i></b>' );
            range.selectNode(d.getElementsByTagName("i")[0]).select();
            editor.execCommand( 'removeformat',"span");
            equals( ua.getChildHTML( db ), '<b><i>xxxx</i></b>', "after removing the format span" );

            editor.setContent( '<p><b>xxxx</b></p>' );
            range.selectNode(d.getElementsByTagName("p")[0]).select();
            editor.execCommand( 'removeformat',"p");
            equals( ua.getChildHTML( db ), '<p><b>xxxx</b></p>', "after removing the format p" );//'p' is not in removeFormatTags,so no change
        } );
//3 tagname&&style&&noattrs
test(
        'tagname&&style&&noattrs',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent( '<p><i style="width:20px">xxxx</i></p><span></span>' );
            editor
					.setContent('<div align="center"><span style="font-size:12px">xxxx</span></div>');
            range.selectNode(d.getElementsByTagName("span")[0]).select();
			editor.execCommand('removeFormat', 'span', 'fontSize');
			equals(ua.getChildHTML(db),
					'<div align=\"center\">xxxx</div>');
        } );
//4 tagname&&nostyle&&attrs
test(
        'tagname&&nostyle&&attrs',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
            editor.setContent('<span><i width="12px" style="height:20px">xxxx</i><span></span></span><p>xx</p>');
            range.setStart(d.getElementsByTagName("span")[0].firstChild,0).setEnd(d.getElementsByTagName("p")[0].firstChild,2).select();
            editor.execCommand( 'removeformat',"i",'',"width",false);
            equals( ua.getChildHTML( db ), 'xxxx<p>xx</p>', "after removing the format span stylewidth" );

            editor.setContent( '<p id="1" width="20px"><i >xxxx</i><span></span></p><p>xxx</p>' );
            range.setStart(d.getElementsByTagName("p")[0].firstChild,0).setEnd(d.getElementsByTagName("p")[1].firstChild,3).select();
            editor.execCommand( 'removeformat',"p",'',"id",false);
            equals( ua.getChildHTML( db ), '<p id=\"1\" width=\"20px\"><i>xxxx</i></p>xxx', "after removing the format span stylewidth" );
        } );
