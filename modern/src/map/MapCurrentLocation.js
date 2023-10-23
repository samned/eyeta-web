import maplibregl from 'maplibre-gl';
import { useEffect } from 'react';
import { map } from './core/MapView';
import { SocialControl } from './social/social';

const MapCurrentLocation = () => {
  useEffect(() => {
    const social = new SocialControl();
    const control = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
        timeout: 5000,
      },
      trackUserLocation: true,
    });
    map.addControl(control);
    map.addControl(social);
    return () => map.removeControl(control);
  }, []);

  return null;
};

export default MapCurrentLocation;
