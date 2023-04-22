import { useJsApiLoader } from "@react-google-maps/api";
import { mK } from "../config/environment";

const lib = ["places"];

export const MapLoader = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mK,
    libraries: lib,
  });

  return isLoaded && children;
};
