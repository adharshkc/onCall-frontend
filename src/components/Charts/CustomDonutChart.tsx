"use client";
import React from "react";
import styles from "./CustomDonutChart.module.css";

interface CustomDonutChartProps {
  series: number[];
  labels: string[];
  title: string;
  theme?: "light" | "dark";
}

const CustomDonutChart: React.FC<CustomDonutChartProps> = ({ series, labels, title, theme = "light" }) => {
  const total = series.reduce((sum, value) => sum + value, 0);
  const colors = [
    "#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF", 
    "#FF5733", "#C70039", "#900C3F", "#FFC300",
    "#DAF7A6", "#FF6B6B", "#4ECDC4", "#45B7D1"
  ];

  let cumulativePercentage = 0;
  const segments = series.map((value, index) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    const startAngle = (cumulativePercentage / 100) * 360;
    const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
    
    cumulativePercentage += percentage;
    
    return {
      value,
      percentage,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
      label: labels[index] || `Item ${index + 1}`
    };
  });

  const createPath = (startAngle: number, endAngle: number, innerRadius = 40, outerRadius = 80) => {
    const start = polarToCartesian(100, 100, outerRadius, endAngle);
    const end = polarToCartesian(100, 100, outerRadius, startAngle);
    const innerStart = polarToCartesian(100, 100, innerRadius, endAngle);
    const innerEnd = polarToCartesian(100, 100, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  const containerClass = theme === "dark" ? `${styles.container} ${styles.dark}` : styles.container;

  return (
    <div className={containerClass}>
      <div className={styles.title}>
        <h4>{title}</h4>
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.chartContainer}>
          <svg width="200" height="200" viewBox="0 0 200 200" className={styles.donutChart}>
            {segments.map((segment, index) => (
              <g key={index} className={styles.segment}>
                <path
                  d={createPath(segment.startAngle, segment.endAngle)}
                  fill={segment.color}
                  className={styles.segmentPath}
                />
              </g>
            ))}
            <circle
              cx="100"
              cy="100"
              r="35"
              fill="transparent"
              className={styles.centerCircle}
            />
          </svg>
          <div className={styles.centerLabel}>
            <span className={styles.totalValue}>{total}</span>
            <span className={styles.totalLabel}>Total</span>
          </div>
        </div>
        <div className={styles.legend}>
          {segments.map((segment, index) => (
            <div key={index} className={styles.legendItem}>
              <div 
                className={styles.legendColor}
                style={{ backgroundColor: segment.color }}
              />
              <div className={styles.legendContent}>
                <span className={styles.legendLabel}>{segment.label}</span>
                <span className={styles.legendValue}>
                  {segment.value} ({segment.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomDonutChart;
