import React from 'react';
import { MapPin, Clock, User, AlertTriangle } from 'lucide-react';

const IssueCard = ({ 
  issue, 
  showActions = false, 
  onStatusChange,
  onAssign 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const departments = ['Public Works', 'Sanitation', 'Maintenance', 'Parks & Recreation', 'Utilities'];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={issue.image}
        alt={issue.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{issue.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
            {issue.status}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{issue.description}</p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="truncate">{issue.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock size={14} className="flex-shrink-0" />
              <span>{issue.submittedDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle size={14} className={`flex-shrink-0 ${getPriorityColor(issue.priority)}`} />
              <span className={getPriorityColor(issue.priority)}>{issue.priority}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <User size={14} className="flex-shrink-0" />
            <span>{issue.submittedBy}</span>
          </div>
          
          {issue.assignedTo && (
            <div className="text-xs bg-gray-100 px-2 py-1 rounded">
              Assigned to: {issue.assignedTo}
            </div>
          )}
        </div>

        {showActions && (
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onStatusChange?.(issue.id, 'Pending')}
                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Pending
              </button>
              <button
                onClick={() => onStatusChange?.(issue.id, 'In Progress')}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
              >
                In Progress
              </button>
              <button
                onClick={() => onStatusChange?.(issue.id, 'Resolved')}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                Resolved
              </button>
            </div>
            
            {!issue.assignedTo && onAssign && (
              <select
                onChange={(e) => e.target.value && onAssign(issue.id, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="">Assign to Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueCard;