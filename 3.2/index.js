
// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
cord = { lat: 48.42309721112298,  lng: -36.2587325452229 }

async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  fetch('rnd.json')
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((markers) => {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3,
      center: cord,
      mapId: "37467c5a4504d37e",
    });
    // const infoWindow = new InfoWindow();

    setMarkers(map, markers);
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
async function setMarkers(map, markers) {
  const  { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  
  
  for (let i = 0; i < markers.length; i++) {
    const beach = markers[i];
    const contentString = `
        <h1>${beach.title}</h1>
        <img src="${beach.contant.img}" >
        <p><strong>le bref</strong></br></br>${beach.contant.bref}</p>
        `
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    
    const pin = new PinElement({
      glyph: `${i + 1}`,
      scale: 1,
    });
    const marker = new AdvancedMarkerElement({
      position: beach,
      map,
      title: `${beach.title}`,
      content: pin.element,
      gmpClickable: true,
      content:beach.contente,

  });
  marker.addListener("click", ({ domEvent, latLng }) => {
    const { target } = domEvent;
    infowindow.close();
    infowindow.open({
      anchor: marker,
      map,
    });
  });


}

}

window.onload = initMap();