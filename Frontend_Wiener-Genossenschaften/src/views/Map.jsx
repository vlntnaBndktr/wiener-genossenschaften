// import LeafletMap from '../components/map/LeafletMap';
import './styles.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38], // size of the icon
});

const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: 'Hello, I am pop up 1',
  },
  {
    geocode: [48.85, 2.3522],
    popUp: 'Hello, I am pop up 2',
  },
  {
    geocode: [48.855, 2.34],
    popUp: 'Hello, I am pop up 3',
  },
];

const MyMap = () => {
  return (
    <MapContainer center={[48.85, 2.36]} zoom={13} scrollWheelZoom={true}>
      OPEN STREET MAPS TILES
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
