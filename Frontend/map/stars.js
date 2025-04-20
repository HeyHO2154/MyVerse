import { subscribe } from "../websocket.js";

let svg, graphGroup, simulation;
let nodeGroup, linkGroup;

export function loadStarsView() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  svg = d3.select("#app").append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight)
    .style("background", "#000");

  graphGroup = svg.append("g").attr("id", "graph");

  // 줌/팬 설정
  svg.call(d3.zoom()
    .scaleExtent([0.2, 4])
    .on("zoom", (e) => {
      graphGroup.attr("transform", e.transform);
    }));

  // WebSocket에서 데이터 받아오기
  subscribe((data) => {
    if (data.type === "tick_result" && data.stars) {
      updateStars(data.stars);
    }
  });

  // 처음엔 메시지 기다리는 텍스트만
  graphGroup.append("text")
    .attr("x", 100)
    .attr("y", 100)
    .attr("fill", "white")
    .text("🛰️ Waiting for stars...");
}

function updateStars(stars) {
  graphGroup.selectAll("*").remove();

  const width = window.innerWidth;
  const height = window.innerHeight;

  const typeColorMap = {
    "STAR_MAIN_SEQUENCE_A": "#f0f8ff",
    "STAR_MAIN_SEQUENCE_B": "#add8e6",
    "STAR_MAIN_SEQUENCE_G": "#ffff99",
    "STAR_NEUTRON": "#ff69b4",
    "STAR_WHITE_DWARF": "#cccccc",
  };

  const nodes = stars.map((s) => ({
    id: s.id,
    name: s.name,
    size: s.size,
    color: s.type.map(t => typeColorMap[t.id] || "#888"),
  }));

  const linksSet = new Set();
  const links = [];
  stars.forEach((s) => {
    (s.linked_stars || []).forEach((targetId) => {
      const key = [s.id, targetId].sort().join("-");
      if (!linksSet.has(key)) {
        linksSet.add(key);
        links.push({ source: s.id, target: targetId });
      }
    });
  });

  simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(80))
    .force("charge", d3.forceManyBody().strength(-250))
    .force("center", d3.forceCenter(width / 2, height / 2));

  linkGroup = graphGroup.append("g")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 1.5)
    .selectAll("line")
    .data(links)
    .enter()
    .append("line");

  nodeGroup = graphGroup.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("g")
    .data(nodes)
    .enter()
    .append("g")
    .call(d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded));

  nodeGroup.each(function (d) {
    const g = d3.select(this);
    const count = d.size.length;
    d.size.forEach((s, i) => {
      g.append("circle")
        .attr("r", s / 10)
        .attr("cx", i * 12 - (count - 1) * 6)
        .attr("fill", d.color[i] || "#888");
    });
  });

  nodeGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text(d => d.name);

  simulation.on("tick", () => {
    linkGroup
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    nodeGroup
      .attr("transform", d => `translate(${d.x},${d.y})`);
  });
}

function dragStarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragEnded(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
