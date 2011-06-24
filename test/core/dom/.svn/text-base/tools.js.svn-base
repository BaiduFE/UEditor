(function(){
	function mySetup() {
	    var div = document.body.appendChild(document.createElement('div'));
	    div.id = 'test';

       var iframe =  document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.id='iframe';
		testingElement.dom.push(div);
        te.dom.push(iframe);
		var range = new baidu.editor.dom.Range( document );
		var domUtils = baidu.editor.dom.domUtils;
		testingElement.obj.push(range);
        te.obj.push(domUtils);
//        document.body.appendChild(div);
	}

	var s = QUnit.testStart;
	QUnit.testStart = function() {
		s.apply(this, arguments);
		mySetup();
	};
})()
