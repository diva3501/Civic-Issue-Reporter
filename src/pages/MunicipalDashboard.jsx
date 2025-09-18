import React, { useState, useEffect, useCallback } from 'react';
import { Map, List, BarChart3, Filter, X, CheckCircle, Clock, Award, Users, ThumbsUp, ChevronDown, User, LogOut, FileText, CornerDownRight, TrendingUp, Layers, MessageCircle, Briefcase, Truck, Droplet, Leaf, Building, MessageSquare, ThumbsDown, Camera, Menu } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigate } from 'react-router-dom';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// Local Image Imports
import garbageoverflow from '../components/images/garbageoverflow.png';
import overgrowntrees from '../components/images/overgrowntrees.png';
import propertydamage from '../components/images/propertydamage.png';
import streetlightdamage from '../components/images/StreetLightdamage.png';
import waterleak from '../components/images/waterleak.png';
import pothole from '../components/images/pothole.png';
import adminPhoto from '../components/images/admin-profile.jpeg';
import userPhoto1 from '../components/images/user1.jpeg';
import userPhoto2 from '../components/images/user2.jpeg';
import userPhoto3 from '../components/images/user3.jpeg';
import morabadiPark from '../components/images/morabadi-park.jpeg';
import wasteManagement from '../components/images/waste-management.jpeg';
import publicLibrary from '../components/images/public-library.jpeg';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

// Fix for default Leaflet marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Reusable Components
const Header = ({ onNavClick, activePage, toggleMobileMenu }) => {
    return (
        <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Building size={20} className="hidden sm:block" />
                    <span className="text-xl font-bold">Municipal Dashboard</span>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <button
                        onClick={() => onNavClick('dashboard')}
                        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                    >
                        <BarChart3 size={20} />
                        <span className="hidden md:inline">Dashboard</span>
                    </button>
                    <button
                        onClick={() => onNavClick('departments')}
                        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'departments' || activePage === 'department-issues' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                    >
                        <Users size={20} />
                        <span className="hidden md:inline">Departments</span>
                    </button>
                    <button
                        onClick={() => onNavClick('discussions')}
                        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'discussions' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                    >
                        <MessageSquare size={20} />
                        <span className="hidden md:inline">Discussions</span>
                    </button>
                    <button
                        onClick={() => onNavClick('profile')}
                        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'profile' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                    >
                        <User size={20} />
                        <span className="hidden md:inline">Profile</span>
                    </button>
                    <button onClick={() => onNavClick('logout')} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-600 transition-colors ">
                        <LogOut size={20} />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
                <button onClick={toggleMobileMenu} className="md:hidden">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
};

// MobileMenu Component
const MobileMenu = ({ onNavClick, activePage, isOpen, onClose }) => {
    return (
        <div className={`fixed inset-0 bg-blue-700 z-[100] transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 text-white border-b border-blue-600">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={onClose}>
                    <X size={24} />
                </button>
            </div>
            <div className="flex flex-col p-4 space-y-2">
                <button
                    onClick={() => onNavClick('dashboard')}
                    className={`flex items-center space-x-2 p-4 text-white rounded-lg transition-colors ${activePage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                >
                    <BarChart3 size={20} />
                    <span>Dashboard</span>
                </button>
                <button
                    onClick={() => onNavClick('departments')}
                    className={`flex items-center space-x-2 p-4 text-white rounded-lg transition-colors ${activePage === 'departments' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                >
                    <Users size={20} />
                    <span>Departments</span>
                </button>
                <button
                    onClick={() => onNavClick('discussions')}
                    className={`flex items-center space-x-2 p-4 text-white rounded-lg transition-colors ${activePage === 'discussions' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                >
                    <MessageSquare size={20} />
                    <span>Discussions</span>
                </button>
                <button
                    onClick={() => onNavClick('profile')}
                    className={`flex items-center space-x-2 p-4 text-white rounded-lg transition-colors ${activePage === 'profile' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                >
                    <User size={20} />
                    <span>Profile</span>
                </button>
                <button
                    onClick={() => onNavClick('logout')}
                    className="flex items-center space-x-2 p-4 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

const IssueCard = ({ issue, onSelect }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-red-500";
            case "In Progress": return "bg-yellow-500";
            case "Resolved": return "bg-green-500";
            case "Acknowledged": return "bg-blue-500";
            default: return "bg-gray-500";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "Low": return "text-green-500";
            case "Medium": return "text-yellow-500";
            case "High": return "text-red-500";
            default: return "text-gray-500";
        }
    };

    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => onSelect(issue)}
        >
            <img src={issue.image} alt={issue.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{issue.title}</h3>
                    <span className={`text-xs font-bold uppercase rounded-full px-3 py-1 text-white ${getStatusColor(issue.status)}`}>{issue.status}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{issue.description}</p>
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2"><Map size={16} className="text-blue-500" /><span>{issue.location}</span></div>
                    <div className="flex items-center space-x-2"><BarChart3 size={16} className={getPriorityColor(issue.priority)} /><span className={getPriorityColor(issue.priority)}>Priority: {issue.priority}</span></div>
                    {issue.assignedTo && (
                        <div className="flex items-center space-x-2">
                            <Users size={16} className="text-purple-600" />
                            <span>Assigned to: {issue.assignedTo}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const IssueFilters = ({ issues, onFilter }) => {
    const [status, setStatus] = useState('All');
    const [category, setCategory] = useState('All');
    const [priority, setPriority] = useState('All');

    const categories = ['All', ...new Set(issues.map(i => i.category))];
    const statuses = ['All', 'Pending', 'In Progress', 'Resolved', 'Acknowledged'];
    const priorities = ['All', 'Low', 'Medium', 'High'];

    useEffect(() => {
        const filtered = issues.filter(issue => {
            const statusMatch = status === 'All' || issue.status === status;
            const categoryMatch = category === 'All' || issue.category === category;
            const priorityMatch = priority === 'All' || issue.priority === priority;
            return statusMatch && categoryMatch && priorityMatch;
        });
        onFilter(filtered);
    }, [status, category, priority, issues, onFilter]);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2"><Filter size={20} /><span>Filter Issues</span></h3>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
        </div>
    );
};

const IssueMap = ({ issues, onIssueSelect }) => {
    // Custom icon for markers
    const getIcon = (status) => {
        let color = 'blue';
        if (status === 'Pending') color = 'red';
        else if (status === 'In Progress') color = 'orange';
        else if (status === 'Resolved') color = 'green';
        
        return new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    };

    // Center the map on Ranchi, Jharkhand (approximate coordinates)
    const mapCenter = [23.3441, 85.3095];

    return (
        <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} className="w-full h-[60vh] sm:h-[600px] rounded-xl shadow-lg">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {issues.map(issue => (
                <Marker
                    key={issue.id}
                    position={issue.coordinates}
                    icon={getIcon(issue.status)}
                    eventHandlers={{
                        click: () => {
                            onIssueSelect(issue);
                        },
                    }}
                >
                    <Popup>
                        <h4 className="font-semibold">{issue.title}</h4>
                        <p className={`text-xs font-bold uppercase rounded-full px-2 py-1 inline-block text-white ${
                            issue.status === 'Pending' ? 'bg-red-500' :
                            issue.status === 'In Progress' ? 'bg-yellow-500' :
                            issue.status === 'Resolved' ? 'bg-green-500' : 'bg-blue-500'
                        }`}>{issue.status}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

const AnalyticsDashboard = ({ issues, departments }) => {
    const getDepartmentStats = () => {
        const stats = {};
        departments.forEach(dept => {
            stats[dept] = issues.filter(issue => issue.assignedTo === dept).length;
        });
        stats['Unassigned'] = issues.filter(issue => !issue.assignedTo).length;
        return stats;
    };

    const departmentStats = getDepartmentStats();
    const departmentNames = Object.keys(departmentStats);
    const totalIssues = issues.length;

    const statusCounts = {
        pending: issues.filter(i => i.status === 'Pending').length,
        inProgress: issues.filter(i => i.status === 'In Progress').length,
        acknowledged: issues.filter(i => i.status === 'Acknowledged').length,
        resolved: issues.filter(i => i.status === 'Resolved').length,
    };

    const pieChartData = {
        labels: ['Pending', 'In Progress', 'Acknowledged', 'Resolved'],
        datasets: [{
            data: [statusCounts.pending, statusCounts.inProgress, statusCounts.acknowledged, statusCounts.resolved],
            backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'],
        }],
    };

    const barChartData = {
        labels: departmentNames,
        datasets: [{
            label: 'Issues Assigned',
            data: Object.values(departmentStats),
            backgroundColor: departmentNames.map(dept => dept === 'Unassigned' ? '#f97316' : '#2563eb'),
        }],
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <TrendingUp size={24} />
                <span>Analytics & Reports</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Issue Status Breakdown</h3>
                    <div className="w-full md:w-3/4 mx-auto">
                        <Pie data={pieChartData} />
                    </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-inner col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Departmental Workload</h3>
                    <Bar data={barChartData} />
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg shadow-sm text-center">
                        <div className="text-3xl font-bold text-green-600">{issues.filter(i => i.status === 'Resolved').length}</div>
                        <p className="text-gray-600 mt-1">Issues Resolved</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg shadow-sm text-center">
                        <div className="text-3xl font-bold text-yellow-600">{issues.filter(i => i.status === 'In Progress').length}</div>
                        <p className="text-gray-600 mt-1">In Progress</p>
                    </div>
                     <div className="bg-red-50 p-6 rounded-lg shadow-sm text-center">
                        <div className="text-3xl font-bold text-red-600">{issues.filter(i => i.status === 'Pending').length}</div>
                        <p className="text-gray-600 mt-1">Pending</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DepartmentIcon = ({ department }) => {
    switch(department) {
        case 'Public Works': return <Briefcase size={24} />;
        case 'Sanitation': return <Truck size={24} />;
        case 'Water Department': return <Droplet size={24} />;
        case 'Parks & Recreation': return <Leaf size={24} />;
        case 'Administration': return <Building size={24} />;
        default: return <Users size={24} />;
    }
};

const DepartmentsPage = ({ issues, onIssueSelect, department, onBack }) => {
    const departmentIssues = issues.filter(issue => issue.assignedTo === department);

    const stats = {
        total: departmentIssues.length,
        pending: departmentIssues.filter(i => i.status === 'Pending').length,
        inProgress: departmentIssues.filter(i => i.status === 'In Progress').length,
        resolved: departmentIssues.filter(i => i.status === 'Resolved').length,
        acknowledged: departmentIssues.filter(i => i.status === 'Acknowledged').length,
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 flex items-center space-x-4">
                    <DepartmentIcon department={department} />
                    <span>{department} Dashboard</span>
                </h1>
                <button
                    onClick={onBack}
                    className="px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                    Back to Departments
                </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-red-50 p-4 rounded-lg shadow-sm text-center">
                    <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.pending}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg shadow-sm text-center">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                    <div className="text-xs sm:text-sm text-gray-600">In Progress</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.acknowledged}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Acknowledged</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.resolved}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Resolved</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentIssues.length > 0 ? (
                    departmentIssues.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} onSelect={onIssueSelect} />
                    ))
                ) : (
                    <div className="col-span-full bg-white p-12 text-center rounded-xl shadow-md">
                        <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No Issues Assigned</h3>
                        <p className="text-gray-600 mt-2">This department has no pending or in-progress issues.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const DiscussionCard = ({ post }) => {
    const [upvotes, setUpvotes] = useState(post.upvotes);
    const [downvotes, setDownvotes] = useState(post.downvotes);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    
    const handleUpvote = () => {
      if (upvoted) {
        setUpvotes(upvotes - 1);
        setUpvoted(false);
      } else {
        setUpvotes(upvotes + 1);
        setUpvoted(true);
        if (downvoted) {
          setDownvotes(downvotes - 1);
          setDownvoted(false);
        }
      }
    };
    
    const handleDownvote = () => {
      if (downvoted) {
        setDownvotes(downvotes - 1);
        setDownvoted(false);
      } else {
        setDownvotes(downvotes + 1);
        setDownvoted(true);
        if (upvoted) {
          setUpvotes(upvotes - 1);
          setUpvoted(false);
        }
      }
    };
    
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 sm:h-64 object-cover"
        />
        <div className="p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <img
              src={post.authorPhoto}
              alt={post.author}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mr-4 border-2 border-blue-500"
            />
            <span className="font-semibold text-gray-800 text-sm sm:text-base">{post.author}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">{post.description}</p>
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleUpvote}
                className={`flex items-center space-x-1 transition-colors ${
                  upvoted ? "text-blue-600" : "hover:text-blue-500"
                }`}
              >
                <ThumbsUp size={16} sm:size={18} fill={upvoted ? "currentColor" : "none"} />
                <span>{upvotes}</span>
              </button>
              <button
                onClick={handleDownvote}
                className={`flex items-center space-x-1 transition-colors ${
                  downvoted ? "text-red-600" : "hover:text-red-500"
                }`}
              >
                <ThumbsDown size={16} sm:size={18} fill={downvoted ? "currentColor" : "none"} />
                <span>{downvotes}</span>
              </button>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare size={16} sm:size={18} />
              <span>{post.comments} Comments</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

const DiscussionsPage = () => {
    const discussions = [
        {
          id: 1,
          author: "Rajesh Das",
          authorPhoto: userPhoto3,
          title: "Garbage overflow at Lalpur Chowk",
          description: "The community dustbin near Lalpur Chowk is overflowing, attracting stray animals and creating a serious sanitation hazard. We need a better collection schedule.",
          image: garbageoverflow,
          upvotes: 124,
          downvotes: 8,
          comments: 25,
        },
        {
          id: 2,
          author: "Priya Singh",
          authorPhoto: userPhoto2,
          title: "Overgrown trees blocking the sidewalk",
          description: "The trees on Main Street are overgrown, making it difficult for people to walk and blocking the view for drivers. The Parks department should address this.",
          image: overgrowntrees,
          upvotes: 89,
          downvotes: 2,
          comments: 15,
        },
        {
          id: 3,
          author: "Amit Sharma",
          authorPhoto: userPhoto1,
          title: "Faulty streetlight on Sector 4",
          description: "The streetlight at the intersection of Sector 4 has been non-functional for three nights, making the area unsafe for pedestrians. Can someone from the Utilities department look into this?",
          image: streetlightdamage,
          upvotes: 56,
          downvotes: 1,
          comments: 8,
        },
      ];
    return (
        <div className="animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8">Community Discussions & Innovations</h1>
            <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10">
                Share your ideas, propose solutions, and collaborate with other citizens to build a better community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {discussions.map((post) => (
                    <DiscussionCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

const AdminProfilePage = ({ onBack }) => {
    const profileData = {
        name: "Admin",
        photo: adminPhoto,
        municipality: "Ranchi Municipality",
        district: "Ranchi District",
        municipalityHead: "Mr. Alok Verma",
        totalStaff: 150,
        bio: "Municipal Administrator overseeing all departmental operations and citizen-reported issues."
    };
    const adminStats = {
        totalIssuesHandled: 500,
        averageResolutionTime: "3.5 days",
        satisfactionRate: "92%"
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Admin Profile</h2>
                <button
                    onClick={onBack}
                    className="px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <img
                    src={profileData.photo}
                    alt="Admin Profile"
                    className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-600 shadow-md"
                />
                <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{profileData.name}</h3>
                    <p className="text-sm sm:text-lg text-gray-600 mb-4">{profileData.bio}</p>
                    <div className="space-y-2 text-gray-800 text-sm sm:text-base">
                        <div className="flex items-center space-x-3">
                            <Briefcase size={20} className="text-blue-600" />
                            <span className="font-medium">Role:</span>
                            <span>{profileData.municipalityHead}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Building size={20} className="text-blue-600" />
                            <span className="font-medium">Municipality:</span>
                            <span>{profileData.municipality}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Users size={20} className="text-blue-600" />
                            <span className="font-medium">Total Staff:</span>
                            <span>{profileData.totalStaff}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                        <div className="text-3xl font-bold text-green-600">{adminStats.totalIssuesHandled}</div>
                        <p className="text-gray-600 mt-1">Issues Handled</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
                        <div className="text-3xl font-bold text-yellow-600">{adminStats.averageResolutionTime}</div>
                        <p className="text-gray-600 mt-1">Avg. Resolution Time</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                        <div className="text-3xl font-bold text-blue-600">{adminStats.satisfactionRate}</div>
                        <p className="text-gray-600 mt-1">Citizen Satisfaction</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const departments = ['Public Works', 'Sanitation', 'Water Department', 'Parks & Recreation', 'Administration', 'Utilities'];

// Main Component
const MunicipalDashboard = () => {
    const [viewMode, setViewMode] = useState('list');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');
    const [activeDepartment, setActiveDepartment] = useState(null);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (page) => {
        setActivePage(page);
        setIsMobileMenuOpen(false); // Close the menu after navigation
        if (page === 'logout') {
            setIsLoggedOut(true);
        }
    };
    
    const [issues, setIssues] = useState([
        {
            id: 'issue-1',
            trackingId: 'RK-250915-001',
            title: "Pothole near Main Road",
            description: "A large, deep pothole is causing traffic slowdowns and poses a risk to vehicles. Urgent repair is needed.",
            category: "Roads",
            location: "Main Road, Ranchi",
            priority: "High",
            status: "Pending",
            image: pothole,
            timestamp: "2025-09-15T10:00:00Z",
            reporter: "Ravi Kumar",
            coordinates: [23.3646, 85.3134],
            assignedTo: 'Public Works',
            beforePhoto: null,
            afterPhoto: null,
            communityUpvotes: 5,
            communityComments: [
                { id: 1, author: 'Priya S.', text: 'This is a huge problem. It almost caused an accident for me yesterday.', timestamp: '2025-09-15T11:00:00Z' },
            ],
            activityLog: [{ type: 'reported', by: 'Ravi Kumar', timestamp: "2025-09-15T10:00:00Z" }],
            escalationLevel: 0,
        },
        {
            id: 'issue-2',
            trackingId: 'PS-250914-002',
            title: "Streetlight not working",
            description: "The streetlight at the intersection of Sector 4 has been non-functional for three nights, making the area unsafe for pedestrians.",
            category: "Utilities",
            location: "Sector 4, Ranchi",
            priority: "Medium",
            status: "In Progress",
            image: streetlightdamage,
            timestamp: "2025-09-14T18:30:00Z",
            reporter: "Priya Singh",
            coordinates: [23.3441, 85.3095],
            assignedTo: 'Utilities',
            beforePhoto: null,
            afterPhoto: null,
            communityUpvotes: 8,
            communityComments: [],
            activityLog: [
                { type: 'reported', by: 'Priya Singh', timestamp: "2025-09-14T18:30:00Z" },
                { type: 'assigned', by: 'Admin', to: 'Utilities', timestamp: "2025-09-14T19:00:00Z" },
            ],
            escalationLevel: 0,
        },
        {
            id: 'issue-3',
            trackingId: 'RD-250913-003',
            title: "Garbage overflow",
            description: "The community dustbin near Lalpur Chowk is overflowing, attracting stray animals and creating a serious sanitation hazard.",
            category: "Sanitation",
            location: "Lalpur Chowk, Ranchi",
            priority: "High",
            status: "Resolved",
            image: garbageoverflow,
            timestamp: "2025-09-13T08:00:00Z",
            reporter: "Rajesh Das",
            coordinates: [23.3854, 85.3211],
            assignedTo: 'Sanitation',
            beforePhoto: garbageoverflow,
            afterPhoto: overgrowntrees, // Using another local image for demonstration
            communityUpvotes: 21,
            communityComments: [],
            activityLog: [
                { type: 'reported', by: 'Rajesh Das', timestamp: "2025-09-13T08:00:00Z" },
                { type: 'assigned', by: 'Admin', to: 'Sanitation', timestamp: "2025-09-13T09:00:00Z" },
                { type: 'resolved', by: 'Sanitation Dept', timestamp: "2025-09-13T12:00:00Z" },
            ],
            escalationLevel: 0,
        },
        {
            id: 'issue-4',
            trackingId: 'AG-250916-004',
            title: "Water leak on hospital road",
            description: "A large water pipe has burst, causing a massive leak on the main road leading to the hospital. This is causing significant traffic disruption.",
            category: "Water Department",
            location: "Hospital Road, Ranchi",
            priority: "High",
            status: "Pending",
            image: waterleak,
            timestamp: "2025-09-16T09:00:00Z",
            reporter: "Anjali Gupta",
            coordinates: [23.3512, 85.2977],
            assignedTo: 'Water Department',
            beforePhoto: null,
            afterPhoto: null,
            communityUpvotes: 15,
            communityComments: [],
            activityLog: [{ type: 'reported', by: 'Anjali Gupta', timestamp: "2025-09-16T09:00:00Z" }],
            escalationLevel: 0,
        },
        {
            id: 'issue-5',
            trackingId: 'VS-250916-005',
            title: "Overgrown trees in park",
            description: "The trees in the main park are overgrown and blocking pathways, making it difficult for people to walk. They need to be trimmed.",
            category: "Parks & Recreation",
            location: "Central Park, Ranchi",
            priority: "Medium",
            status: "Pending",
            image: overgrowntrees,
            timestamp: "2025-09-16T11:30:00Z",
            reporter: "Vijay Sharma",
            coordinates: [23.375, 85.32],
            assignedTo: 'Parks & Recreation',
            beforePhoto: null,
            afterPhoto: null,
            communityUpvotes: 12,
            communityComments: [],
            activityLog: [{ type: 'reported', by: 'Vijay Sharma', timestamp: "2025-09-16T11:30:00Z" }],
            escalationLevel: 0,
        },
        {
            id: 'issue-6',
            trackingId: 'SR-250916-006',
            title: "Public property damage",
            description: "A bench in the community garden has been broken and needs to be repaired or replaced.",
            category: "Public Property",
            location: "Community Garden, Ranchi",
            priority: "Low",
            status: "Acknowledged",
            image: propertydamage,
            timestamp: "2025-09-16T12:00:00Z",
            reporter: "Sneha Rao",
            coordinates: [23.33, 85.31],
            assignedTo: 'Public Works',
            beforePhoto: null,
            afterPhoto: null,
            communityUpvotes: 3,
            communityComments: [],
            activityLog: [
                { type: 'reported', by: 'Sneha Rao', timestamp: "2025-09-16T12:00:00Z" },
                { type: 'acknowledged', by: 'Admin', timestamp: "2025-09-16T12:15:00Z" },
            ],
            escalationLevel: 0,
        },
    ]);

    const [filteredIssues, setFilteredIssues] = useState(issues);

    const handleStatusUpdate = (id, newStatus, beforePhoto = null, afterPhoto = null) => {
        setIssues(prevIssues => prevIssues.map(issue => {
            if (issue.id === id) {
                const updatedIssue = { ...issue, status: newStatus };
                if (beforePhoto) updatedIssue.beforePhoto = beforePhoto;
                if (afterPhoto) updatedIssue.afterPhoto = afterPhoto;
                updatedIssue.activityLog = [
                    ...updatedIssue.activityLog,
                    { type: 'status-update', status: newStatus, by: 'Admin', timestamp: new Date().toISOString() }
                ];
                return updatedIssue;
            }
            return issue;
        }));
        setSelectedIssue(prev => ({ ...prev, status: newStatus, beforePhoto, afterPhoto }));
    };

    const handleAssignment = (department) => {
        if (selectedIssue && department) {
            setIssues(prevIssues => prevIssues.map(issue => {
                if (issue.id === selectedIssue.id) {
                    const updatedIssue = { ...issue, assignedTo: department, status: 'Acknowledged' };
                    updatedIssue.activityLog = [
                        ...updatedIssue.activityLog,
                        { type: 'assigned', to: department, by: 'Admin', timestamp: new Date().toISOString() }
                    ];
                    return updatedIssue;
                }
                return issue;
            }));
            setSelectedIssue(prev => ({ ...prev, assignedTo: department, status: 'Acknowledged' }));
            setIsAssignmentOpen(false);
        }
    };

    const handleAcknowledge = (id) => {
        setIssues(prevIssues => prevIssues.map(issue => {
            if (issue.id === id) {
                const updatedIssue = { ...issue, status: 'Acknowledged' };
                updatedIssue.activityLog = [
                    ...updatedIssue.activityLog,
                    { type: 'acknowledged', by: 'Admin', timestamp: new Date().toISOString() }
                ];
                return updatedIssue;
            }
            return issue;
        }));
        setSelectedIssue(prev => ({ ...prev, status: 'Acknowledged' }));
    };

    const handleFilter = useCallback((filtered) => {
        setFilteredIssues(filtered);
    }, []);

    const handleEscalate = (id) => {
        setIssues(prevIssues => prevIssues.map(issue => {
            if (issue.id === id) {
                const newEscalationLevel = issue.escalationLevel + 1;
                const updatedIssue = { ...issue, escalationLevel: newEscalationLevel };
                updatedIssue.activityLog = [
                    ...updatedIssue.activityLog,
                    { type: 'escalated', level: newEscalationLevel, by: 'System', timestamp: new Date().toISOString() }
                ];
                return updatedIssue;
            }
            return issue;
        }));
        setSelectedIssue(prev => ({ ...prev, escalationLevel: prev.escalationLevel + 1 }));
    };

    const getStatusStats = () => {
        const stats = {
            total: issues.length,
            pending: issues.filter(issue => issue.status === 'Pending').length,
            inProgress: issues.filter(issue => issue.status === 'In Progress').length,
            resolved: issues.filter(issue => issue.status === 'Resolved').length,
            acknowledged: issues.filter(issue => issue.status === 'Acknowledged').length,
        };
        return {
            ...stats,
            unassigned: issues.filter(issue => !issue.assignedTo).length,
            resolutionRate: stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0,
        };
    };

    const stats = getStatusStats();

    const renderContent = () => {
        if (selectedIssue) {
            return (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-start justify-center p-0 md:p-4 overflow-y-auto animate-fade-in">
                    <div className="bg-white rounded-none sm:rounded-xl shadow-2xl w-full h-full sm:w-full sm:max-w-4xl p-4 sm:p-8 transform transition-transform duration-300">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Issue Details</h2>
                            <button onClick={() => setSelectedIssue(null)} className="text-gray-500 hover:text-gray-800 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="flex flex-col items-center">
                                <img src={selectedIssue.image} alt={selectedIssue.title} className="w-full h-auto rounded-lg shadow-md mb-4" />
                                <div className="text-center w-full">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{selectedIssue.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{selectedIssue.description}</p>
                                    <div className="space-y-2 text-left text-sm">
                                        <p><span className="font-semibold">Tracking ID:</span> {selectedIssue.trackingId}</p>
                                        <p><span className="font-semibold">Category:</span> {selectedIssue.category}</p>
                                        <p><span className="font-semibold">Location:</span> {selectedIssue.location}</p>
                                        <p><span className="font-semibold">Priority:</span> {selectedIssue.priority}</p>
                                        <p><span className="font-semibold">Reported By:</span> {selectedIssue.reporter}</p>
                                        <p><span className="font-semibold">Status:</span> {selectedIssue.status}</p>
                                        {selectedIssue.assignedTo && (
                                            <p><span className="font-semibold">Assigned to:</span> {selectedIssue.assignedTo}</p>
                                        )}
                                        {selectedIssue.escalationLevel > 0 && (
                                            <p className="text-red-600 font-semibold flex items-center space-x-2">
                                                <TrendingUp size={16} /><span>Escalated (Level {selectedIssue.escalationLevel})</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Action Buttons */}
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                    <h4 className="font-semibold text-gray-800 mb-2">Quick Actions</h4>
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(selectedIssue.id, 'In Progress')}
                                            className="bg-yellow-500 text-white w-full sm:w-auto px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center space-x-2 hover:bg-yellow-600 transition-colors"
                                        >
                                            <Clock size={16} /><span>In Progress</span>
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(selectedIssue.id, 'Resolved')}
                                            className="bg-green-500 text-white w-full sm:w-auto px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
                                        >
                                            <CheckCircle size={16} /><span>Resolve</span>
                                        </button>
                                        <button
                                            onClick={() => handleAcknowledge(selectedIssue.id)}
                                            className="bg-blue-500 text-white w-full sm:w-auto px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
                                        >
                                            <Award size={16} /><span>Acknowledge</span>
                                        </button>
                                        <div className="relative w-full sm:w-auto">
                                            <button onClick={() => setIsAssignmentOpen(!isAssignmentOpen)} className="bg-purple-500 text-white w-full px-4 py-2 rounded-full font-medium text-sm flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors">
                                                <Users size={16} /><span>Assign</span><ChevronDown size={16} />
                                            </button>
                                            {isAssignmentOpen && (
                                                <div className="absolute left-0 sm:right-0 mt-2 w-full sm:w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        {departments.map(dept => (
                                                            <button
                                                                key={dept}
                                                                onClick={() => handleAssignment(dept)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                {dept}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Before & After Photos */}
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                    <h4 className="font-semibold text-gray-800 mb-2">Evidence Photos</h4>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {selectedIssue.beforePhoto && (
                                            <div className="w-1/2">
                                                <p className="text-xs font-semibold text-gray-500 text-center mb-1">Before</p>
                                                <img src={selectedIssue.beforePhoto} alt="Before" className="w-full h-auto rounded-lg shadow-md" />
                                            </div>
                                        )}
                                        {selectedIssue.afterPhoto && (
                                            <div className="w-1/2">
                                                <p className="text-xs font-semibold text-gray-500 text-center mb-1">After</p>
                                                <img src={selectedIssue.afterPhoto} alt="After" className="w-full h-auto rounded-lg shadow-md" />
                                            </div>
                                        )}
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-blue-600 transition-colors mt-2">
                                            <Camera size={16} /><span>Upload Photos</span>
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Activity Log */}
                                <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                    <h4 className="font-semibold text-gray-800 mb-2">Activity Log & Communication</h4>
                                    <div className="space-y-3">
                                        {selectedIssue.activityLog.map((log, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 pt-1">
                                                    {log.type === 'reported' && <FileText size={16} className="text-gray-500" />}
                                                    {log.type === 'acknowledged' && <ThumbsUp size={16} className="text-blue-500" />}
                                                    {log.type === 'assigned' && <Users size={16} className="text-purple-500" />}
                                                    {log.type === 'status-update' && <CheckCircle size={16} className="text-green-500" />}
                                                    {log.type === 'escalated' && <TrendingUp size={16} className="text-red-500" />}
                                                </div>
                                                <div className="flex-1 text-sm text-gray-700">
                                                    {log.type === 'reported' && <span><span className="font-medium">{log.by}</span> reported this issue.</span>}
                                                    {log.type === 'acknowledged' && <span>Issue acknowledged by <span className="font-medium">{log.by}</span>.</span>}
                                                    {log.type === 'assigned' && <span>Issue assigned to <span className="font-medium">{log.to}</span> by <span className="font-medium">{log.by}</span>.</span>}
                                                    {log.type === 'status-update' && <span>Status updated to <span className="font-medium">{log.status}</span> by <span className="font-medium">{log.by}</span>.</span>}
                                                    {log.type === 'escalated' && <span>Issue auto-escalated to a higher authority (Level {log.level}).</span>}
                                                    <div className="text-xs text-gray-500 mt-1">{new Date(log.timestamp).toLocaleString()}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {/* Simple comment box */}
                                        <div className="flex space-x-2 mt-4">
                                            <input type="text" placeholder="Add a comment..." className="flex-1 px-4 py-2 border rounded-lg" />
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg"><MessageCircle size={20} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (activePage === 'departments') {
            return (
                <div className="animate-fade-in">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Departments</h1>
                    <p className="text-sm sm:text-lg text-gray-600 mb-6">Select a department to view and manage their assigned issues.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map(dept => (
                            <button
                                key={dept}
                                onClick={() => { setActivePage('department-issues'); setActiveDepartment(dept); }}
                                className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4"
                            >
                                <DepartmentIcon department={dept} />
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900">{dept}</h3>
                                    <p className="text-sm text-gray-600">
                                        {issues.filter(i => i.assignedTo === dept).length} Issues
                                    </p>
                                </div>
                                <CornerDownRight size={20} className="text-blue-600" />
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (activePage === 'department-issues') {
            return (
                <DepartmentsPage
                    issues={issues}
                    onIssueSelect={setSelectedIssue}
                    department={activeDepartment}
                    onBack={() => setActivePage('departments')}
                />
            );
        }

        if (activePage === 'discussions') {
            return (
                <DiscussionsPage />
            );
        }

        if (activePage === 'profile') {
            return (
                <AdminProfilePage onBack={() => setActivePage('dashboard')} />
            );
        }
        
        return (
            <>
                {/* Main Content View Switch */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <Layers size={20} />
                            <span>{viewMode === 'list' ? 'Issue List View' : 'Issue Map View'}</span>
                        </h3>
                        <div className="flex space-x-2 w-full sm:w-auto">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex-1 px-4 py-2 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 ${
                                    viewMode === 'list'
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                <List size={16} />
                                <span className="text-sm">List</span>
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`flex-1 px-4 py-2 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 ${
                                    viewMode === 'map'
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                <Map size={16} />
                                <span className="text-sm">Map</span>
                            </button>
                        </div>
                    </div>
                    <IssueFilters issues={issues} onFilter={handleFilter} />
                    {viewMode === 'map' ? (
                        <div className="space-y-6">
                            <IssueMap
                                issues={filteredIssues}
                                onIssueSelect={setSelectedIssue}
                            />
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredIssues.map((issue) => (
                                    <IssueCard
                                        key={issue.id}
                                        issue={issue}
                                        onSelect={setSelectedIssue}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Analytics Section */}
                <AnalyticsDashboard issues={issues} departments={departments} />
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header onNavClick={handleNavClick} activePage={activePage} toggleMobileMenu={toggleMobileMenu} />
            <MobileMenu onNavClick={handleNavClick} activePage={activePage} isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoggedOut ? <Navigate to="/" replace /> : renderContent()}
            </div>
        </div>
    );
};

export default MunicipalDashboard;