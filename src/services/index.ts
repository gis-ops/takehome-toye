import axios from "axios";

export const reverseGeocode = (latitude: number, longitude: number) => {
  return axios.get(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  );
};
