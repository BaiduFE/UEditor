(function (inFilePath, outFilePath){
    var File = java.io.File;
    var System = java.lang.System;


    var match;
    var inFile = new File(inFilePath);
    var html = getStringOfFile(inFile);
    match = /src\s*=\s*['"](.*?)editor_api\.js.*?>([^<]*?)<\/script>/i.exec(html);
    if (match == null) {
        System.out.println('no script tag that src contains "editor_api.js" in file "'+ inFilePath +'".');
        return;
    }
    var rootPath = String(inFile.getCanonicalPath()).replace(/[^\\/]*$/, '');
    var rootDir = new File(rootPath, match[1] + '../src');
    var pathList = match[2]
        .replace(/^[^\[]*\[\s*['"]|['"]\s*\][^\]]*$/g, '')
        .split(/['"]\s*,\s*['"]/g);
    var buff = [];
    for (var i=0; i<pathList.length; i++) {
        var file = new File(rootDir, pathList[i]);
        buff.push(getStringOfFile(file));
    }
    var outFile = new File(outFilePath);
    setStringOfFile(outFile, buff.join('\n'));

    function getStringOfFile(file){
        var buff = java.lang.reflect.Array.newInstance(
            java.lang.Character.TYPE, file.length());
        try {
            var input = new java.io.InputStreamReader(
                new java.io.BufferedInputStream(
                    new java.io.FileInputStream(file)
                    ), 'UTF-8');
            input.read(buff);
        } finally {
            if (input) {
                input.close();
            }
        }
        return String(new java.lang.String(buff)).replace(/\0/g, '');
    }
    function setStringOfFile(file, str){
        try {
            var output = new java.io.OutputStreamWriter(
                new java.io.BufferedOutputStream(
                    new java.io.FileOutputStream(file)
                    ), 'UTF-8');
            output.write(str);
        } finally {
            if (output) {
                output.close();
            }
        }
    }

})(arguments[0], arguments[1]);