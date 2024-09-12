import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface MapProps {
  locations: Location[];
  mapCenter: Location;
}

const Map: React.FC<MapProps> = ({ mapCenter, locations }) => {
  const mapEle = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Configura tu token de Mapbox aquí
  mapboxgl.accessToken = 'TU_MAPBOX_ACCESS_TOKEN';

  useEffect(() => {
    if (mapEle.current) {
      // Inicializa el mapa
      map.current = new mapboxgl.Map({
        container: mapEle.current, // Referencia del contenedor
        style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
        center: [mapCenter.lng, mapCenter.lat], // Coordenadas [lng, lat]
        zoom: 16,
      });

      // Añade los marcadores después de que el mapa se haya inicializado
      locations.forEach((markerData) => {
        if (!map.current) return
        const marker = new mapboxgl.Marker()
          .setLngLat([markerData.lng, markerData.lat]) // Establece la posición del marcador
          .setPopup(new mapboxgl.Popup().setHTML(`<h5>${markerData.name}</h5>`)) // Añade un popup
          .addTo(map.current); // Añade el marcador al mapa
      });

      // Ajusta el mapa a las ubicaciones
      map.current.on('load', () => {
        map.current!.flyTo({ center: [mapCenter.lng, mapCenter.lat] });
      });
    }

    // Limpieza del efecto
    return () => {
      if (map.current) {
        map.current.remove(); // Elimina el mapa al desmontar el componente
      }
    };
  }, [mapCenter, locations]);

  return <div ref={mapEle} className='map-canvas' style={{ width: '100%', height: '400px' }}></div>;
};

export default Map;
