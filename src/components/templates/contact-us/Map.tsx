"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";
import { LatLngExpression } from "leaflet";
import { ReactNode } from "react";

interface MapProps {
  position: LatLngExpression;
  center: LatLngExpression;
  children: ReactNode;
}

const Map = ({ position, center, children }: MapProps) => {
  return (
    <>
      <MapContainer
        className={styles.map}
        center={center}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Set Coffee</Popup>
        </Marker>
      </MapContainer>
      <div className={styles.details}>{children}</div>
    </>
  );
};

export default Map;
