
export const displayMap = locations => {

  mapboxgl.accessToken = 'pk.eyJ1IjoiaGllbjIwMDEiLCJhIjoiY2xnN28zdHpnMGxtczNtcXlvaWp6bzFyYiJ9.QH9nUBLO_6xt9wyjawE-HA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/hien2001/clg90kb67002s01qtmwab5ni7', // style URL
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p> Day ${loc.day}: ${loc.description} </p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100
    }
  });

}