module( 'plugins.serialize.serialize' );

/*特殊字符需要转义*/
test( 'parseHTML,toHTML--文本包含特殊字符，如尖括号', function() {
    var div = te.dom[0];
    var serialize = te.obj[0];
    var node = serialize.parseHTML( '<span><td  hello</span>' );
    equal( serialize.toHTML( node ).toLowerCase(), '<span>&lt;td  hello</span>', '字符转义' );
} );


test( 'parseHTML,toHTML---table相关', function() {
    var serialize = te.obj[0];
    var parseHTML = serialize.parseHTML;
    var toHTML = serialize.toHTML;
    /*补child，补table的孩子时不会补tbody*/
    var node = parseHTML( '<table>' );
    equal( toHTML( node ).toLowerCase(), '<table><tr><td></td></tr></table>', '<table>--补孩子' );
    /*补parent*/
    node = parseHTML( '<td>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td></tr></tbody></table>', '<td>--补父亲' );
    /*补parent和child*/
    node = parseHTML( '<tr>hello' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td>hello</td></tr></tbody></table>', '<tr>hello--孩子父亲都补' );

    node = parseHTML( '<td>123' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td>123</td></tr></tbody></table>', '<td>123' );

    node = parseHTML( '123<td>' );
    equal( toHTML( node ).toLowerCase(), '123<table><tbody><tr><td></td></tr></tbody></table>', '123<td>' );

    node = parseHTML( '<tr><td>123' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td>123</td></tr></tbody></table>', '<tr><td>123' );

    node = parseHTML( '<td>123<tr>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td>123</td></tr><tr><td></td></tr></tbody></table>', '<td>123<tr>' );

    /*补充为2个td*/
    node = parseHTML( '<tr>123<td>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td>123</td><td></td></tr></tbody></table>', '<tr>123<td>--tr和td之间有文字' );

    node = parseHTML( '<td><td>123' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td><td>123</td></tr></tbody></table>', '<td><td>123' );

    node = parseHTML( '<td>123<td>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td>123</td><td></td></tr></tbody></table>', '<td>123<td>' );

    /*补2个table*/
    node = parseHTML( '<td>123</td>132<tr>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td>123</td></tr></tbody></table>132<table><tbody><tr><td></td></tr></tbody></table>', '<td>123</td>132<tr>--补全2个table' );

    /*开标签、文本与闭标签混合*/
    node = parseHTML( '<tr>123</td>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td>123</td></tr></tbody></table>', '<tr>123</td>--tr和td之间有文字' );

    node = parseHTML( '<tr></td>123' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td></tr></tbody></table>123', '<tr></td>123--td闭标签后面有文字' );

    node = parseHTML( '123</tr><td>' );
    equal( toHTML( node ).toLowerCase(), '123<table><tbody><tr><td></td></tr><tr><td></td></tr></tbody></table>', '123</tr><td>' );

    node = parseHTML( '</tr><td>123' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td></tr><tr><td>123</td></tr></tbody></table>', '</tr><td>123' );

    node = parseHTML( '</tr>123<td>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td></tr></tbody></table>123<table><tbody><tr><td></td></tr></tbody></table>', '</tr>123<td>' );
    /*闭标签、文本与闭标签混合*/
    node = parseHTML( '</td>123</tr>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td></tr></tbody></table>123<table><tbody><tr><td></td></tr></tbody></table>', '</td>123</tr>' );

    node = parseHTML( '</tr>123</td>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td></tr></tbody></table>123<table><tbody><tr><td></td></tr></tbody></table>', '</td>123</tr>' );

    node = parseHTML( '</tr>123<tr>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td></tr></tbody></table>123<table><tbody><tr><td></td></tr></tbody></table>', '</td>123</tr>', '</tr>123<tr>' );

    /*补前面的标签*/
    node = parseHTML( '</td>123' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td></td></tr></tbody></table>123', '</td>123--补全td前面的标签' );
    node = parseHTML( '123</td>' );
    equal( toHTML( node ).toLowerCase(), '123<table><tbody><tr><td></td></tr></tbody></table>', '123</td>--补全td前面的标签，有文本' );
    /*补全tr前面的标签*/
    node = parseHTML( '123</tr>' );
    equal( toHTML( node ).toLowerCase(), '123<table><tbody><tr><td></td></tr></tbody></table>', '123</tr>--补全tr前后的标签，前面有文本' );
    /*补全table前面的标签*/
    node = parseHTML( '123</table>' );
    equal( toHTML( node ).toLowerCase(), '123<table><tr><td></td></tr></table>', '123</table>--补全trable前后的标签，前面有文本' );
    /*复杂结构*/
    node = parseHTML( '<table><tr><td>123<tr>456' );
    equal( toHTML( node ).toLowerCase(), '<table><tr><td>123</td></tr><tr><td>456</td></tr></table>', '<table><tr><td>123<tr>456' );

    node = parseHTML( '<td><span>hello1</span>hello2</tbody>' );
    equal( toHTML( node ).toLowerCase(), '<table><tbody><tr><td><span>hello1</span>hello2</td></tr></tbody></table>', '解析<td><span>hello1</span>hello2</tbody>' );

    node = parseHTML( '<table><td><span>hello1</span>hello2</tbody>' );
    equal( toHTML( node ).toLowerCase(), '<table><tr><td><span>hello1</span>hello2<table><tbody><tr><td></td></tr></tbody></table></td></tr></table>', '解析<table><td><span>hello1</span>hello2</tbody>' );

    node = parseHTML( '<table><tr></td>123' );
    equal( toHTML( node ).toLowerCase(), '<table><tr><td></td></tr></table>123', '<table><tr></td>123' );
} );


test( 'parseHTML,toHTML---br', function() {
    var serialize = te.obj[0];
    var node = serialize.parseHTML( '<br />' );
    equal( serialize.toHTML( node ).toLowerCase(), '<br />', '对br不操作' );

    node = serialize.parseHTML( '<br>' );
    equal( serialize.toHTML( node ).toLowerCase(), '<br />', '补充br后面的斜杠' );
} );

test( 'parseHTML,toHTML---列表相关', function() {
    var serialize = te.obj[0];
    /*补li的parent*/
    var node = serialize.parseHTML( '<li>123' );
    equal( serialize.toHTML( node ).toLowerCase(), '<ul><li>123</li></ul>', '<li>123--补全li的parent--ul，前面有文本' );
    /*补ul的child*/
    node = serialize.parseHTML( '<ul>123' );
    equal( serialize.toHTML( node ).toLowerCase(), '<ul><li>123</li></ul>', '<ul>123--补全ul的child--li，前面有文本' );
    /*补li开始标签*/
    node = serialize.parseHTML( '</li>123' );
    equal( serialize.toHTML( node ).toLowerCase(), '<ul><li></li></ul>123', '</li>123--补全li开始标签，前面有文本' );
} );

/*考察标签之间嵌套关系*/
test( 'parseHTML,toHTML---复杂标签嵌套', function() {
    var serialize = te.obj[0];
    /*span,p,div嵌套*/
    var node = serialize.parseHTML( '<span>hello1<p><img>hello2<div>hello3<p>hello4' );
    equal( serialize.toHTML( node ).toLowerCase(), '<span>hello1</span><p><img />hello2</p><div>hello3<p>hello4</p></div>' );

} );

test( 'bi转换为strong，em', function() {
    var serialize = te.obj[0];
    /*bi*/
    var node = serialize.parseHTML( '<b><i>hello</i>hello</b>' );
    equal( serialize.toHTML( node ).toLowerCase(), '<strong><em>hello</em>hello</strong>', '转化b和i' );
} );

test( 'font转span', function() {
    var serialize = te.obj[0];
    /*font转span*/
    var node = serialize.parseHTML( '<font size="20" color="red" lang="en" face="arial"><b><i>hello</i>hello</b>' );
    equal( serialize.toHTML( node ).toLowerCase(), '<span style="font-size:12px;color:red;font-family:arial;"><strong><em>hello</em>hello</strong></span>' );

    /*size的值在sizeMap中有对应的值*/
    var node = serialize.parseHTML( '<b><font size="1" color="#ff0000" lang="en" face="楷体">hello' );
    equal( serialize.toHTML( node ).toLowerCase(), '<strong><span style="font-size:10px;color:#ff0000;font-family:楷体;">hello</span></strong>' );
} );


test( '只有white list', function() {
    var serialize = te.obj[0];
    serialize.rules = {
        whiteList:{
            div:{
                span:1,
                p:1
            },
            span:1,
            em:{
                strong:1
            },
            p:{
                img:1
            }
        } };
    var html = '<table></table>hellotable<!--hello--><div>hellodiv<span>hellospan</span><p class="p_class"><img /><strong><em>hello</em></strong></p><!--hello--></div><strong>hello2<em></em></strong>';
    var node = serialize.parseHTML( html );
    node = serialize.filter( node );
    var div = document.createElement( 'div' );
    var div_new = document.createElement( 'div' );
    div.innerHTML = serialize.toHTML( node );
    div_new.innerHTML = 'hellotable<!--hello--><div>hellodiv<span>hellospan</span><p class="p_class"><img /></p><!--hello--></div>hello2<em></em>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), 'white list' );
} );

test( '只有white list--滤除属性', function() {
    var serialize = te.obj[0];
    serialize.rules = {
        whiteList:{
            div:{
                $:{
                    id:1,
                    'class':1
                }
            },
            table:{
            },
            span:{
            }
        }
    };
    var html = '<table></table>hellotable<!--hello--><p><div class="div_class" id="div_id" name="div_name">hellodiv<span style="color:red;font-size:12px" ><p>hellospan</span><!--hello--></p></div></p><span style="color:red;font-size:12px" >hellospan</span>';
    var node = serialize.parseHTML( html );
    node = serialize.filter( node );
    var div = document.createElement( 'div' );
    var div_new = document.createElement( 'div' );
    div.innerHTML = serialize.toHTML( node );
    div_new.innerHTML = '<table></table>hellotable<!--hello--><div id="div_id" class="div_class">hellodivhellospan<!--hello--></div><span style="color:red;font-size:12px" >hellospan</span>';
    ok( ua.hasSameAttrs( div, div_new ), '滤除属性' );
} );

test( '只有black list', function() {
    var serialize = te.obj[0];
    serialize.rules = {
        blackList:{
            span:1,
            em:1,
            '#comment':1,
            script:1,
            style:1
        }
    };
    var html = '<style  type="text/css"></style><script type="text/javascript"></script><!--comment--><div><script type="text/javascript"></script><span>hello1</span>hello2</div>';
    var node = serialize.parseHTML( html );
    node = serialize.filter( node );
    equal( serialize.toHTML( node ), '<div>hello2</div>' );
} );

test( 'black list和whilte list都有', function() {
    var serialize = te.obj[0];
    serialize.rules = {
        whiteList:{
            div:{
                span:1,
                p:1
            },
            span:1,
            p:{
                img:1
            }
        },
        blackList:{
            em:1,
            '#comment':1,
            script:1,
            style:1
        }};
    var html = '<table></table>hellotable<!--hello--><p><div class="div_class" id="div_id" name="div_name">hellodiv<style  type="text/css"></style><script type="text/javascript"></script><!--comment--><span style="color:red;font-size:12px" ><p>hellospan</span><!--hello--></p></div></p><span style="color:red;font-size:12px" >hellospan</span>';
    var node = serialize.parseHTML( html );
    var div = document.createElement( 'div' );
    var div_new = document.createElement( 'div' );
    node = serialize.filter( node );
    div.innerHTML = serialize.toHTML( node );
    div_new.innerHTML = 'hellotable<p><div class="div_class" id="div_id" name="div_name">hellodiv<span style="color:red;font-size:12px" ><p>hellospan</span><!--hello--></p></div></p><span style="color:red;font-size:12px" >hellospan</span>';
    ok( ua.haveSameAllChildAttribs( div, div_new ), 'whiteList和blackList都有' );
} );
