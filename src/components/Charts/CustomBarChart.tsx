"use client";
import React from "react";
import styles from "./CustomBarChart.module.css";

interface CustomBarChartProps {
  series: number[];
  categories: string[];
  title: string;
  theme?: "light" | "dark";
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ series, categories, title, theme = "light" }) => {
  const maxValue = Math.max(...series, 1);
  const chartHeight = 300;
  const barColor = "#10B981";

  const containerClass = theme === "dark" ? `${styles.container} ${styles.dark}` : styles.container;

  return (
    <div className={containerClass}>
      <div className={styles.title}>
        <h4>{title}</h4>
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.yAxis}>
          {[maxValue, Math.floor(maxValue * 0.75), Math.floor(maxValue * 0.5), Math.floor(maxValue * 0.25), 0].map((value, index) => (
            <div key={index} className={styles.yAxisLabel}>
              {value}
            </div>
          ))}
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.gridLines}>
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className={styles.gridLine} />
            ))}
          </div>
          <div className={styles.barsContainer}>
            {series.map((value, index) => {
              const height = maxValue > 0 ? (value / maxValue) * chartHeight : 0;
              return (
                <div key={index} className={styles.barWrapper}>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{
                        height: `${height}px`,
                        backgroundColor: barColor,
                      }}
                    >
                      <div className={styles.barValue}>{value}</div>
                    </div>
                  </div>
                  <div className={styles.xAxisLabel}>
                    {categories[index] || `Item ${index + 1}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBarChart;
