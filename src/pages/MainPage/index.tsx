import { MapBrowserEvent } from "ol";
import Map from "../../components/Map";

const MainPage: React.FC = () => {
  const handleMapClick = (event: MapBrowserEvent<any>) => {
    console.log("map event", event.coordinate);
  };
  return <Map onMapClick={handleMapClick} />;
};

export default MainPage;
