import '../styles/mapStyles.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38], // Icon Größe
});

// Koordinaten für Marker
const markers = [
  {
    geocode: [48.17192166206321, 16.391253439574186],
    popUp: 'Quartier Bienvenue: Alle Generationen herzlich willkommen',
  },
  {
    geocode: [48.17994439584824, 16.34701113957447],
    popUp: 'Lebenscampus Wolfganggasse',
  },
  {
    geocode: [48.19787689114529, 16.340944354916942],
    popUp: 'sophie 7: Eine Stadtoase mitten in 1070 Wien',
  },
];

const MyMap = () => {
  return (
    // MapContainer-Komponente, um die Karte zu erstellen
    <MapContainer
      center={[48.20849, 16.37208]}
      zoom={13}
      scrollWheelZoom={true}
    >
      OPEN STREET MAPS TILES
      {/* eine Kachel-Lage hinzufügen (OpenStreetMap) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Marker hinzufügen */}
      {markers.map((marker) => (
        <Marker position={marker.geocode} icon={customIcon}>
          {/* Popup der beim Klicken auf den Marker angezeigt wird */}
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
      {/* Marker für Wien */}
      {/* <Marker position={[48.20849, 16.37208]}>
        <Popup>Wien</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default MyMap;
