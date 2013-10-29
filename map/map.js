var map;
var lisbon = new google.maps.LatLng(38.76265, -9.21753);
var infoBubble;

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

  var featureOpts = [
    {
      stylers: [
        { visibility: 'simplified' },
        { gamma: 0.7 },
        { weight: 0.3 },
        { saturation: -100 }
      ]
    },
    {
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'water',
      stylers: [
        { color: '#eeeeee' }
      ]
    }
  ];

  var mapOptions = {
      zoom: 5,
      scrollwheel: false,
      center: lisbon,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeId: [MY_MAPTYPE_ID]
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      mapTypeId: MY_MAPTYPE_ID
  };

  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  var styledMapOptions = {
      name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);


  // Markers

  var image = 'map/map_pin.png';

  var istLatLng = new google.maps.LatLng(38.73763, -9.13910); 
  var isegLatLng = new google.maps.LatLng(38.71244, -9.15496);
  var isaLatLng = new google.maps.LatLng(38.7107, -9.1814);
  var faLatLng = new google.maps.LatLng(38.7144, -9.1917);
  var esesjcLatLng = new google.maps.LatLng(32.66678, -16.90475);
  var iscteLatLng = new google.maps.LatLng(38.74803, -9.15338);

  var istMarker = new google.maps.Marker({
      position: istLatLng,
      map: map,
      icon: image,
      title: 'Instituto Superior Técnico'
  });

  var isegMarker = new google.maps.Marker({
      position: isegLatLng,
      map: map,
      icon: image,
      title: 'Lisboa School of Economics & Management'
  });

  var isaMarker = new google.maps.Marker({
      position: isaLatLng,
      map: map,
      icon: image,
      title: 'Instituto Superior de Agronomia'
  });

  var faMarker = new google.maps.Marker({
      position: faLatLng,
      map: map,
      icon: image,
      title: 'Faculdade de Arquitetura de Lisboa'
  });

  var esesjcMarker = new google.maps.Marker({
      position: esesjcLatLng,
      map: map,
      icon: image,
      title: 'São José de Cluny Nursing School'
  });

  var iscteMarker = new google.maps.Marker({
      position: iscteLatLng,
      map: map,
      icon: image,
      title: 'ISCTE - University Institute of Lisbon'
  });

  var bounds = new google.maps.LatLngBounds(isaLatLng, iscteLatLng);
      map.fitBounds(bounds);

  // InfoBubbles

  var istContentString = '<a href="http://www.ist.utl.pt">'+
      '<div class="schoolLogo">'+
      '<img src="map/logos/logo_school_ist.png" alt="Instituto Superior Técnico">'+
      '</div>'+
      '<hr />'+
      '<span>65148 Users</span>'+
      '</a>';

  var isegContentString = '<a href="http://aquila.iseg.utl.pt/">'+
      '<div class="schoolLogo">'+
      '<img src="map/logos/logo_school_iseg.png" alt="Lisboa School of Economics & Management">'+
      '</div>'+
      '<hr />'+
      '<span>3333 Users</span>'+
      '</a>';

  var isaContentString = '<a href="http://www.isa.utl.pt">'+
      '<div class="schoolLogo">'+
      '<img src="map/logos/logo_school_isa.png" alt="Instituto Superior de Agronomia">'+
      '</div>'+
      '<hr />'+
      '<span>9296 Users</span>'+
      '</a>';

  var faContentString = '<a href="http://www.fa.utl.pt/">'+
      '<div class="schoolLogo">'+
      '<img src="map/logos/logo_school_fa.png" alt="Faculdade de Arquitetura de Lisboa" width="48" height="auto">'+
      '</div>'+
      '<hr />'+
      '<span>666 Users</span>'+
      '</a>';

  var esesjcContentString = '<a href="http://www.esesjcluny.pt/">'+
      '<div class="schoolLogo">'+
      '<img src="map/logos/logo_school_esesjc.png" alt="São José de Cluny Nursing School">'+
      '</div>'+
      '<hr />'+
      '<span>1447 Users</span>'+
      '</a>';

  var iscteContentString = '<a href="http://www.iscte-iul.pt">'+
      '<div class="schoolLogo">'+
      '<img src="map/logos/logo_school_iscte.png" alt="ISCTE - University Institute of Lisbon">'+
      '</div>'+
      '<hr />'+
      '<span>52488 Users</span>'+
      '</a>';

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

  var istBubble = new InfoBubble(
    merge_options({
      position: istLatLng,
      content: istContentString
  },bubbleOptions));

  var isegBubble = new InfoBubble(
    merge_options({
      position: isegLatLng,
      content: isegContentString
  },bubbleOptions));

  var isaBubble = new InfoBubble(
    merge_options({
      position: isaLatLng,
      content: isaContentString
  },bubbleOptions));

  var faBubble = new InfoBubble(
    merge_options({
      position: faLatLng,
      content: faContentString
  },bubbleOptions));

  var esesjcBubble = new InfoBubble(
    merge_options({
      position: esesjcLatLng,
      content: esesjcContentString
  },bubbleOptions));

  var iscteBubble = new InfoBubble(
    merge_options({
      position: iscteLatLng,
      content: iscteContentString
  },bubbleOptions));

//google.maps.event.addListener(istMarker, 'click', function() {
  istBubble.open(map, istMarker);
//});
//google.maps.event.addListener(isegMarker, 'click', function() {
  isegBubble.open(map, isegMarker);
//});
//google.maps.event.addListener(isaMarker, 'click', function() {
  isaBubble.open(map, isaMarker);
//});
//google.maps.event.addListener(faMarker, 'click', function() {
  faBubble.open(map, faMarker);
//});
//google.maps.event.addListener(esesjcMarker, 'click', function() {
  esesjcBubble.open(map, esesjcMarker);
//});
//google.maps.event.addListener(iscteMarker, 'click', function() {
  iscteBubble.open(map, iscteMarker);
//});

}

// Functions Aux.

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

google.maps.event.addDomListener(window, 'load', initialize);