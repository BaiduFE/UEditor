module( "font" );

var range,co;
//1 forecolor collapsed==true
test(
        'forecolor collapsed==true',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<b><i>xxxx</i></b>' );
            range.selectNode(
                    d.getElementsByTagName( 'i' )[0].firstChild )
                    .collapse( true ).select();
            editor.execCommand( 'forecolor', 'red' );
            co=(editor.queryCommandValue( "forecolor" )=="red")||(editor.queryCommandValue( "forecolor" )=="rgb(255, 0, 0)")||(editor.queryCommandValue( "forecolor" )=="#ff0000");
            ok(co,"queryCommandValue forecolor red");
            range = editor.selection.getRange();
            range.insertNode( range.document.createTextNode( 'aa' ) );
            ua.manualDeleteFillData();
            co=(d.getElementsByTagName('span')[0].style.color=="#ff0000")||(d.getElementsByTagName('span')[0].style.color=="red");
            ok(co,"forecolor span red");
        } );
//2 forecolor collapsed==false 
test(
        'forecolor collapsed==false',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<b><i>xxxx</i></b>' );
            range.selectNode(
                    d.getElementsByTagName( 'i' )[0].firstChild, 0 )
                    .select();
            editor.execCommand( 'forecolor', 'red' );
            co=(editor.queryCommandValue( "forecolor" )=="red")||(editor.queryCommandValue( "forecolor" )=="rgb(255, 0, 0)")||(editor.queryCommandValue( "forecolor" )=="#ff0000");
            ok(co,"queryCommandValue forecolor red");
            co=(d.getElementsByTagName('span')[0].style.color=="#ff0000")||(d.getElementsByTagName('span')[0].style.color=="red");
            ok(co,"forecolor span red")
        } );
//3 fontsize collapsed==false
test(
        'fontsize collapsed==false',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor
                    .setContent( '<p style="text-align:center"><span style="font-size:9pt;color:red">xxxx</span></p>' );
            range.selectNode(
                    d.getElementsByTagName( 'span' )[0].firstChild )
                    .select();
            equal(
                    d.getElementsByTagName( 'span' )[0].style.fontSize,
                    "9pt", "fontsize" );
            editor.execCommand( 'fontsize', 'default' );
            co=(editor.queryCommandValue("fontsize")=="12pt")||(editor.queryCommandValue("fontsize")=="16px");
            ok(co,"queryCommandValue fontsize");
            equal(
                    d.getElementsByTagName( 'span' )[0].style.fontSize,
                    "", "fontsize" );
            co=(d.getElementsByTagName('span')[0].style.color=="#ff0000")||(d.getElementsByTagName('span')[0].style.color=="red");
            ok(co,"forecolor span red");
            
        } );
//4 fontsize collapsed==true
test(
        'fontsize collapsed==true',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor
                    .setContent( '<p style="text-align:center"><span style="font-size:12px;color:red">xxxx</span></p>' );
            range.selectNode(
                    d.getElementsByTagName( 'span' )[0].firstChild )
                    .collapse( true ).select();
            equal(
                    d.getElementsByTagName( 'span' )[0].style.fontSize,
                    "12px", "fontsize" );
            editor.execCommand( 'fontsize', '21pt' );
            equal( editor.queryCommandValue( "fontsize" ), "21pt", "fontsize=='21pt" );
            range = editor.selection.getRange();
            range.insertNode( range.document.createTextNode( 'aa' ) );
            ua.manualDeleteFillData();
            equal(
                    d.getElementsByTagName( 'span' )[1].style.fontSize,
                    "21pt", "fontsize" );
        } );
//5 backcolor collapsed==false
test(
        'backcolor collapsed==false',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<span style="font-size:12px;">xxxx</span>' );
            range.selectNode(
                    d.getElementsByTagName( 'span' )[0].firstChild )
                    .select();
            editor.execCommand( 'backcolor', 'red' );
            co=(editor.queryCommandValue( "backcolor" )=="red")||(editor.queryCommandValue( "backcolor" )=="rgb(255, 0, 0)")||(editor.queryCommandValue( "backcolor" )=="#ff0000");
            ok(co,"queryCommandValue backcolor red");
            co=(d.getElementsByTagName( 'span' )[0].style.backgroundColor=="red")||(d.getElementsByTagName( 'span' )[0].style.backgroundColor=="rgb(255, 0, 0)")||(d.getElementsByTagName( 'span' )[0].style.backgroundColor=="#ff0000");
            ok(co,"span backcolor red");
        });
//6 backcolor collapsed==true
test(
        'backcolor collapsed==true',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor.setContent( '<span style="font-size:12px;">xxxx</span>' );
            range.selectNode(
                    d.getElementsByTagName( 'span' )[0].firstChild )
                    .collapse( true ).select();
            editor.execCommand( 'backcolor', 'red' );
            co=(editor.queryCommandValue( "backcolor" )=="red")||(editor.queryCommandValue( "backcolor" )=="rgb(255, 0, 0)")||(editor.queryCommandValue( "backcolor" )=="#ff0000");
            ok(co,"queryCommandValue backcolor red");
            range = editor.selection.getRange();
            range.insertNode( range.document.createTextNode( 'aa' ) );
            ua.manualDeleteFillData();
            co=(d.getElementsByTagName( 'span' )[1].style.backgroundColor=="red")||(d.getElementsByTagName( 'span' )[1].style.backgroundColor=="rgb(255, 0, 0)")||(d.getElementsByTagName( 'span' )[1].style.backgroundColor=="#ff0000");
            ok(co,"span backcolor red");
        } );
//7 fontfamily collapsed==false
test(
        'fontfamily collapsed==false',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor
                    .setContent( '<p style="text-align: center; "><span style=" font-family :arial;">xxxx</span></p>' );
            range.selectNode(
                    d.getElementsByTagName( 'span' )[0].firstChild )
                    .select();
            editor.execCommand( 'fontfamily', 'Cambria' );
            ok(/^"?Cambria"?$/i.test(editor.queryCommandValue( "fontfamily" )),"queryCommandValue fontfamily Cambria");
            ok(/^"?Cambria"?$/i.test(d.getElementsByTagName( 'span' )[0].style.fontFamily),"span fontfamily Cambria");
            
            editor.execCommand( 'fontfamily', 'arial' );
            ok(/^"?arial"?$/i.test(editor.queryCommandValue( "fontfamily" )),"queryCommandValue fontfamily arial");
            ok(/^"?arial"?$/i.test(d.getElementsByTagName( 'span' )[0].style.fontFamily),"span fontfamily arial");
           
        } );
//8 fontfamily collapsed==true
test(
        'fontfamily collapsed==true',
        function() {
        	var editor = te.obj[0],d=editor.document,range=te.obj[1];
            editor
                    .setContent( '<p style="text-align: center; "><span style=" font-family :arial;">xxxx</span></p>' );
            range.selectNode(
                    d.getElementsByTagName( 'span' )[0].firstChild )
                    .collapse( true ).select();
            editor.execCommand( 'fontfamily', 'Cambria' );
            equal( editor.queryCommandValue( "fontfamily" ), "Cambria", "fontfamily==Cambria" );
            range = editor.selection.getRange();
            range.insertNode( range.document.createTextNode( 'xx' ) );
            ua.manualDeleteFillData();
            ok(/^"?cambria"?$/i.test(d.getElementsByTagName( 'span' )[1].style.fontFamily),"span fontfamily Cambria");
        } );
