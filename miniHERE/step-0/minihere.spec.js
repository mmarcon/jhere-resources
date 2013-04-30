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
  spyOn
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
    });
});