  
(function () {
	
            LoadScript();
             function LoadScript() {
		console.log("Load script funcation");
                const script2 = document.createElement('script');
                script2.type = 'text/javascript';
                script2.src = 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.6/build/dat.gui.min.js';
                document.head.appendChild(script2);
                eval(script2);

                const script1 = document.createElement('script');
                script1.type = 'text/javascript';
                script1.src = 'https://cdn.jsdelivr.net/npm/gcoord@0.2.3/dist/gcoord.js';
                document.head.appendChild(script1);
                eval(script1);

                const script4 = document.createElement('script');
                script4.type = 'text/javascript';
                script4.src = 'https://maptalks.org/maptalks.three/demo/js/maptalks.js';
                document.head.appendChild(script4);
                eval(script4);

                const script5 = document.createElement('script');
                script5.type = 'text/javascript';
                script5.src = 'https://cdn.jsdelivr.net/npm/three@0.104.0/build/three.min.js';
                document.head.appendChild(script5);
                eval(script5);

                setTimeout(function () {
                    const script6 = document.createElement('script');
                    script6.type = 'text/javascript';
                    script6.src = 'https://cdn.jsdelivr.net/npm/maptalks.three@latest/dist/maptalks.three.js';
                    document.head.appendChild(script6);
                    eval(script6);
                }, 2000);
                
                const script7 = document.createElement('script');
                script7.type = 'text/javascript';
                script7.src = 'https://cdn.jsdelivr.net/npm/three@0.104.0/examples/js/libs/stats.min.js';
                document.head.appendChild(script7);
                eval(script7);
	    }

            let template = document.createElement("template");
            template.innerHTML = `
  		      <style>
                 	      @import "https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.css";
  			      html,
  			      body {
  				      margin: 0px;
  				      height: 100%;
  				      width: 100%;
  			      }
  			      #map {
  				      width: 100%;
  				      height: 100%;
  				      background-color: #b2c2d2
  			      }
			     .maptalks-attribution{
			        display:none;
			      }
                    
  		      </style>
		      <div id="map"></div>
  	      `;
         
	 var map = "";
         function load(prop, ele, cent) {
	    let cen = [];
	    cen[0] = parseFloat(cent.split(',')[0]);
	    cen[1] = parseFloat(cent.split(',')[1]);

	    if(map != ""){
		map.remove();
	    }
	    map = new maptalks.Map(ele, {
		"center": cen,
		zoom: 14,
		pitch: 85,
		baseLayer: new maptalks.TileLayer('tile', {
		    urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
		    subdomains: ['a', 'b', 'c', 'd', 'e'],
		})
	    });
	    // the ThreeLayer to draw buildings
	    threeLayer = new maptalks.ThreeLayer('t', {
		forceRenderOnMoving: true,
		forceRenderOnRotating: true
		// animation: true
	    });
	    threeLayer.prepareToDraw = function (gl, scene, camera) {
		stats = new Stats();
		stats.domElement.style.zIndex = 100;
		//document.getElementById('Geomap').appendChild(stats.domElement);
		ele.appendChild(stats.domElement);

		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(0, -10, 10).normalize();
		scene.add(light);
		scene.add(new THREE.AmbientLight(0xffffff, 0.2));
		addBar(scene, prop, ele);

	    };
	    threeLayer.addTo(map);
	}
	
	        function randomLnglats() {
            return [[13.429362937522342, 52.518205849377495]
                , [13.41688993786238, 52.52216099633924]
                , [13.417991247928398, 52.53296954185342]
                , [13.438154245439819, 52.533321196953096]
                , [13.450418871799684, 52.52653968753597]
                , [13.390340036780685, 52.51953598324846]
                , [13.399921081391199, 52.50920191922407]
                , [13.366122901455583, 52.50949703597493]
                , [13.365784792637783, 52.51964629275582]
                , [13.371429857108524, 52.528732386936014]
                , [13.383686384074508, 52.53781463596616]
                , [13.40395563186371, 52.540223413847315]
                , [13.361485408920998, 52.53916869831616]
                , [13.35373758485457, 52.52883597474849]
                , [13.355233792792774, 52.519259850666316]
                , [13.369548077301943, 52.506940362998336]
                , [13.338732610093984, 52.50860998116909]
                , [13.341879792058194, 52.52318729489704]
                , [13.348448231846305, 52.537668773653735]
                , [13.389246594295287, 52.53548698398501]
                , [13.38850757718967, 52.53863503802975]
                , [13.37609820107241, 52.53114151693521]
                , [13.378738663778222, 52.52573619010886]
                , [13.37831231443704, 52.52080685602138]
                , [13.375035939673353, 52.51971996135225]
                , [13.389897299946142, 52.51899162027868]
                , [13.391256053067082, 52.52202236946218]
                , [13.392790046648201, 52.52844544479157]
                , [13.395005819018024, 52.53310464893897]
                , [13.401718911909938, 52.52425187302205]
                , [13.402397026911103, 52.51909223851541]
                , [13.411313379918056, 52.51798115586686]
                , [13.415911385871823, 52.51888605929159]
                , [13.41824726883442, 52.52171525554482]
                , [13.417314242886505, 52.52609578512883]
                , [13.412330051141907, 52.5293517938629]
                , [13.40936323330186, 52.532595113983206]
                , [13.41394381887676, 52.5381488398327]
                , [13.419539658615577, 52.540914487009076]
                , [13.436661171707783, 52.5407178069876]
                , [13.43043712770941, 52.53493464958078]
                , [13.426802529616793, 52.53273186525789]
                , [13.427190063411217, 52.52859751715991]
                , [13.429687741409111, 52.52541511779546]
                , [13.420674712370555, 52.52132920963592]
                , [13.422291590946202, 52.51771896093092]
                , [13.42602853364042, 52.51691591867936]
                , [13.4407066690992, 52.517628077846695]
                , [13.445125010359334, 52.518379661504895]
                , [13.449230960410887, 52.51890206493917]
                , [13.452697161728338, 52.522833015637474]
                , [13.452150183293384, 52.527206052817604]
                , [13.450596418938858, 52.53120611025892]
                , [13.449321345704561, 52.53478259925626]
                , [13.44991743982439, 52.53800964581964]
                , [13.444911438078066, 52.540011719191256]
                , [13.433846712878221, 52.53776840443655]
                , [13.446110400946054, 52.53745564016762]
                , [13.42655484257807, 52.53375521527627]
                , [13.410074080611025, 52.52474520696168]
                , [13.39700902166237, 52.5211808556779]
                , [13.39224970456371, 52.52795947015855]
                , [13.397787887746631, 52.527687381119534]
                , [13.404781597398824, 52.531570514480876]
                , [13.402245452485431, 52.53470324196846]
                , [13.420458447249871, 52.53324273115388]
                , [13.421777392290323, 52.52903708527933]
                , [13.422154850584775, 52.52568580719807]
                , [13.425979170707365, 52.5225528451015]
                , [13.43384246418384, 52.52106341825615]
                , [13.437886395258374, 52.52359528344451]
                , [13.43602741073164, 52.52734201890169]
                , [13.433894856093502, 52.52999680902715]
                , [13.440403956745058, 52.53046767348306]
                , [13.443630184112749, 52.5345563486467]
                , [13.446005091212669, 52.52604566053341]
                , [13.447046979747824, 52.52147908728435]
                , [13.438474092805109, 52.52016101093679]
                , [13.433534190029263, 52.51375347746014]
                , [13.423521933452776, 52.51201966778339]
                , [13.408093385343363, 52.51256294330912]
                , [13.394147099129441, 52.513520846913224]
                , [13.384281207204936, 52.51450177617838]
                , [13.37856319851221, 52.515164690078194]
                , [13.375558597164172, 52.514388509308475]
                , [13.381667785856393, 52.519387857354985]
                , [13.382148908463023, 52.52353236618089]
                , [13.38475353387787, 52.52724225103057]
                , [13.3815086591095, 52.53156487184728]
                , [13.380623530434377, 52.53505642591742]
                , [13.381915256011666, 52.53591866294866]
                , [13.396791162437012, 52.53627471648187]
            ];
        }

        var bars = [];
        var materials = {};

        function getMaterial(color) {
            if (!materials[color]) {
                materials[color] = new THREE.MeshLambertMaterial({ color });
            }
            return materials[color];
        }
        const colors = [
            '#0B0030',
            '#100243',
            '#100243',
            '#1B048B',
            '#051FB7',
            '#0350C1',
            '#0350C1',
            '#0072C4',
            '#0796D3',
            '#2BA9DF',
            '#30C7C4',
            '#6BD5A0',
            '#A7ECB2',
            '#D0F4CA'
        ];
	
	
	

            function addBar(scene, prop, ele) {
                bars = [], selectMesh = [];
                material = new THREE.MeshLambertMaterial({ color: 'rgb(38,160,146)', transparent: true, opacity: 1 });
                highlightmaterial = new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true });
                
		let data = "";
		var json = JSON.parse(prop);
                for (var i = 0; i < json.features.length; i++) {
                     data = json.features.slice(0, Infinity).map(function (dataItem) {
                        dataItem = gcoord.transform(dataItem, gcoord.AMap, gcoord.WGS84);
                        return {
                            coordinate: dataItem.geometry.coordinates,
                            //height: dataItem.properties.Amount * 2,
		            height : 200,		
                            value: dataItem.properties.Amount,
                            city: dataItem.properties.City,
                            zip: dataItem.properties.ZipCode,
			    Contract: dataItem.properties.Contract,	
                            //height: Math.random() * 200,
                            //value: Math.random() * 10000,
                            topColor: '#fff',
		            color : dataItem.properties.Contract		
                        }
                     });
                   
                }
                const time = 'time';
                console.time(time);
		 
		 
		 const lnglats = randomLnglats();
            lnglats.forEach(lnglat => {
                for (let i = 0; i < colors.length; i++) {
                    const bar = threeLayer.toBox(lnglat, { height: 100, altitude: i * 100, radius: 50, interactive: false }, getMaterial(colors[i]));
                    bars.push(bar);
                }
            });
		 
		 
		 
		 
               
               // const box = threeLayer.toBoxs(data, {}, material);
               // bars.push(box);
                console.timeEnd(time);

                // tooltip test
                box.setToolTip('hello', {
                    showTimeout: 0,
                    eventsPropagation: true,
                    dx: 10
                });
                threeLayer.addMesh(bars);

                //infowindow test
                box.setInfoWindow({
                    content: 'hello world,height:',
                    title: 'message',
                    animationDuration: 0,
                    autoOpenOn: false
                });


                ['click', 'empty', 'mousemove'].forEach(function (eventType) {
                    box.on(eventType, function (e) {
                        const select = e.selectMesh;
                        if (e.type === 'empty' && selectMesh.length) {
                            threeLayer.removeMesh(selectMesh);
                            selectMesh = [];
                        }

                        let data, baseObject;
                        if (select) {
                            data = select.data;
                            baseObject = select.baseObject;
                            if (baseObject && !baseObject.isAdd) {
                                baseObject.setSymbol(highlightmaterial);
                                threeLayer.addMesh(baseObject);
                                selectMesh.push(baseObject);
                            }
                        }


                        if (selectMesh.length > 20) {
                            threeLayer.removeMesh(selectMesh);
                            selectMesh = [];
                        }
                        // override tooltip
                        if (e.type === 'mousemove' && data) {
                            const height = data.value;
                            const tooltip = this.getToolTip();
                            tooltip._content = `value:${height}`;
                        }
                        //override infowindow
                        if (e.type === 'click' && data) {
                            const height = data.value;
                            const city = data.city;
                            const zip = data.zip;
			    const Contract = data.Contract;
                            const infoWindow = this.getInfoWindow();
                            const content = 'City : ' + city + '<br> ZipCode : ' + zip + '<br> Contract : '+ Contract  +'<br> value : ' + height;
                            infoWindow.setContent(content);
                            if (infoWindow && (!infoWindow._owner)) {
                                infoWindow.addTo(this);
                            }
                            this.openInfoWindow(e.coordinate);
                        }
                    });
                }); 
                animation();
                initGui(ele);
            }

            function animation() {
                // layer animation support Skipping frames
                threeLayer._needsUpdate = !threeLayer._needsUpdate;
                if (threeLayer._needsUpdate) {
                    threeLayer.renderScene();
                }
                stats.update();
                requestAnimationFrame(animation);
            }

            function initGui(ele) {
                var params = {
                    add: true,
                    color: material.color.getStyle(),
                    show: true,
                    opacity: material.opacity,
                    altitude: 0,
                    animateShow: animateShow
                };

                var gui = new dat.GUI();
                gui.add(params, 'add').onChange(function () {
                    if (params.add) {
                        threeLayer.addMesh(bars);
                    } else {
                        threeLayer.removeMesh(bars);
                    }
                });
                gui.addColor(params, 'color').name('bar color').onChange(function () {
                    material.color.set(params.color);
                    bars.forEach(function (mesh) {
                        mesh.setSymbol(material);
                    });
                });
                gui.add(params, 'opacity', 0, 1).onChange(function () {
                    material.opacity = params.opacity;
                    bars.forEach(function (mesh) {
                        mesh.setSymbol(material);
                    });
                });
                gui.add(params, 'show').onChange(function () {
                    bars.forEach(function (mesh) {
                        if (params.show) {
                            mesh.show();
                        } else {
                            mesh.hide();
                        }
                    });
                });
                gui.add(params, 'altitude', 0, 300).onChange(function () {
                    bars.forEach(function (mesh) {
                        mesh.setAltitude(params.altitude);
                    });
                });
                gui.add(params, 'animateShow');

                $('.dg,.ac').css('display', 'none');

                const rem = ele.childNodes[1];
                rem.style.display = 'none';
            }

            function animateShow() {
                bars.forEach(function (mesh) {
                    mesh.animateShow({
                        duration: 3000
                    });
                });

            }

            class Box extends HTMLElement {
		  
                constructor() {
                    super();
                    this._shadowRoot = this.attachShadow({ mode: "open" });
                    this._shadowRoot.appendChild(template.content.cloneNode(true));
                    
			//this.$element = shadowRoot.getElementById("map");
		        //var prop = '{"type":"FeatureCollection","features":[' +
			//	'{"type": "Feature", "properties": { "City": "New York", "Country": "US", "Contract": "30000033", "ZipCode": "10059", "Amount": "78.68" }, "geometry": { "type": "Point", "coordinates": [113.950375, 22.534875] } },' +
			//	'{"type":"Feature", "properties": { "City":"New York", "Country":"US", "Contract":"30000033", "ZipCode":"10059", "Amount":"88.68"}, "geometry": { "type":"Point", "coordinates": [113.950625, 22.534875] } },' +
			//	'{"type":"Feature", "properties": { "City":"New York", "Country":"US", "Contract":"30000033", "ZipCode":"10059", "Amount":"98.68"}, "geometry": { "type":"Point", "coordinates": [113.930625, 22.516125] } },' +
			//	'{"type":"Feature", "properties": { "City":"New York", "Country":"US", "Contract":"30000033", "ZipCode":"10059", "Amount":"78.68"}, "geometry": { "type":"Point", "coordinates": [113.930375, 22.516125] } },' +
			//	'{"type":"Feature", "properties": { "City":"New York", "Country":"US", "Contract":"30000033", "ZipCode":"10059", "Amount":"88.68"}, "geometry": { "type":"Point", "coordinates": [113.930125, 22.515625] } },' +
			//	'{"type":"Feature", "properties": { "City":"New York", "Country":"US", "Contract":"30000033", "ZipCode":"10059", "Amount":"98.68"}, "geometry": { "type":"Point", "coordinates": [113.930125, 22.515875] } },' +
			//	'{"type":"Feature", "properties": { "City":"New York", "Country":"US", "Contract":"30000033", "ZipCode":"10059", "Amount":"78.68"}, "geometry": { "type":"Point", "coordinates": [113.930375, 22.515625] } },' +
			//	'{"type":"Feature", "properties": { "City":"New York", "Country":"US", "Contract":"30000033", "ZipCode":"10059", "Amount":"88.68"}, "geometry": { "type":"Point", "coordinates": [113.929625, 22.515625] } },'+
			//	'{"type":"Feature","properties":{"City":"New York","Country":"US","Contract":"30000033","ZipCode":"10059","Amount":"98.68"},"geometry":{"type":"Point","coordinates":[114.151875,22.555125]}}]}';
			
                        //setTimeout(function () {
                        //    load(prop, shadowRoot.getElementById("map"));
                        //}, 3000);
			
                }
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			if ("info" in changedProperties) {
				this.$info = changedProperties["info"];
			}
			
			if ("color" in changedProperties) {
				this.$color = changedProperties["color"];
			}
			 
			if(this.$info != null && this.$info != '' && this.$info != undefined)
			{
			     var data = '{"type":"FeatureCollection","features":[' + this.$info + "]}";
			     var center = this.$color;
				
			     let ele = this._shadowRoot;
			     
			     //console.log("JSON - " + data);
			     load(data, ele.getElementById("map"), center);
			     //setTimeout(function () {
			     //    load(data, this._shadowRoot.getElementById("map"), center);
			     //    load(data, ele.getElementById("map"), center);
			     //}, 3000);
			}
		}   
            }
            window.customElements.define("com-demo-gauge", Box);
       })();
