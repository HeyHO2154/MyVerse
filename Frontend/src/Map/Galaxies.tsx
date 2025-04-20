import { useEffect, useRef, useState } from "react";
import { Galaxy } from "../types";
import { initSocket, subscribe } from "../WebSocket";

const Galaxies = ({ onZoomIn }: { onZoomIn: (id: string) => void }) => {
  const [galaxies, setGalaxies] = useState<Galaxy[]>([]);
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasTransitioned = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const galaxyPositions = useRef<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    initSocket();

    subscribe((data) => {
      if (data.type === "tick_result" && data.galaxies) {
        const withPos = data.galaxies.map((g: Galaxy) => {
          if (!galaxyPositions.current.has(g.id)) {
            galaxyPositions.current.set(g.id, {
              x: Math.random() * 2000 - 1000,
              y: Math.random() * 2000 - 1000,
            });
          }
          return { ...g, ...galaxyPositions.current.get(g.id)! };
        });
        setGalaxies(withPos);
      }
    });
  }, []);

  // 🌀 줌 (마우스 위치 기준)
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const scale = e.deltaY < 0 ? 0.9 : 1.1;
    const svg = svgRef.current;
    if (!svg) return;

    const bounds = svg.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const zoomX = viewBox.x + (mouseX / bounds.width) * viewBox.width;
    const zoomY = viewBox.y + (mouseY / bounds.height) * viewBox.height;

    setViewBox((prev) => ({
      x: zoomX - (zoomX - prev.x) * scale,
      y: zoomY - (zoomY - prev.y) * scale,
      width: prev.width * scale,
      height: prev.height * scale,
    }));
  };

  // 🖱️ 드래그
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialViewBox = useRef(viewBox);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialViewBox.current = { ...viewBox };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const scaleX = viewBox.width / (svgRef.current?.clientWidth || 1);
    const scaleY = viewBox.height / (svgRef.current?.clientHeight || 1);
    setViewBox({
      ...viewBox,
      x: initialViewBox.current.x - dx * scaleX,
      y: initialViewBox.current.y - dy * scaleY,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // 🌌 자동 진입 조건 확인
  useEffect(() => {
    if (galaxies.length === 0 || hasTransitioned.current) return;
    if (viewBox.width > 400 || viewBox.height > 300) return;

    const center = {
      x: viewBox.x + viewBox.width / 2,
      y: viewBox.y + viewBox.height / 2,
    };

    const galaxiesWithCoords = galaxies.filter(
      (g): g is Galaxy & { x: number; y: number } => 
      typeof g.x === 'number' && typeof g.y === 'number'
    );

    const closest = galaxiesWithCoords.length > 0 
      ? galaxiesWithCoords.reduce((prev, curr) => {
          const prevDist = Math.hypot(prev.x - center.x, prev.y - center.y);
          const currDist = Math.hypot(curr.x - center.x, curr.y - center.y);
          return currDist < prevDist ? curr : prev;
        })
      : null;

    hasTransitioned.current = true;
    setIsTransitioning(true);

    setTimeout(() => {
      onZoomIn(closest?.id || "");
    }, 1000); // 1초 후 전환
  }, [viewBox, galaxies]);

  return (
    <>
      <style>
        {`
          .galaxies-wrapper {
            width: 100%;
            height: 100%;
            transition: opacity 1s ease;
            opacity: 1;
          }

          .galaxies-wrapper.fade-out {
            opacity: 0;
          }
        `}
      </style>

      <div className={`galaxies-wrapper ${isTransitioning ? "fade-out" : ""}`}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            background: "#000",
            display: "block",
            cursor: "grab",
            userSelect: "none",
          }}
        >
          {galaxies.map((g) => (
            <g key={g.id}>
              <text
                x={g.x}
                y={g.y}
                fill="white"
                fontSize={14}
                textAnchor="middle"
              >
                {g.name}
              </text>
              <circle
                cx={g.x}
                cy={g.y}
                r={20}
                fill="white"
              />
            </g>
          ))}
        </svg>
      </div>
    </>
  );
};

export default Galaxies;
