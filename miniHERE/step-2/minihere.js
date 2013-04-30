;(function($, nokia){
    var plugin = 'miniHERE', defaults, P, H,
        _namespace = nokia, _namespace_maps = _namespace.maps,
        _credentials;
    /*
    Will hold default options for miniHERE
    */
    defaults = {
        appId: '69Dgg78qt4obQKxVbRA8',
        authToken: 'Nz7ilIB_v1CRwPXxgPdvuA',
        zoom: 12,
        center: [45.439,10.972]
    };

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
        this.element = element;
        /*
        Options for the current instance of the plugin
        this.options = {} <= defaults <= options
        */
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    H = miniHERE.prototype;

    H.init = function(){
        var self = this,
        options = self.options,
        components = [];

        /*First of all sort out the credential thingy*/
        _credentials = _credentials || {
            appId: options.appId,
            authenticationToken: options.authToken
        };
        _namespace_maps.util.ApplicationContext.set(_credentials);

        /*Setup the basic components*/
        /*1*/
        components.push(new _namespace_maps.map.component.Behavior());
        /*2*/
        components.push(new _namespace_maps.map.component.ZoomBar());

        /*3*/
        self.map = new _namespace_maps.map.Display(self.element, {
            zoomLevel: options.zoom,
            center: options.center,
            components: components
        });
    };

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