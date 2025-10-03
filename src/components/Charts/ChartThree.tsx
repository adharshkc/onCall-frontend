

"use client";
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ChartThree.module.css";

interface ChartThreeProps {
  series: number[];
  labels: string[];
  title: string;
}

const ChartThree: React.FC<ChartThreeProps> = ({ series, labels, title }) => {
  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF", "#FF5733", "#C70039", "#900C3F"], // Extended colors for more services
    labels: labels,
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: { width: 380 },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: { width: 200 },
        },
      },
    ],
  };

  return (
    <div className={styles["chart-three-container"]}>
      <div className={styles["chart-three-title"]}>
        <h5>{title}</h5>
      </div>
      <div className={styles["chart-three-wrapper"]}>
        <div id="chartThree">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>
      <div className={styles["chart-three-legend"]}>
        {labels.map((label, index) => (
          <div key={label} className={styles["chart-three-legend-item"]}>
            <div className={styles["chart-three-legend-content"]}>
              <span
                className={styles["chart-three-legend-color"]}
                style={{ backgroundColor: (options.colors ?? [])[index % (options.colors?.length ?? 1)] }}
              ></span>
              <p className={styles["chart-three-legend-text"]}>
                <span>{label}</span>
                <span>{((series[index] / series.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;