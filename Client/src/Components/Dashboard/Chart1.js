import React, { useState } from "react";
import { Fragment } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";

const Chart1 = () => {
  const [chartData, setChartData] = useState({
    labels: [
      "Boston",
      "Worcester",
      "Springfield",
      "Lowell",
      "Cambridge",
      "New Bedford",
    ],
    datasets: [
      {
        label: "Population",
        data: [617594, 181045, 153060, 106519, 105162, 95072],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });
  return (
    <Fragment>
      <Card className="chartcard mb-3 shadow bg-white rounded">
        <CardHeader>Chart 1</CardHeader>
        <CardBody>
          <Bar data={chartData} />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Chart1;
