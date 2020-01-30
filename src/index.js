import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl, {Map} from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnlhdm9yaW4iLCJhIjoiY2s2MG9uN28xMDlnejNqbG9na25qdG82dCJ9.8zu4rjJ4HupNnNmKuIz7Yg';


class Application extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 1,
            pitch: 0,
            rotation: 0,
        }
    }

    componentDidMount() {
        const map = new Map({
            container: 'map', //this.mapContainer,
            //the style created for Choropleth map on Styles page in mapbox account
            style: 'mapbox://styles/ivanyavorin/ck60qwkwl10hv1jqpzpfzvvtf', //'mapbox://styles/mapbox/streets-v11',
            // center: [this.state.lng, this.state.lat],
            // zoom: this.state.zoom,
            // pitch: this.state.pitch,
            // rotation: this.state.rotation,
        });
        
        map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);

        map.on('load', () => {

            let legend = document.getElementById('legend');

            //beware the two arrays have the same count (length)
            let layers = ['0-10'   , '10-20'  , '20-50'  , '50-100' , '100-200', '200-500', '500-1000', '1000+'];
            let colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026' , '#800026'];

            for(let i = 0; i < layers.length; i += 1) {
                let layer = layers[i];
                let colorStr = colors[i];
                let item = document.createElement('div');
                let key = document.createElement('span');
                key.className = 'legend-key';
                key.style.backgroundColor = colorStr;

                let value = document.createElement('span');
                value.innerHTML = layer;
                item.appendChild(key);
                item.appendChild(value);
                legend.appendChild(item);
            }
        });

        map.on('mousemove', (event) => {
        
            let states = map.queryRenderedFeatures(event.point, {
                layers:['statedata']
            });

            if(states.length > 0) {
                document.getElementById('pd').innerHTML = 
                '<h3><strong>' 
                + states[0].properties.name + 
                '</strong></h3><p><strong><em>' 
                + states[0].properties.density 
                + '</strong> people per square mile</em></p>';
            }
            else {
                document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
            }

            
        });

        map.on('move', () => {
            //console.log("Map Moved");
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2),
                pitch: map.getPitch().toFixed(2),
                rotation: map.getBearing().toFixed(2),
            });
        });
    }

    render() {
        return (
            <div>
                {/* <div className='sidebarStyle'>
                    <div>Longtitude: {this.state.lng} </div> 
                    <div>Lattitude: {this.state.lat}</div>
                    <div>Zoom: {this.state.zoom}</div>
                    <div>Pitch: {this.state.pitch}</div>
                    <div>Rotation{this.state.rotation}</div>
                </div> */}
                
            </div>
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('map'));  //app')); 

//<div ref={el => this.mapContainer = el} className='mapContainer' /> 