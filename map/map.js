(function(window) {

  var schools = [
    { name: "Instituto Superior Técnico",
      url: "http://ist.utl.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_ist.png",
      location: [ 38.73763 , -9.13910 ],
      z: 6,
      numUsers: 65148
    },
    { name: "ISEG",
      url: "http://aquila.iseg.utl.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_iseg.png",
      location: [ 38.71244 , -9.15496 ],
      z: 5,
      numUsers: 3333 },

    { name: "ISA",
      url: "http://www.isa.utl.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_isa.png",
      location: [ 38.7107,  -9.1814 ], 
      z: 4,
      numUsers: 9296 },

    { name: "FA",
      url: "http://www.fa.utl.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_fa.png",
      location: [ 38.7144,  -9.1917 ], 
      z: 3,
      numUsers: 666 },

    { name: "ESESJC",
      url: "http://www.esesjcluny.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_esesjc.png",
      location: [ 32.66678 , -16.90475],
      z: 2,
      numUsers: 1447 },

    { name: "ISCTE",
      url: "http://www.iscte-iul.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_iscte.png",
      location: [ 38.74803 , -9.15338 ],
      z: 1,
      numUsers: 52488 }];

  var featureOpts = [
    {
      stylers: [
        { visibility: 'simplified' },
        { gamma: 0.7 },
        { weight: 0.3 },
        { saturation: -100 }]},
    {
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }]},
    {
      featureType: 'water',
      stylers: [
        { color: '#eeeeee' }]}
  ];

  var FENIXEDU_MAPTYPE_ID = 'fenixedu_style';

  var mapOptions = {
    zoom: 5,
    scrollwheel: false,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeId: [FENIXEDU_MAPTYPE_ID]
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    mapTypeId: FENIXEDU_MAPTYPE_ID
  };

  var subMapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(32.66678 , -16.90475),
    scrollwheel: false,
    panControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeId: [FENIXEDU_MAPTYPE_ID]
    },
    zoomControl: false,
    mapTypeId: FENIXEDU_MAPTYPE_ID
  };

  var bubbleOptions = {
    map: map,
    shadowStyle: 0,
    padding: 12,
    maxWidth: 180,
    maxHeight: 100,
    backgroundColor: '#19accd',
    borderRadius: 0,
    borderWidth: 0,
    disableAutoPan: true,
    hideCloseButton: true,
    backgroundClassName: 'bubbleContent',
    arrowPosition: 50,
    arrowSize: 10,
    arrowStyle: 0
  };

  var fenixEduMapStyle = new google.maps.StyledMapType(featureOpts, { name: 'FenixEdu Style'});

  var imagePin = 'map/map_pin.png';

  var map;

  var markers = window.markers = [];
  var bubbles = [];

  var mergeObjects = function(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  };

  var populateSchoolMarkers = function(map, submap, schools) {
    for(var i = 0; i < schools.length; i++) {
      var school = schools[i];
      var location = school["location"];
      var imagePin = school["imagePin"];
      var latLon = new google.maps.LatLng(location[0], location[1]);
      var contentString = '<a href='+school["url"]+'><div class="schoolLogo"><img src="map/logos/'+school["logo"]+'" alt="'+school["name"]+'"></div><hr/><span>'+school["numUsers"]+'</span></a>';

      var marker = new google.maps.Marker({
        position: latLon,
        map: map,
        icon: imagePin,
        title: school["name"],
        zIndex: school["z"]
      });

      var subMarker = new google.maps.Marker({
        position: latLon,
        map: submap,
        icon: imagePin,
        title: school["name"]
      });

      var bubble = new InfoBubble(
        mergeObjects({
          position: latLon,
          content: contentString
        }, bubbleOptions));

      bubble.open(map, marker);

      markers.push(marker);
      bubbles.push(bubble);

      google.maps.event.addListener(marker, 'click', function() {
        var bubble = bubbles[markers.indexOf(this)];
        bubble.open();          
      });

      google.maps.event.addListener(subMarker, 'click', function() {
        map.setCenter(this.getPosition());
        map.setZoom(11);
      });

    }
  };

  var onZoomChange = function() {
    var zoomLevel = map.getZoom();
    if(zoomLevel >= 14) {
      for(var i = 0; i < bubbles.length; i++) {
        var bubble = bubbles[i];
        bubble.open();
      }
    } else {
      for(var i = 0; i < bubbles.length; i++) {
        var bubble = bubbles[i];
        bubble.close();
      }
    }
    
  };

  var initialize = function() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    google.maps.event.addListener(map, 'zoom_changed', onZoomChange);
    map.mapTypes.set(FENIXEDU_MAPTYPE_ID, fenixEduMapStyle);
    map.setMapTypeId(FENIXEDU_MAPTYPE_ID);

    var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(38.7107, -9.15338), new google.maps.LatLng(38.74803, -9.15338));
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);

    var subMap = window.subMap = new google.maps.Map(document.getElementById('submap'), subMapOptions);
    subMap.mapTypes.set(FENIXEDU_MAPTYPE_ID, fenixEduMapStyle);
    subMap.setMapTypeId(FENIXEDU_MAPTYPE_ID);

    populateSchoolMarkers(map, subMap, schools);

  };

  google.maps.event.addDomListener(window, 'load', initialize);

})(this);



