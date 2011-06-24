(function (){
    baidu.editor.plugins['video'] = function (){
        var editor = this;
        var fakedMap = {};
        var fakedMap2 = {};
        var lastFakedId = 0;
        function fake(url, width, height){
            var fakedId = 'edui_faked_video_' + (lastFakedId ++);
            var fakedHtml = '<img isfakedvideo id="'+ fakedId +'" width="'+ width +'" height="' + height + '" _url="'+url+'" class="edui-faked-video"' +
                ' src="http://hi.baidu.com/fc/editor/images/spacer.gif"' +
                ' style="background:url(http://hi.baidu.com/ui/neweditor/lib/fck/images/fck_videologo.gif) no-repeat center center; border:1px solid gray;"/>';
            fakedMap[fakedId] = '<embed isfakedvideo' +
                ' type="application/x-shockwave-flash"' +
                ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
                ' src="' + url + '"' +
                ' width="' + width + '"' +
                ' height="' + height + '"' +
                ' wmode="transparent"' +
                ' play="true"' +
                ' loop="false"' +
                ' menu="false"' +
                ' allowscriptaccess="never"' +
                '></embed>';
            return fakedHtml;
        }
        editor.commands['insertvideo'] = {
            execCommand: function (cmd, options){
                var url = options.url;
                var width = options.width || 320;
                var height = options.height || 240;
                editor.execCommand('inserthtml', fake(url, width, height));
            }
        };

        editor.addListener('beforegetcontent', function (){
            var tempDiv = editor.document.createElement('div');
            for (var fakedId in fakedMap) {
                var fakedImg = editor.document.getElementById(fakedId);
                if (fakedImg) {
                    tempDiv.innerHTML = fakedMap[fakedId];
                    var temp = tempDiv.firstChild;
                    temp.width = fakedImg.width;
                    temp.height = fakedImg.height;
                    fakedImg.parentNode.replaceChild(temp, fakedImg);
                    fakedMap2[fakedId] = [fakedImg, temp];
                }
            }
        });

        editor.addListener('aftersetcontent', function (){
            var tempDiv = editor.document.createElement('div');
            fakedMap = {};
            var embedNodeList = editor.document.getElementsByTagName('embed');
            var embeds = [];
            var k = embedNodeList.length;
            while (k --) {
                embeds[k] = embedNodeList[k];
            }
            k = embeds.length;
            while (k --) {
                var url = embeds[k].src;
                var width = embeds[k].width || 320;
                var height = embeds[k].height || 240;
                tempDiv.innerHTML = fake(url, width, height);
                embeds[k].parentNode.replaceChild(tempDiv.firstChild, embeds[k]);
            }
        });
        editor.addListener('aftergetcontent', function (){
            var newFakedMap = {};
            for (var fakedId in fakedMap2) {
                var fakedPair = fakedMap2[fakedId];
                fakedPair[1].parentNode.replaceChild(fakedPair[0], fakedPair[1]);
                newFakedMap[fakedId] = fakedMap[fakedId];
            }
            fakedMap2 = {};
            fakedMap = newFakedMap;
        });

    };
})();
