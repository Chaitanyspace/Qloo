import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Clock, FileText, RefreshCw } from 'lucide-react';
import { API_URLS } from '../config/api';

const Sidebar = forwardRef(({ onHistorySelect, isCollapsed }, ref) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);
  const previousCollapsedRef = useRef(isCollapsed);
  const lastFetchTimeRef = useRef(0);

  const fetchHistory = async () => {
    console.log("🔄 fetchHistory called, isMounted:", isMountedRef.current); // Debug
    // Temporarily removing mount check to allow API calls
    // if (!isMountedRef.current) {
    //   console.log("❌ Component unmounted, skipping fetchHistory"); // Debug
    //   return;
    // }
    
    // Debounce: prevent multiple calls within 1 second
    const now = Date.now();
    if (now - lastFetchTimeRef.current < 1000) {
      console.log("Debounced fetchHistory call"); // Debug
      return;
    }
    lastFetchTimeRef.current = now;
    
    // if (!isMountedRef.current) return; // Double check before state update
    setLoading(true);
    console.log("Loading set to true"); // Debug
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URLS.HISTORY, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ History API response received:", data); // Debug log
        
        // Check if component is still mounted before updating state
        // if (!isMountedRef.current) {
        //   console.log("Component unmounted during fetch, skipping state update"); // Debug
        //   return;
        // }
        
        if (data.history && Array.isArray(data.history)) {
          setHistory(data.history);
          console.log("History set:", data.history.length, "items"); // Debug log
        } else {
          console.log("No history data found in response"); // Debug log
          setHistory([]);
        }
      } else {
        console.error("History fetch failed:", response.status);
        // if (isMountedRef.current) {
          setHistory([]);
        // }
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      // if (isMountedRef.current) {
        setHistory([]);
      // }
    } finally {
      // if (isMountedRef.current) {
        setLoading(false);
        console.log("Loading set to false"); // Debug log
      // }
    }
  };

  // Expose refresh method to parent (called after successful analysis)
  useImperativeHandle(ref, () => ({
    refreshHistory: () => {
      console.log("refreshHistory called from parent"); // Debug
      fetchHistory();
    }
  }));

  // Fetch history when sidebar is opened (every time user clicks Report History button)
  useEffect(() => {
    // Load when user opens sidebar (clicks Report History button)
    if (!isCollapsed && previousCollapsedRef.current) {
      console.log("📋 User clicked Report History button - fetching history"); // Debug
      fetchHistory();
    }
    
    // Update previous state
    previousCollapsedRef.current = isCollapsed;
  }, [isCollapsed]); // Depend on isCollapsed only

  // Cleanup effect
  useEffect(() => {
    return () => {
      console.log("Sidebar unmounting"); // Debug
      isMountedRef.current = false;
    };
  }, []);

  const organizeHistoryByTime = (historyItems) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const organized = {
      today: [],
      yesterday: [],
      previous7Days: [],
      previous30Days: [],
      older: []
    };

    historyItems.forEach(item => {
      const itemDate = new Date(item.created_at);
      if (itemDate >= today) {
        organized.today.push(item);
      } else if (itemDate >= yesterday) {
        organized.yesterday.push(item);
      } else if (itemDate >= weekAgo) {
        organized.previous7Days.push(item);
      } else if (itemDate >= monthAgo) {
        organized.previous30Days.push(item);
      } else {
        organized.older.push(item);
      }
    });

    return organized;
  };

  // 3. When user clicks on history item - pass the history ID to parent
  const handleHistoryClick = (item) => {
    onHistorySelect(item.id);
  };

  const formatHistoryTitle = (item) => {
    const reportTypeDisplay = item.report_type === 'state' ? 'State' : 'Country';
    const location = item.state || item.country;
    return `${item.idea} - ${reportTypeDisplay}: ${location}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const organizedHistory = organizeHistoryByTime(history);

  const HistorySection = ({ title, items, icon: Icon }) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <Icon className="w-3 h-3" />
          {!isCollapsed && title}
        </div>
        <div className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleHistoryClick(item)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
              title={isCollapsed ? formatHistoryTitle(item) : undefined}
            >
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {item.idea}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {item.report_type === 'state' ? 'State: ' : 'Country: '}
                      {item.state || item.country}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 rounded-r-xl shadow-sm h-screen ${
      isCollapsed ? 'w-16' : 'w-64'
    }`} style={{ marginTop: '80px', height: 'calc(100vh - 80px)' }}>
      {/* Header with refresh button */}
      <div className="pt-2 pb-2 px-2 rounded-tr-xl border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Report History</span>
            <button
              onClick={() => fetchHistory()}
              disabled={loading}
              className="p-1.5 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
              title="Refresh history"
            >
              <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* History Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            {!isCollapsed && (
              <div className="text-sm text-gray-500">Loading history...</div>
            )}
          </div>
        ) : history.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            {!isCollapsed && (
              <div className="text-sm text-gray-500 text-center">
                No reports yet.<br />
                Run your first analysis to see history here.
              </div>
            )}
          </div>
        ) : (
          <div>
            <HistorySection 
              title="Today" 
              items={organizedHistory.today} 
              icon={Clock}
            />
            <HistorySection 
              title="Yesterday" 
              items={organizedHistory.yesterday} 
              icon={Clock}
            />
            <HistorySection 
              title="Previous 7 days" 
              items={organizedHistory.previous7Days} 
              icon={Clock}
            />
            <HistorySection 
              title="Previous 30 days" 
              items={organizedHistory.previous30Days} 
              icon={Clock}
            />
            <HistorySection 
              title="Older" 
              items={organizedHistory.older} 
              icon={Clock}
            />
          </div>
        )}
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;