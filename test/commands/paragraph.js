module("paragraph");

// 1 notblockelement
test('notblockelement', function() {
	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
	editor.setContent('<b><i>xxxx</i></b>');
	range.setStart(d.getElementsByTagName("i")[0].firstChild, 0)
			.setEnd(d.getElementsByTagName('i')[0].firstChild, 2)
			.select();
	editor.execCommand('paragraph', 'h1');
	equal(ua.getChildHTML(db), "<h1><b><i>xxxx</i></b></h1>",
			"paragraph h1");
	equal(editor.queryCommandValue("paragraph"), "h1", "paragraph h1");

	editor.execCommand('paragraph', 'h2');
	equal(ua.getChildHTML(db), "<h2 dir=\"null\"><b><i>xxxx</i></b></h2>",
			"paragraph h2");
	equal(editor.queryCommandValue("paragraph"), "h2", "paragraph h2");

	editor.setContent('xxxx');
	range.setStart(db.firstChild, 0).setEnd(
			db.firstChild, 2).select();
	editor.execCommand('paragraph', 'h1');
	equal(ua.getChildHTML(db), "<h1>xxxx</h1>",
			"paragraph h1");
	equal(editor.queryCommandValue("paragraph"), "h1", "paragraph h1");
});
// 2 notblockelement&&collapsed=true
test('notblockelement&&collapsed=true', function() {
	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
	editor.setContent('<b><i>xxxx</i></b>');
	range.setStart(d.getElementsByTagName("i")[0].firstChild, 0)
			.collapse(true).select();
	editor.execCommand('paragraph', 'h1');
	ua.manualDeleteFillData();
	equal(ua.getChildHTML(db), "<h1><b><i>xxxx</i></b></h1>",
	"paragraph h1");
	equal(db.firstChild.tagName.toLowerCase(), "h1", "paragraph h1");
	equal(editor.queryCommandValue("paragraph"), "h1", "paragraph h1");

	editor.setContent('<b><i>xxxx</i></b>');
	range.selectNode(d.getElementsByTagName("b")[0]).collapse(
			true).select();
	editor.execCommand('paragraph', 'h1');
	ua.manualDeleteFillData();
	equal(ua.getChildHTML(db), "<h1><b><i>xxxx</i></b></h1>",
	"paragraph h1");
	equal(editor.queryCommandValue("paragraph"), "h1", "paragraph h1");
	
});
// 3 notblockelement&&range=xxxx
test('notblockelement&&range=xxxx', function() {
	var editor = te.obj[0],range=te.obj[1],db=editor.body;
	editor.setContent('xxxx');
	range.setStart(db.firstChild, 0).setEnd(
			db.firstChild, 2).select();
	editor.execCommand('paragraph', 'h1');
	equal(ua.getChildHTML(db), "<h1>xxxx</h1>",
			"paragraph h1");
	equal(editor.queryCommandValue("paragraph"), "h1", "paragraph h1");
});

// 4 blockelement
test(
		'blockelement',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<p><i>xxxx</i></p>');
			range.selectNode(d.getElementsByTagName("p")[0])
					.select();
			editor.execCommand('paragraph', 'h1');
			equal(ua.getChildHTML(db),
					"<h1 dir=\"null\"><i>xxxx</i></h1>", "paragraph h1 p");
			equal(editor.queryCommandValue("paragraph"), "h1",
					"paragraph h1 p");

			editor.execCommand('paragraph', 'p');
			equal(ua.getChildHTML(db), "<p dir=\"null\"><i>xxxx</i></p>",
					"paragraph p h1");
			equal(editor.queryCommandValue("paragraph"), "p", "paragraph p h1");
		});
// 5 blockelement&&notblockelement
test('blockelement&&notblockelement', function() {
	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
	editor.setContent('<p><i>xxxx</i></p><span>xxx</span>');
	range.setStart(d.getElementsByTagName('p')[0].firstChild, 0)
			.setEnd(d.getElementsByTagName('span')[0].firstChild,
					3).select();
	editor.execCommand('paragraph', 'h1');
	equal(ua.getChildHTML(db),
			"<h1 dir=\"null\"><i>xxxx</i></h1><h1><span>xxx</span></h1>",
			"paragraph h1 p span");
	equal(editor.queryCommandValue("paragraph"), "h1",
			"paragraph h1 p span");
});
// 6 table
test(
		'table',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor
					.setContent('<table><tr><td>xxxx</td><td>xxxxx</td></tr></table>');
			range.selectNode(
					d.getElementsByTagName("td")[0].firstChild)
					.select();
			editor.execCommand('paragraph', 'h1');
			equal(
					ua.getChildHTML(db),
					"<table><tbody><tr><td><h1>xxxx</h1></td><td>xxxxx</td></tr></tbody></table>",
					"paragraph h1 table");
			equal(editor.queryCommandValue("paragraph"), "h1",
					"paragraph h1 table");
		});
//7 br
test(
		'br',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor
					.setContent('<p>xxx</p><br>');
			range.setStart(d.getElementsByTagName("p")[0].firstChild,0).setEnd(db.lastChild,1).select();
			editor.execCommand('paragraph', 'h1');
			equal(
					ua.getChildHTML(db),
					"<h1 dir=\"null\">xxx</h1><h1><br></h1>",
					"paragraph h1 br");
			equal(editor.queryCommandValue("paragraph"), "h1",
					"paragraph h1 br");
		});
//8 &nbsp;
test(
		'&nbsp;',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor
					.setContent('<p>xxx</p>&nbsp;&nbsp;<span>sss</span>');
			range.setStart(d.getElementsByTagName("p")[0].firstChild,0).setEnd(db.lastChild,1).select();
			editor.execCommand('paragraph', 'h1');
			equal(
					ua.getChildHTML(db),
					"<h1 dir=\"null\">xxx</h1><h1>&nbsp;&nbsp;<span>sss</span></h1>",
					"paragraph h1 &nbsp;");
			equal(editor.queryCommandValue("paragraph"), "h1",
					"paragraph h1 &nbsp;");
		});