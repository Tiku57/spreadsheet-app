// spreadsheet-app/src/components/Header.jsx
import React from 'react';

function Header({ searchTerm, onSearchChange, onNewAction, onImport, onExport, onShare }) {
  return (
    <header className="bg-white shadow-md p-4 flex flex-col z-20">
      {/* Top Row: Breadcrumbs, Search, User Info */}
      <div className="flex items-center justify-between mb-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-gray-500 text-sm">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="font-medium text-gray-600">Workspace</span>
          <span className="mx-1">/</span>
          <span className="font-medium text-gray-600">Folder 2</span>
          <span className="mx-1">/</span>
          <span className="font-semibold text-gray-800">Spreadsheet 3</span>
          <span className="ml-2 text-gray-400">...</span> {/* Elipsis as shown in image */}
        </div>

        {/* Search Bar and User Info */}
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <svg className="absolute left-3 text-gray-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search within sheet"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 w-64 text-sm"
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>

          {/* Notification Bell */}
          <div className="relative">
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="w-8 h-11"  // increased size here
>
  <path d="M12 2C10.067 2 8.5 3.567 8.5 5.5V6.3c-2.397.904-4 3.21-4 5.7v3.586L3.293 17.793A1 1 0 004 19h5.035a3 3 0 005.93 0H20a1 1 0 00.707-1.707L19.5 15.586V12c0-2.49-1.603-4.796-4-5.7V5.5C15.5 3.567 13.933 2 12 2zm0 18a1 1 0 01-.993-.883L11 19h2a1 1 0 01-.883.993L12 20z" />
</svg>


            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              2
            </span>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <img
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" // Placeholder for user avatar
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-200"
            />
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-800">John Doe</span>
              <span className="text-gray-500 text-xs">john.doe@example.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Toolbar & Action Buttons */}
      <div className="flex items-center justify-between border-t border-black pt-3">
        {/* Toolbar Left */}
        <div className="flex items-center space-x-6 text-gray-600 text-sm">
          <span className="font-semibold">Tool bar &gt;</span>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Hide fields</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4 4v7" />
            </svg>
            <span>Sort</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01.293.707l3 3A1 1 0 0121 10v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10a1 1 0 01.293-.707l3-3A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Cell view</span>
          </button>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onImport}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Import
          </button>
          <button
            onClick={onExport}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Export
          </button>
          <button
            onClick={onShare}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.368-2.684 3 3 0 00-5.368 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          <button
            onClick={onNewAction}
            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 ease-in-out flex items-center text-sm font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Action
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;