;(function($, doc, nokia){
    var plugin = 'miniHERE', defaults, P, H, ThirdPartyLoader = window.ThirdPartyLoader,
        _namespace = nokia || {}, _namespace_maps = _namespace.maps,
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
        ThirdPartyLoader.load().is.done($.proxy(function(){
            this.init();
        }, this));
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

    H.zoom = function(newZoomLevel){
        this.map.set('zoomLevel', newZoomLevel);
    };

    function isFunction(fn){
        return typeof fn === 'function';
    }

    //Dependency injection support for testing
    if (!ThirdPartyLoader) {
        ThirdPartyLoader = {};
        ThirdPartyLoader.is = false;
        ThirdPartyLoader.load = function(){
            var head, thirdParty, _load;
            if(ThirdPartyLoader.is &&
               ThirdPartyLoader.is.state().match(/pending|resolved/)) {
                /*Loading is already in progress*/
                return this;
            }
            ThirdPartyLoader.is = $.Deferred();
            _load = function(){
                _namespace = window.nokia;
                _namespace_maps = _namespace.maps;
                //Additional lazy loading done by 3rd party
                _namespace_maps.Features.load(
                    {map: 'auto', kml: 'auto', heatmap: 'auto'},
                    function(){
                        /*Resolve the Deferred*/
                        ThirdPartyLoader.is.resolve();
                    }
                );
            };
            head = doc.getElementsByTagName('head')[0];
            thirdParty = doc.createElement('script');
            thirdParty.src = 'http://api.maps.nokia.com/2.2.4/jsl.js';
            thirdParty.onload = _load;
            head.appendChild(thirdParty);

            return this; //<= ThirdPartyLoader.load().is.done(doStuff);
        };
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
                /*Only when 3rd party code is loaded, call method*/
                ThirdPartyLoader.load().is.done(function(){
                    pluginObj[method].apply(pluginObj, args);
                });
            }
        });
    };
})(jQuery, document, window.nokia);