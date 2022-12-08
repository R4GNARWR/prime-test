function loadScript(api_key) {
	var script = document.createElement("script");
	if (typeof api_key === 'undefined')
		api_key = '';
	script.type = "text/javascript";
	script.src = "https://maps.googleapis.com/maps/api/js?key="+api_key+"&callback=loadMaps&v=weekly";
	document.body.appendChild(script);
}

function loadMaps() {
	$('.map').each(function(){
		var funcName = $(this).data('onload');
		if (funcName && typeof window[funcName] === 'function') {
			window[funcName]($(this));
		}
	});
}
let style = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 8
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 4
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 9
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 0.1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 7
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 2
            }
        ]
    }
]





function mainMap($map){
	var map = new google.maps.Map($map[0], {
        center: { lat: $map.data('lat'), lng: $map.data('lng') },
        zoom: $map.data('zoom'),
		disableDefaultUI: true
    });
	map.setOptions({styles: style});

    mainDot = {
        lat: 54.749725,
        lng: 55.984356,
        group: 'house',
        type: '1',
        icon: {
            url: '../img/icon-house.svg',
            scaledSize: new google.maps.Size(70, 70)
        }
    }
    let marker = new google.maps.Marker({
        map:       map,
        animation: google.maps.Animation.DROP,
        position:  new google.maps.LatLng(mainDot.lat, mainDot.lng),
        icon: mainDot.icon,
    })

    let sizeIcon = new google.maps.Size(50, 50);
    let dots = 	[
        {
            lat: 54.750725,
            lng: 55.980356,
            group: 'park',
            type: '1',
            icon: {
                url: '',
                scaledSize: sizeIcon
            }
        },
        {
            lat: 54.760725,
            lng: 55.990356,
            group: 'circus',
            type: '1',
            icon: {
                url: '',
                scaledSize: sizeIcon
            }
        },
    ]
    dots.forEach(element => {
        console.log(element.icon.url)
        console.log(element.group)
        element.icon.url = '../img/icon-' + element.group + '.svg'
        console.log(element.icon.url)
    });

    dots.forEach(element => {
         let marker = new google.maps.Marker({
            map:       map,
            animation: google.maps.Animation.DROP,
            position:  new google.maps.LatLng(element.lat, element.lng),
            icon: element.icon,
        })
        // ,
        // infowindow = new google.maps.InfoWindow({
        //     content: element.content,
        // });

        // marker.addListener("click", function() {
        //     infowindow.open({
        //         map: map,
        //         anchor: marker,
        //         shouldFocus: false,
        //     });
        // });
    });


	return map;
}
