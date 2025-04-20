import { subscribe } from "../websocket.js";

let svg, graphGroup, simulation;
let nodeGroup, linkGroup;
let nodeElements = [];
let linkElements = [];
let initialized = false;
const nodeMap = new Map();

export function loadStarsView() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  svg = d3.select("#app").append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight)
    .style("background", "#000");

  graphGroup = svg.append("g").attr("id", "graph");

  svg.call(d3.zoom()
    .scaleExtent([0.05, 8])
    .on("zoom", (e) => {
      graphGroup.attr("transform", e.transform);
    }));

  graphGroup.append("text")
    .attr("id", "waiting-message")
    .attr("x", 100)
    .attr("y", 100)
    .attr("fill", "white")
    .text("🛰️ Waiting for stars...");

  subscribe((data) => {
    console.log("받은 데이터:", data);
    if (data.type === "tick_result" && data.stars) {
      console.log("별 데이터:", data.stars);
      d3.select("#waiting-message").remove();
      updateStars(data.stars);
    }
  });
}

function updateStars(stars) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const typeColorMap = {
    "STAR_MAIN_SEQUENCE_A": "#f0f8ff",
    "STAR_MAIN_SEQUENCE_B": "#add8e6",
    "STAR_MAIN_SEQUENCE_G": "#ffff99",
    "STAR_NEUTRON": "#ff69b4",
    "STAR_WHITE_DWARF": "#cccccc",
  };

  const nodes = stars.map(s => {
    const existingNode = nodeMap.get(s.id);
    return {
      id: s.id,
      name: s.name,
      size: s.size,
      color: s.type.map(t => typeColorMap[t.id] || "#888"),
      x: existingNode ? existingNode.x : Math.random() * width,
      y: existingNode ? existingNode.y : Math.random() * height,
      vx: existingNode ? existingNode.vx : 0,
      vy: existingNode ? existingNode.vy : 0
    };
  });

  nodes.forEach(node => {
    nodeMap.set(node.id, node);
  });

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

  if (!initialized) {
    initialized = true;
    simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-250))
      .force("center", d3.forceCenter(width / 2, height / 2));

    linkGroup = graphGroup.append("g").attr("stroke", "#aaa").attr("stroke-width", 1.5);
    nodeGroup = graphGroup.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5);

    simulation.on("tick", () => {
      linkElements
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodeElements
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });
  }

  // 링크 업데이트
  linkElements = linkGroup.selectAll("line")
    .data(links, d => `${d.source.id}-${d.target.id}`);

  linkElements.exit().remove();
  
  const newLinks = linkElements.enter()
    .append("line")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 1.5);
  
  linkElements = newLinks.merge(linkElements);

  // 노드 업데이트
  nodeElements = nodeGroup.selectAll("g")
    .data(nodes, d => d.id);

  nodeElements.exit().remove();

  const newNodes = nodeElements.enter()
    .append("g")
    .call(d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded));

  newNodes.each(function(d) {
    const g = d3.select(this);
    const count = d.size.length;
    d.size.forEach((s, i) => {
      g.append("circle")
        .attr("r", s / 10)
        .attr("cx", i * 12 - (count - 1) * 6)
        .attr("fill", d.color[i] || "#888");
    });

    g.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text(d => d.name);
  });

  nodeElements = newNodes.merge(nodeElements);

  // 시뮬레이션 업데이트
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(0.3).restart();
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
