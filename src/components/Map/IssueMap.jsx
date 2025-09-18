import React from 'react';

const IssueMap = ({ issues, onIssueSelect }) => {
  const getMarkerColor = (status) => {
    switch (status) {
      case 'Resolved': return '#10B981';
      case 'In Progress': return '#F59E0B';
      case 'Pending': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const defaultCenter = [40.7128, -74.0060]; 

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-md bg-gray-100 relative">
      {/* Map placeholder with interactive elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map View</h3>
          <p className="text-sm text-gray-600 mb-4">Click on issue markers to view details</p>
        </div>
      </div>
      
      {/* Issue markers overlay */}
      <div className="absolute inset-0 p-4">
        <div className="grid grid-cols-4 gap-4 h-full">
          {issues.slice(0, 8).map((issue, index) => (
            <div
              key={issue.id}
              className="flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform"
              onClick={() => onIssueSelect?.(issue)}
              style={{
                gridColumn: (index % 4) + 1,
                gridRow: Math.floor(index / 4) + 1,
              }}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: getMarkerColor(issue.status) }}
                title={`${issue.title} - ${issue.status}`}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="text-xs font-semibold text-gray-700 mb-2">Status Legend</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueMap;