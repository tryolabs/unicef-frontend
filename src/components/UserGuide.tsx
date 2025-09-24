import { useMemo } from "react";

interface UserGuideProps {
  isVisible: boolean;
  onClose: () => void;
}

const CAPABILITIES = [
  {
    title: "Explore UNICEF indicators",
    description:
      "Access data on education, health, nutrition, child protection, and other key metrics from UNICEF's Data Warehouse",
  },
  {
    title: "Analyze geospatial patterns",
    description:
      "Visualize data on maps to understand geographic distributions and trends",
  },
  {
    title: "Examine climate data",
    description:
      "View climate-related information such as droughts, heatwaves, and environmental factors that impact children",
  },
];

export const UserGuide = ({ isVisible, onClose }: UserGuideProps) => {
  const datasets = useMemo(
    () => ({
      geospatial: [
        "Children Population",
        "Floods",
        "Drought",
        "Heatwaves",
        "Fire",
        "Sand/Dust Storms",
        "Air Pollution",
        "Malaria",
        "Risk Index",
      ],
      datawarehouse: [
        "Child Poverty",
        "Child Mortality",
        "Demography",
        "Education",
        "HIV/AIDS",
        "Immunisation",
        "Nutrition",
        "Child Marriage",
        "WASH in Healthcare Facilities",
        "Household WASH",
        "Subnational WASH",
      ],
    }),
    []
  );

  if (!isVisible) return null;

  return (
    <div className="user-guide-overlay" onClick={onClose}>
      <div className="user-guide-modal" onClick={(e) => e.stopPropagation()}>
        <div className="user-guide-header">
          <h2>Geosphere - UNICEF Data Explorer</h2>
          <button className="close-button" onClick={onClose}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="user-guide-content">
          <p>
            This tool helps you explore and analyze global data through natural
            language queries. By combining UNICEF's data warehouse indicators
            with geospatial analysis capabilities, it provides insights into
            important development and humanitarian issues affecting children
            worldwide.
          </p>

          <div className="guide-section">
            <h3>What can you do?</h3>
            <ul>
              {CAPABILITIES.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong> - {description}
                </li>
              ))}
            </ul>
          </div>

          <div className="guide-section">
            <h3>Available Data</h3>
            <div className="data-types">
              <div className="data-type">
                <h4>🌍 Geospatial Data</h4>
                <ul>
                  {datasets.geospatial.map((name) => (
                    <li key={name}>
                      <strong>{name}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="data-type">
                <h4>📊 UNICEF Indicators</h4>
                <ul>
                  {datasets.datawarehouse.map((name) => (
                    <li key={name}>
                      <strong>{name}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
