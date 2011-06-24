module("undo");

(function() {
	function mySetup() {
		var test = document.body.appendChild(document.createElement('div'));
		$(test).css('width', '500px').css('height', '500px').css('border',
				'1px solid #ccc');
		testingElement.dom.push(test);
	}
	var s = QUnit.testStart;
	QUnit.testStart = function() {
		s.apply(this, arguments);
		mySetup();
	};
})();

function getHTML(co) {

	var h = co.innerHTML.toLowerCase();

	h = h.replace(/[\r\n\t]/g, ''); // Remove line feeds and tabs
	h = h.replace(/ (\w+)=([^\"][^\s>]*)/gi, ' $1="$2"'); // Restore attribs on IE

	return h;
}
function trans(range) {
	return {
		startContainer : range.startContainer,
		startOffset : range.startOffset,
		endContainer : range.endContainer,
		endOffset : range.endOffset
	};
}

function manualDeleteFillData() {
	var domUtils = baidu.editor.dom.domUtils;
	var fillData = baidu.editor.Editor.fillData;
	fillData && domUtils.remove(fillData);
	baidu.editor.Editor.fillData = null;
}

test(
		'undo',
		function() {
			var editor = new baidu.editor.Editor({
				enterkey : 'br',
				initialContent : 'test'
			});
			editor.render(te.dom[0]);
			var domUtils = baidu.editor.dom.domUtils, dtd = baidu.editor.dom.dtd, range = new baidu.editor.dom.Range(
					editor.document);
			editor.setContent('<b>xxxx</b><p>xxxx</p>');
			range.selectNodeContents(editor.document.body).select();
			editor.execCommand('bold');
			editor.execCommand('Undo');
			equals(getHTML(editor.document.body), '<b>xxxx</b><p>xxxx</p>');
			editor.execCommand('redo');
			equals(getHTML(editor.document.body), 'xxxx<p>xxxx</p>');
			ok(!editor.hasRedo);

			editor.execCommand('Undo');
			editor.execCommand('Undo');
			equals(getHTML(editor.document.body), 'test');
		});