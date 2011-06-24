module( 'plugins.paste' );

test( 'getClipboardData--ctrl+v', function() {
    var editor = new baidu.editor.Editor({'plugins':['paste']})
    var div = te.dom[0];
    editor.render( div );
    editor.focus();
    var doc = editor.document;
    var r = new baidu.editor.dom.Range( doc );
    editor.setContent( '<p><span>xxxxx</span><strong><em>eeee</em></strong></p><div id="div_id" style="background:red">dddd</div><p>qwwww</p>' );
    var div_new = doc.getElementById('div_id');
    r.setStart( div_new,0 ).collapse().select();
    var position = ua.findPosition(div_new);
    doc.onpaste = function(e){
//        e.clipboardData
        ok(true,'');
    }
     stop();
//    ua.mousemove(div_new.firstChild,{clientX:position[0],clientY:position[1]});
//    editor.window.clipboardData.setData("text","new Clipboard data");
//    ua.keydown(div_new.firstChild,{ctrlKey:true,keyCode:86});
        ua.keydown(doc,{ctrlKey:true,keyCode:86});
    setTimeout(function(){
        start();
    },20);
} )