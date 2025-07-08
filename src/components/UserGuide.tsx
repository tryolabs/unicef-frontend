const DATA_TYPES = [
  {
    title: "🌍 Geospatial Data",
    items: ["Floods data", "Heatwaves data", "Demographic data"],
  },
  {
    title: "📊 UNICEF Indicators",
    items: [
      "Child mortality",
      "Education access",
      "Nutrition status",
      "Water and sanitation",
      "Health coverage",
    ],
  },
];

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

export const UserGuide = () => (
  <div className="user-guide">
    <h2>UNICEF Geospatial Analysis Assistant</h2>
    <p>
      This tool helps you explore and analyze global data through natural
      language queries. By combining UNICEF's data warehouse indicators with
      geospatial analysis capabilities, it provides insights into important
      development and humanitarian issues affecting children worldwide.
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
        {DATA_TYPES.map(({ title, items }) => (
          <div key={title} className="data-type">
            <h4>{title}</h4>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);
