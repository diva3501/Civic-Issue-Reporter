import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

const discussions = [
  {
    id: 1,
    author: "Amit Sharma",
    authorPhoto: "https://images.unsplash.com/photo-1544723795-3fb6469f5b8c?q=80&w=1978&auto=format&fit=crop",
    title: "New park proposal for Morabadi grounds",
    description: "I've noticed a lot of unused space in Morabadi grounds. It would be amazing to build a new public park here with jogging tracks and seating areas for the elderly. What do you all think?",
    image: "https://images.unsplash.com/photo-1506169993208-8e68f3e582e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1542456396-857e5e3176d6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1521587765099-ef190a17952a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={post.authorPhoto}
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-blue-500"
          />
          <span className="font-semibold text-gray-800">{post.author}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleUpvote}
              className={`flex items-center space-x-1 transition-colors ${
                upvoted ? "text-blue-600" : "hover:text-blue-500"
              }`}
            >
              <ThumbsUp size={18} fill={upvoted ? "currentColor" : "none"} />
              <span>{upvotes}</span>
            </button>
            <button
              onClick={handleDownvote}
              className={`flex items-center space-x-1 transition-colors ${
                downvoted ? "text-red-600" : "hover:text-red-500"
              }`}
            >
              <ThumbsDown size={18} fill={downvoted ? "currentColor" : "none"} />
              <span>{downvotes}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare size={18} />
            <span>{post.comments} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiscussionPage = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Community Discussions & Innovations</h1>
      <p className="text-lg text-gray-600 mb-10">
        Share your ideas, propose solutions, and collaborate with other citizens to build a better community.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {discussions.map((post) => (
          <DiscussionCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default DiscussionPage;