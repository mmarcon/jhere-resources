/*global jasmine:true,
  $:true,
  describe:true,
  beforeEach:true,
  it:true,
  expect:true
  spyOn:true,
  resetSpies: true
  _JSLALoader: true,
  SPIES: true,
  spyOn,
  spy
  */

describe('miniHERE', function(){
    beforeEach(function(){
        resetSpies();
        jasmine.getFixtures().set('<div id="map"></div>');
    });

    describe('map', function(){
        it('initializes the map', function(){
            //Spies on the constructors
            spyOn(nokia.maps.map, 'Display').andCallThrough();

            $('#map').miniHERE({
                enable: ['behavior'],
                zoom: 12,
                center: [52.5, 13.3],
                type: 'map',
                appId: 'monkey',
                authToken: 'chimpanzee'
            });

            /*1*/
            expect(nokia.maps.map.component.Behavior).toHaveBeenCalled();
            /*2*/
            expect(nokia.maps.map.component.ZoomBar).toHaveBeenCalled();
            /*3*/
            expect(nokia.maps.map.Display).toHaveBeenCalledWith($('#map')[0], jasmine.any(Object));
        });

        it('sets a new zoom level for the map', function(){
            $('#map').miniHERE({
                enable: ['behavior'],
                zoom: 12,
                center: [52.5, 13.3],
                type: 'map',
                appId: 'monkey',
                authToken: 'chimpanzee'
            });

            $('#map').miniHERE('zoom', 16);
            //SPIES.display_set is a spy called by `set`
            //method od Display
            /*4*/
            expect(SPIES.display_set).toHaveBeenCalledWith('zoomLevel', 16);
        });
    });

    describe('extensions', function(){
        it('executes extensions code', function(){
            var unicorn = spy('The unicorn function');
            $.miniHERE.extend('unicorn', unicorn);

            $('#map').miniHERE({
                enable: ['behavior'],
                zoom: 12,
                center: [52.5, 13.3],
                type: 'map',
                appId: 'monkey',
                authToken: 'chimpanzee'
            });

            $('#map').miniHERE('unicorn', 'pink');
            expect(unicorn).toHaveBeenCalledWith('pink');
        });
    });
});