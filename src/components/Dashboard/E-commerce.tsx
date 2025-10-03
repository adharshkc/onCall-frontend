


// src/components/Dashboard/E-commerce.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "@/lib/api";
import CardDataStats from "../CardDataStats";
import CustomDonutChart from "../Charts/CustomDonutChart";
import CustomBarChart from "../Charts/CustomBarChart";
import { API_URL } from "@/config/api";
import { DateTime } from 'luxon'; // Import DateTime for date parsing
import './E-commerce.css'; // Import custom CSS

const ECommerce: React.FC = () => {
  // State for counts
  const [usersCount, setUsersCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [speakersCount, setSpeakersCount] = useState(0);
  const [bannersCount, setBannersCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [contacts, setContacts] = useState<any[]>([]);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          // usersRes,
          // eventsRes,
          // speakersRes,
          // bannersRes,
          // blogsRes,
          // servicesRes,
          // galleryRes,
          contactsRes,
        ] = await Promise.all([
          // axios.get(`${API_URL}/users/count`),
          // axios.get(`${API_URL}/events/count`),
          // axios.get(`${API_URL}/speakers/count`),
          // axios.get(`${API_URL}/banners/count`),
          // axios.get(`${API_URL}/blog/count`),
          // axios.get(`${API_URL}/service/count`),
          // axios.get(`${API_URL}/gallery/count`),
          axios.get(`${API_URL}/contacts/full`),
        ]);
        // setUsersCount(usersRes?.data.data[0]?.total);
        // setEventsCount(eventsRes?.data.data[0]?.total);
        // setSpeakersCount(speakersRes?.data.data[0]?.total);
        // setBannersCount(bannersRes?.data.data[0]?.total);
        // setBlogsCount(blogsRes?.data.data[0]?.total);
        // setServicesCount(servicesRes?.data.data[0]?.total);
        // setGalleryCount(galleryRes?.data.data[0]?.total);
        setContacts(contactsRes?.data?.data || []);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch dashboard data. ${err}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Compute service selection data for ChartThree
  const serviceAnalytics = useMemo(() => {
    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return {
        totalContacts: 0,
        chartData: { labels: [], series: [] },
      };
    }

    const serviceCounts = contacts.reduce((acc: { [key: string]: number }, contact) => {
      const service = contact.serviceType || "Unspecified";
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(serviceCounts);
    const series = Object.values(serviceCounts);

    return {
      totalContacts: contacts.length,
      chartData: { labels, series },
    };
  }, [contacts]);

  // Compute contacts per month for ChartFour
  const contactsByMonth = useMemo(() => {
    // Initialize an array for all months (Jan to Dec)
    const months = Array(12).fill(0); // [0, 0, ..., 0] for 12 months
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    if (contacts && Array.isArray(contacts)) {
      contacts.forEach((contact) => {
        if (contact.createdAt) {
          const createdAt = DateTime.fromISO(contact.createdAt);
          const monthIndex = createdAt.month - 1; // 0 (Jan) to 11 (Dec)
          if (monthIndex >= 0 && monthIndex < 12) {
            months[monthIndex] += 1;
          }
        }
      });
    }

    return {
      series: months,
      categories: monthNames,
    };
  }, [contacts]);

  if (loading) return <div className="ecommerce-loading">Loading...</div>;
  if (error) return <div className="ecommerce-error">{error}</div>;

  return (
    <div className="ecommerce-dashboard">
      {/* Total Counts Cards */}
      <div className="ecommerce-stats-grid">
        <CardDataStats title="Total Admins" total={usersCount.toString()} rate="0%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        {/* <CardDataStats title="Total Events Added" total={eventsCount.toString()} rate="0%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Speakers Added" total={speakersCount.toString()} rate="0%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
              fill=""
            />
            <path
              d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Banners Added" total={bannersCount.toString()} rate="0%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.741 16.4312C10.366 16.4312 9.26602 17.5312 9.26602 18.9062C9.26602 20.2812 10.366 21.3812 11.741 21.3812C13.116 21.3812 14.216 20.2812 14.216 18.9062C14.216 17.5656 13.0816 16.4312 11.741 16.4312ZM11.741 19.8687C11.2254 19.8687 10.8129 19.4562 10.8129 18.9406C10.8129 18.425 11.2254 18.0125 11.741 18.0125C12.2566 18.0125 12.6691 18.425 12.6691 18.9406C12.6691 19.4219 12.2222 19.8687 11.741 19.8687Z"
              fill=""
            />
            <path
              d="M5.20977 16.4312C3.83477 16.4312 2.73477 17.5312 2.73477 18.9062C2.73477 20.2812 3.83477 21.3812 5.20977 21.3812C6.58477 21.3812 7.68477 20.2812 7.68477 18.9062C7.68477 17.5656 6.55039 16.4312 5.20977 16.4312ZM5.20977 19.8687C4.69414 19.8687 4.28164 19.4562 4.28164 18.9406C4.28164 18.425 4.69414 18.0125 5.20977 18.0125C5.72539 18.0125 6.13789 18.425 6.13789 18.9406C6.13789 19.4219 5.72539 19.8687 5.20977 19.8687Z"
              fill=""
            />
            <path
              d="M18.9941 0.618744H17.1379C16.3129 0.618744 15.591 1.23749 15.4879 2.06249L14.9379 6.01562H1.35977C1.01602 6.01562 0.672266 6.18749 0.431641 6.46249C0.225391 6.73749 0.122266 7.11562 0.225391 7.45937C0.225391 7.49374 0.225391 7.49374 0.225391 7.52812L2.35664 13.9562C2.49414 14.4375 2.94102 14.7812 3.45664 14.7812H12.9441C14.216 14.7812 15.316 13.8187 15.4879 12.5469L16.9316 2.26874C16.9316 2.19999 17.0004 2.16562 17.0691 2.16562H18.9254C19.3379 2.16562 19.716 1.82187 19.716 1.37499C19.716 0.928119 19.4066 0.618744 18.9941 0.618744ZM14.0098 12.3062C13.941 12.8219 13.4941 13.2 12.9785 13.2H3.76602L1.90977 7.56249H14.6973L14.0098 12.3062Z"
              fill=""
            />
          </svg>
        </CardDataStats> */}
        <CardDataStats title="Total Blogs Added" total={blogsCount.toString()} rate="0%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.875 6.875H15.125V5.5C15.125 4.9125 14.6625 4.4375 14.0625 4.4375H7.9375C7.35 4.4375 6.875 4.9125 6.875 5.5V6.875H4.125C3.5375 6.875 3.0625 7.35 3.0625 7.9375V16.5C3.0625 17.0875 3.5375 17.5625 4.125 17.5625H17.875C18.4625 17.5625 18.9375 17.0875 18.9375 16.5V7.9375C18.9375 7.35 18.4625 6.875 17.875 6.875ZM8.9375 5.5C8.9375 5.9125 9.225 6.1875 9.625 6.1875H12.375C12.775 6.1875 13.0625 5.9125 13.0625 5.5V5.5H8.9375ZM16.8125 15.4375H5.1875V9.0625H16.8125V15.4375Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Services Added" total={servicesCount.toString()} rate="0%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.8125 8.9375L10.5625 14.1875C10.3125 14.4375 9.9625 14.5625 9.625 14.5625C9.2875 14.5625 8.9375 14.4375 8.6875 14.1875L6.1875 11.6875C5.6875 11.1875 5.6875 10.3375 6.1875 9.8375C6.6875 9.3375 7.5375 9.3375 8.0375 9.8375L9.625 11.425L13.9625 7.0875C14.4625 6.5875 15.3125 6.5875 15.8125 7.0875C16.3125 7.5875 16.3125 8.4375 15.8125 8.9375Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Gallery Items" total={galleryCount.toString()} rate="0%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.875 6.875H15.125V5.5C15.125 4.9125 14.6625 4.4375 14.0625 4.4375H7.9375C7.35 4.4375 6.875 4.9125 6.875 5.5V6.875H4.125C3.5375 6.875 3.0625 7.35 3.0625 7.9375V16.5C3.0625 17.0875 3.5375 17.5625 4.125 17.5625H17.875C18.4625 17.5625 18.9375 17.0875 18.9375 16.5V7.9375C18.9375 7.35 18.4625 6.875 17.875 6.875ZM8.9375 5.5C8.9375 5.9125 9.225 6.1875 9.625 6.1875H12.375C12.775 6.1875 13.0625 5.9125 13.0625 5.5V5.5H8.9375ZM16.8125 15.4375H5.1875V9.0625H16.8125V15.4375Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>

      {/* Charts Section */}
      {/* <div className="ecommerce-charts-grid"> */}
      
        {/* <div className="ecommerce-chart-container">
          <h4 className="ecommerce-chart-title">
            Contact Analytics
          </h4>
          <p className="ecommerce-chart-subtitle">
            Total Contacts: {serviceAnalytics.totalContacts}
          </p>
          <CustomDonutChart
            series={serviceAnalytics.chartData.series}
            labels={serviceAnalytics.chartData.labels}
            title="Service Selection Distribution"
          />
        </div> */}

        <div className="ecommerce-chart-container">
          <h4 className="ecommerce-chart-title">
            Contacts Per Month
          </h4>
          <CustomBarChart
            series={contactsByMonth.series}
            categories={contactsByMonth.categories}
            title="Contacts Received Per Month"
          />
        </div>
      {/* </div> */}
    </div>
  );
};

export default ECommerce;