(function(window) {

  var schools = [
    { name: "Técnico Lisboa",
      url: "http://tecnico.ulisboa.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_ist.png",
      location: [ 38.73763 , -9.13910 ],
      z: 20,
      numUsers: 65148 },
      
    { name: "Lisboa School of Economics & Management",
      url: "http://aquila.iseg.utl.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_iseg.png",
      location: [ 38.71244 , -9.15496 ],
      z: 19,
      numUsers: 3694 },

    { name: "Instituto Superior de Agronomia",
      url: "http://www.isa.utl.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_isa.png",
      location: [ 38.7107,  -9.1814 ], 
      z: 18,
      numUsers: 9296 },

    { name: "Faculdade de Arquitetura de Lisboa",
      url: "http://www.fa.utl.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_fa.png",
      location: [ 38.7144,  -9.1917 ], 
      z: 17,
      numUsers: 666 },

    { name: "São José de Cluny Nursing School",
      url: "http://www.esesjcluny.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_esesjc.png",
      location: [ 32.66678 , -16.90475],
      z: 16,
      numUsers: 1447 },

    { name: "ISCTE - University Institute of Lisbon",
      url: "http://www.iscte-iul.pt",
      imagePin: "map/map_pin.png",
      logo: "logo_school_iscte.png",
      location: [ 38.74803 , -9.15338 ],
      z: 15,
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

  var map;

  var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(38.7107, -9.15338), new google.maps.LatLng(38.74803, -9.15338));

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
    zoom: 3,
    center: new google.maps.LatLng(39.76678 , -15.90475),
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
    minWidth: 195,
    maxWidth: 195,
    minHeight: 122,
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
      var contentString = '<a href='+school["url"]+'><div class="schoolLogo" data-bubble-id="'+i+'"><img src="map/logos/'+school["logo"]+'" alt="'+school["name"]+'"></div><span>'+school["numUsers"]+' Users</span></a>';

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
          content: contentString,
          zIndex: school["z"]
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
        map.setZoom(12);
      });

      $(bubble.bubble_).click(function() {
        var i = $(".schoolLogo", this).data("bubble-id");
        if(bubbles[i]) {
          bubbles[i].close();          
        }
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

    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);

    var subMap = window.subMap = new google.maps.Map(document.getElementById('submap'), subMapOptions);
    subMap.mapTypes.set(FENIXEDU_MAPTYPE_ID, fenixEduMapStyle);
    subMap.setMapTypeId(FENIXEDU_MAPTYPE_ID);

    populateSchoolMarkers(map, subMap, schools);
    google.maps.event.addListenerOnce(subMap, 'idle', function() {
      $(".gmnoprint", "#submap").hide();
      $($(".gm-style", "#submap").children()[1]).hide();
    });

    google.maps.event.addDomListener(map, 'click', function() {
      for(var i = 0; i < bubbles.length; i++) {
        bubbles[i].close();
      }
    });


  };

  google.maps.event.addDomListener(window, 'load', initialize);



})(this);



