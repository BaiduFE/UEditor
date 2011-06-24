(function() {
    function mySetup() {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        div.id = 'test';
        var editor = new baidu.editor.Editor();
        te.dom.push( div );
        te.obj.push( editor );
    }

    var s = QUnit.testStart;
    QUnit.testStart = function() {
        s.apply( this, arguments );
        mySetup();
    };
})()