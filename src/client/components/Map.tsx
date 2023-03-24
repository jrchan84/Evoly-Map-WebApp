import React, { useRef, useEffect, useState } from 'react';
import { getDatasetsById } from '../api/dataset';
import mapboxgl from 'mapbox-gl';
import '../scss/map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

// @ts-ignore
import marker from '../icons/marker.svg';

// Public access token from mapboxgl (safe to expose)
mapboxgl.accessToken = 'pk.eyJ1IjoianJjaGFuIiwiYSI6ImNsZmpscmkyMDAyM2o0NWx6NTRrNTIyMnEifQ.j0wbrzIDQhtK9eeWPaLU3Q';

type Props = {
	selectedOption: string;
}

function Map({ selectedOption }: Props) {

	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-100);
	const [lat, setLat] = useState(44);
	const [zoom, setZoom] = useState(2);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (map.current) return; // initialize default map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom
		});
	}, []);

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		if (!selectedOption) return; // wait for selection to populate

		getDatasetsById(selectedOption).then((data) => {
			const features: any[] = [];
			data.points.forEach((point: any) => {
				const feat = {
					'type': 'Feature',
					'geometry': {
						'type': 'Point',
						'coordinates': [point.longitude, point.latitude]
					},
					'properties': {
						'title': point.iconType
					}
				}
				features.push(feat);
			});

			// clear mapContainer
			if (map.current) {
				map.current.remove();
			}

			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [lng, lat],
				zoom: zoom
			});
	
			map.current.on('load', () => {
				let img = new Image(20,20)
				img.onload = () => map.current.addImage('custom-marker', img)
				img.src = marker
	
				map.current.addSource('points', {
					'type': 'geojson',
					'data': {
						'type': 'FeatureCollection',
						'features': features
					}
				});
					 
				// Add a symbol layer
				map.current.addLayer({
					'id': 'points',
					'type': 'symbol',
					'source': 'points',
					'layout': {
						'icon-image': 'custom-marker',
					},
					'paint': {
						'icon-color': '#27ba50'
					}
				});

				map.current.on('click', 'points', (e: any) => {
					// Copy coordinates array.
					const coordinates = e.features[0].geometry.coordinates.slice();
					const title = e.features[0].properties.title;
					 
					// Ensure that if the map is zoomed out such that multiple
					// copies of the feature are visible, the popup appears
					// over the copy being pointed to.
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}
					 
					new mapboxgl.Popup()
					.setLngLat(coordinates)
					.setHTML(title)
					.addTo(map.current);
				});
			});
		});
	}, [selectedOption]);

    return (
		<div className="map">
			<div className="map-sidebar">
			Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Count: {count}
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}

export default Map;