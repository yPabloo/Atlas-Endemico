import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapData } from '../../hooks/useMapData';

const INITIAL_CENTER: L.LatLngExpression = [-10.95, -37.07];
const INITIAL_ZOOM = 12;

const HeatMap: React.FC = () => {
  const { mapPoints, loading, error } = useMapData();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const [aracajuGeojson, setAracajuGeojson] = useState<any | null>(null);

  useEffect(() => {
    const fetchGeojson = async () => {
      try {
        const response = await fetch('/data/aracaju.geojson');
        const data = await response.json();
        setAracajuGeojson(data);
      } catch (err) {
        console.error('Erro ao carregar o GeoJSON:', err);
      }
    };
    fetchGeojson();
  }, []);

  useEffect(() => {
    if (loading || error) return;
    if (!mapContainerRef.current) return; 
    if (mapRef.current) return; 

    console.log('Criando mapa (Leaflet puro) para HeatMap...');
    const map = L.map(mapContainerRef.current, {
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;


    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [loading, error]);

  // Calcular o número de ocorrências por bairro
  const countsByBairro = useMemo(() => {
    const counts: Record<string, number> = {};
    mapPoints.forEach((point) => {
      const b = point.localizacao?.trim() || 'Desconhecido';
      counts[b] = (counts[b] || 0) + 1;
    });
    return counts;
  }, [mapPoints]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !aracajuGeojson) return;


    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.remove();
      geoJsonLayerRef.current = null;
    }


    function getColor(count: number) {
      // faixa de cores
      return count > 20 ? '#800026' :
             count > 10 ? '#BD0026' :
             count > 5  ? '#E31A1C' :
             count > 2  ? '#FC4E2A' :
             count > 0  ? '#FD8D3C' :
                          '#FFEDA0';
    }

    function style(feature: any): L.PathOptions {
      const nomeBairro = feature.properties?.name ?? 'Desconhecido';
      const count = countsByBairro[nomeBairro] || 0;

      return {
        fillColor: getColor(count),
        weight: 1,
        opacity: 1,
        color: '#fff',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    // Exibir popup ao clicar no bairro
    function onEachFeature(feature: any, layer: L.Layer) {
      const nomeBairro = feature.properties?.name ?? 'Sem nome';
      const count = countsByBairro[nomeBairro] || 0;
      layer.bindPopup(`
        <div>
          <strong>${nomeBairro}</strong><br/>
          Ocorrências registradas: ${count}
        </div>
      `);
    }

    // Criar a camada GeoJSON
    const geoJsonLayer = L.geoJSON(aracajuGeojson, {
      style,
      onEachFeature
    });

    geoJsonLayer.addTo(map);
    geoJsonLayerRef.current = geoJsonLayer;

  }, [aracajuGeojson, mapPoints, countsByBairro]);


  if (loading) {
    return <p>Carregando dados de ocorrências...</p>;
  }
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  if (mapPoints.length === 0) {
    return <p>Nenhum ponto de ocorrência encontrado.</p>;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        border: '1px solid #ddd',
        borderRadius: '0.5rem',
        marginTop: '1rem'
      }}
    >
      <h2 style={{ margin: '0.5rem' }}>Mapa de Calor (Bairros de Aracaju)</h2>
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '90%' }}
      />
    </div>
  );
};

export default HeatMap;
