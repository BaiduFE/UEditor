/**
 * @description link
 * @author zhanyi
 */
(function() {
    var dom = baidu.editor.dom,
        domUtils = dom.domUtils;

    function optimize( range ) {
        var start = range.startContainer,end = range.endContainer;

        if ( start = domUtils.findParentByTagName( start, 'a', true ) ) {
            range.setStartBefore( start )
        }
        if ( end = domUtils.findParentByTagName( end, 'a', true ) ) {
            range.setEndAfter( end )
        }
    }

    baidu.editor.commands['unlink'] = {
        execCommand : function() {
            var as,
                range = new baidu.editor.dom.Range(this.document),
                tds = this.currentSelectedArr,
                bookmark;
            if(tds && tds.length >0){
                for(var i=0,ti;ti=tds[i++];){
                    as = domUtils.getElementsByTagName(ti,'a');
                    for(var j=0,aj;aj=as[j++];){
                        domUtils.remove(aj,true);
                    }
                }
                range.selectNodeContents(tds[0]).select()
            }else{
                range = this.selection.getRange(),
                bookmark = range.createBookmark();
                optimize( range );
                range.removeInlineStyle( 'a' ).moveToBookmark( bookmark ).select();
            }

        },
        queryCommandState : function(){
            var start = this.selection.getStart();
            return domUtils.findParentByTagName( start, 'a', true ) ? 0 : -1;
        }

    };
    function doLink(range,opt){
        optimize( range );
        range.removeInlineStyle( 'a' );
        if ( range.collapsed ) {
            var a = range.document.createElement( 'a' );
            domUtils.setAttributes( a, opt );
            a.innerHTML = opt.href;
            range.insertNode( a ).selectNode( a );
        } else {
            range.applyInlineStyle( 'a', opt )
        }
    }
    baidu.editor.commands['link'] = {
        execCommand : function( cmdName, opt ) {
            var range = new baidu.editor.dom.Range(this.document),
                tds = this.currentSelectedArr;
            if(tds && tds.length){
                for(var i=0,ti;ti=tds[i++];){
                    doLink(range.selectNodeContents(ti),opt)
                }
                range.setStart(tds[0],0).setCursor();
               
            }else{
                doLink(range=this.selection.getRange(),opt);

                range.collapse().select();

            }
        },
        queryCommandValue : function() {

            var range = new baidu.editor.dom.Range(this.document),
                tds = this.currentSelectedArr,
                as,
                node;
            if(tds && tds.length){
                for(var i=0,ti;ti=tds[i++];){
                    as = ti.getElementsByTagName('a');
                    if(as[0])
                        return as[0]
                }
            }else{
                range = this.selection.getRange();



                if ( range.collapsed ) {
                    node = this.selection.getStart();
                    if ( node && (node = domUtils.findParentByTagName( node, 'a', true )) ) {
                        return node;
                    }
                } else {
                    var start = range.startContainer.nodeType  == 3 || !range.startContainer[range.startOffset] ? range.startContainer : range.startContainer[range.startOffset],
                        end =  range.endContainer.nodeType == 3 || range.endOffset == 0 ? range.endContainer : range.endContainer[range.endOffset-1],

                        common = range.getCommonAncestor();


                    node = domUtils.findParentByTagName( common, 'a', true );
                    if ( !node && common.nodeType == 1){

                        var as = common.getElementsByTagName( 'a' ),
                            ps,pe;

                        for ( var i = 0,ci; ci = as[i++]; ) {
                            ps = domUtils.getPosition( ci, start ),pe = domUtils.getPosition( ci,end);
                            if ( (ps & domUtils.POSITION_FOLLOWING || ps & domUtils.POSITION_CONTAINS)
                                &&
                                (pe & domUtils.POSITION_PRECEDING || pe & domUtils.POSITION_CONTAINS)
                                ) {
                                node = ci;
                                break;
                            }
                        }
                    }

                    return node;
                }
            }


        }
    }

})();
