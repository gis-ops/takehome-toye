import { useEffect, useRef } from "react";
import { MapBrowserEvent, Map as OpenLayersMap } from "ol";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { MapContainer } from "./styles";

interface MapProps {
  onMapClick: (event: MapBrowserEvent<any>) => void;
}

const Map: React.FC<MapProps> = ({ onMapClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new OpenLayersMap({
        target: mapRef.current,
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
      map.on("click", onMapClick);
    }
  }, [onMapClick]);

  return <MapContainer ref={mapRef}></MapContainer>;
};

export default Map;
