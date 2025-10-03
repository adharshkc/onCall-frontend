"use client";
import React from "react";
import styles from "./CustomMetricCard.module.css";

interface CustomMetricCardProps {
  title: string;
  value: number;
  percentage?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  color?: string;
  subtitle?: string;
}

const CustomMetricCard: React.FC<CustomMetricCardProps> = ({ 
  title, 
  value, 
  percentage, 
  trend = "neutral", 
  icon,
  color = "#3B82F6",
  subtitle 
}) => {
  const getTrendIcon = () => {
    if (trend === "up") {
      return (
        <svg className={styles.trendIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    } else if (trend === "down") {
      return (
        <svg className={styles.trendIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {icon && (
          <div className={styles.iconContainer} style={{ backgroundColor: `${color}20`, color: color }}>
            {icon}
          </div>
        )}
        <div className={styles.content}>
          <h4 className={styles.title}>{title}</h4>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      
      <div className={styles.metrics}>
        <div className={styles.value}>{value.toLocaleString()}</div>
        
        {percentage !== undefined && (
          <div className={`${styles.trend} ${styles[trend]}`}>
            {getTrendIcon()}
            <span>{Math.abs(percentage)}%</span>
          </div>
        )}
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progress}
          style={{ 
            backgroundColor: color,
            width: `${Math.min((value / 100) * 100, 100)}%` 
          }}
        />
      </div>
    </div>
  );
};

export default CustomMetricCard;
