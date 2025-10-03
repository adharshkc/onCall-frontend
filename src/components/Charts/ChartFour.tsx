// src/components/Charts/ChartFour.tsx
"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import styles from "./ChartFour.module.css";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartFourProps {
  series: number[];
  categories: string[];
  title: string;
}

const ChartFour: React.FC<ChartFourProps> = ({ series, categories, title }) => {
  const options: ApexOptions = {
    colors: ["#10B981"], // Green color for the bars
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      parentHeightOffset: 0,
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "35%",
            },
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },
          chart: {
            height: 250,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories, // Will be months like ["Jan", "Feb", ...]
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Contacts",
      },
      labels: {
        formatter: (val: number) => Math.floor(val).toString(),
      },
    },
    legend: {
      show: false, // No legend since it's a single series
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} contacts`,
      },
    },
  };

  const chartSeries = [
    {
      name: "Contacts",
      data: series, // Will be the count of contacts per month
    },
  ];

  return (
    <div className={styles["chart-four-container"]}>
      <div className={styles["chart-four-title"]}>
        <h4>{title}</h4>
      </div>
      <div className={styles["chart-four-wrapper"]}>
        <ReactApexChart
          options={options}
          series={chartSeries}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default ChartFour;