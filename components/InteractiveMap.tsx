'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Location {
  name: string;
  type: string;
  coords: [number, number];
  phone: string;
  whatsapp: string;
}

const locations: Location[] = [
  { name: 'Dourados', type: 'Matriz', coords: [-22.2235, -54.8064], phone: '67 3032-3090', whatsapp: '67 99958-3090' },
  { name: 'Campo Grande', type: 'Hub da Capital', coords: [-20.4697, -54.6201], phone: '67 3032-3090', whatsapp: '67 99285-6510' },
  { name: 'Ponta Porã', type: 'Logística Fronteira', coords: [-22.5361, -55.7258], phone: '67 3032-3090', whatsapp: '67 99996-3043' },
  { name: 'Três Lagoas', type: 'Expansão Leste', coords: [-20.8494, -51.7042], phone: '67 3032-3090', whatsapp: '67 99994-1447' }
];

export default function InteractiveMap() {
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 z-0">
      <MapContainer 
        center={[-21.5, -53.5] as any} 
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((loc, i) => (
          <Marker key={i} position={loc.coords as any} icon={customIcon}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-headline font-bold text-primary text-lg m-0 leading-tight">Unidade {loc.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-1 mb-3">{loc.type}</p>
                <div className="space-y-1.5 border-t border-neutral-100 pt-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold">Tel:</span> {loc.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-primary">WhatsApp:</span> {loc.whatsapp}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
