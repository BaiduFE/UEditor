(function (){
    var noop = new Function();
    var utils = baidu.editor.utils = {
        /**
         * 以obj为原型创建实例
         * @param obj
         */
        makeInstance : function ( obj ) {
            noop.prototype = obj;
            obj = new noop;
            noop.prototype = null;
            return obj;
        },
        /**
         * 判断是否为数组
         * @param array
         */
        isArray : function (array){
            return array && array.constructor === Array;
        },
        /**
         * 遍历元素执行迭代器
         * @param {Array|Object} eachable
         * @param {Function} iterator
         * @param {Object} this_
         */
        each: function (eachable, iterator, this_){
            if (utils.isArray(eachable)) {
                for (var i=0; i<eachable.length; i++) {
                    iterator.call(this_, eachable[i], i, eachable);
                }
            } else {
                for (var k in eachable) {
                    iterator.call(this_, eachable[k], k, eachable);
                }
            }
        },
        /**
         * 继承
         * @param {Object} subClass
         * @param {Object} superClass
         */
        inherits : function ( subClass, superClass ) {
            var oldP = subClass.prototype;
            var newP = utils.makeInstance( superClass.prototype );
            utils.extend( newP, oldP, true );
            subClass.prototype = newP;
            return ( newP.constructor = subClass );
        },

        /**
         * @param {Function} fn
         * @param {Object} this_
         */
        bind : function ( fn, this_ ) {
            return function () {
                return fn.apply( this_, arguments );
            };
        },

        /**
         * 创建延迟执行的函数
         * @param {Function} fn
         * @param {Number} delay
         * @param {Boolean?} exclusion 是否互斥执行
         */
        defer : function ( fn, delay, exclusion ){
            var timerID;
            return function () {
                if ( exclusion ) {
                    clearTimeout( timerID );
                }
                timerID = setTimeout( fn, delay );
            };
        },

        /**
         * 将s对象中的属性扩展到t对象上
         * @param {Object} t
         * @param {Object} s
         * @param {Boolean} b 是否保留已有属性
         * @returns {Object}
         */
        extend : function ( t, s, b ) {
            if (s) {
                for ( var k in s ) {
                    if (!b || !t.hasOwnProperty(k)) {
                        t[k] = s[k];
                    }
                }
            }
            return t;
        },

        /**
         * 查找元素在数组中的索引, 若找不到返回-1
         * @param {Array} array
         * @param {*} item
         * @param {Number?} at
         * @returns {Number}
         */
        indexOf : function ( array, item, at ) {
            at = at || 0;
            while ( at < array.length ) {
                if ( array[at] === item ) {
                    return at;
                }
                at ++;
            }
            return -1;
        },

        /**
         * 移除数组中的元素
         * @param {Array} array
         * @param {*} item
         */
        removeItem : function ( array, item ) {
            var k = array.length;
            if ( k ) while ( k -- ) {
                if ( array[k] === item ) {
                    array.splice(k, 1);
                    break;
                }
            }
        },

        /**
         * 删除字符串首尾空格
         * @param {String} str
         * @return {String} str
         */
        trim : function () {
            // "non-breaking spaces" 就是&nbsp;不能被捕获，所以不用\s
            var trimRegex = /(^[ \t\n\r]+)|([ \t\n\r]+$)/g;
            return function ( str ) {
                return str.replace( trimRegex, '' ) ;
            };
        }(),

        /**
         * 将字符串转换成hashmap, key由逗号分开
         * @param {String} list
         * @returns {Object}
         */
        listToMap : function ( list ) {
            if ( !list ) {
                return {};
            }
            var array = list.split( /,/g ),
                k = array.length,
                map = {};
            if ( k ) while ( k -- ) {
                map[array[k]] = 1;
            }
            return map;
        },

        /**
         * 将str中的html符号转义以用于放入html中
         * @param {String} str
         * @returns {String}
         */
        unhtml: function () {
            var map = { '<': '&lt;', '&': '&amp', '"': '&quot;', '>': '&gt;' };
            function rep( m ){ return map[m]; }
            return function ( str ) {
                return str ? str.replace( /[&<">]/g, rep ) : '';
            };
        }(),

        cssStyleToDomStyle : function(){
			var test = document.createElement( 'div' ).style,
				cssFloat =  test.cssFloat != undefined  ? 'cssFloat'
				: test.styleFloat != undefined ? 'styleFloat'
				: 'float',
                cache = { 'float': cssFloat };
            function replacer( match ){ return match.charAt( 1 ).toUpperCase(); }
			return function( cssName ) {
                return cache[cssName] || (cache[cssName] = cssName.toLowerCase().replace( /-./g, replacer ) );
			};
		}()
    };
})();
