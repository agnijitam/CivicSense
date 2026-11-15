import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

const pickerIcon = L.divIcon({
  className: 'location-picker-pin',
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;">
      <div style="position: absolute; width: 44px; height: 44px; border-radius: 9999px; background-color: #EA580C; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="
        width: 34px; 
        height: 34px; 
        border-radius: 9999px; 
        background: #EA580C; 
        border: 3px solid white; 
        box-shadow: 0 4px 14px rgba(234,88,12,0.45); 
        display: flex; 
        align-items: center; 
        justify-content: center;
        color: white;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng, map]);

  useEffect(() => {
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [map]);

  return null;
};

export const LocationPickerMap = ({
  lat = 28.6280,
  lng = 77.3649,
  onLocationSelect,
  height = '200px',
}) => {
  return (
    <div
      style={{ height }}
      className="relative w-full rounded-xl overflow-hidden border border-warm-200 shadow-2xs z-0"
    >
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
        zoomControl={true}
      >
        <RecenterMap lat={lat} lng={lng} />
        <MapClickHandler onLocationSelect={onLocationSelect} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']}
          maxZoom={19}
        />
        <Marker position={[lat, lng]} icon={pickerIcon} />
      </MapContainer>

      {/* Helper pill */}
      <div className="absolute top-2 left-2 z-[1000] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-warm-800 shadow-sm border border-warm-200 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-brand-600" />
        <span>Click map to place incident pin</span>
      </div>
    </div>
  );
};
