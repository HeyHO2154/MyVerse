import { useState } from "react";
import Galaxies from "./Galaxies";

const MapManager = () => {
  const [zoom, setZoom] = useState<1 | 2 | 3>(1);
  const [selectedGalaxy, setGalaxy] = useState<string | null>(null);

  if (zoom === 1) {
    return (
      <Galaxies
        onZoomIn={(galaxyId) => {
          setGalaxy(galaxyId);
          setZoom(2);
        }}
      />
    );
  }

  return <div>⭐ Stars 페이지 구현 예정 (선택된 은하: {selectedGalaxy})</div>;
};

export default MapManager;
