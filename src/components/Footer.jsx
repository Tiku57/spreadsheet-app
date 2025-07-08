import React from 'react';

function Footer({ activeTab, onTabChange }) {
  const tabs = ['All Orders', 'Pending', 'Reviewed', 'Arrived'];

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between text-sm">
      <div className="flex items-center space-x-4">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out ${
              activeTab === tab
                ? 'bg-green-50 text-green-800 font-semibold border-b-2 border-green-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
