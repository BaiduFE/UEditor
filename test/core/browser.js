module( "core.browser" );


test( 'browser', function() {
    var browser = baidu.editor.browser;
    /*ie*/
    if ( browser.ie ) {
        ok( ua.browser.ie, 'is ie' );
        var version = ua.browser.ie;
        if ( browser.version < 7 ) {
            ok( browser.ie6Compat, 'ie6 compat mode' );
            equal( version, 6, 'ie version is 6' );
        }
        if ( browser.version == 7 ) {
            ok( browser.ie6Compat, 'ie7 compat mode' );
            equal( version, 7, 'ie version is 7' );
            ok( browser.isCompatible, 'is compatible' );
        }
        switch ( document.documentMode ) {
            case 7:
                ok( browser.ie7Compat, 'ie7compat mode' );
                equal( version, 7, 'ie version is 7' );
                ok( browser.isCompatible, 'is compatible' );
                break;
            case 8:
                ok( browser.ie8Compat, 'ie8 compat mode' );
                equal( version, 8, 'ie version is 8' );
                ok( browser.isCompatible, 'is compatible' );
                break;
        }
    }
    /*opera*/
    if ( browser.opera ) {
        ok( ua.browser.opera, 'is opera' );
        equal( browser.opera.version, ua.browser.opera, 'check opera version' );
    }
    /*webKit*/
    if ( browser.webkit ) {
        ok( ua.browser.webkit, 'is webkit' );
        equal( browser.webkit, ua.browser.webkit>0, 'check webkit version' );
    }
    /*gecko*/
    if ( browser.gecko ) {
        ok( ua.browser.gecko, 'is webkit' );
        equal( browser.gecko, ua.browser.gecko, 'check gecko version' );
    }
    /*air*/
    if ( browser.air ) {
        ok( ua.browser.air, 'is air' );
        equal( browser.air, ua.browser.air>0, 'check air version' );
    }
    /*mac*/
    if ( browser.mac ) {
        ok( ua.browser.air, 'is air' );
        equal( ua.browser.os, 'macintosh', 'check air version' );
    }
    /*quirks*/
    if ( browser.quirks ) {
        equal( document.compatMode, 'BackCompat', 'is quirks mode' );
        equal( browser.version, 6, 'ie version is 6' );
    }
} );
