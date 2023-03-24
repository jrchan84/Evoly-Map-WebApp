// Latitude and longitudes of the worlds largest cities
const cities = [
    [57.15, -2.15], // Aberdeen, Scotland
    [-34.92, 138.60], // Adelaide, Australia
    [36.83, 3.00], // Algiers, Algeria
    [52.37, 4.88], // Amsterdam, Netherlands
    [39.92, 32.92], // Ankara, Turkey
    [-25.27, -57.67], // Asunción, Paraguay
    [37.97, 23.72], // Athens, Greece
    [-36.85, 174.75], // Auckland, New Zealand
    [13.75, 100.50], // Bangkok, Thailand
    [41.38, 2.18], // Barcelona, Spain
    [39.92, 116.42], // Beijing, China
    [-1.46, -48.48], // Belém, Brazil
    [54.62, -5.93], // Belfast, Northern Ireland
    [44.87, 20.47], // Belgrade, Serbia
    [52.50, 13.42], // Berlin, Germany
    [52.42, -1.92], // Birmingham, England
    [4.53, -74.25], // Bogotá, Colombia
    [19.00, 72.80], // Bombay, India
    [44.83, -0.52], // Bordeaux, France
    [53.05, 8.82], // Bremen, Germany
    [-27.47, 153.13], // Brisbane, Australia
    [51.47, -2.60], // Bristol, England
    [50.87, 4.35], // Brussels, Belgium
    [44.42, 26.12], // Bucharest, Romania
    [47.50, 19.08], // Budapest, Hungary
    [-34.58, -58.37], // Buenos Aires, Argentina
    [30.03, 31.23], // Cairo, Egypt
    [22.57, 88.40], // Calcutta, India
    [23.12, 113.25], // Canton, China
    [-33.93, 18.38], // Cape Town, South Africa
    [10.47, -66.92], // Caracas, Venezuela
    [4.82, -52.30], // Cayenne, French Guiana
    [28.62, -106.08], // Chihuahua, Mexico
    [29.77, 106.57], // Chongqing, China
    [55.67, 12.57], // Copenhagen, Denmark
    [-31.42, -64.18], // Córdoba, Argentina
    [14.67, -17.47], // Dakar, Senegal
    [-12.47, 130.83], // Darwin, Australia
    [11.50, 43.05], // Djibouti, Djibouti
    [53.33, -6.25], // Dublin, Ireland
    [-29.87, 31.00], // Durban, South Africa
    [55.92, -3.17], // Edinburgh, Scotland
    [50.12, 8.68], // Frankfurt, Germany
    [43.6532, -79.3832], // Toronto, Canada
    [45.5017, -73.5673], // Montreal, Canada
    [51.0486, -114.0708], // Calgary, Canada
    [49.2827, -123.1207], // Vancouver, Canada
    [33.7490, -84.3880], // Atlanta, USA
    [34.0522, -118.2437], // Los Angeles, USA
    [41.8781, -87.6298], // Chicago, USA
    [29.7604, -95.3698], // Houston, USA
    [39.9526, -75.1652], // Philadelphia, USA
    [42.3601, -71.0589], // Boston, USA
    [37.7749, -122.4194], // San Francisco, USA
    [47.6062, -122.3321], // Seattle, USA
    [32.7767, -96.7970], // Dallas, USA
    [40.7128, -74.0060], // New York City, USA
    [39.7392, -104.9903], // Denver, USA
    [36.1699, -115.1398], // Las Vegas, USA
    [43.6532, -79.3832], // Toronto, Canada
    [49.8951, -97.1384], // Winnipeg, Canada
    [53.5461, -113.4938], // Edmonton, Canada
    [45.5231, -122.6765], // Portland, USA
    [51.0447, -114.0719], // Airdrie, Canada
    [44.9778, -93.2650], // Minneapolis, USA
    [32.7157, -117.1611], // San Diego, USA
    [37.3382, -121.8863], // San Jose, USA
    [45.4215, -75.6972], // Ottawa, Canada
    [47.5615, -52.7126], // St. John's, Canada
    [33.4484, -112.0740], // Phoenix, USA
    [38.9072, -77.0369], // Washington, D.C., USA
    [49.2606, -123.2460], // Richmond, Canada
    [49.2827, -123.1207], // Vancouver, Canada
    [6.75, -58.25], // Lost the rest of the labels
    [6.75, -58.25],
    [55.833, -4.25],
    [14.617, -90.517],
    [-2.167, -79.933],
    [53.55, 10.033],
    [70.633, 23.633],
    [23.133, -82.383],
    [60.167, 25],
    [-42.867, 147.317],
    [22.333, 114.183],
    [-20.167, -70.117],
    [52.5, 104.333],
    [-6.267, 106.8],
    [-26.2, 28.067],
    [17.983, -76.817],
    [-4.3, 15.283],
    [3.133, 101.7],
    [-16.45, -68.367],
    [53.75, -1.5],
    [-12, -77.033],
    [38.733, -9.15],
    [53.417, -3],
    [51.533, -0.083],
    [45.75, 4.833],
    [40.433, -3.7],
    [53.5, -2.25],
    [14.583, 120.95],
    [43.3, 5.367],
    [23.2, -106.417],
    [21.483, 39.75],
    [-37.783, 144.967],
    [19.433, -99.117],
    [45.45, 9.167],
    [-34.883, -56.167],
    [55.75, 37.6],
    [48.133, 11.583],
    [32.8, 129.95],
    [35.117, 136.933],
    [-1.417, 36.917],
    [32.05, 118.883],
    [40.833, 14.25],
    [28.583, 77.2],
    [54.967, -1.617],
    [46.45, 30.8],
    [34.533, 135.5],
    [59.95, 10.7],
    [8.967, -79.533],
    [5.75, -55.25],
    [48.8, 2.333],
    [-31.95, 115.867],
    [50.083, -5.083],
    [-9.467, 147.133],
    [50.083, 14.433],
    [46.95, 7.45],
    [51.45, 7.267],
    [40.4, -3.683],
    [38.55, -121.5],
    [32.05, 34.75],
    [1.283, 103.85],
    [41.9, 12.483],
    [55.717, 12.567],
    [39.917, 32.85],
    [-34.583, -58.433],
    [45.05, 7.667],
    [43.933, 12.45],
    [52.25, 21],
    [-25.733, 28.183]
]

module.exports = cities;