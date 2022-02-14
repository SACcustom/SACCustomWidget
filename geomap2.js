(function () {

  loadScript();

  function loadScript() {

    console.log("Load script function");

    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://d3js.org/d3.v5.min.js';
    document.head.appendChild(script1);
    eval(script1);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = 'https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js';
    document.head.appendChild(script2);
    eval(script2);

    const script3 = document.createElement('script');
    script3.type = 'text/javascript';
    script3.src = 'https://unpkg.com/@turf/turf@6/turf.min.js';
    document.head.appendChild(script3);
    eval(script3);

    const script4 = document.createElement('script');
    script4.type = 'text/javascript';
    script4.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js';
    document.head.appendChild(script4);
    eval(script4);

    const script5 = document.createElement('script');
    script5.type = 'text/javascript';
    script5.src = 'https://cdn.jsdelivr.net/npm/gcoord@0.2.3/dist/gcoord.js';
    document.head.appendChild(script5);
    eval(script5);

  }

  let template = document.createElement("template");

  template.innerHTML = `
        <style>
            @import "https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css";
            @import "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css";
            
            body {
                margin: 0;
                padding: 0;
                font-family: "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
                color: #404040;
              }
          
              #map {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
              }
          
              #control-panel {
                position: absolute;
                background: #fff;
                border-radius: 4px;
                top: 0;
                left: 0;
                margin: 12px;
                padding: 20px;
                font-size: 12px;
                line-height: 1.5;
                z-index: 1;
              }

              .mapboxgl-popup {
                opacity: 0.9 !important;
              }
          
              .popup-kpi-row {
                text-align: center !important;
                display: flex !important;
              }
          
              .popup-kpi-col {
                width: 50% !important;
                margin: 5px;
              }
          
              .popup-post-code {
                text-align: center !important;
                width: 100%;
              }
          
              .popup-kpi-txt {
                color: gray !important;
                font-weight: 700 !important;
                font-size: 25px !important;
                line-height: 35px !important;
              }
          
              .popup-kpi-unit-txt {
                color: gray !important;
                font-weight: 700 !important;
                font-size: 15px !important;
                line-height: 30px !important;
              }
          
              .popup-post-code-txt {
                color: black !important;
                font-weight: 700 !important;
                font-size: 20px !important;
                line-height: 35px !important;
              }
          
              .popup-txt {
                color: black !important;
              }
          
              h2 {
                padding: 0px;
                margin: 0px;
              }
          
              label {
                display: inline-block;
                width: 140px;
              }          
        </style>

        <body>
        <div id="map"></div>
          <div id="control-panel">
            <div>
              <h2>Filters</h2>
            </div>
            <div>
              <label id="filter-amount">Filter Amount (&gt;&#61;)</label>
              <input id="filter-scrollbar" type="range" value="0"></input>
              <span id="filter-value"></span>
            </div>
          </div>
        </body>
    `;

  function load(data, _props, mapContainer, filterAmount, filterScrollbar, filterValue) {

    var centerCoordinates = _props["coordinates"];
    var minValue = _props["minvalue"];
    var maxValue = _props["maxvalue"];
    var kpiName = _props["KPIName"];

    let aCenterCoordinates = [];
    aCenterCoordinates[0] = parseFloat(centerCoordinates.split(',')[0]);
    aCenterCoordinates[1] = parseFloat(centerCoordinates.split(',')[1]);

    /* Given a query in the form "lng, lat" or "lat, lng"
    * returns the matching geographic coordinate(s) */
    const coordinatesGeocoder = function (query) {

      const matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
        return null;
      }

      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          place_name: 'Lat: ' + lat + ' Lng: ' + lng,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature'
        };
      }

      const coord1 = Number(matches[1]);
      const coord2 = Number(matches[2]);
      const geocodes = [];

      if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      return geocodes;
    };

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3Nhbm9ja2kiLCJhIjoiY2t3NTB6bWdsMDJ6djMxbDViMTR5OG5waSJ9.Fby0ouQeXSNX8UUqzaoCmw';

    var map = new mapboxgl.Map({
      container: mapContainer,
      // style: 'mapbox://styles/mapbox/light-v9',
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [-0.198465, 51.505538],
      center: aCenterCoordinates,
      zoom: 14,
      pitch: 40,
      antialias: true
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 4,
        placeholder: 'Enter location...',
        mapboxgl: mapboxgl,
        reverseGeocode: true
      })
    );

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl({visualizePitch: true}));

    var dataUrl = 'https://raw.githubusercontent.com/s-sanocki/PUIC/master/Geomap/mapbox_circles_extrusion/heatmap-data.csv';

    map.on('load', function () {

      filterAmount.innerHTML = kpiName + " (&gt;&#61;)";
      filterScrollbar.setAttribute("min", minValue);
      filterScrollbar.setAttribute("max", maxValue);
      filterScrollbar.setAttribute("step", "1");
      filterScrollbar.value = minValue;
      filterValue.innerHTML = minValue;

      filterScrollbar.onchange = (evt) => {
        var value = Number(evt.target.value);
        filterValue.innerHTML = value;
        map.setFilter('extrusion', ['>=', ['get', 'height'], value]);
      };

      // d3.csv(dataUrl).then(function (dataFetched) {

      var dataSource = {
        "type": "FeatureCollection",
        "features": []
      }

      //   dataFetched.forEach(function (dataRow) {
      //     dataSource.features.push(turf.point([dataRow.lng, dataRow.lat], {height: parseInt(dataRow.height), color: dataRow.color }));
      //   })

      var dataFetched = [];
      var json = JSON.parse(data);
      for (var i = 0; i < json.features.length; i++) {
        dataFetched = json.features.slice(0, Infinity).map(function (dataItem) {
          dataItem = gcoord.transform(dataItem, gcoord.AMap, gcoord.WGS84);
          return {
            coordinates: dataItem.geometry.coordinates,
            height: parseInt(dataItem.properties.Amount),
            value: dataItem.properties.Amount,
            city: dataItem.properties.City,
            zip: dataItem.properties.ZipCode,
            color: dataItem.properties.Contract,
          }
        });
      }

      dataFetched.forEach(function (dataRow) {
        dataSource.features.push(turf.point(dataRow.coordinates, { height: dataRow.height, color: dataRow.color, zip: dataRow.zip }));
      })

      map.addSource("coordinates", {
        "type": "geojson",
        "data": dataSource
      });

      // });

      map.addLayer({
        'id': 'extrusion',
        'type': 'fill-extrusion',
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": []
          }
        },
        'paint': {
          // 'fill-extrusion-color': '#00f',
          'fill-extrusion-color': ['get', 'color'],
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.9
        }
      });

      //popup
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: 'top',
      });

      map.on("mousemove", function (e) {

        var coordinates = [e.lngLat.lng, e.lngLat.lat];

        var query = map.queryRenderedFeatures(e.point, {
          layers: ["extrusion"]
        });

        if (query.length) {
          var properties = query[0].properties;
          var html = '<div class="popup-kpi-row">' + '<div class="popup-kpi-col">' + '<div class="popup-kpi-txt" style="color: green !important;">' + properties.height + '</div>'
            + '<div class="popup-kpi-unit-txt" style="color: green !important;">' + 'k USD' + '</div>' + '<div class="popup-txt">' + 'Debt' + '</div>' + '</div>'
            + '<div class="popup-kpi-col">' + '<div class="popup-kpi-txt">' + '1234' + '</div>' + '<div class="popup-kpi-unit-txt">' + 'cases' + '</div>'
            + '<div class="popup-txt">' + 'Exception' + '</div>' + '</div>' + '</div>'
            + '<div class="popup-kpi-row">' + '<div class="popup-kpi-col">' + '<div class="popup-kpi-txt">' + '4567' + '</div>' + '<div class="popup-kpi-unit-txt">' + 'tickets' + '</div>'
            + '<div class="popup-txt">' + 'Service' + '</div>' + '</div>' + '<div class="popup-kpi-col">' + '<div class="popup-kpi-txt">' + '8901' + '</div>'
            + '<div class="popup-kpi-unit-txt">' + 'k USD' + '</div>' + '<div class="popup-txt">' + 'Revenue' + '</div>' + '</div>' + '</div>'
            + '<hr>' + '<div class="popup-post-code">' + '<div class="popup-post-code-txt">' + properties.zip + '</div>' + '<img src="https://seekicon.com/free-icon-download/post_1.svg" width="10%" height="10%">' + '</div>';
          popup.setLngLat(coordinates)
            .setHTML(html)
            .addTo(map);
        } else {
          if (popup.isOpen() === true) {
            popup.remove();
          }
        }

      })

      map.on('sourcedata', function (e) {
        if (e.sourceId !== 'coordinates') return
        if (e.isSourceLoaded !== true) return

        var data = {
          "type": "FeatureCollection",
          "features": []
        }

        e.source.data.features.forEach(function (f) {
          var object = turf.centerOfMass(f)
          var center = object.geometry.coordinates
          var radius = 60;
          var options = {
            steps: 6,
            units: 'meters',
            properties: f.properties
          };
          data.features.push(turf.circle(center, radius, options))
        })
        map.getSource('extrusion').setData(data);
      })

    });

  }

  class Box extends HTMLElement {

    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._props = {};
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {

      if ("info" in this._props) {
        this.info = this._props["info"];
        var data = '{"type":"FeatureCollection","features":[' + this.info + "]}";
      }

      let shadowRoot = this._shadowRoot;

      if (this.info != null && this.info != '' && this.info != undefined) {
        load(data, this._props, shadowRoot.getElementById("map"), shadowRoot.getElementById("filter-amount"), shadowRoot.getElementById("filter-scrollbar"), shadowRoot.getElementById("filter-value"));
      }

    }

  }

  window.customElements.define("com-demo-gauge", Box);

})();
