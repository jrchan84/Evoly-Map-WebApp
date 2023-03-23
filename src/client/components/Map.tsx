import React, { useRef, useEffect, useState } from 'react';
import '../scss/map.scss';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoianJjaGFuIiwiYSI6ImNsZmpscmkyMDAyM2o0NWx6NTRrNTIyMnEifQ.j0wbrzIDQhtK9eeWPaLU3Q';

function Map() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return; // initialize map only once
			map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom
		});
	});

    return (
		<div className="map">
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}

export default Map;