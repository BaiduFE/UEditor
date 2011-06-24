/**
 * Created by .
 * User: houhaixian
 * Date: 11-5-11
 * Time: 下午3:08
 * To change this template use File | Settings | File Templates.
 */
(function() {
    function mySetup() {
        var test = document.body.appendChild( document.createElement( 'div' ) );
        $( test ).css( 'width', '500px' ).css( 'height', '500px' ).css( 'border',
                '1px solid #ccc' );
           var editor = new baidu.editor.Editor();
          testingElement.obj.push(editor);
         testingElement.dom.push( test );
         editor.render( te.dom[0] );
         editor.focus();
         var range = new baidu.editor.dom.Range( editor.document );
         testingElement.obj.push(range);
    }

    var s = QUnit.testStart;
    QUnit.testStart = function() {
        s.apply( this, arguments );
        mySetup();
    };
})();