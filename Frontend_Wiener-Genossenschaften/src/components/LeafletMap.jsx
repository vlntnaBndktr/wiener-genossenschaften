import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LeafletMap = () => {
  // Koordinaten für den Marker
  const position = [51.505, -0.09];

  return (
    // Verwenden Sie die MapContainer-Komponente, um die Karte zu erstellen
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      {/* Fügen Sie eine Kachel-Lage hinzu (z.B. OpenStreetMap) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Fügen Sie einen Marker hinzu */}
      <Marker position={position}>
        {/* Fügen Sie einen Popup hinzu, der beim Klicken auf den Marker angezeigt wird */}
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
