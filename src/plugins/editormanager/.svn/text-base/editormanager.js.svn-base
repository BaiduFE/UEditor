baidu.editor.editorManager = {
    _allEditors: {},
    add: function (editor){
        this._allEditors[editor.uid] = editor;
    }
};
baidu.editor.plugins['editormanager'] = function () {
    baidu.editor.editorManager.add( this );
};
