module("blockquote");

//1 state&&collapsed=true
//test('')

test(
		'state&&collapsed=true',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<blockquote><b>xxxx</b></blockquote>');
			range.setStart(d.getElementsByTagName('blockquote')[0].firstChild,0).collapse(true).select();
			equal(editor.queryCommandState("blockquote"), 1,"before executing the blockquote command");
			editor.execCommand('blockquote');
			equal(editor.queryCommandState("blockquote"), 0,"after executing the blockquote command");
			range = editor.selection.getRange();
			range.insertNode(range.document.createTextNode('aa'));
			ua.manualDeleteFillData();
			equal(ua.getChildHTML(db), "<b>aaxxxx</b>","after inserting 'aa'");
		});
//2 state&&collapsed=false
test('state&&collapsed=false', function() {
	var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
	editor.setContent('<blockquote><b>xxxx</b></blockquote>');
	range.setStart(d.getElementsByTagName('b')[0].firstChild, 0).setEnd(d.getElementsByTagName('b')[0].firstChild, 2).select();
	editor.execCommand("blockquote");
	equal(editor.queryCommandState("blockquote"), 0,"after executing the blockquote command");
	ua.manualDeleteFillData();
	equals(ua.getChildHTML(db), '<b>xxxx</b>',"after executing the blockquote command");

});
//3 state!=common&&collapsed=false
test(
		'state!=common&&collapsed=false',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<blockquote><b>xxxx</b></blockquote><i>sss</i>');
			range.setStart(d.getElementsByTagName('b')[0].firstChild,0).setEnd(d.getElementsByTagName('i')[0].lastChild,3).select();
			editor.execCommand("blockquote");
			equal(editor.queryCommandState("blockquote"), 0,"after executing the blockquote command");
			ua.manualDeleteFillData();
			equals(ua.getChildHTML(db),'<b>xxxx</b><i>sss</i>',"after executing the blockquote command");
			editor.setContent('<blockquote>xxxx</blockquote><b>ssss</b>');
			range.setStart(d.getElementsByTagName('blockquote')[0].firstChild,0).setEnd(d.getElementsByTagName('b')[0].firstChild,3).select();
			editor.execCommand("blockquote");
			equal(editor.queryCommandState("blockquote"), 0,"after executing the blockquote command");
			ua.manualDeleteFillData();
			equals(ua.getChildHTML(db), 'xxxx<b>ssss</b>',"after executing the blockquote command");
		});
//4 !state&&collapsed=true
test(
		'!state&&collapsed=true',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1];
			editor.setContent('<i>aa</i><blockquote><b>xxxx</b></blockquote>');
			range.setStart(d.getElementsByTagName('i')[0].firstChild,1).collapse(true).select();
			editor.execCommand("blockquote");
			equal(editor.queryCommandState("blockquote"), 1,"after executing the blockquote command");
			ua.manualDeleteFillData();
			equal(d.getElementsByTagName("blockquote")[0].firstChild.tagName.toLowerCase(),"i", "after executing the blockquote command");
		});
//5 !state&&collapsed=false
test(
		'!state&&collapsed=false',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<i>aa</i><blockquote><b>xxxx</b></blockquote>');
			range.setStart(d.getElementsByTagName('i')[0].firstChild,1).setEnd(d.getElementsByTagName("i")[0].firstChild,2).select();
			editor.execCommand("blockquote");
			equal(editor.queryCommandState("blockquote"), 1,"after executing the blockquote command");
			ua.manualDeleteFillData();
			equals(ua.getChildHTML(db),'<blockquote><i>aa</i></blockquote><blockquote><b>xxxx</b></blockquote>',"after executing the blockquote command");
		});
//6 table&&collapsed=true
test(
		'table',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1];
			editor.setContent('<table><tbody><tr><td>xxxx</td></tr></tbody></table>');
			range.setStart(d.getElementsByTagName('td')[0].firstChild,2).collapse(true).select();
			editor.execCommand('blockquote');
			ua.manualDeleteFillData();
			equal(d.getElementsByTagName('blockquote')[0].firstChild.tagName.toLowerCase(),"table", "after executing the blockquote command");
			equal(editor.queryCommandState("blockquote"), 1,"after executing the blockquote command");
		});
//7 table&&collapsed=false
test(
		'table&&collapsed=false',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('<table><tbody><tr><td>xxxx</td></tr></tbody></table>');
			range.setStart(d.getElementsByTagName('td')[0].firstChild,2).setEnd(d.getElementsByTagName('table')[0], 1).select();
			editor.execCommand('blockquote');
			equal(editor.queryCommandState("blockquote"), 1,"after executing the blockquote command");
			ua.manualDeleteFillData();
			equals(ua.getChildHTML(db),'<blockquote><table><tbody><tr><td>xxxx</td></tr></tbody></table></blockquote>',"after executing the blockquote command");
		});
//8 range=xxxx&&attrs
test(
		'range==xxxx&&attrs',
		function() {
			var editor = te.obj[0],d=editor.document,range=te.obj[1],db=editor.body;
			editor.setContent('xxxx');
			range.setStart(db.firstChild, 2).setEnd(db.firstChild, 4).select();
			var attrs = {
				id : '1',
				title : 'blockquote',
				style : "font-size:12px",
				cite : "http://www.wwf.org"
			};
			editor.execCommand('blockquote', attrs);
			equal(editor.queryCommandState("blockquote"), 1,"after executing the blockquote command");
			ua.manualDeleteFillData();
            equal(db.firstChild.tagName.toLowerCase(),"blockquote","blockquote");
            equal(d.getElementsByTagName("blockquote")[0].innerHTML,"xxxx","原内容");
            equal(d.getElementsByTagName("blockquote")[0].title,"blockquote","attr title");
            equal(d.getElementsByTagName("blockquote")[0].id,"1","attr id");
            equal(d.getElementsByTagName("blockquote")[0].style.fontSize,"12px","attr fontSize");
            var eq=(d.getElementsByTagName('blockquote')[0].cite)==("http://www.wwf.org/")||(d.getElementsByTagName('blockquote')[0].cite)==("http://www.wwf.org");
            ok(eq,"attr cite");
			range.selectNode(db.firstChild);
			editor.execCommand('blockquote');
			equal(editor.queryCommandState("blockquote"), 0,"after removing the blockquote command");
			ua.manualDeleteFillData();
			equals(ua.getChildHTML(db), 'xxxx',"after removing the blockquote command");
		});
