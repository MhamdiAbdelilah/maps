
window.onloadstart = initMap();
// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
cord = { lat: 48.960488945948185, lng: 2.5478907124310757 }

async function initMap(couse = 0) {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  $.ajax({
    url: 'cours.json', // URL to send the request to
    type: 'GET', // HTTP method (GET, POST, etc.)
    dataType: 'json', // Expected data format from the server
    success: function (data) {
      //console.log(data);
      data = data[couse]
      // init map
      const map = new Map(document.getElementById("map"), {
        zoom: data["zoom"],
        center:  data["mapcenter"],
        mapId: "37467c5a4504d37e",
      });

      const infoWindow = new InfoWindow();

      setMarkers(map,data["markers"],infoWindow);
      
    }
    
  });
}





// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
async function setMarkers(map, data ,infoWindow) {
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  
      
      for (let i = 0; i < data.length; i++) {
        const beach = data[i];

        const pin = new PinElement({
          glyph: `${i + 1}`,
          scale: 1,
        });
        const marker = new AdvancedMarkerElement({
          position: beach,
          map,
          title: `${beach["title"]}`,
          content: pin.element,
          gmpClickable: true,


      });
      marker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;

        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      });
    
    
    }
      const flightPath = new google.maps.Polyline({
        path: data,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      flightPath.setMap(map);

}
