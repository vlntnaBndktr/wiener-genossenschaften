import '../styles/mapStyles.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import useStore from '../stores/useStore';

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

const specialIcon = new L.Icon({
  iconUrl: 'location2.png',
  iconSize: [38, 38],
});

// Koordinaten für Marker
const markers = [
  {
    geocode: [48.21241, 16.33386],
    popUp: 'WIENER GENOSSENSCHAFTEN',
  },
];

const MyMap = () => {
  const { projects } = useStore();
  console.log('projects in MyMap Komponente:', projects);
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
        <Marker position={marker.geocode} icon={specialIcon}>
          {/* Popup der beim Klicken auf den Marker angezeigt wird */}
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
      {/* Marker für jedes Projekt erstellen */}
      {projects.map((project) => (
        <Marker
          key={project._id}
          position={[
            project.location.coordinates.lat,
            project.location.coordinates.lon,
          ]}
          icon={customIcon}
        >
          <Popup>{project.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyMap;
