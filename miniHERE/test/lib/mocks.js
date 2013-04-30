/*global jasmine:true*/
var resetMocks, resetSpies, spy, nokia = {}, SPIES = {}, ThirdPartyLoader;

(function(){

    var _spy = function(name) {
        return jasmine.createSpy(name);
    };

    var _resetMocks = function(){
        var map;

        window.ThirdPartyLoader = ThirdPartyLoader = {};

        //Mock the promise-based loaded
        ThirdPartyLoader.load = function(){
            return {
                is: {
                    done: function(fn) {
                        fn();
                    }
                }
            };
        };

        //JSLA
        nokia.maps = {
            util: {
                ApplicationContext: {
                    set: spy('ApplicationContext.set')
                }
            }
        };
        nokia.maps.positioning = {
            component: {
                Positioning: spy('Positioning')
            }
        };
        SPIES.component_infobubbles_openbubble = spy('[component] open info bubble');
        SPIES.component_infobubbles_closeall = spy('[component] closeall info bubbles');
        map = nokia.maps.map = {
            component: {
                Behavior: spy('[component] Behavior'),
                ZoomBar: spy('[component] ZoomBar'),
                zoom: {},
                InfoBubbles: function(){
                    this.openBubble = function(){
                        SPIES.component_infobubbles_openbubble.apply(this, arguments);
                    };
                    this.closeAll = function(){
                        SPIES.component_infobubbles_closeall.apply(this, arguments);
                    };
                }
            }
        };

        SPIES.container_objects_add = spy('[container] add to objects');
        SPIES.container_objects_clear = spy('[container] clear to objects');
        SPIES.container_objects_get = spy('[container] get object');
        SPIES.container_objects_getbbox = spy('[container] get bbox');

        map.Container = function(){
            this.objects = {
                add: function(){ SPIES.container_objects_add.apply(this, arguments); },
                clear: function(){ SPIES.container_objects_clear.apply(this, arguments); },
                get: function(){
                    SPIES.container_objects_get.apply(this, arguments);
                    return {
                        getBoundingBox: function(){
                            SPIES.container_objects_getbbox.apply(this, arguments);
                            return 'bbox';
                        }
                    };
                }
            };
        };

        SPIES.display_objects_add = spy('[map] add to objects');
        SPIES.display_overlays_add = spy('[map] add to overlays');
        SPIES.display_set = spy('[map] set property');
        SPIES.display_addListeners = spy('[map] add add listeners');
        SPIES.display_destroy = spy('[map] destroy');
        SPIES.display_setCenter = spy('[map] setCenter');
        SPIES.display_getComponentById = spy('[map] getComponentById');
        SPIES.display_addComponent = spy('[map] addComponent');
        SPIES.display_zoomTo = spy('[map] zoomTo');

        SPIES.args = {
            map_normal: {t:1},
            map_satellite: {t:2},
            map_smart: {t:3},
            map_terrain: {t:4},
            map_smartpt: {t:5},
            map_normalcommunity: {t:6},
            map_satellitecommunity: {t:7},
            map_traffic: {t:8}
        };

        map.Display = function(){
            this.objects = {
                add: function(){ SPIES.display_objects_add.apply(this, arguments); }
            };
            this.set = function(){ SPIES.display_set.apply(this, arguments); };
            this.addListeners = function(){ SPIES.display_addListeners.apply(this, arguments); };
            this.destroy = function(){ SPIES.display_destroy.apply(this, arguments); };
            this.center = {};
            this.setCenter = function(center){
                this.center = center;
                SPIES.display_setCenter.apply(this, arguments);
            };
            this.addComponent = function(component){
                SPIES.display_addComponent.apply(this, arguments);
                return component;
            };
            this.zoomTo = function(zoom){
                this.zoomLevel = zoom;
                SPIES.display_zoomTo.apply(this, arguments);
            };
            this.overlays = {
                add: function(){ SPIES.display_overlays_add.apply(this, arguments); }
            };

            this.NORMAL = SPIES.args.map_normal;
            this.SATELLITE = SPIES.args.map_satellite;
            this.SMARTMAP = SPIES.args.map_smart;
            this.TERRAIN = SPIES.args.map_terrain;
            this.SMART_PT = SPIES.args.map_smartpt;
            this.NORMAL_COMMUNITY = SPIES.args.map_normalcommunity;
            this.SATELLITE_COMMUNITY = SPIES.args.map_satellitecommunity;
            this.TRAFFIC = SPIES.args.map_traffic;
        };

        map.Display.prototype.getComponentById = function(){ SPIES.display_getComponentById.apply(this, arguments); };

        map.Marker = function(){};
        map.StandardMarker = function(){};

        nokia.maps.kml = {};
        nokia.maps.kml.component = {};

        SPIES.kmlmgr_addObserver = spy('[kml manager] addObserver');
        SPIES.kmlmgr_parseKML = spy('[kml manager] parseKML');

        nokia.maps.kml.Manager = function(){
            this.observers = {};
            this.addObserver = function(event, callback){
                //Need to trigger the event somehow
                this.observers[event] = callback;
                SPIES.kmlmgr_addObserver.apply(this, arguments);
            };
            this.parseKML = function(){
                //Trigger callback immediately
                if(typeof this.observers.state === 'function') {
                    this.observers.state(this);
                }
                SPIES.kmlmgr_parseKML.apply(this, arguments);
            };
            this.state = 'finished'; //No need to have other states for mocking purposes
            this.kmlDocument = 'mockeddocument';
        };

        SPIES.kmlresultset_addObserver = spy('[kml resultset] addObserver');
        SPIES.kmlresultset_create = spy('[kml resultset] create');

        nokia.maps.kml.component.KMLResultSet = function(){
            this.observers = {};
            this.addObserver = function(event, callback){
                //Need to trigger the event somehow
                this.observers[event] = callback;
                SPIES.kmlresultset_addObserver.apply(this, arguments);
            };
            this.create = function() {
                if(typeof this.observers.state === 'function') {
                    this.observers.state(this);
                }
                SPIES.kmlresultset_create.apply(this, arguments);
            };
            this.state = 'finished'; //No need to have other states for mocking purposes
            this.container = new map.Container();
        };

        nokia.maps.heatmap = {};

        SPIES.heatmap_addData = spy('[heatmap] addData');

        nokia.maps.heatmap.Overlay = function(){
            this.addData = function(){ SPIES.heatmap_addData.apply(this, arguments); };
        };
    };


    resetMocks = _resetMocks;

    resetSpies = function(){
        for (var s in SPIES) {
            if(SPIES.hasOwnProperty(s) && SPIES[s].reset) {
                SPIES[s].reset();
            }
        }
    };

    spy = _spy;

    _resetMocks();
})();