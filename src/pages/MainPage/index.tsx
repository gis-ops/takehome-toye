import { MapBrowserEvent, MapEvent } from "ol";
import Map from "../../components/Map";
import LocationPopup from "../../components/LocationPopup";
import { transform } from "ol/proj";
import { useRef, useState } from "react";
import {
  PixelPosition,
  PopupPosition,
} from "../../components/LocationPopup/types";

const MainPage: React.FC = () => {
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(
    null
  );
  const [pixel, setPixel] = useState<PixelPosition>({
    left: 0,
    top: 0,
  });
  const locationPopupRef = useRef<{ clearLocation: () => void }>(null);

  const handleMapClick = (event: MapBrowserEvent<any>) => {
    event.preventDefault();
    const latLong = transform(event.coordinate, "EPSG:3857", "EPSG:4326");
    const lng = latLong[0];
    const lat = latLong[1];
    setPixel({ left: event.pixel[0], top: event.pixel[1] });
    setPopupPosition({ lat, lng });
  };

  const handleMapMoveStart = (event: MapEvent) => {
    event.preventDefault();
    locationPopupRef.current?.clearLocation();
  };

  return (
    <Map onMapClick={handleMapClick} onMapMoveStart={handleMapMoveStart}>
      {popupPosition && (
        <LocationPopup
          ref={locationPopupRef}
          lat={popupPosition.lat}
          lng={popupPosition.lng}
          pixel={pixel}
          setPixel={setPixel}
        />
      )}
    </Map>
  );
};

export default MainPage;
