module("Selection");

function trans(range) {
	return {
		startContainer : range.startContainer,
		startOffset : range.startOffset,
		endContainer : range.endContainer,
		endOffset : range.endOffset
	};
}
function equlsRange(a,b){
	return a.startContainer === b.startContainer && 
		a.startOffset == b.startOffset  && 
		a.endContainer === b.endContainer  && 
		a.endOffset == b.endOffset ;
}
//1
test('getNative', function() {	
	var editor = new baidu.editor.Editor();
	editor.render(te.dom[0]);

	editor.focus();
	editor.setContent('<b><i>xxxx</i></b>');
	var range = new baidu.editor.dom.Range(editor.document);
     range.selectNode(editor.document.getElementsByTagName('b')[0]).select();
	 var getnative=editor.selection.getNative();
	 if(baidu.editor.browser.ie){
		 equal(getnative.type,"Text","ie");
	 }else if(!baidu.editor.browser.gecko){
		 equal(getnative.type,"Range","not ie");
	 }
});
//2
test('getIERange', function() {	
	if(baidu.editor.browser.ie){
		var editor = new baidu.editor.Editor();
		editor.render(te.dom[0]);
		editor.focus();
		editor.setContent('<b><i>xxxx</i></b>');
		var range = new baidu.editor.dom.Range(editor.document);
	     range.selectNode(editor.document.getElementsByTagName('b')[0]).select();
	     var getierange=editor.selection.getIERange();
	     equal(getierange.htmlText,"<B><I>xxxx</I></B>","getIERange !collapsed");
	     
	     editor.setContent('<b><i>xxxx</i></b><p>ppp</p>');
	     range.setStart(editor.document.getElementsByTagName('b')[0].firstChild,0).setEnd(editor.document.getElementsByTagName('p')[0].firstChild,3).collapse(true).select();
	     getierange=editor.selection.getIERange();
	     equal(getierange.htmlText,"","getIERange collapsed");
	}
});
//3
test('cache&&clear&&getRange&&getStart', function() {	
		var editor = new baidu.editor.Editor();
		editor.render(te.dom[0]);
		editor.focus();
		editor.setContent('<b><i>xxxx</i></b><p>ppss</p>');
		var range = new baidu.editor.dom.Range(editor.document);
	     range.selectNode(editor.document.getElementsByTagName('b')[0]).select();
	     var cacheran=editor.selection.getRange();
	     var startele=editor.selection.getStart();
	     editor.selection.cache();
	     //range.selectNode(editor.document.getElementsByTagName("p")[0]).select();
	     range.setStart(editor.document.getElementsByTagName("p")[0].firstChild,0).setEnd(editor.document.getElementsByTagName("p")[0].firstChild,3).select();
	     ok(equlsRange(trans(editor.selection.getRange()),trans(cacheran)),"before clear range")
	     ok((editor.selection.getStart()==startele),"before clear start");
	     editor.selection.clear();
	     var st=editor.selection.getStart();
	     ok(!equlsRange(trans(editor.selection.getRange()),trans(cacheran)),"after clear range");
	     ok(!(editor.selection.getStart()==startele),"after clear start");
});
//4
test('getRange', function() {	
	var editor = new baidu.editor.Editor();
	editor.render(te.dom[0]);
	editor.focus();
	editor.setContent('<b><i>xxxx</i></b><p>ppss</p>');
	var range = new baidu.editor.dom.Range(editor.document);
    range.setStart(editor.document.getElementsByTagName('i')[0].firstChild,0).setEnd(editor.document.getElementsByTagName('p')[0].firstChild,4).select();
    var getrange=editor.selection.getRange(),
        range={startContainer:editor.document.getElementsByTagName("i")[0].firstChild,endContainer:editor.document.getElementsByTagName("p")[0].firstChild,
    	startOffset:0,endOffset:4};
        ok(equlsRange(trans(getrange),range),"getRange");
});
//5
test('getStart', function() {	
	var editor = new baidu.editor.Editor();
	editor.render(te.dom[0]);
	editor.focus();
	editor.setContent('<b><i>xxxx</i></b><p>ppss</p>');
	var range = new baidu.editor.dom.Range(editor.document);
    range.setStart(editor.document.getElementsByTagName('p')[0],0).setEnd(editor.document.getElementsByTagName('p')[0],1).select();
    var getstart=editor.selection.getStart();
    equal(getstart.tagName.toLowerCase(),"p","getStart");
});




