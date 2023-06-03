import { ReactNode, useEffect, useRef } from "react";
import { MapBrowserEvent, MapEvent, Map as OpenLayersMap } from "ol";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { MapContainer } from "./styles";
import React from "react";

interface MapProps {
  children?: ReactNode;
  onMapClick: (event: MapBrowserEvent<any>) => void;
  onMapMoveStart: (event: MapEvent) => void;
}

const Map: React.FC<MapProps> = ({ children, onMapClick, onMapMoveStart }) => {
  const mapRef = useRef<OpenLayersMap | null>(null);
  const mapViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapViewRef.current) {
      mapRef.current = new OpenLayersMap({
        target: mapViewRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            }),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      return () => {
        mapRef.current?.setTarget(undefined);
      };
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("click", onMapClick);
    }
  }, [onMapClick]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("movestart", onMapMoveStart);
    }
  }, [onMapMoveStart]);

  return <MapContainer ref={mapViewRef}>{children}</MapContainer>;
};

export default Map;
