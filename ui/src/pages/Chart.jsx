import React from "react";
import { Container } from "react-bootstrap";

const Chart = () => {
  return (
    <Container style={{ height: "100vh" }}>
      <iframe
        title="Chart"
        style={{
          background: "#21313C",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          width: "100%",
          height: "100%",
        }}
        src="https://charts.mongodb.com/charts-project-0-izlat/embed/dashboards?id=e3f4fd00-01ab-4070-b255-1eb500fed70d&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"
      ></iframe>
    </Container>
  );
};

export default Chart;
