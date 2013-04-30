;(function($, nokia){
    var plugin = 'miniHERE', defaults, P, H;

    /*
    Will hold default options for miniHERE
    */
    defaults = {};

    /*
    This gives us $.miniHERE
    Convenient for utility functions
    that should not be part of jQuery
    objects' prototype.
    */
    $[plugin] = P = {};

    /*
    This is the constructor of our plugin,
    */
    function miniHERE(element, options){
        this.init();
    }

    H = miniHERE.prototype;

    H.init = function(){};

    function isFunction(fn){
        return typeof fn === 'function';
    }

    /*Provides $('selector').miniHERE();*/
    $.fn[plugin] = function(optionsOrMethod) {
        var args = arguments, key = 'plg_' + plugin, pluginObj;

        /*N1 rule of plugins: maintain chainability!*/
        return this.each(function() {
            var method;
            /*Is miniHERE already initialized on this DOM element?*/
            pluginObj = $.data(this, key);
            if (!pluginObj) {
                /*Plugin instantiation:
                $('myelement').miniHERE({center: [45.439,10.972]});*/
                pluginObj = new miniHERE(this, optionsOrMethod);
                $.data(this, key, pluginObj);
            } else {
                /*Method calls on plugin: $('myelement').miniHERE('zoom', 12);*/
                if (typeof optionsOrMethod !== 'string') {
                    $.error(plugin + ' already initialized, expected method.');
                }
                method = optionsOrMethod;
                args = Array.prototype.slice.call(args, 1);
                if (!isFunction(pluginObj[method])) {
                    $.error(plugin + ': ' + method + ' does not exist');
                }
                pluginObj[method].apply(pluginObj, args);
            }
        });
    };
})(jQuery, nokia);