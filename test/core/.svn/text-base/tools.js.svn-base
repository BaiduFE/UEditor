(function() {
    function mySetup() {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        div.id = 'test';

        var utils = baidu.editor.utils;
        var editor = new baidu.editor.Editor();
        te.dom.push( div );
        
        te.obj.push( utils );
        te.obj.push( editor );
//        document.body.appendChild(div);
    }

    var s = QUnit.testStart;
    QUnit.testStart = function() {
        s.apply( this, arguments );
        mySetup();
    };
})()