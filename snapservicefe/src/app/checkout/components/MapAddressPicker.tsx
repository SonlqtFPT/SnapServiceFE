'use client';

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
  address: string;
  onAddressChange: (value: string) => void;
  onCoordinatesChange: (lat: number, lng: number) => void;
}

const defaultPosition: [number, number] = [10.762622, 106.660172]; // TP.HCM

function FlyToMap({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 15);
  }, [position]);
  return null;
}

function LocationSelector({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapAddressPicker({
  address,
  onAddressChange,
  onCoordinatesChange,
}: Props) {
  const [position, setPosition] = useState<[number, number]>(defaultPosition);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onCoordinatesChange(position[0], position[1]);
    }, [position]);
    

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'json',
        },
      });
      const result = res.data;
      if (result.display_name) {
        onAddressChange(result.display_name);
      }
    } catch (err) {
      console.error('Lỗi reverse geocoding:', err);
    }
  };

  const handleMapClick = async (lat: number, lng: number) => {
    const newPos: [number, number] = [lat, lng];
    setPosition(newPos);
    await reverseGeocode(lat, lng);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && address.trim()) {
      try {
        const res = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: address,
            format: 'json',
            limit: 1,
          },
        });

        if (res.data.length > 0) {
          const { lat, lon } = res.data[0];
          const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
          setPosition(newPos);
        } else {
          toast.error('Không tìm thấy vị trí phù hợp.');
        }
      } catch (err) {
        console.error('Lỗi khi tìm địa chỉ:', err);
        toast.error('Lỗi khi tìm địa chỉ.');
      }
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Nhập địa chỉ hoặc click bản đồ"
        className="w-full px-3 py-2 border rounded"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToMap position={position} />
        <LocationSelector onSelect={handleMapClick} />
        <Marker
          position={position}
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />
      </MapContainer>
    </div>
  );
}
