import React from 'react';
import styles from './TableSkeletonLoader.module.css';
import { Plus } from 'lucide-react';

interface TableSkeletonLoaderProps {
  columns: number;
  rows?: number;
}

const TableSkeletonLoader: React.FC<TableSkeletonLoaderProps> = ({ 
  columns, 
  rows = 5 
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
  <div className={`h-6 w-1/4 rounded ${styles.skeleton}`}></div>
  <div className={`flex items-center gap-2 rounded px-4 py-2 w-32 ${styles.skeleton}`}>
          <Plus className="w-5 h-5 text-transparent" />
          <span className="text-transparent">Add New</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {[...Array(columns)].map((_, index) => (
                <th
                  key={index}
                  className="px-4 py-4 font-medium text-black dark:text-white text-center"
                >
                  <div className={`h-4 w-3/4 mx-auto rounded ${styles.skeleton}`}></div>
                </th>
              ))}
              <th className="px-4 py-4 font-medium text-black dark:text-white text-center">
                <div className={`h-4 w-3/4 mx-auto rounded ${styles.skeleton}`}></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="border-b border-stroke dark:border-strokedark"
              >
                {[...Array(columns)].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
                    style={{ minWidth: '120px' }}
                  >
                    <div className={`h-4 w-3/4 rounded ${styles.skeleton}`}></div>
                  </td>
                ))}
                <td className="px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 text-center">
                  <div className="flex justify-center space-x-3.5">
                    <div className={`w-5 h-5 rounded-full ${styles.skeleton}`}></div>
                    <div className={`w-5 h-5 rounded-full ${styles.skeleton}`}></div>
                    <div className={`w-5 h-5 rounded-full ${styles.skeleton}`}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeletonLoader;