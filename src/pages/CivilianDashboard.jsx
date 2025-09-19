import React, { useState, useEffect } from "react";
import { Plus, Camera, MapPin, FileText, User, Home, LogOut, MessageSquare, BarChart2, Award, ThumbsUp, ThumbsDown, CheckCircle, Clock, XCircle, MessageCircle, Menu, X, Map } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

// Import local images with corrected paths
import garbageoverflow from '../components/images/garbageoverflow.png';
import overgrowntrees from '../components/images/overgrowntrees.png';
import propertydamage from '../components/images/propertydamage.png';
import streetlightdamage from '../components/images/StreetLightdamage.png';
import waterleak from '../components/images/waterleak.png';
import profilePhoto from '../components/images/profile.png';
import pothole from '../components/images/pothole.png'; // Using a local image for the user profile

// Fix for default Leaflet marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


// IssueCard Component - Optimized for mobile layout
const IssueCard = ({ issue, onSelect }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-red-500";
            case "In Progress": return "bg-yellow-500";
            case "Resolved": return "bg-green-500";
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
        <div onClick={() => onSelect(issue)} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
            <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {issue.title}
                    </h3>
                    <span
                        className={`text-xs font-bold uppercase rounded-full px-3 py-1 text-white ${getStatusColor(issue.status)}`}
                    >
                        {issue.status}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {issue.description}
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-blue-500" />
                        <span>{issue.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FileText size={16} className="text-blue-500" />
                        <span>Category: {issue.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BarChart2 size={16} className={getPriorityColor(issue.priority)} />
                        <span className={getPriorityColor(issue.priority)}>
                            Priority: {issue.priority}
                        </span>
                    </div>
                    {issue.upvotes > 0 && (
                        <div className="flex items-center space-x-2">
                            <ThumbsUp size={16} className="text-purple-500" />
                            <span>{issue.upvotes} Upvotes</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ProfilePage Component - Optimized for mobile layout
const ProfilePage = ({ profileData, onBack, issueStats }) => (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">My Profile</h2>
            <button
                onClick={onBack}
                className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
                Back
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="col-span-1 md:col-span-1 flex flex-col items-center text-center bg-gray-50 rounded-lg p-6 shadow-inner">
                <img
                    src={profileData.photo}
                    alt="Profile"
                    className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-600 shadow-md mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{profileData.name}</h3>
                <p className="text-gray-600">Active Citizen</p>
                <div className="mt-4 text-center">
                    <p className="text-gray-800 italic text-sm sm:text-base">"{profileData.bio}"</p>
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 space-y-6 sm:space-y-8">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Personal Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
                        <div>
                            <p className="font-medium text-blue-600">Municipality:</p>
                            <p>{profileData.municipality}</p>
                        </div>
                        <div>
                            <p className="font-medium text-blue-600">District:</p>
                            <p>{profileData.district}</p>
                        </div>
                        <div>
                            <p className="font-medium text-blue-600">Municipality Head:</p>
                            <p>{profileData.municipalityHead}</p>
                        </div>
                        <div>
                            <p className="font-medium text-blue-600">Contact:</p>
                            <p>{profileData.contact}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Your Community Impact</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-blue-600">{issueStats.total}</div>
                            <p className="text-xs sm:text-sm text-gray-600">Issues Reported</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-red-600">{issueStats.pending}</div>
                            <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{issueStats.inProgress}</div>
                            <p className="text-xs sm:text-sm text-gray-600">In Progress</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xl sm:text-2xl font-bold text-green-600">{issueStats.resolved}</div>
                            <p className="text-xs sm:text-sm text-gray-600">Resolved</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// DiscussionPage Component
const DiscussionPage = () => {
    const discussions = [
        {
            id: 1,
            author: "Amit Sharma",
            authorPhoto: "https://images.unsplash.com/photo-1544723795-3fb6469f5b8c?q=80&w=1978&auto=format&fit=crop",
            title: "New park proposal for Morabadi grounds",
            description: "I've noticed a lot of unused space in Morabadi grounds. It would be amazing to build a new public park here with jogging tracks and seating areas for the elderly. What do you all think?",
            image: overgrowntrees, // Using local image
            upvotes: 124,
            downvotes: 8,
            comments: 25,
        },
        {
            id: 2,
            author: "Priya Singh",
            authorPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Eco-friendly waste management solutions",
            description: "Our city generates so much waste. We should explore decentralized composting and a 'plastic-for-recycling' program. Has anyone seen successful implementations of this in other cities?",
            image: garbageoverflow, // Using local image
            upvotes: 89,
            downvotes: 2,
            comments: 15,
        },
        {
            id: 3,
            author: "Rajesh Das",
            authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Upgrading the public library",
            description: "The public library is a great resource, but it needs an upgrade. I propose a new digital section with computers and high-speed internet. This would benefit students and job seekers.",
            image: propertydamage, // Using local image
            upvotes: 56,
            downvotes: 1,
            comments: 8,
        },
    ];

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
                                className={`flex items-center space-x-1 transition-colors ${upvoted ? "text-blue-600" : "hover:text-blue-500"}`}
                            >
                                <ThumbsUp size={16} sm:size={18} fill={upvoted ? "currentColor" : "none"} />
                                <span>{upvotes}</span>
                            </button>
                            <button
                                onClick={handleDownvote}
                                className={`flex items-center space-x-1 transition-colors ${downvoted ? "text-red-600" : "hover:text-red-500"}`}
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

// ChatPage Component - Optimized for mobile layout
const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey everyone! Has anyone seen the new streetlights being installed near the main market? They look great.", sender: "Ravi", timestamp: "10:01 PM" },
        { id: 2, text: "Yes, I did! It's a huge improvement. The area used to be so dark at night.", sender: "Priya", timestamp: "10:02 PM" },
        { id: 3, text: "I agree. It's good to see the municipality responding to our reports.", sender: "You", timestamp: "10:05 PM", self: true },
        { id: 4, text: "I've heard they're also planning to repair the potholes near the railway station soon.", sender: "Amit", timestamp: "10:10 PM" },
        { id: 5, text: "That's fantastic news! I'll keep an eye on it and update my reported issue.", sender: "Ravi", timestamp: "10:12 PM" },
    ]);
    const [input, setInput] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            const newMsg = {
                id: messages.length + 1,
                text: input,
                sender: "You",
                timestamp: `${formattedHours}:${formattedMinutes} ${ampm}`,
                self: true
            };
            setMessages(prev => [...prev, newMsg]);
            setInput('');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-2xl mx-auto h-[70vh] sm:h-[600px] flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Community Chat</h2>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.self ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-[80%] ${message.self ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                            <p className="font-semibold text-sm mb-1">{message.self ? "You" : message.sender}</p>
                            <p className="text-sm sm:text-base">{message.text}</p>
                            <span className={`block text-xs mt-1 ${message.self ? 'text-blue-200' : 'text-gray-500'}`}>{message.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button type="submit" className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <MessageCircle size={20} />
                </button>
            </form>
        </div>
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
                    <Home size={20} />
                    <span>Dashboard</span>
                </button>
                <button
                    onClick={() => onNavClick('track-issue')}
                    className={`flex items-center space-x-2 p-4 text-white rounded-lg transition-colors ${activePage === 'track-issue' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                >
                    <FileText size={20} />
                    <span>Track Issue</span>
                </button>
                <button
                    onClick={() => onNavClick('map')}
                    className={`flex items-center space-x-2 p-4 text-white rounded-lg transition-colors ${activePage === 'map' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                >
                    <Map size={20} />
                    <span>Live Map</span>
                </button>
                <button
                    onClick={() => onNavClick('discussions')}
                    className={`flex items-center space-x-2 p-4 text-white rounded-lg transition-colors ${activePage === 'discussions' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                >
                    <MessageSquare size={20} />
                    <span>Discussions</span>
                </button>
                <button
                    onClick={() => onNavClick('chat')}
                    className={`flex items-center space-x-2 p-4 text-white rounded-lg transition-colors ${activePage === 'chat' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                >
                    <MessageCircle size={20} />
                    <span>Chat</span>
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

// LiveMap Component
const LiveMap = ({ issues, onIssueSelect }) => {
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

    const mapCenter = [23.3441, 85.3095];

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Live Issue Map</h2>
            <p className="text-gray-600 mb-6 text-sm">See all reported issues across the city and their real-time status.</p>
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} className="w-full h-[60vh] sm:h-[600px] rounded-lg shadow-inner">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {issues.map(issue => (
                    <Marker key={issue.id} position={issue.coordinates} icon={getIcon(issue.status)}>
                        <Popup>
                            <div className="flex flex-col items-center p-2">
                                <h4 className="font-semibold text-sm mb-1">{issue.title}</h4>
                                <img src={issue.image} alt={issue.title} className="w-24 h-16 object-cover rounded mb-2" />
                                <span className={`text-xs font-bold uppercase rounded-full px-2 py-1 text-white ${
                                    issue.status === 'Pending' ? 'bg-red-500' :
                                    issue.status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}>{issue.status}</span>
                                <button onClick={() => onIssueSelect(issue)} className="mt-2 text-blue-500 text-xs font-semibold hover:underline">View Details</button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

// IssueDetailModal Component
const IssueDetailModal = ({ issue, onClose, onFeedback, onReopen, onAddComment }) => {
    const [rating, setRating] = useState(issue.feedback?.rating || 0);
    const [comment, setComment] = useState("");
    const [upvoted, setUpvoted] = useState(issue.isUpvoted || false);
    const [upvotes, setUpvotes] = useState(issue.upvotes);

    const handleUpvote = () => {
        setUpvoted(!upvoted);
        setUpvotes(upvoted ? upvotes - 1 : upvotes + 1);
    };

    const submitFeedback = () => {
        onFeedback(issue.id, rating, comment);
        alert("Thank you for your feedback!");
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onAddComment(issue.id, comment);
            setComment('');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 transform transition-transform duration-300">
                <div className="flex justify-between items-start mb-6 border-b pb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Issue Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="flex flex-col">
                        <img src={issue.image} alt={issue.title} className="w-full h-auto rounded-lg shadow-md mb-4" />
                        <div className="space-y-2 text-sm text-gray-700">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{issue.title}</h3>
                            <p className="text-sm text-gray-600">{issue.description}</p>
                            <p><span className="font-semibold">Tracking ID:</span> {issue.trackingId}</p>
                            <p><span className="font-semibold">Location:</span> {issue.location}</p>
                            <p><span className="font-semibold">Category:</span> {issue.category}</p>
                            <p><span className="font-semibold">Status:</span> <span className="font-medium">{issue.status}</span></p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Upvote and Communication */}
                        <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                                <button onClick={handleUpvote} className={`flex items-center space-x-1 px-4 py-2 rounded-full font-medium transition-colors ${upvoted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                    <ThumbsUp size={16} />
                                    <span>{upvotes} Upvotes</span>
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <p className="font-semibold">Reported By:</p>
                                <span className="text-gray-600">{issue.isAnonymous ? "Anonymous" : issue.reporter}</span>
                            </div>
                        </div>

                        {/* Before & After Photos */}
                        {issue.beforePhoto && issue.afterPhoto && (
                            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                <h4 className="font-semibold text-gray-800 mb-2">Before & After Evidence</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col items-center">
                                        <p className="text-xs text-gray-500 mb-1">Before</p>
                                        <img src={issue.beforePhoto} alt="Before" className="w-full h-auto rounded-lg shadow" />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-xs text-gray-500 mb-1">After</p>
                                        <img src={issue.afterPhoto} alt="After" className="w-full h-auto rounded-lg shadow" />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Activity Log */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-inner max-h-48 overflow-y-auto">
                            <h4 className="font-semibold text-gray-800 mb-2">Activity Log</h4>
                            <div className="space-y-3 text-sm">
                                {issue.activityLog.map((log, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 pt-1">
                                            {log.type === 'reported' && <FileText size={16} className="text-gray-500" />}
                                            {log.type === 'acknowledged' && <ThumbsUp size={16} className="text-blue-500" />}
                                            {log.type === 'assigned' && <User size={16} className="text-purple-500" />}
                                            {log.type === 'resolved' && <CheckCircle size={16} className="text-green-500" />}
                                            {log.type === 'escalated' && <BarChart2 size={16} className="text-red-500" />}
                                            {log.type === 'comment' && <MessageSquare size={16} className="text-gray-500" />}
                                        </div>
                                        <div className="flex-1">
                                            <p>{log.text}</p>
                                            <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Citizen Communication & Feedback */}
                        <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-2">Your Communication</h4>
                            <form onSubmit={handleCommentSubmit} className="flex space-x-2 mb-4">
                                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." className="flex-1 px-4 py-2 border rounded-lg text-sm" />
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Send</button>
                            </form>
                            
                            {issue.status === "Resolved" && (
                                <div className="space-y-4 pt-4 border-t border-gray-200">
                                    <h4 className="font-semibold text-gray-800">Rate the Resolution</h4>
                                    <div className="flex items-center space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} onClick={() => setRating(star)} className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => onReopen(issue.id)} className="w-full bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
                                        <XCircle size={16} /><span>Reopen Issue</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// TrackIssuePage Component
const TrackIssuePage = ({ issues }) => {
    const [trackingId, setTrackingId] = useState('');
    const [trackedIssue, setTrackedIssue] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        const foundIssue = issues.find(i => i.trackingId.toLowerCase() === trackingId.toLowerCase());
        setTrackedIssue(foundIssue);
    };

    const getStatusFlow = (status) => {
        const statuses = ["Reported", "In Progress", "Resolved"];
        const currentIndex = statuses.indexOf(status);
        
        return statuses.map((s, index) => {
            let icon;
            let color;
            if (index < currentIndex) {
                icon = <CheckCircle />;
                color = 'text-green-500';
            } else if (index === currentIndex) {
                icon = <Clock />;
                color = 'text-yellow-500';
            } else {
                icon = <XCircle />;
                color = 'text-gray-300';
            }
            return {
                name: s,
                icon,
                color,
                isCurrent: index === currentIndex,
                isCompleted: index < currentIndex,
            };
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Track an Issue</h2>
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking ID (e.g., RK-250915-001)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                />
                <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Track
                </button>
            </form>

            {trackedIssue && (
                <div className="mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{trackedIssue.title}</h3>
                        <span className={`text-sm font-bold uppercase px-3 py-1 rounded-full text-white mt-2 sm:mt-0 ${
                            trackedIssue.status === 'Pending' ? 'bg-red-500' :
                            trackedIssue.status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}>
                            {trackedIssue.status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{trackedIssue.description}</p>
                    
                    {/* Tracking Progress Flow */}
                    <div className="mt-8 flex items-center justify-between relative p-4 bg-gray-50 rounded-lg shadow-inner">
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 z-0 hidden sm:block"></div>
                        <div className="flex-1 flex flex-col items-center sm:items-start space-y-4">
                            {getStatusFlow(trackedIssue.status).map((s, index) => (
                                <div key={s.name} className="flex items-center space-x-4 w-full">
                                    <div className="flex-shrink-0">
                                        <div className={`p-2 rounded-full ${s.isCompleted ? 'bg-green-500' : s.isCurrent ? 'bg-blue-500' : 'bg-gray-300'} text-white`}>
                                            {s.icon}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-medium ${s.isCompleted ? 'text-green-600' : s.isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>{s.name}</span>
                                        <span className="text-xs text-gray-500">
                                            {index === 0 && new Date(trackedIssue.activityLog[0].timestamp).toLocaleString()}
                                            {index === 1 && trackedIssue.activityLog.find(log => log.type === 'comment')?.timestamp ? new Date(trackedIssue.activityLog.find(log => log.type === 'comment')?.timestamp).toLocaleString() : ''}
                                            {index === 2 && trackedIssue.activityLog.find(log => log.type === 'resolved')?.timestamp ? new Date(trackedIssue.activityLog.find(log => log.type === 'resolved')?.timestamp).toLocaleString() : ''}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                        <div className="space-y-2">
                            <p><span className="font-semibold">Reported By:</span> {trackedIssue.isAnonymous ? "Anonymous" : trackedIssue.reporter}</p>
                            <p><span className="font-semibold">Category:</span> {trackedIssue.category}</p>
                            <p><span className="font-semibold">Location:</span> {trackedIssue.location}</p>
                        </div>
                        <div className="space-y-2">
                            <p><span className="font-semibold">Report Date:</span> {new Date(trackedIssue.activityLog[0].timestamp).toLocaleDateString()}</p>
                            <p><span className="font-semibold">Last Update:</span> {new Date(trackedIssue.activityLog[trackedIssue.activityLog.length - 1].timestamp).toLocaleDateString()}</p>
                            <p><span className="font-semibold">Priority:</span> {trackedIssue.priority}</p>
                        </div>
                    </div>
                </div>
            )}
            {!trackedIssue && trackingId && (
                <div className="mt-8 text-center p-8 border border-dashed rounded-lg text-gray-500">
                    <p>No issue found with ID: **{trackingId}**</p>
                    <p className="mt-2 text-sm">Please check the ID and try again.</p>
                </div>
            )}
        </div>
    );
};


// Main CivilianDashboard Component
const CivilianDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        priority: "Medium",
        image: null,
        isAnonymous: false,
    });

    const categories = ["Infrastructure", "Roads", "Public Property", "Sanitation", "Parks & Recreation", "Utilities"];

    const profileData = {
        name: "Ravi Kumar",
        photo: profilePhoto,
        municipality: "Ranchi Municipality",
        district: "Ranchi District",
        municipalityHead: "Mr. Alok Verma",
        contact: "+91 98765 43210",
        bio: "Passionate about making our community a better place, one issue at a time.",
    };

    const [issues, setIssues] = useState([
        {
            id: 1, trackingId: 'RK-250915-001', title: "Pothole near Main Road", description: "A large, deep pothole is causing traffic slowdowns and poses a risk to vehicles. Urgent repair is needed.",
            category: "Roads", location: "Main Road, Ranchi", priority: "High", status: "Pending", image: pothole,
            upvotes: 25, isAnonymous: false, reporter: "Ravi Kumar", coordinates: [23.3646, 85.3134],
            activityLog: [{ type: 'reported', text: 'Issue reported by Ravi Kumar.', timestamp: "2025-09-15T10:00:00Z" }]
        },
        {
            id: 2, trackingId: 'PS-250914-002', title: "Streetlight not working", description: "The streetlight at the intersection of Sector 4 has been non-functional for three nights, making the area unsafe for pedestrians.",
            category: "Utilities", location: "Sector 4, Ranchi", priority: "Medium", status: "In Progress", image: streetlightdamage,
            upvotes: 18, isAnonymous: false, reporter: "Priya Singh", coordinates: [23.3441, 85.3095],
            activityLog: [{ type: 'reported', text: 'Issue reported by Priya Singh.', timestamp: "2025-09-14T18:30:00Z" }, {type: 'comment', text: 'Work has begun to replace the bulb.', timestamp: new Date().toISOString()}]
        },
        {
            id: 3, trackingId: 'AD-250913-003', title: "Garbage overflow", description: "The community dustbin near Lalpur Chowk is overflowing, attracting stray animals and creating a serious sanitation hazard.",
            category: "Sanitation", location: "Lalpur Chowk, Ranchi", priority: "High", status: "Resolved", image: garbageoverflow,
            beforePhoto: garbageoverflow, afterPhoto: propertydamage, // Using propertydamage as a placeholder for 'after' photo
            upvotes: 42, isAnonymous: true, reporter: "Anonymous", coordinates: [23.3854, 85.3211],
            activityLog: [{ type: 'reported', text: 'Issue reported anonymously.', timestamp: "2025-09-13T08:00:00Z" }, { type: 'resolved', text: 'Issue has been resolved.', timestamp: new Date().toISOString()}]
        },
        {
            id: 4, trackingId: 'VS-250916-004', title: "Overgrown trees in park", description: "The trees in the main park are overgrown and blocking pathways, making it difficult for people to walk.",
            category: "Parks & Recreation", location: "Central Park, Ranchi", priority: "Low", status: "Pending", image: overgrowntrees,
            upvotes: 12, isAnonymous: false, reporter: "Vijay Sharma", coordinates: [23.375, 85.32],
            activityLog: [{ type: 'reported', text: 'Issue reported by Vijay Sharma.', timestamp: new Date().toISOString() }]
        },
        {
            id: 5, trackingId: 'SR-250916-005', title: "Damaged public bench", description: "A bench in the community garden has been broken and needs to be repaired or replaced.",
            category: "Public Property", location: "Community Garden, Ranchi", priority: "Low", status: "In Progress", image: propertydamage,
            upvotes: 5, isAnonymous: false, reporter: "Sneha Rao", coordinates: [23.33, 85.31],
            activityLog: [{ type: 'reported', text: 'Issue reported by Sneha Rao.', timestamp: new Date().toISOString() }]
        }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newIssue = {
            ...formData,
            id: issues.length + 1,
            trackingId: `CC-${new Date().getFullYear().toString().slice(-2)}${new Date().getMonth() + 1}${new Date().getDate()}-${(issues.length + 1).toString().padStart(3, '0')}`,
            status: "Pending",
            image: formData.image || "https://images.unsplash.com/photo-1550954932-a567793b822d?q=80&w=1974&auto=format&fit=crop",
            reporter: formData.isAnonymous ? "Anonymous" : "Ravi Kumar",
            upvotes: 0,
            coordinates: [23.3441 + (Math.random() - 0.5) * 0.1, 85.3095 + (Math.random() - 0.5) * 0.1],
            activityLog: [{ type: 'reported', text: `Issue reported by ${formData.isAnonymous ? 'Anonymous' : 'Ravi Kumar'}.`, timestamp: new Date().toISOString() }],
        };
        setIssues((prev) => [...prev, newIssue]);
        setFormData({ title: "", description: "", category: "", location: "", priority: "Medium", image: null, isAnonymous: false });
        setShowForm(false);
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFeedback = (id, rating, comment) => {
        setIssues(issues.map(issue =>
            issue.id === id ? { ...issue, feedback: { rating, comment } } : issue
        ));
    };

    const handleReopen = (id) => {
        setIssues(issues.map(issue =>
            issue.id === id ? { ...issue, status: "Pending", activityLog: [...issue.activityLog, { type: 'reopened', text: 'Issue reopened by citizen.', timestamp: new Date().toISOString() }] } : issue
        ));
        setSelectedIssue(null);
    };
    
    const handleAddComment = (id, commentText) => {
        setIssues(issues.map(issue =>
            issue.id === id ? { ...issue, activityLog: [...issue.activityLog, { type: 'comment', text: `Citizen comment: ${commentText}`, timestamp: new Date().toISOString() }] } : issue
        ));
        setSelectedIssue(prev => ({ ...prev, activityLog: [...prev.activityLog, { type: 'comment', text: `Citizen comment: ${commentText}`, timestamp: new Date().toISOString() }] }));
    };

    const issueStats = {
        total: issues.length,
        pending: issues.filter(i => i.status === 'Pending').length,
        inProgress: issues.filter(i => i.status === 'In Progress').length,
        resolved: issues.filter(i => i.status === 'Resolved').length,
    };
    
    const handleNavClick = (page) => {
        setShowForm(false);
        setActivePage(page);
        setIsMobileMenuOpen(false);
        setSelectedIssue(null); // Close modal when navigating
    };

    const handleLogout = () => {
        navigate('/'); // Navigate to the base URL
    };

    const renderPage = () => {
        if (selectedIssue) {
            return <IssueDetailModal issue={selectedIssue} onClose={() => setSelectedIssue(null)} onFeedback={handleFeedback} onReopen={handleReopen} onAddComment={handleAddComment} />;
        }

        switch (activePage) {
            case 'profile':
                return <ProfilePage profileData={profileData} onBack={() => handleNavClick('dashboard')} issueStats={issueStats} />;
            case 'discussions':
                return <DiscussionPage />;
            case 'chat':
                return <ChatPage />;
            case 'map':
                return <LiveMap issues={issues} onIssueSelect={setSelectedIssue} />;
            case 'track-issue':
                return <TrackIssuePage issues={issues} />;
            case 'dashboard':
            default:
                return (
                    <>
                        {/* Dashboard Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Hello, {profileData.name} 👋</h1>
                                <p className="text-sm sm:text-lg text-gray-600 mt-1 sm:mt-2">Report and track community issues in Ranchi</p>
                            </div>
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg w-full sm:w-auto justify-center"
                            >
                                <Plus size={18} />
                                <span>Report New Issue</span>
                            </button>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center transform transition-transform hover:scale-105">
                                <div className="text-xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">{issueStats.total}</div>
                                <div className="text-xs sm:text-base text-gray-600 font-medium">Total Reported</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center transform transition-transform hover:scale-105">
                                <div className="text-xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">{issueStats.pending}</div>
                                <div className="text-xs sm:text-base text-gray-600 font-medium">Pending</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center transform transition-transform hover:scale-105">
                                <div className="text-xl sm:text-3xl font-bold text-yellow-600 mb-1 sm:mb-2">{issueStats.inProgress}</div>
                                <div className="text-xs sm:text-base text-gray-600 font-medium">In Progress</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center transform transition-transform hover:scale-105">
                                <div className="text-xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">{issueStats.resolved}</div>
                                <div className="text-xs sm:text-base text-gray-600 font-medium">Resolved</div>
                            </div>
                        </div>

                        {/* Issue Submission Form */}
                        {showForm && (
                            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12 animate-fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Report New Issue</h2>
                                    <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title *</label>
                                            <input type="text" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Brief description of the issue" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                            <select value={formData.category} onChange={(e) => handleInputChange("category", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required>
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (<option key={category} value={category}>{category}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input type="text" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Street address or landmark" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
                                        <textarea value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Provide detailed information about the issue" required />
                                    </div>
                                    <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Photo *</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        {formData.image ? (
            <img src={formData.image} alt="Captured preview" className="mx-auto w-48 h-auto mb-4 rounded-lg shadow-md" />
        ) : (
            <Camera className="mx-auto text-gray-400 mb-2" size={32} />
        )}
        <p className="text-gray-600 mb-4 text-sm">
            {isMobile ? "Tap to open your camera and capture the issue." : "Please use a mobile device to report an issue with a photo."}
        </p>
        <input
            type="file"
            accept="image/*"
            capture="camera"
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => { handleInputChange("image", reader.result); };
                    reader.readAsDataURL(file);
                }
            }}
            className={`${isMobile ? 'w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' : 'hidden'}`}
            required={isMobile}
        />
        {!isMobile && (
            <p className="text-sm text-gray-500 mt-2">
                Photo submission is only available on mobile devices.
            </p>
        )}
    </div>
</div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                                        <select value={formData.priority} onChange={(e) => handleInputChange("priority", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                                        <button type="button" onClick={() => setShowForm(false)} className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                                            Cancel
                                        </button>
                                        <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                                            Submit Issue
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                        
                        {/* Reported Issues */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">My Reported Issues</h2>
                            {issues.length === 0 ? (
                                <div className="bg-white rounded-xl p-12 text-center shadow-lg">
                                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Issues Reported Yet</h3>
                                    <p className="text-gray-600 mb-6">Start by reporting your first community issue to track its status.</p>
                                    <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                        Report Issue
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {issues.map((issue) => (<IssueCard key={issue.id} issue={issue} onSelect={setSelectedIssue} />))}
                                </div>
                            )}
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                        <Home className="text-blue-200 hidden sm:block" />
                        <span className="text-xl font-bold tracking-tight">Community Connect</span>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button onClick={() => handleNavClick('dashboard')} className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                            <Home size={20} /><span className="hidden md:inline">Dashboard</span>
                        </button>
                        <button onClick={() => handleNavClick('track-issue')} className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'track-issue' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                            <FileText size={20} /><span className="hidden md:inline">Track Issue</span>
                        </button>
                        <button onClick={() => handleNavClick('map')} className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'map' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                            <Map size={20} /><span className="hidden md:inline">Live Map</span>
                        </button>
                        <button onClick={() => handleNavClick('discussions')} className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'discussions' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                            <MessageSquare size={20} /><span className="hidden md:inline">Discussions</span>
                        </button>
                        <button onClick={() => handleNavClick('chat')} className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'chat' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                            <MessageCircle size={20} /><span className="hidden md:inline">Chat</span>
                        </button>
                        <button onClick={() => handleNavClick('profile')} className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activePage === 'profile' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                            <User size={20} /><span className="hidden md:inline">Profile</span>
                        </button>
                        <button onClick={handleLogout} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                            <LogOut size={20} /><span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                    {/* Mobile Menu Button */}
                    <button onClick={toggleMobileMenu} className="md:hidden">
                        <Menu size={24} />
                    </button>
                </div>
            </nav>
            {/* Mobile Menu Overlay */}
            <MobileMenu onNavClick={handleNavClick} activePage={activePage} isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />

            <div className="flex-1 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
                {renderPage()}
            </div>
        </div>
    );
};

export default CivilianDashboard;