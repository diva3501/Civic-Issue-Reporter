import React, { useState, useEffect } from 'react';
import { Wrench, ClipboardList, Check, Clock, Award, Users, CornerDownRight, X, FileText, Briefcase, Truck, Droplet, Leaf, Building, MessageCircle, TrendingUp, BarChart3, ChevronDown, User, LogOut, MapPin, Send, Plus, Upload, ThumbsUp, Layers, CheckCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

// Local Image Imports
import garbageoverflow from '../components/images/garbageoverflow.png';
import overgrowntrees from '../components/images/overgrowntrees.png';
import propertydamage from '../components/images/propertydamage.png';
import streetlightdamage from '../components/images/StreetLightdamage.png';
import waterleak from '../components/images/waterleak.png';

const Header = ({ departmentName, onNavClick }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <nav className="bg-blue-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={() => onNavClick(null)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                        <BarChart3 size={20} />
                        <span className="hidden md:inline">Home</span>
                    </button>
                    {departmentName && (
                        <span className="text-xl font-bold ml-4">
                            {departmentName} Department
                        </span>
                    )}
                </div>
                <div className="flex items-center space-x-4 relative">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                        <User size={20} />
                        <span className="hidden md:inline">Admin</span>
                        <ChevronDown size={16} className={`transform transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 top-12 bg-white text-gray-800 rounded-md shadow-lg py-2 w-48 z-10">
                            <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                                <User size={16} className="mr-2" /> Profile
                            </button>
                            <button onClick={() => onNavClick('logout')} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                <LogOut size={16} className="mr-2" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
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
                    <div className="flex items-center space-x-2"><MapPin size={16} className="text-blue-500" /><span>{issue.location}</span></div>
                    <div className="flex items-center space-x-2"><TrendingUp size={16} className={getPriorityColor(issue.priority)} /><span className={getPriorityColor(issue.priority)}>Priority: {issue.priority}</span></div>
                </div>
            </div>
        </div>
    );
};

const departments = ['Public Works', 'Sanitation', 'Water Department', 'Parks & Recreation', 'Administration'];
const teams = {
    'Public Works': ['Road Crew A', 'Maintenance Team B'],
    'Sanitation': ['Sanitation Team 1', 'Waste Management Crew'],
    'Water Department': ['Pipe Repair Team Alpha'],
    'Parks & Recreation': ['Gardening Crew'],
    'Administration': ['General Admin Team']
};
const departmentIcons = {
    'Public Works': <Briefcase size={32} />,
    'Sanitation': <Truck size={32} />,
    'Water Department': <Droplet size={32} />,
    'Parks & Recreation': <Leaf size={32} />,
    'Administration': <Building size={32} />
};

const TeamChat = ({ department }) => {
    const messages = [
        { id: 1, sender: "Team Lead", text: `Good morning, everyone! Work order for the water leak on Hospital Road is a priority. Please start planning.`, timestamp: "10:01 AM" },
        { id: 2, sender: "Field Staff", text: "Got it. Pipe Repair Team Alpha is available and ready to deploy.", timestamp: "10:05 AM" },
        { id: 3, sender: "Team Lead", text: "Great. Please get the necessary tools and a truck ready.", timestamp: "10:10 AM" },
    ];
    
    return (
        <div className="bg-white rounded-xl shadow-md p-6 h-80 flex flex-col">
            <h4 className="font-semibold text-gray-800 mb-2">Team Chat - {department}</h4>
            <div className="flex-1 overflow-y-auto space-y-3 p-2 border-t border-b border-gray-200 my-2">
                {messages.map(msg => (
                    <div key={msg.id} className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                            {msg.sender.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">{msg.sender} <span className="text-xs text-gray-500 ml-2">{msg.timestamp}</span></div>
                            <p className="text-gray-700 text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TeamPerformance = ({ departmentIssues }) => {
    const stats = {
        resolvedThisWeek: departmentIssues.filter(issue => issue.status === 'Resolved' && new Date(issue.timestamp) > new Date(new Date().setDate(new Date().getDate() - 7))).length,
        avgResolutionTime: '2.5 days',
        escalations: departmentIssues.filter(issue => issue.activityLog.some(log => log.type === 'escalated')).length,
    };
    
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h4 className="font-semibold text-gray-800 mb-4">My Team's Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-green-600">{stats.resolvedThisWeek}</div>
                    <p className="text-sm text-gray-600">Resolved This Week</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-blue-600">{stats.avgResolutionTime}</div>
                    <p className="text-sm text-gray-600">Avg. Resolution Time</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-red-600">{stats.escalations}</div>
                    <p className="text-sm text-gray-600">Escalations</p>
                </div>
            </div>
        </div>
    );
};

const DepartmentDashboard = () => {
    const [departmentIssues, setDepartmentIssues] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [isWorkOrderModalOpen, setIsWorkOrderModalOpen] = useState(false);
    const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
    const [workOrderData, setWorkOrderData] = useState({ team: '', eta: '', notes: '' });
    const [resolveData, setResolveData] = useState({ note: '', image: null });
    
    const [issues, setIssues] = useState([
        {
            id: 'issue-1',
            title: "Pothole near Main Road",
            description: "A large, deep pothole is causing traffic slowdowns and poses a risk to vehicles. Urgent repair is needed.",
            category: "Roads",
            location: "Main Road, Ranchi",
            priority: "High",
            status: "Pending",
            image: overgrowntrees, // Using a different image to match the provided ones
            timestamp: "2025-09-15T10:00:00Z",
            reporter: "Ravi Kumar",
            coordinates: [23.3646, 85.3134],
            assignedTo: 'Public Works',
            activityLog: [{ type: 'reported', by: 'Ravi Kumar', timestamp: "2025-09-15T10:00:00Z" }],
        },
        {
            id: 'issue-2',
            title: "Streetlight not working",
            description: "The streetlight at the intersection of Sector 4 has been non-functional for three nights, making the area unsafe for pedestrians.",
            category: "Utilities",
            location: "Sector 4, Ranchi",
            priority: "Medium",
            status: "Acknowledged",
            image: streetlightdamage,
            timestamp: "2025-09-14T18:30:00Z",
            reporter: "Priya Singh",
            coordinates: [23.3441, 85.3095],
            assignedTo: 'Public Works',
            activityLog: [
                { type: 'reported', by: 'Priya Singh', timestamp: "2025-09-14T18:30:00Z" },
                { type: 'acknowledged', by: 'Public Works', timestamp: "2025-09-14T19:00:00Z" },
            ],
            workOrder: { team: 'Maintenance Team B', eta: '2025-09-16', notes: 'Requires ladder and a new bulb.'}
        },
        {
            id: 'issue-3',
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
            activityLog: [
                { type: 'reported', by: 'Rajesh Das', timestamp: "2025-09-13T08:00:00Z" },
                { type: 'acknowledged', by: 'Sanitation', timestamp: "2025-09-13T09:00:00Z" },
                { type: 'resolved', by: 'Sanitation', timestamp: "2025-09-13T12:00:00Z", note: "Garbage cleared and area disinfected." },
            ],
            resolutionNote: "Garbage cleared and area disinfected.",
            resolutionImage: overgrowntrees, // Using a local image for resolution proof
        },
        {
            id: 'issue-4',
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
            activityLog: [{ type: 'reported', by: 'Anjali Gupta', timestamp: "2025-09-16T09:00:00Z" }],
        },
        {
            id: 'issue-5',
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
            activityLog: [{ type: 'reported', by: 'Vijay Sharma', timestamp: "2025-09-16T11:30:00Z" }],
        },
        {
            id: 'issue-6',
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
            activityLog: [
                { type: 'reported', by: 'Sneha Rao', timestamp: "2025-09-16T12:00:00Z" },
                { type: 'acknowledged', by: 'Admin', timestamp: "2025-09-16T12:15:00Z" },
            ],
        },
    ]);

    useEffect(() => {
        if (selectedDepartment) {
            setDepartmentIssues(issues.filter(issue => issue.assignedTo === selectedDepartment));
        } else {
            setDepartmentIssues([]);
        }
    }, [selectedDepartment, issues]);

    const handleStatusUpdate = (id, newStatus) => {
        setIssues(prevIssues => prevIssues.map(issue => 
            issue.id === id ? { ...issue, status: newStatus, activityLog: [...issue.activityLog, { type: 'status-update', status: newStatus, by: selectedDepartment, timestamp: new Date().toISOString() }] } : issue
        ));
        setSelectedIssue(prev => ({...prev, status: newStatus}));
    };
    
    const handleAcknowledge = () => {
        if (selectedIssue) {
            setIssues(prevIssues => prevIssues.map(issue => 
                issue.id === selectedIssue.id ? { 
                    ...issue, 
                    status: 'Acknowledged', 
                    activityLog: [...issue.activityLog, { type: 'acknowledged', by: selectedDepartment, timestamp: new Date().toISOString() }] 
                } : issue
            ));
            setSelectedIssue(prev => ({...prev, status: 'Acknowledged'}));
            setIsWorkOrderModalOpen(false);
        }
    };

    const handleResolve = () => {
        setIsResolveModalOpen(true);
    };

    const handleResolveWithProof = () => {
        if (selectedIssue && resolveData.note && resolveData.image) {
            setIssues(prevIssues => prevIssues.map(issue =>
                issue.id === selectedIssue.id ? {
                    ...issue,
                    status: 'Resolved',
                    resolutionNote: resolveData.note,
                    resolutionImage: resolveData.image,
                    activityLog: [...issue.activityLog, { type: 'resolved', by: selectedDepartment, timestamp: new Date().toISOString(), note: resolveData.note, image: resolveData.image }]
                } : issue
            ));
            setSelectedIssue(null);
            setIsResolveModalOpen(false);
            setResolveData({ note: '', image: null });
        }
    };

    const handleEscalate = (issue) => {
        alert(`Issue ${issue.id} has been escalated to Administration.`);
        setIssues(prevIssues => prevIssues.map(i =>
            i.id === issue.id ? { ...i, status: 'Escalated', activityLog: [...i.activityLog, { type: 'escalated', by: selectedDepartment, timestamp: new Date().toISOString(), note: 'Issue requires administrative review.' }] } : i
        ));
        setSelectedIssue(null);
    };

    const getStatusStats = () => {
        const relevant = departmentIssues;
        return {
            total: relevant.length,
            pending: relevant.filter(issue => issue.status === 'Pending').length,
            inProgress: relevant.filter(issue => issue.status === 'In Progress').length,
            resolved: relevant.filter(issue => issue.status === 'Resolved').length,
            acknowledged: relevant.filter(issue => issue.status === 'Acknowledged').length,
        };
    };

    const stats = getStatusStats();
    
    const renderWorkOrderModal = () => (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Create Work Order</h3>
                    <button onClick={() => setIsWorkOrderModalOpen(false)} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Assign to Team</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            {teams[selectedDepartment]?.map(team => <option key={team}>{team}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Estimated Completion Date</label>
                        <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Work Notes</label>
                        <textarea rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button onClick={() => setIsWorkOrderModalOpen(false)} className="px-4 py-2 text-gray-700 rounded-full hover:bg-gray-100">Cancel</button>
                        <button onClick={handleAcknowledge} className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">Acknowledge Issue</button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderResolveModal = () => (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Mark as Resolved</h3>
                    <button onClick={() => setIsResolveModalOpen(false)} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Resolution Note</label>
                        <textarea rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={resolveData.note} onChange={(e) => setResolveData({...resolveData, note: e.target.value})}></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload "After" Photo</label>
                        <input type="file" onChange={(e) => setResolveData({...resolveData, image: URL.createObjectURL(e.target.files[0])})} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button onClick={() => setIsResolveModalOpen(false)} className="px-4 py-2 text-gray-700 rounded-full hover:bg-gray-100">Cancel</button>
                        <button onClick={handleResolveWithProof} className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">Submit Resolution</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDepartmentSelection = () => {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] animate-fade-in">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Select Your Department</h1>
                <p className="text-gray-600 text-lg mb-8">Click on your department to manage assigned issues.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                    {departments.map(dept => (
                        <button
                            key={dept}
                            onClick={() => setSelectedDepartment(dept)}
                            className="bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center space-y-4 hover:bg-gray-100 transition-colors duration-200"
                        >
                            {departmentIcons[dept]}
                            <span className="text-xl font-semibold text-gray-800">{dept}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderDepartmentDashboard = () => {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header departmentName={selectedDepartment} onNavClick={(page) => page === 'logout' ? setIsLoggedOut(true) : setSelectedDepartment(null)} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8 flex items-center space-x-3">
                        {departmentIcons[selectedDepartment]}
                        <h1 className="text-3xl font-bold text-gray-900">
                            {selectedDepartment} Dashboard
                        </h1>
                    </div>
                    <p className="text-gray-600 mb-6 text-lg">Manage your assigned issues and update their status.</p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center space-x-4">
                            <div className="bg-blue-100 rounded-full p-3"><ClipboardList className="text-blue-600" size={24} /></div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                                <div className="text-gray-600 text-sm">Total Assigned</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center space-x-4">
                            <div className="bg-red-100 rounded-full p-3"><Clock className="text-red-600" size={24} /></div>
                            <div>
                                <div className="text-2xl font-bold text-red-600">{stats.pending}</div>
                                <div className="text-gray-600 text-sm">Pending</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center space-x-4">
                            <div className="bg-yellow-100 rounded-full p-3"><Wrench className="text-yellow-600" size={24} /></div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                                <div className="text-gray-600 text-sm">In Progress</div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm flex items-center space-x-4">
                            <div className="bg-green-100 rounded-full p-3"><Check className="text-green-600" size={24} /></div>
                            <div>
                                <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                                <div className="text-gray-600 text-sm">Resolved</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    Assigned Issues ({departmentIssues.length})
                                </h2>
                                
                                {departmentIssues.length === 0 ? (
                                    <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                                        <ClipboardList className="mx-auto text-gray-400 mb-4" size={48} />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Issues Assigned</h3>
                                        <p className="text-gray-600">
                                            Issues will appear here when they are assigned to your department.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {departmentIssues.filter(issue => issue.status === 'Pending' || issue.status === 'Acknowledged').length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium text-red-600 mb-4 flex items-center space-x-2">
                                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                                    <span>Pending & Acknowledged Issues ({departmentIssues.filter(issue => issue.status === 'Pending' || issue.status === 'Acknowledged').length})</span>
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {departmentIssues
                                                        .filter(issue => issue.status === 'Pending' || issue.status === 'Acknowledged')
                                                        .map((issue) => (
                                                            <IssueCard
                                                                key={issue.id}
                                                                issue={issue}
                                                                onSelect={setSelectedIssue}
                                                            />
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        {departmentIssues.filter(issue => issue.status === 'In Progress').length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium text-yellow-600 mb-4 flex items-center space-x-2">
                                                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                                    <span>In Progress Issues ({departmentIssues.filter(issue => issue.status === 'In Progress').length})</span>
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {departmentIssues
                                                        .filter(issue => issue.status === 'In Progress')
                                                        .map((issue) => (
                                                            <IssueCard
                                                                key={issue.id}
                                                                issue={issue}
                                                                onSelect={setSelectedIssue}
                                                            />
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        {departmentIssues.filter(issue => issue.status === 'Resolved').length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium text-green-600 mb-4 flex items-center space-x-2">
                                                    <Check size={16} />
                                                    <span>Completed Issues ({departmentIssues.filter(issue => issue.status === 'Resolved').length})</span>
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {departmentIssues
                                                        .filter(issue => issue.status === 'Resolved')
                                                        .map((issue) => (
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
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-1 space-y-6">
                             <TeamChat department={selectedDepartment} />
                             <TeamPerformance departmentIssues={departmentIssues} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoggedOut) {
        return <Navigate to="/" replace />;
    }

    if (selectedIssue) {
        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-8 transform scale-95 md:scale-100 transition-transform duration-300">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Issue Details</h2>
                        <button onClick={() => setSelectedIssue(null)} className="text-gray-500 hover:text-gray-800 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center">
                            <img src={selectedIssue.image} alt={selectedIssue.title} className="w-full h-auto rounded-lg shadow-md mb-4" />
                            <div className="text-center w-full">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedIssue.title}</h3>
                                <p className="text-gray-600 mb-4">{selectedIssue.description}</p>
                                <div className="space-y-2 text-left">
                                    <p className="text-sm"><span className="font-semibold">Category:</span> {selectedIssue.category}</p>
                                    <p className="text-sm"><span className="font-semibold">Location:</span> {selectedIssue.location}</p>
                                    <p className="text-sm"><span className="font-semibold">Priority:</span> {selectedIssue.priority}</p>
                                    <p className="text-sm"><span className="font-semibold">Reported By:</span> {selectedIssue.reporter}</p>
                                    <p className="text-sm"><span className="font-semibold">Status:</span> {selectedIssue.status}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                <h4 className="font-semibold text-gray-800 mb-2">Quick Actions</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedIssue.status === 'Pending' && (
                                        <button 
                                            onClick={() => setIsWorkOrderModalOpen(true)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                                        >
                                            <Award size={16} /><span>Acknowledge</span>
                                        </button>
                                    )}
                                    {selectedIssue.status === 'Acknowledged' && (
                                        <button 
                                            onClick={() => handleStatusUpdate(selectedIssue.id, 'In Progress')}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-yellow-600 transition-colors"
                                        >
                                            <Clock size={16} /><span>Start Work</span>
                                        </button>
                                    )}
                                    {selectedIssue.status === 'In Progress' && (
                                        <button 
                                            onClick={() => setIsResolveModalOpen(true)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-green-600 transition-colors"
                                        >
                                            <Check size={16} /><span>Resolve</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleEscalate(selectedIssue)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-red-600 transition-colors"
                                    >
                                        <TrendingUp size={16} /><span>Escalate</span>
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center space-x-2 hover:bg-gray-600 transition-colors"
                                    >
                                        <Send size={16} /><span>Message Citizen</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                <h4 className="font-semibold text-gray-800 mb-2">Activity Log</h4>
                                <div className="space-y-3">
                                    {selectedIssue.activityLog.map((log, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 pt-1">
                                                {log.type === 'reported' && <FileText size={16} className="text-gray-500" />}
                                                {log.type === 'acknowledged' && <ThumbsUp size={16} className="text-blue-500" />}
                                                {log.type === 'assigned' && <Users size={16} className="text-purple-500" />}
                                                {log.type === 'status-update' && <CheckCircle size={16} className="text-green-500" />}
                                                {log.type === 'escalated' && <TrendingUp size={16} className="text-red-500" />}
                                                {log.type === 'resolved' && <Check size={16} className="text-green-500" />}
                                            </div>
                                            <div className="flex-1 text-sm text-gray-700">
                                                {log.type === 'reported' && <span><span className="font-medium">{log.by}</span> reported this issue.</span>}
                                                {log.type === 'acknowledged' && <span>Issue acknowledged by <span className="font-medium">{log.by}</span>.</span>}
                                                {log.type === 'assigned' && <span>Issue assigned to <span className="font-medium">{log.to}</span> by <span className="font-medium">{log.by}</span>.</span>}
                                                {log.type === 'status-update' && <span>Status updated to <span className="font-medium">{log.status}</span> by <span className="font-medium">{log.by}</span>.</span>}
                                                {log.type === 'escalated' && <span>Issue escalated to Administration by <span className="font-medium">{log.by}</span>.</span>}
                                                {log.type === 'resolved' && (
                                                    <span>Issue marked resolved by <span className="font-medium">{log.by}</span>. 
                                                        <p className="italic mt-1">Note: "{log.note}"</p>
                                                        {log.image && <img src={log.image} alt="Resolution" className="w-32 h-auto mt-2 rounded-lg" />}
                                                    </span>
                                                )}
                                                <div className="text-xs text-gray-500 mt-1">{new Date(log.timestamp).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return selectedDepartment ? renderDepartmentDashboard() : renderDepartmentSelection();
};

export default DepartmentDashboard;