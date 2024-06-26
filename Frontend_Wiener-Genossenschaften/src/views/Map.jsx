import '../styles/mapStyles.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import useStore from '../stores/useStore';
import { useEffect } from 'react';

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

const MyMap = () => {
  const { projects, getAllProjects } = useStore();
  // laden der Projekte einmal beim Mounting
  useEffect(() => {
    getAllProjects();
  }, []);
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
