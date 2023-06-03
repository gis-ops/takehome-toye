import { useEffect, useImperativeHandle, useState } from "react";
import { reverseGeocode } from "../../services";
import { Close, LocationPopupContainer } from "./styles";
import { PixelPosition } from "./types";
import React from "react";

interface LocationPopupProps {
  lat: number;
  lng: number;
  pixel: PixelPosition;
  setPixel: (arg: PixelPosition) => void;
}

const LocationPopup = React.forwardRef((props: LocationPopupProps, ref) => {
  const { lat, lng, pixel } = props;
  const [locationName, setLocationName] = useState<string>("");
  const { top, left } = pixel;

  const clearLocation = () => setLocationName("");
  
  useImperativeHandle(ref, () => ({
    clearLocation,
  }));

  const getLocation = async (lat: number, lng: number) => {
    try {
      const response = await reverseGeocode(lat, lng);
      setLocationName(response.data?.display_name);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getLocation(lat, lng);
  }, [lat, lng]);
  return (
    <>
      {locationName && (
        <LocationPopupContainer style={{ left, top: top ? top + 10 : top }}>
          <Close onClick={() => setLocationName("")}>&times;</Close>

          {locationName}
        </LocationPopupContainer>
      )}
    </>
  );
});

export default LocationPopup;
