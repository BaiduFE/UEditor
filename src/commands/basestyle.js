/**
 * b u i等基础功能实现
 * @function
 * @name baidu.editor.commands.basestyle
 * @example sdfsdfdafsdf
 *         123asdfasdfasdf
 * @author zhanyi
*/
(function() {
    var basestyles = {
            'bold':['strong','b'],
            'italic':['em','i'],
            'underline':['u'],
            'strikethrough':['strike'],
            'subscript':['sub'],
            'superscript':['sup']
        },
        domUtils = baidu.editor.dom.domUtils,
        getObj = function(editor,tagNames){
            var start = editor.selection.getStart();
            return  domUtils.findParentByTagName( start, tagNames, true )
        },
        flag = 0;
    for ( var style in basestyles ) {
        (function( cmd, tagNames ) {
            baidu.editor.commands[cmd] = {
                execCommand : function( cmdName ) {
                    var range = new baidu.editor.dom.Range(this.document),obj = '',me = this;

                    //执行了上述代码可能产生冗余的html代码，所以要注册 beforecontent去掉这些冗余的代码
                    if(!flag){
                        this.addListener('beforegetcontent',function(){
                            domUtils.clearReduent(me.document,['strong','u','em','sup','sub','strike'])
                        });
                        flag = 1;
                    }
                    //table的处理
                    if(me.currentSelectedArr && me.currentSelectedArr.length > 0){
                        for(var i=0,ci;ci=me.currentSelectedArr[i++];){
                            if(ci.style.display != 'none'){
                                range.selectNodeContents(ci).select();
                                obj === ''  && (obj = getObj(this,tagNames) ? 1 : 0);
                                obj ? range.removeInlineStyle( tagNames ) : range.applyInlineStyle( tagNames[0] )
                            }

                        }
                        range.selectNodeContents(me.currentSelectedArr[0]).select();
                    }else{
                        range = me.selection.getRange();
                        obj = getObj(this,tagNames);

                        if ( range.collapsed ) {
                            if ( obj ) {
                                var tmpText =  me.document.createTextNode('');
                                range.insertNode( tmpText ).removeInlineStyle( tagNames );

                                range.setStartBefore(tmpText);
                                domUtils.remove(tmpText);
                            } else {
                                var tmpNode = range.document.createElement( tagNames[0] );
                                range.insertNode( tmpNode ).setStart( tmpNode, 0 );

                            }
                            range.collapse( true )

                        } else {
                            obj ? range.removeInlineStyle( tagNames ) : range.applyInlineStyle( tagNames[0] )
                        }

                        range.select();
                    }

                    return true;
                },
                queryCommandState : function() {
                   return getObj(this,tagNames) ? 1 : 0;
                }
            }
        })( style, basestyles[style] );

    }
})();

