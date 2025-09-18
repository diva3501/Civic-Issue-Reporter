import React, { createContext, useContext, useState } from 'react';
import issuesData from '../data/issues.json';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [issues, setIssues] = useState(issuesData);
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredIssues, setFilteredIssues] = useState(issuesData);

  const addIssue = (newIssue) => {
    const issue = {
      ...newIssue,
      id: `ISS-${String(issues.length + 1).padStart(3, '0')}`,
      submittedDate: new Date().toISOString().split('T')[0],
    };
    
    const updatedIssues = [issue, ...issues];
    setIssues(updatedIssues);
    setFilteredIssues(updatedIssues);
  };

  const updateIssueStatus = (id, status) => {
    const updatedIssues = issues.map(issue =>
      issue.id === id ? { ...issue, status } : issue
    );
    setIssues(updatedIssues);
    setFilteredIssues(updatedIssues.filter(issue => 
      filteredIssues.some(filtered => filtered.id === issue.id)
    ));
  };

  const assignIssue = (id, department) => {
    const updatedIssues = issues.map(issue =>
      issue.id === id ? { ...issue, assignedTo: department, status: 'In Progress' } : issue
    );
    setIssues(updatedIssues);
    setFilteredIssues(updatedIssues.filter(issue => 
      filteredIssues.some(filtered => filtered.id === issue.id)
    ));
  };

  return (
    <AppContext.Provider value={{
      issues,
      currentUser,
      setCurrentUser,
      addIssue,
      updateIssueStatus,
      assignIssue,
      filteredIssues,
      setFilteredIssues,
    }}>
      {children}
    </AppContext.Provider>
  );
};