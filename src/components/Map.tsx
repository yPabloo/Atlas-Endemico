// components/Map.tsx
import React, { useEffect, useRef, ReactNode } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';

interface MapProps {
  center: L.LatLngTuple;
  zoom: number;
  className?: string;
  children?: ReactNode;
}

const MapContext = React.createContext<L.Map | null>(null);

export const Map = ({ center, zoom, className, children }: MapProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (containerRef.current && !mapRef.current) {
        mapRef.current = L.map(containerRef.current, {
          center,
          zoom,
        });
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);
      }
  
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }, []);
  
    // Atualiza a view do mapa quando center/zoom mudam
    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.setView(center, zoom);
      }
    }, [center, zoom]);
  
    return (
      <div ref={containerRef} className={className} style={{ height: '100%', width: '100%' }}>
        {mapRef.current && (
          <MapContext.Provider value={mapRef.current}>
            {children}
          </MapContext.Provider>
        )}
      </div>
    );
  };

interface MarkerProps {
  position: L.LatLngTuple;
  children?: ReactNode;
}

export const Marker = ({ position, children }: MarkerProps) => {
  const map = React.useContext(MapContext);
  const markerRef = useRef<L.Marker | null>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

  useEffect(() => {
    if (map) {
      markerRef.current = L.marker(position).addTo(map);
      
      if (children) {
        const div = document.createElement('div');
        rootRef.current = createRoot(div);
        rootRef.current.render(<>{children}</>);
        markerRef.current.bindPopup(div);
      }
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (rootRef.current) {
        rootRef.current.unmount();
      }
    };
  }, [map, position, children]);

  return null;
};

/* Aqui ta um exemplo de como importar esse componente. 

import { Map, Marker } from './components/Map';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map center={[-11.013701851717906, -37.20535000517793]} zoom={13}>
        <Marker position={[-11.013701851717906, -37.20535000517793]}>
          <h3>São Cristóvão</h3>
          <p>Centro da cidade</p>
        </Marker>
      </Map>
    </div>
  );
}

export default App;
 */