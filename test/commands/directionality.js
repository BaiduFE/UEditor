module("directionality");

//1 notblockelement&&collapsed=false
test(
		'notblockelement&&collapsed=false',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('xxxx<b><i>gggsiekes</i></b>');
			range.selectNode(d.getElementsByTagName("b")[0]).collapse(true).select(true);
            debugger
			equal(editor.queryCommandValue('directionality'),"ltr","ltr queryCommandValue");
            editor.execCommand('directionality',"rtl");
            equal(ua.getChildHTML(db),"<p dir=\"rtl\"><b><i>gggsiekes</i></b></p>","directionrtl");
            equal(editor.queryCommandValue('directionality'),"rtl","directionrtl queryCommandValue");
            
            editor.execCommand('directionality',"ltr");
            equal(ua.getChildHTML(db),"<p dir=\"ltr\"><b><i>gggsiekes</i></b></p>","directionltr");
            equal(editor.queryCommandValue('directionality'),"ltr","directionltr queryCommandValue");

		});
//2 blockelement&&collapsed=false
test(
		'blockelement&&collapsed=false',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<h1>gggsiekes</h1>');
			range.selectNode(d.getElementsByTagName("h1")[0]).select();
                      
            editor.execCommand('directionality',"ltr");
            equal(ua.getChildHTML(db),"<h1 dir=\"ltr\">gggsiekes</h1>","directionltr");
            equal(editor.queryCommandValue('directionality'),"ltr","directionltr queryCommandValue");
            
            editor.execCommand('directionality',"rtl");
            equal(ua.getChildHTML(db),"<h1 dir=\"rtl\">gggsiekes</h1>","directionrtl");
            equal(editor.queryCommandValue('directionality'),"rtl","directionrtl queryCommandValue");

		});

//3 notblockelement&&collapsed=true
test(
		'notblockelement&&collapsed=true',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<b><i>gggsiekes</i></b>');
			range.selectNode(d.getElementsByTagName("b")[0].firstChild).collapse(true).select();
            editor.execCommand('directionality',"rtl");
            equal(ua.getChildHTML(db),"<p dir=\"rtl\"><b><i>gggsiekes</i></b></p>","directionrtl");
            equal(editor.queryCommandValue('directionality'),"rtl","directionrtl queryCommandValue");
            
            editor.execCommand('directionality',"ltr");
            equal(ua.getChildHTML(db),"<p dir=\"ltr\"><b><i>gggsiekes</i></b></p>","directionltr");
            equal(editor.queryCommandValue('directionality'),"ltr","directionltr queryCommandValue");
            
            editor.setContent('<b><i>gggsiekes</i></b>');
			range.selectNode(d.getElementsByTagName("b")[0]).collapse(true).select();
            editor.execCommand('directionality',"rtl");
            equal(ua.getChildHTML(db),"<p dir=\"rtl\"><b><i>gggsiekes</i></b></p>","directionrtl");
            equal(editor.queryCommandValue('directionality'),"ltr","directionrtl queryCommandValue");

            editor.execCommand('directionality',"ltr");
            equal(ua.getChildHTML(db),"<p dir=\"rtl\"><b><i>gggsiekes</i></b></p>","directionltr");
            equal(editor.queryCommandValue('directionality'),"ltr","directionltr queryCommandValue");

		});
//4 range between blockelement and notblockelement
test(
		'notblockelement&&blockelement',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<b><i>gggsiekes</i></b><p>xx</p>');
			range.setStart(d.getElementsByTagName("b")[0].firstChild,0).setEnd(d.getElementsByTagName("p")[0].firstChild,2).select();
            editor.execCommand('directionality',"rtl");
            equal(ua.getChildHTML(db),"<p dir=\"rtl\"><b><i>gggsiekes</i></b></p><p dir=\"rtl\">xx</p>","directionrtl");
            equal(editor.queryCommandValue('directionality'),"rtl","directionrtl queryCommandValue");
            
            editor.execCommand('directionality',"ltr");
            equal(ua.getChildHTML(db),"<p dir=\"ltr\"><b><i>gggsiekes</i></b></p><p dir=\"ltr\">xx</p>","directionltr");
            equal(editor.queryCommandValue('directionality'),"ltr","directionltr queryCommandValue");

		});
//5  betweenblockelement
test(
		'betweenblockelement',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<p dir="rtl">sss</p><p>xx</p>');
			range.setStart(d.getElementsByTagName("p")[0].firstChild,0).setEnd(d.getElementsByTagName("p")[1].firstChild,2).select();
            editor.execCommand('directionality',"rtl");
            equal(ua.getChildHTML(db),"<p dir=\"rtl\">sss</p><p dir=\"rtl\">xx</p>","directionrtl");
            equal(editor.queryCommandValue('directionality'),"rtl","directionrtl queryCommandValue");
            
            editor.execCommand('directionality',"ltr");
            equal(ua.getChildHTML(db),"<p dir=\"ltr\">sss</p><p dir=\"ltr\">xx</p>","directionltr");
            equal(editor.queryCommandValue('directionality'),"ltr","directionltr queryCommandValue");

		});
//6 br
test(
		'betweenblockelement',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<p>xx</p>br');
			range.setStart(d.getElementsByTagName("p")[0].firstChild,0).setEnd(db.lastChild,1).select();
            editor.execCommand('directionality',"rtl");
            equal(ua.getChildHTML(db),"<p dir=\"rtl\">xx</p><p dir=\"rtl\">br</p>","directionrtl");
            equal(editor.queryCommandValue('directionality'),"rtl","directionrtl queryCommandValue");
            
            editor.execCommand('directionality',"ltr");
            equal(ua.getChildHTML(db),"<p dir=\"ltr\">xx</p><p dir=\"ltr\">br</p>","directionltr");
            equal(editor.queryCommandValue('directionality'),"ltr","directionltr queryCommandValue");

		});
//7 &nbsp;
test(
		'&nbsp;',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<p>xx</p>&nbsp;');
			range.setStart(d.getElementsByTagName("p")[0].firstChild,0).setEnd(db.lastChild,1).select();
            editor.execCommand('directionality',"rtl");
            equal(ua.getChildHTML(db),"<p dir=\"rtl\">xx</p><p dir=\"rtl\">&nbsp;</p>","directionrtl");
            equal(editor.queryCommandValue('directionality'),"rtl","directionrtl queryCommandValue");
            
            editor.execCommand('directionality',"ltr");
            equal(ua.getChildHTML(db),"<p dir=\"ltr\">xx</p><p dir=\"ltr\">&nbsp;</p>","directionltr");
            equal(editor.queryCommandValue('directionality'),"ltr","directionltr queryCommandValue");

		});
