


import React from 'react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import './TableThree.css';

export interface Column {
  header: string;
  accessorKey: string;
  cell?: ({ row }: { row: any }) => React.ReactNode;
}

interface TableThreeProps {
  columns: Column[];
  data: any[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
  };
  onPageChange?: (page: number) => void;
  onAddClick?: () => void;
  onViewClick?: (row: any) => void;
  onEditClick?: (row: any) => void;
  onDeleteClick?: (row: any) => void;
  headerActions?: React.ReactNode;
  darkMode?: boolean;
}

const generatePageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  const delta = 2;

  pages.push(1);
  for (let i = Math.max(2, currentPage - delta); i < currentPage; i++) {
    pages.push(i);
  }
  if (currentPage !== 1 && currentPage !== totalPages) {
    pages.push(currentPage);
  }
  for (let i = currentPage + 1; i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    pages.push(i);
  }
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  const finalPages: (number | string)[] = [];
  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && typeof pages[i] === 'number' && typeof pages[i - 1] === 'number' && pages[i] !== (pages[i - 1] as number) + 1) {
      finalPages.push('...');
    }
    finalPages.push(pages[i]);
  }

  return finalPages;
};

const TableThree: React.FC<TableThreeProps> = ({
  columns,
  data,
  pagination,
  onPageChange,
  onAddClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  headerActions,
  darkMode = false,
}) => {
  const totalColumns = columns.length + (onViewClick || onEditClick || onDeleteClick ? 1 : 0);

  return (
    <div className={`table-three-container ${darkMode ? 'dark' : ''}`}>
      <div className={`table-three-header ${darkMode ? 'dark' : ''}`}>
        <h4 className={`${darkMode ? 'dark' : ''}`}></h4>
        <div className="table-three-header-actions">
    {headerActions}
    {onAddClick && (
      <button
        onClick={onAddClick}
        className="table-three-add-btn"
      >
        <Plus className="w-5 h-5" />
        Add New
      </button>
    )}
  </div>
      </div>

      <div className="table-three-wrapper">
        <table className="table-three-table">
          <thead className={`table-three-thead ${darkMode ? 'dark' : ''}`}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`table-three-th ${darkMode ? 'dark' : ''}`}
                >
                  {column.header}
                </th>
              ))}
              {(onViewClick || onEditClick || onDeleteClick) && (
                <th className={`table-three-th ${darkMode ? 'dark' : ''}`}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="table-three-tbody">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className={`table-three-tr ${darkMode ? 'dark' : ''}`}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`table-three-td ${darkMode ? 'dark' : ''}`}
                      style={{ minWidth: '120px' }}
                    >
                      {column.cell ? column.cell({ row }) : row[column.accessorKey]?.toString()}
                    </td>
                  ))}
                  {(onViewClick || onEditClick || onDeleteClick) && (
                    <td className={`table-three-td table-three-actions ${darkMode ? 'dark' : ''}`}>
                      <div className="table-three-actions-wrapper">
                        {onViewClick && (
                          <button onClick={() => onViewClick(row)} className="table-three-action-btn" title="View">
                            <Eye className="w-5 h-5" />
                          </button>
                        )}
                        {onEditClick && (
                          <button onClick={() => onEditClick(row)} className="table-three-action-btn" title="Edit">
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                        {onDeleteClick && (
                          <button onClick={() => onDeleteClick(row)} className="table-three-action-btn danger" title="Delete">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={totalColumns}
                  className={`table-three-no-data ${darkMode ? 'dark' : ''}`}
                >
                  {pagination && pagination.totalItems === 0
                    ? 'No data available'
                    : 'No data is available on this page'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && onPageChange && pagination.totalItems > 0 && (
        <div className="table-three-pagination">
          <nav className={`${darkMode ? 'dark' : ''}`}>
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className={`table-three-pagination-btn prev ${darkMode ? 'dark' : ''}`}
            >
              Previous
            </button>
            {generatePageNumbers(pagination.currentPage, pagination.totalPages).map((page, index) =>
              page === '...' ? (
                <span
                  key={index}
                  className={`table-three-pagination-ellipsis ${darkMode ? 'dark' : ''}`}
                >
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => onPageChange(page as number)}
                  className={`table-three-pagination-btn page ${
                    page === pagination.currentPage ? 'active' : ''
                  } ${darkMode ? 'dark' : ''}`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className={`table-three-pagination-btn next ${darkMode ? 'dark' : ''}`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TableThree;





