import React, { useRef, useEffect, useState } from 'react';
import { getDatasetsById } from '../api/dataset';
import { Dataset, IconPoint, Point } from '../../shared/models/dataset';
import mapboxgl from 'mapbox-gl';
import svgMap from '../icons/icons';
import '../scss/map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * MapBox public token. This is safe and necessary to expose in the client.
 * Safegaurds to prevent malicious usage is done through url-restrictions and periodically rotating tokens.
 */
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN ?? '';

type Props = {
	selectedOption: string;
}

function MapBox({ selectedOption }: Props) {

	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-100);
	const [lat, setLat] = useState(44);
	const [zoom, setZoom] = useState(2);

	/**
	 * Initialize default map on load
	 */
	useEffect(() => {
		if (map.current) return; // initialize default map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom
		});
	}, []);

	/**
	 * Update lat, lon, zoom values on map move
	 */
	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});

	/**
	 * Create source and style layers when a dataset is selected
	 */
	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		if (!selectedOption) return; // wait for selection to populate

		// Map to seperate associated points in dataset with icon-type
		const iconMap: Map<string, Point[]> = new Map();

		// fetch Dataset from server
		getDatasetsById(selectedOption).then((data: Dataset) => {

			data.iconPoints.forEach((set: IconPoint) => {
				iconMap.set(set.iconType, set.points);
			});

			svgMap.forEach((_, key) => {
				// Remove any existing layers and source
				if (map.current.getLayer(key)) {
					map.current.removeLayer(key);
				}
				if (map.current.getSource(key)) {
					map.current.removeSource(key);
				}
			})

			// for each icon-type, create source and style layer
			iconMap.forEach((points, iconType) => {

				// Add icon svg once when encountered
				if (!map.current.hasImage(iconType)) {
					let img = new Image(20,20)
					img.onload = () => map.current.addImage(iconType, img)
					img.src = svgMap.get(iconType);
				}

				const features: any[] = [];
				points.forEach((point: Point) => {
					const feat = {
						'type': 'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [point.longitude, point.latitude]
						},
						'properties': {
							'title': iconType
						}
					};
					features.push(feat);
				});

				// Add a source layer
				map.current.addSource(iconType, {
					'type': 'geojson',
					'data': {
						'type': 'FeatureCollection',
						'features': features
					},
					'cluster': true,
            		'clusterRadius': 50,
					'clusterMaxZoom': 3 // interpolated to 4
				});
						
				// Add a symbol layer
				map.current.addLayer({
					'id': iconType,
					'type': 'symbol',
					'source': iconType,
					'layout': {
						'icon-image': iconType,
						'icon-size': ['step', ['zoom'], 1.5, 3, 1.25, 4, 1],
						'icon-allow-overlap': ['step', ['zoom'], false, 4, true]
					}
				});

				// Set popup with icon-type title to display on click
				map.current.on('click', iconType, (e: any) => {
					// Copy coordinates array.
					const coordinates = e.features[0].geometry.coordinates.slice();
						
					// Ensure that if the map is zoomed out such that multiple
					// copies of the feature are visible, the popup appears
					// over the copy being pointed to.
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}
						
					new mapboxgl.Popup()
						.setLngLat(coordinates)
						.setHTML(iconType)
						.addTo(map.current);
				});

			})
		});
	}, [selectedOption]);

    return (
		<div className="map">
			<div className="map-sidebar">
			Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}

export default MapBox;