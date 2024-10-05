
// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
cord = { lat: 48.960488945948185, lng: 2.5478907124310757 }

async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  fetch('markersJrostand.json')
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((markers) => {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: cord,
      mapId: "37467c5a4504d37e",
    });
    const infoWindow = new InfoWindow();

    setMarkers(map, markers, infoWindow);
  })
  .catch((error) => {
    console.error('Error fetching markers:', error);
  });
  // $.ajax({
  //   url: 'markersJrostand.json', // URL to send the request to
  //   type: 'GET', // HTTP method (GET, POST, etc.)
  //   dataType: 'json', // Expected data format from the server
  //   success: function (markers) {
  //     //console.log(data);
  //     // init map
  //     const map = new Map(document.getElementById("map"), {
  //       zoom: 15 ,
  //       center:  cord,
  //       mapId: "37467c5a4504d37e",
  //     });


  //     setMarkers(map,markers);
      
  //   }
    
  // });
}





// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
async function setMarkers(map, markers, infoWindow) {
  const  { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  
      
  for (let i = 0; i < markers.length; i++) {
    const beach = markers[i];

    const pin = new PinElement({
      glyph: `${i + 1}`,
      scale: 1,
    });
    const marker = new AdvancedMarkerElement({
      position: beach,
      map,
      title: `${i+1}`,
      content: pin.element,
      gmpClickable: true,


  });
  marker.addListener("click", ({ domEvent, latLng }) => {
    const { target } = domEvent;
    alert(`Vous avez clicer sur le marker ${marker.title}`)
  });


}
  const flightPath = new google.maps.Polyline({
    path: markers,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

}

window.onload = initMap();