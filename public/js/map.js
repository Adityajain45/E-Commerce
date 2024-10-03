

    /*{ let mapToken = mapToken;
  let mapToken = "<%= process.env.MAP_TOKEN %>";
  console.log(mapToken); }*/
  
mapboxgl.accessToken = mapToken;


const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});




if (coordinates[0] !== 0 && coordinates[1] !== 0) { // Only add a marker if coordinates are valid
  new mapboxgl.Marker({color: "red"})
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // Add a popup
        .setHTML("<h5>Exact Location will be provided after booking</h5>") // Set the popup content
    )
    .addTo(map);
} else {
  console.warn('Coordinates are missing or invalid, marker not added.');
}
console.log(coordinates);


