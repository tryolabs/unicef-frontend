import { useEffect, useRef, memo } from "react";

interface MapContainerProps {
  mapHTML: string;
}

const INITIAL_MAP_HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; }
        #map { height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([20, 0], 2);
        L.tileLayer('https://geoservices.un.org/arcgis/rest/services/ClearMap_WebTopo/MapServer/tile/{z}/{y}/{x}', {
          attribution: '© United Nations'
        }).addTo(map);
      </script>
    </body>
  </html>
`;

export const MapContainer = memo(({ mapHTML }: MapContainerProps) => {
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (!mapInitialized.current) {
      const iframe = document.createElement("iframe");
      iframe.srcdoc = INITIAL_MAP_HTML;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";

      const container = document.getElementById("map-container");
      if (container) {
        container.innerHTML = "";
        container.appendChild(iframe);
      }

      mapInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (mapInitialized.current && mapHTML) {
      const iframe = document.querySelector(
        "#map-container iframe"
      ) as HTMLIFrameElement;
      if (iframe) {
        iframe.srcdoc = mapHTML;
      }
    }
  }, [mapHTML]);

  return <div id="map-container" style={{ width: "100%", height: "100%" }} />;
});
