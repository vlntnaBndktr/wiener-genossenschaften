import '../styles/mapStyles.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import useStore from '../stores/useStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // React Router Hook zum Auslesen von URL-Parametern

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

const TargetMap = () => {
  // targetProjectId aus den URL-Parametern auslesen
  const { projectId } = useParams();
  const { projects, getAllProjects } = useStore();
  // laden der Projekte einmal beim Mounting
  useEffect(() => {
    getAllProjects();
  }, []);

  // targetProject in Projects finden:
  const targetProject = projects.find((proj) => proj._id === projectId);
  // console.log('targetProject:', targetProject.name);

  return (
    // MapContainer-Komponente, um die Karte zu erstellen
    <MapContainer
      center={[
        targetProject.location.coordinates.lat,
        targetProject.location.coordinates.lon,
      ]}
      zoom={13}
      scrollWheelZoom={true}
    >
      OPEN STREET MAPS TILES
      {/* eine Kachel-Lage hinzufügen (OpenStreetMap) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Marker für targetProjekt */}
      <Marker
        key={targetProject._id}
        position={[
          targetProject.location.coordinates.lat,
          targetProject.location.coordinates.lon,
        ]}
        icon={customIcon}
      >
        <Popup>{targetProject.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default TargetMap;
