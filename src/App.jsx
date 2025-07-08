import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { initialData } from './data'; // Import your data
import Header from './components/Header'; // Import the Header component
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCell, setActiveCell] = useState(null);
  const tableContainerRef = useRef(null);

  // Refs to measure header, action bar, and footer heights
  const headerRef = useRef(null);
  const actionBarRef = useRef(null);
  const footerRef = useRef(null);

  const [tableMaxHeight, setTableMaxHeight] = useState('auto'); // State to dynamically set table max-height

  // Effect to calculate table max-height on mount and window resize
  useEffect(() => {
    const calculateTableHeight = () => {
      if (headerRef.current && actionBarRef.current && footerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const actionBarHeight = actionBarRef.current.offsetHeight;
        const footerHeight = footerRef.current.offsetHeight;

        // Calculate available height for the table:
        // viewport height (100vh)
        // - header height
        // - action bar height
        // - footer height
        // - top/bottom padding from main (py-6 means 24px top + 24px bottom = 48px)
        // - margin-bottom from action bar (mb-6 means 24px)
        // - border/shadow from table wrapper (approx, can be refined if needed)
        const totalFixedElementsHeight = headerHeight + actionBarHeight + footerHeight + (24 * 2) + 24; // py-6 and mb-6
        const availableHeight = `calc(100vh - ${totalFixedElementsHeight}px)`;
        setTableMaxHeight(availableHeight);
      }
    };

    // Recalculate on mount and window resize
    calculateTableHeight();
    window.addEventListener('resize', calculateTableHeight);

    // Cleanup event listener
    return () => window.removeEventListener('resize', calculateTableHeight);
  }, []); // Run once on mount

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: () => '#',
      cell: info => info.getValue(),
      enableColumnFilter: false,
      enableSorting: false,
      size: 50,
    }),
    columnHelper.accessor('jobRequest', {
      header: () => 'Job Request',
      cell: info => info.getValue(),
      size: 300,
    }),
    columnHelper.accessor('submitted', {
      header: 'Submitted',
      cell: info => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor('submitterStatus', {
      header: 'Submitter Status',
      cell: info => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor('assignedURL', {
      header: 'Assigned URL',
      cell: info => info.getValue(),
      size: 250,
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      cell: info => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          info.getValue() === 'High' ? 'bg-red-100 text-red-800' :
          info.getValue() === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {info.getValue()}
        </span>
      ),
      size: 120,
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      cell: info => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor('estValue', {
      header: 'Est. Value',
      cell: info => info.getValue() ? `$${info.getValue().toLocaleString()}` : '', // Handle potential empty value
      size: 150,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        // Render actions only if the row has actual data (not one of the blank fillers)
        row.original && row.original.id && row.original.id <= initialData.length ? ( // Added check for row.original.id to handle newly created blank rows
          <div className="flex items-center space-x-2">
            <button
              onClick={() => console.log('View:', row.original.id)}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
              title="View Details"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={() => console.log('Edit:', row.original.id)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        ) : null // Do not render actions for blank rows
      ),
      size: 100,
      enableSorting: false,
      enableColumnFilter: false,
    }),
  ], []);

  const filteredData = useMemo(() => {
    let currentData = data;
    if (activeTab !== 'All Orders') {
      // Apply tab-specific filtering logic here if needed
    }
    if (!searchTerm) return currentData;
    const term = searchTerm.toLowerCase();
    return currentData.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [data, searchTerm, activeTab]);

  // Create an array to hold exactly 40 rows.
  // Fill with actual filtered data first, then with blank objects.
  const fortyRowsData = useMemo(() => {
    const filledRows = [...filteredData]; // Start with your actual filtered data
    const totalRows = 40;
    const currentLength = filledRows.length;

    if (currentLength < totalRows) {
      // Add blank rows up to 40
      for (let i = currentLength; i < totalRows; i++) {
        filledRows.push({ id: i + 1, jobRequest: '', submitted: '', submitterStatus: '', assignedURL: '', priority: '', dueDate: '', estValue: '' });
      }
    }
    return filledRows;
  }, [filteredData]); // Re-calculate if filteredData changes

  const table = useReactTable({
    data: fortyRowsData, // Use the new 40-row array
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCellClick = (rowId, columnId) => {
    // Prevent activating the 'actions' column
    if (columnId === 'actions') {
      setActiveCell(null);
      return;
    }
    
    // Check if the cell has a property for editing (is not a display column without accessorKey)
    const columnDef = columns.find(c => c.id === columnId);
    if (!columnDef || !columnDef.accessorKey) {
      setActiveCell(null);
      return;
    }

    setActiveCell({ rowId, columnId });
  };

  const handleCellChange = (e, rowId, columnId) => {
    const newValue = e.target.value;
    setData(prev => {
      // Find the row in the actual `data` state, not `fortyRowsData`
      let rowExistsInOriginalData = false;
      const updatedData = prev.map(row => {
        if (row.id === rowId) {
          rowExistsInOriginalData = true;
          return { ...row, [columnId]: newValue };
        }
        return row;
      });

      // If editing a "blank" row (i.e., its ID wasn't in `initialData`), we need to add it to the data
      if (!rowExistsInOriginalData) {
        const newRow = { id: rowId, [columnId]: newValue };
        // Populate other fields for the new row as empty strings for consistency
        columns.forEach(col => {
          if (col.accessorKey && col.accessorKey !== columnId) {
            newRow[col.accessorKey] = '';
          }
        });
        return [...updatedData, newRow].sort((a, b) => a.id - b.id);
      }
      return updatedData;
    });
  };

  useEffect(() => {
    const onKey = e => {
      if (!activeCell) return;
      const { rowId, columnId } = activeCell;
      // Note: Use fortyRowsData for index calculations as it represents the current table view
      const rowIndex = fortyRowsData.findIndex(r => r.id === rowId);
      const colIndex = columns.findIndex(c => c.accessorKey === columnId || c.id === columnId);

      let newRow = rowIndex, newCol = colIndex;

      if (colIndex === -1) {
        setActiveCell(null);
        return;
      }

      switch (e.key) {
        case 'ArrowUp': newRow = Math.max(0, rowIndex - 1); break;
        case 'ArrowDown': newRow = Math.min(fortyRowsData.length - 1, rowIndex + 1); break;
        case 'ArrowLeft': newCol = Math.max(0, colIndex - 1); break;
        case 'ArrowRight': newCol = Math.min(columns.length - 1, colIndex + 1); break;
        case 'Enter': newRow = Math.min(fortyRowsData.length - 1, rowIndex + 1); e.preventDefault(); break;
        case 'Escape': setActiveCell(null); return;
        default: return;
      }

      const nextRow = fortyRowsData[newRow];
      const nextCol = columns[newCol];

      // Ensure the next cell is a valid editable column (has accessorKey)
      // and not the 'actions' column
      if (nextRow && nextCol && nextCol.accessorKey && nextCol.id !== 'actions') {
        setActiveCell({ rowId: nextRow.id, columnId: nextCol.accessorKey });
      } else {
        // If navigating to a non-editable column (like Actions), find the next editable one
        let newActiveColIndex = newCol;
        if (!nextCol || !nextCol.accessorKey || nextCol.id === 'actions') {
          if (e.key === 'ArrowRight') {
            for (let i = newCol + 1; i < columns.length; i++) {
              if (columns[i].accessorKey && columns[i].id !== 'actions') {
                newActiveColIndex = i;
                break;
              }
            }
          } else if (e.key === 'ArrowLeft') {
            for (let i = newCol - 1; i >= 0; i--) {
              if (columns[i].accessorKey && columns[i].id !== 'actions') {
                newActiveColIndex = i;
                break;
              }
            }
          }
        }
        if (newActiveColIndex !== colIndex && columns[newActiveColIndex]?.accessorKey && columns[newActiveColIndex]?.id !== 'actions') {
          setActiveCell({ rowId: nextRow.id, columnId: columns[newActiveColIndex].accessorKey });
        } else {
          setActiveCell(null); // If no editable cell found, deactivate
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeCell, fortyRowsData, columns]); // Dependencies updated to fortyRowsData

  useEffect(() => {
    if (!activeCell) return;
    // Focus the input if it's an editable cell
    const sel = `input[data-row-id="${activeCell.rowId}"][data-column-id="${activeCell.columnId}"]`;
    document.querySelector(sel)?.focus();
  }, [activeCell]);

  const handleImport = () => console.log('Import clicked');
  const handleExport = () => console.log('Export clicked');
  const handleShare = () => console.log('Share clicked');
  const handleNewAction = () => console.log('New Action clicked');

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col"> {/* This is the main flex container */}
      <div ref={headerRef}> {/* Attach ref to header */}
        <Header
          searchTerm={searchTerm}
          onSearchChange={e => setSearchTerm(e.target.value)}
          onImport={handleImport}
          onExport={handleExport}
          onShare={handleShare}
          onNewAction={handleNewAction}
        />
      </div>
      
      {/* Main content area, now containing only elements that need to be within the main scroll area, if any global scroll */}
      {/* But in this case, we want the table to scroll, not the main content area */}
      <main className="flex-1 px-6 py-6 flex flex-col overflow-hidden"> {/* flex-1 and flex-col to manage vertical space, overflow-hidden to prevent main from scrolling */}
        <div ref={actionBarRef} className="bg-white rounded-lg shadow-md mb-6 p-3 flex items-center justify-between border border-gray-200 w-full">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2v-4a2 2 0 012-2h2a2 2 0 012 2v4m-6 7a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 012-2h2a2 2 0 012 2v6m0 0a1 1 0 001 1h2a1 1 0 001-1v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a1 1 0 001 1H9z" />
            </svg>
            <span className="font-semibold text-gray-800">Q3 Financial Overview</span>
            <span className="w-2 h-2 bg-red-500 rounded-full inline-block ml-1"></span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-1.5 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm">
              <span className="font-semibold">ABC</span>
              <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center px-3 py-1.5 rounded-lg bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm font-medium">
              Answer a question
              <svg className="w-4 h-4 ml-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center px-3 py-1.5 rounded-lg bg-red-100 text-red-800 hover:bg-red-200 text-sm font-medium">
              Extract
              <svg className="w-4 h-4 ml-1 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        {/* Make the table wrapper fill remaining space and handle its own scroll */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex-1 flex flex-col">
          {/* The max-height for the table should now be dynamically calculated */}
          <div ref={tableContainerRef} style={{ maxHeight: tableMaxHeight }} className="overflow-auto"> 
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                {table.getHeaderGroups().map(hg => (
                  <tr key={hg.id}>
                    {hg.headers.map(header => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize(), backgroundColor: header.column.id === 'estValue' ? '#FEE2CC' : '' }}
                        className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide relative group"
                      >
                        {!header.isPlaceholder && (
                          <div className="flex items-center">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b border-gray-300 hover:bg-blue-50 transition-colors duration-100 ease-in-out">
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className={`px-4 py-3 text-sm text-gray-800 relative ${
                          activeCell?.rowId === row.id && activeCell?.columnId === cell.column.id && cell.column.columnDef.accessorKey
                            ? 'border-2 border-blue-500 bg-blue-100'
                            : ''
                        } ${cell.column.id === 'estValue' ? 'bg-orange-50' : ''}`}
                        onClick={() => {
                          // Only allow cell interaction for columns with accessorKey and not the actions column
                          if (cell.column.columnDef.accessorKey && cell.column.id !== 'actions') {
                            handleCellClick(row.id, cell.column.id);
                          } else {
                            setActiveCell(null);
                          }
                        }}
                      >
                        {/* Render input only if cell is active and it's an editable accessorKey column */}
                        {activeCell?.rowId === row.id && activeCell?.columnId === cell.column.id && cell.column.columnDef.accessorKey ? (
                          <input
                            type="text"
                            value={String(cell.getValue() || '')} // Ensure value is a string, handle null/undefined for blank rows
                            onChange={e => handleCellChange(e, row.id, cell.column.columnDef.accessorKey)}
                            onBlur={() => setActiveCell(null)}
                            className="w-full h-full bg-white border border-blue-300 rounded-md outline-none p-1 -mx-1 -my-1 box-border focus:ring-1 focus:ring-blue-500"
                            data-row-id={row.id}
                            data-column-id={cell.column.id}
                          />
                        ) : (
                          // Render content, or empty string for blank cells
                          flexRender(cell.column.columnDef.cell, cell.getContext()) || ''
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-8 text-gray-500">No data found matching your criteria.</div>
          )}
        </div>
      </main>
      <div ref={footerRef}> {/* Attach ref to footer */}
        <Footer activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;