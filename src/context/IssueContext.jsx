import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ISSUES } from '../data/mockData';
import toast from 'react-hot-toast';

const IssueContext = createContext(null);

const STORAGE_KEY = 'civicsense_issues_v4';

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading issues from localStorage:', e);
    }
    return INITIAL_ISSUES;
  });

  const [selectedIssue, setSelectedIssue] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
    } catch (e) {
      console.error('Error saving issues to localStorage:', e);
    }
  }, [issues]);

  const addIssue = (newIssueData) => {
    // Generate clean Indian civic reference code
    const cityCode = newIssueData.location?.toLowerCase().includes('delhi')
      ? 'DEL'
      : newIssueData.location?.toLowerCase().includes('noida')
      ? 'NOI'
      : newIssueData.location?.toLowerCase().includes('ghaziabad')
      ? 'GZB'
      : 'NCR';

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CS-2026-${cityCode}-${randomNum}`;
    const nowIso = new Date().toISOString();

    const formattedDate = new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    const createdIssue = {
      id: newId,
      title: newIssueData.title.trim(),
      description: newIssueData.description.trim(),
      category: newIssueData.category,
      status: 'Reported',
      location: newIssueData.location.trim(),
      lat: Number(newIssueData.lat) || 28.6280,
      lng: Number(newIssueData.lng) || 77.3649,
      reportedAt: nowIso,
      imageUrl: newIssueData.imageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      upvotes: 1,
      hasUpvoted: true,
      isUserSubmitted: true,
      reporterName: newIssueData.reporterName || 'Citizen Contributor',
      department: newIssueData.department || 'Municipal Corporation Civil & Sanitation Wing',
      ward: newIssueData.ward || 'Local Ward Jurisdiction',
      estimatedResolution: 'Within 48-72 hours',
      timeline: [
        {
          stage: 'Reported',
          date: formattedDate,
          title: 'Citizen Complaint Registered & Geotagged',
          description: 'AI validation completed. Complaint logged into CivicSense municipal dashboard and dispatched to local ward superintendent.',
          status: 'completed'
        },
        {
          stage: 'In Progress',
          date: 'Pending Ward Assignment',
          title: 'Engineering Review & Contractor Dispatch',
          description: 'Junior engineer inspection queue assigned. Work order generation in progress.',
          status: 'current'
        },
        {
          stage: 'Resolved',
          date: 'Estimated within 3 business days',
          title: 'Repair Verification & Closure',
          description: 'Field photo comparison and citizen satisfaction confirmation.',
          status: 'upcoming'
        }
      ]
    };

    setIssues((prev) => [createdIssue, ...prev]);
    toast.success(`Complaint registered successfully! Reference #${newId}`, {
      duration: 5000,
      icon: '🏛️',
    });

    return createdIssue;
  };

  const toggleUpvote = (id) => {
    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id === id) {
          const hasUpvoted = !issue.hasUpvoted;
          const upvotes = hasUpvoted ? issue.upvotes + 1 : Math.max(0, issue.upvotes - 1);
          if (hasUpvoted) {
            toast.success('Endorsed! Higher upvotes increase municipal priority.', { id: 'upvote-toast' });
          }
          return { ...issue, hasUpvoted, upvotes };
        }
        return issue;
      })
    );

    // Also update selectedIssue if currently open
    setSelectedIssue((prev) => {
      if (prev && prev.id === id) {
        const hasUpvoted = !prev.hasUpvoted;
        const upvotes = hasUpvoted ? prev.upvotes + 1 : Math.max(0, prev.upvotes - 1);
        return { ...prev, hasUpvoted, upvotes };
      }
      return prev;
    });
  };

  const resetToDefaults = () => {
    setIssues(INITIAL_ISSUES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    toast.success('Reset to standard showcase data', { icon: '🔄' });
  };

  // Metrics
  const stats = {
    total: issues.length,
    reported: issues.filter((i) => i.status === 'Reported').length,
    inProgress: issues.filter((i) => i.status === 'In Progress').length,
    resolved: issues.filter((i) => i.status === 'Resolved').length,
    userReportsCount: issues.filter((i) => i.isUserSubmitted).length,
  };

  const userReports = issues.filter((i) => i.isUserSubmitted);

  return (
    <IssueContext.Provider
      value={{
        issues,
        userReports,
        selectedIssue,
        setSelectedIssue,
        addIssue,
        toggleUpvote,
        resetToDefaults,
        stats,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};
