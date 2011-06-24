(function() {
    function mySetup() {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        var editor = new baidu.editor.Editor( {'plugins':['serialize']} );
        editor.render( div );
        te.obj.push( editor.serialize );
        te.obj.push( editor );
        te.dom.push( div );
    }

    var s = QUnit.testStart;
    QUnit.testStart = function() {
        s.apply( this, arguments );
        mySetup();
    };
})()