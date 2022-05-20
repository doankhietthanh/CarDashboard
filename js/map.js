navigator.geolocation.getCurrentPosition(function (position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  initMap(lat, long);
});

const initMap = async (lat, long) => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 18,
  });

  const marker = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
    // icon: {
    //   path: google.maps.SymbolPath.CIRCLE,
    //   fillColor: "orange",
    //   fillOpacity: 0.2,
    //   strokeColor: "red",
    //   strokeWeight: 0.8,
    //   scale: Math.sqrt(country_data) / 10,
    // },
  });

  const infowindow = new google.maps.InfoWindow({
    content: "<p>Marker Location:" + marker.getPosition() + "</p>",
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });
};

window.initMap = initMap;
