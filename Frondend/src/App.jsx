import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, Navigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe, Loader2, ChevronDown, ChevronUp, Download, User, Info, History, ChevronRight } from "lucide-react";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import { API_URLS } from "./config/api";

// Fix: Move constants outside component to prevent recreation
const SPEED_EMOJIS = ['🚀', '⚡', '💨', '🔥', '⭐', '💫', '🌟', '✨', '🎯', '📈'];

const BUSINESS_IDEAS = [
  "Acro Yoga Studio",
  "Acupuncture Clinic",
  "Adaptive Fitness Center",
  "Aerial Fitness Studio",
  "Agility Training Center",
  "Altitude Training Studio",
  "Aromatherapy Class",
  "Art Gallery",
  "Bakery",
  "Balance Training Studio",
  "Barefoot Training Studio",
  "Bookstore",
  "Boxing Gym",
  "Breathwork Class",
  "Chakra Healing Center",
  "Clothing Boutique",
  "Coffee Shop",
  "Cold Plunge Studio",
  "Conscious Breathing Workshop",
  "Consulting Firm",
  "Core Strength Studio",
  "Coworking Space",
  "Craft Brewery",
  "Crossfit",
  "Cryotherapy",
  "Digital Marketing Agency",
  "EMDR Therapy",
  "Emotional Resilience Workshop",
  "Emotional Wellness Studio",
  "Fitness Gym",
  "Fitness Pod",
  "Float Therapy Center",
  "Forest Therapy",
  "Functional Movement Studio",
  "Gratitude Journaling Lounge",
  "Group Personal Training",
  "Guided Meditation Studio",
  "Gymnastics Center",
  "Hair Salon",
  "Hypnotherapy Clinic",
  "Infrared Sauna",
  "Interval Gym",
  "Kettlebell Studio",
  "Light Therapy Center",
  "Martial Arts School",
  "Meditation Center",
  "Meditation Instructor",
  "Meditative Movement Studio",
  "Mental Health Spa",
  "Micro Gym",
  "Mind Gym",
  "Mindfulness Meditation",
  "Mobility Lab",
  "Movement Therapy Center",
  "Personal Trainer",
  "Pet Grooming",
  "Pilates Instructors",
  "Pilates Studio",
  "Public Sauna",
  "Reiki Circle",
  "Reiki Practitioners",
  "Rock Climbing Gym",
  "Salt Cave",
  "Self-regulation Workshop",
  "Sleep Clinic",
  "Somatic Therapy",
  "Sound Bath",
  "Sound Healing",
  "Sound Therapy",
  "Spin Class",
  "Strength Circuit Studio",
  "TRX Gym",
  "Tech Startup",
  "Trauma Recovery Center",
  "Trauma-informed Coaching",
  "Vagal Toning Studio",
  "Vegan Restaurant",
  "Wearable Fitness Lab",
  "Womens Personal Trainer",
  "Yoga Instructor",
  "Yoga Retreat Center",
  "Yoga Studio",
  "Yoga classes",
  "Zumba"
];

// Fix: Move SearchableSelect outside App component to prevent recreation
const SearchableSelect = React.memo(({ 
  value, 
  onChange, 
  options, 
  placeholder,
  getOptionValue,
  getOptionLabel,
  disabled = false 
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  // Simple filtering
  const filtered = search ? 
    options.filter(opt => {
      const label = getOptionLabel ? getOptionLabel(opt) : opt;
      return label.toLowerCase().includes(search.toLowerCase());
    }) : options;

  // Simplified input value logic
  const inputValue = React.useMemo(() => {
    if (isOpen && search) {
      return search; // Show what user is typing
    }
    
    if (value && options.length > 0) {
      // Find and show selected value
      const found = options.find(opt => {
        const optVal = getOptionValue ? getOptionValue(opt) : opt;
        return String(optVal) === String(value);
      });
      return found ? (getOptionLabel ? getOptionLabel(found) : found) : "";
    }
    
    return "";
  }, [isOpen, search, value, options, getOptionValue, getOptionLabel]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false);
            setSearch("");
          }, 150);
        }}
        disabled={disabled}
        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {filtered.map((option, index) => {
            const optVal = getOptionValue ? getOptionValue(option) : option;
            const optLabel = getOptionLabel ? getOptionLabel(option) : option;
            return (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(optVal);
                  setIsOpen(false);
                  setSearch("");
                }}
              >
                {optLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

function Landing({ handleLogin }) {
  const [showRegister, setShowRegister] = useState(false);
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex((prev) => (prev + 1) % SPEED_EMOJIS.length);
    }, 500); // Change emoji every 500ms
    
    return () => clearInterval(interval);
  }, []); // Fixed: Empty dependency array
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-500 p-8" >
             <div className="flex w-full max-w-[95vw] h-[88vh] min-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-800">
        {/* Left column: Branding */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-muted p-24">
          {/* Animated Emoji Display */}
          <div className="mb-8 flex items-center justify-center">
            <div className="text-8xl animate-bounce transform transition-all duration-500 hover:scale-110">
              {SPEED_EMOJIS[currentEmojiIndex]}
            </div>
          </div>
          

          <p className="text-muted-foreground text-3xl max-w-2xl text-center">
            🚀 Discover where your business idea is in demand and culturally aligned — powered by Qloo + OpenAI.
          </p>
          <button 
            onClick={() => setShowProblemModal(true)}
            className="mt-8 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            What Problem We Solve
          </button>
        </div>
        {/* Right column: Auth card */}
        <div className="w-1/2 flex flex-col p-8">
          <div className="w-full h-full flex flex-col">
            <div className="flex mb-4 justify-center gap-6 w-full">
              <button
                className={`flex-1 px-10 py-5 rounded-t-lg font-bold transition border-b-4 text-2xl ${!showRegister ? 'border-gray-800 text-gray-900 bg-white' : 'border-transparent text-gray-500 bg-gray-100'}`}
                onClick={() => setShowRegister(false)}
              >
                Login
              </button>
              <button
                className={`flex-1 px-10 py-5 rounded-t-lg font-bold transition border-b-4 text-2xl ${showRegister ? 'border-gray-800 text-gray-900 bg-white' : 'border-transparent text-gray-500 bg-gray-100'}`}
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </div>
            <div className="bg-muted p-4 rounded-2xl border shadow-lg w-full flex-1 flex items-stretch justify-center">
              <div className="w-full h-full flex flex-col">
                {showRegister ? <Register /> : <Login onLogin={handleLogin} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Problem Solution Modal */}
      {showProblemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl">
            <button 
              onClick={() => setShowProblemModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🏙️ Launch Where Culture Meets Opportunity</h2>
                <p className="text-xl text-gray-700 mb-2">Find the best place to start your next big thing.</p>
                <p className="text-lg text-gray-600">We help you discover high-potential cities to launch or grow your business — powered by cultural intelligence, demand insights, and local ecosystem data.</p>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-2xl font-bold text-red-800 mb-4">🚧 The Problem</h3>
                <p className="text-red-700 mb-4">Choosing where to open your next location, run local campaigns, or test product-market fit shouldn't be guesswork.</p>
                <p className="text-red-700 mb-2">But most business owners struggle with:</p>
                <ul className="text-red-700 space-y-2 ml-4">
                  <li>• Scattered local insights</li>
                  <li>• No cultural alignment data</li>
                  <li>• Guessing audience fit and demand</li>
                  <li>• Lack of trusted local contacts</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">✅ The Solution</h3>
                <p className="text-green-700 mb-4">Our platform scans and scores cities based on demand, cultural fit, and local business networks — giving you a full 360° view of your best launch zones.</p>
                <p className="text-green-700">From top influencers and real estate agents to popular hangouts and inventory suppliers — we've mapped the entire local playbook for you.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">📊 What You Get</h3>
                <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                  <div>• 🌐 Top Cities for Your Niche – No guesswork, just smart data</div>
                  <div>• 🌟 Influencer Ecosystem – Partner-ready creators in each city</div>
                  <div>• 🏬 Local Suppliers & Inventory – Real-time logistics support</div>
                  <div>• 🏢 Real Estate Contacts – Footfall-optimized commercial spaces</div>
                  <div>• 🧭 Popular Local Spots – Awareness & offline activation zones</div>
                  <div>• 📈 Cultural + Demand Match – Proprietary scoring built for D2C growth</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">💡 Why We're Different</h3>
                <p className="text-purple-700 mb-4">Unlike typical location tools, we don't just show you numbers — we show you culture.</p>
                <p className="text-purple-700 mb-4">We combine cultural trends, audience affinity, and local networks to uncover high-opportunity micro-markets before anyone else.</p>
                <p className="text-purple-700 mb-2">Perfect for:</p>
                <div className="grid md:grid-cols-2 gap-2 text-purple-700">
                  <div>• 🛍️ D2C Brands</div>
                  <div>• 🧘 Wellness Startups</div>
                  <div>• ☕ Hospitality & Food Founders</div>
                  <div>• 📣 Local Campaign Planners</div>
                  <div>• 🚀 Growth Marketers</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">🚀 Ready to Find Your Business Sweet Spot?</h3>
                <p className="mb-2">Don't waste another dollar on the wrong city.</p>
                <p className="mb-6">Start scouting smarter today.</p>
                <button 
                  onClick={() => setShowProblemModal(false)}
                  className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  → Explore Cities Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AuthLayout({ children }) {
  return (
    <div>
      <header className="text-center mt-10 mb-8">
        <h1 className="text-4xl font-bold flex justify-center items-center gap-2">
          <Globe className="w-8 h-8 text-muted-foreground" />
          LaunchLens
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-2">
          🚀 Discover where your business idea is in demand and culturally aligned — powered by Qloo + OpenAI.
        </p>
      </header>
      <div className="flex justify-center items-start min-h-[60vh]">
        {children}
      </div>
    </div>
  );
}

// Move MainAppUI outside to prevent re-mounting and memoize it
const MainAppUI = React.memo(function MainAppUI({ 
  idea, setIdea, reportType, setReportType, countryCode, setCountryCode, 
  stateCode, setStateCode, loading, setLoading, progress, setProgress, 
  timer, setTimer, timerInterval, setTimerInterval, results, setResults, 
  error, setError, currentPage, setCurrentPage, expanded, setExpanded,
  allCountries, allStates, isAuthenticated, username, sidebarOpen, setSidebarOpen,
  mainContentRef, sidebarRef, handleHistorySelect, handleLogout, handleCountryChange,
  handleReportTypeChange, handleSubmit, generatePDF, toggleExpand, formatTimer,
  getCountryName, getStateName
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - overlay positioned to not affect main content layout */}
      <div className="absolute top-0 left-0 z-30">
        <Sidebar 
          key="main-sidebar" 
          ref={sidebarRef}
          onHistorySelect={handleHistorySelect}
          isCollapsed={!sidebarOpen}
        />
      </div>
      
      {/* Top left: Report History Button - FIXED POSITION */}
      <div 
        style={{ 
          position: 'fixed',
          top: '16px', 
          left: '16px',
          zIndex: 50
        }}
      >
        <div 
          style={{ 
            backgroundColor: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderRadius: '9999px',
            border: '1px solid #e5e7eb',
            height: '48px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full text-sm transition-all duration-200"
            style={{ 
              height: '32px', 
              display: 'flex', 
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              padding: '4px 12px'
            }}
            title={sidebarOpen ? "Hide Report History" : "Show Report History"}
          >
            <History className="w-4 h-4" />
            Report History
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Top right: Logout Button - FIXED POSITION */}
      <div 
        style={{ 
          position: 'fixed',
          top: '16px', 
          right: '16px',
          zIndex: 50
        }}
      >
        <div 
          style={{ 
            backgroundColor: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderRadius: '9999px',
            border: '1px solid #e5e7eb',
            height: '48px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full text-sm transition-colors duration-200"
            style={{ 
              height: '32px', 
              display: 'flex', 
              alignItems: 'center',
              border: 'none',
              padding: '4px 12px'
            }}
          >
            Logout
          </Button>
          {username && (
            <span 
              className="font-bold text-gray-800" 
              style={{ display: 'flex', alignItems: 'center', margin: '0 8px' }}
            >
              {username}
            </span>
          )}
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border ml-2">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Main Content - full width, proper scrolling */}
      <div className="flex-1 flex flex-col min-h-0" style={{ zIndex: 10 }}>
        <div 
          ref={mainContentRef} 
          className="font-sans text-gray-900 flex-1 overflow-y-auto"
          style={{ 
            paddingTop: '80px', 
            paddingLeft: sidebarOpen ? '280px' : '80px', 
            paddingRight: '16px',
            transition: 'padding-left 0.3s ease',
            position: 'relative',
            zIndex: 10
          }}
        >
          <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
            <header className="text-center space-y-2">
              <h1 className="text-4xl font-bold flex justify-center items-center gap-2">
                <Globe className="w-6 h-6 text-muted-foreground" />
                🌍 LaunchLens
              </h1>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                🚀 Discover where your business idea is in demand and culturally aligned — powered by Qloo + OpenAI.
              </p>
            </header>

            <div className="grid gap-6 bg-muted p-6 rounded-xl border shadow-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label>Business Idea</Label>
                  <div className="relative group">
                    <Info className="w-4 h-4 text-gray-500 cursor-help" />
                    <div className="absolute left-0 bottom-6 hidden group-hover:block w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50">
                      Choose the type of business you want to analyze. This helps us provide tailored insights for your specific industry and target market.
                    </div>
                  </div>
                </div>
                <SearchableSelect
                  value={idea}
                  onChange={setIdea}
                  options={BUSINESS_IDEAS}
                  placeholder="Search and select a business idea..."
                />
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Label>Report Type</Label>
                  <div className="relative group">
                    <Info className="w-4 h-4 text-gray-500 cursor-help" />
                    <div className="absolute left-0 bottom-6 hidden group-hover:block w-72 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50">
                      <strong>Country Report:</strong> Analyzes opportunities across an entire country.<br/>
                      <strong>State Report:</strong> Focuses on specific states/regions for more targeted insights.
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="country-report"
                      name="report-type"
                      value="country"
                      checked={reportType === "country"}
                      onChange={(e) => handleReportTypeChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="country-report" className="text-sm font-medium text-gray-900">
                      Country Report
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="state-report"
                      name="report-type"
                      value="state"
                      checked={reportType === "state"}
                      onChange={(e) => handleReportTypeChange(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="state-report" className="text-sm font-medium text-gray-900">
                      State Report
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label>Country</Label>
                  <div className="relative group">
                    <Info className="w-4 h-4 text-gray-500 cursor-help" />
                    <div className="absolute left-0 bottom-6 hidden group-hover:block w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50">
                      Select the country where you want to analyze market opportunities for your business idea.
                    </div>
                  </div>
                </div>
                <SearchableSelect
                  value={countryCode}
                  onChange={handleCountryChange}
                  options={allCountries}
                  placeholder="Search and select a country..."
                  getOptionValue={(country) => country.isoCode}
                  getOptionLabel={(country) => country.name}
                />
              </div>

              {reportType === "state" && (
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Label>State</Label>
                    <div className="relative group">
                      <Info className="w-4 h-4 text-gray-500 cursor-help" />
                      <div className="absolute left-0 bottom-6 hidden group-hover:block w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50">
                        Choose a specific state or region within your selected country for more targeted local market analysis.
                      </div>
                    </div>
                  </div>
                  <SearchableSelect
                    value={stateCode}
                    onChange={setStateCode}
                    options={allStates}
                    placeholder={!countryCode ? "Select a country first" : "Search and select a state..."}
                    getOptionValue={(state) => state.isoCode}
                    getOptionLabel={(state) => state.name}
                    disabled={!countryCode}
                  />
                </div>
              )}

              <Button 
                type="button" 
                className="w-full" 
                disabled={loading || !idea || !countryCode || (reportType === "state" && !stateCode)}
                onClick={handleSubmit}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Analyzing...</span>
                    <span className="text-orange-600 font-mono font-bold">
                      {formatTimer(timer)}
                    </span>
                  </div>
                ) : (
                  "Analyze"
                )}
              </Button>
            </div>

            {loading && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  ⏳ Analyzing... {Math.floor(progress)}% 
                  <span className="text-orange-600 font-mono font-bold ml-3">
                    {formatTimer(timer)}
                  </span>
                </p>
              </div>
            )}

            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
          {/* === PDF DOWNLOAD + RESULTS === */}
          {results && results.cities?.length > 0 && (
            <div className="w-full px-6 py-6">
              <div className="flex justify-end gap-4 mb-4">
                <Button onClick={() => generatePDF("summary")}>
                  <Download className="w-4 h-4 mr-2" />
                  📄 Download Summary Report
                </Button>
                <Button onClick={() => generatePDF("detailed")}>
                  <Download className="w-4 h-4 mr-2" />
                  📑 Download Detailed Report
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Summary Column */}
                <aside className="w-full lg:w-1/2 space-y-4 bg-white p-4 border shadow-sm rounded-xl text-sm">
                  <h2 className="text-lg font-semibold">
                    📋 Top Summary: Best Location to Launch Your Business
                  </h2>
                  {(() => {
                    // Find city with highest demand score
                    const topCity = results.cities.reduce((prev, current) => 
                      (current.general_demand > prev.general_demand) ? current : prev
                    );
                    if (!topCity) return null;

                    return (
                      <>
                        <p>
                          ✅ <strong>Top City:</strong> {topCity.city} —{" "}
                          {topCity.subheading || "This region offers strong potential based on demand and cultural alignment."}
                        </p>

                        <p>
                          🌟 <strong>Top Influencers:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {topCity.influencers.slice(0, 4).map((inf, i) => (
                              <li key={i}>
                                {inf.name} ({inf.platform}) — {inf.niche}
                                {inf.contact && (
                                  <>
                                    {" "}
                                    • 📧{" "}
                                    <a href={`mailto:${inf.contact}`} className="text-blue-600 underline">
                                      {inf.contact}
                                    </a>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        </p>

                        <p>
                          📦 <strong>Top Inventory Suppliers:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {topCity.inventory.slice(0, 4).map((inv, i) => (
                              <li key={i}>
                                {inv.name} — {inv.inventory_type}
                                {inv.website && (
                                  <>
                                    {" "}
                                    • 🌐{" "}
                                    <a href={inv.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                                      {inv.website}
                                    </a>
                                  </>
                                )}
                                {inv.contact && (
                                  <>
                                    {" "}
                                    • 📞{" "}
                                    <a href={`tel:${inv.contact}`} className="text-blue-600 underline">
                                      {inv.contact}
                                    </a>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        </p>
                        <p>
                          🏢 <strong>Top Real Estate Agents:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {topCity.agents.slice(0, 4).map((agent, i) => (
                              <li key={i}>
                                {agent.name} — {agent.specialization}
                                {agent.website && (
                                  <>
                                    {" "}
                                    • 🌐{" "}
                                    <a href={agent.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                                      {agent.website}
                                    </a>
                                  </>
                                )}
                                {agent.contact && (
                                  <>
                                    {" "}
                                    • 📧{" "}
                                    <a href={`mailto:${agent.contact}`} className="text-blue-600 underline">
                                      {agent.contact}
                                    </a>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        </p>

                        <p>
                          🗺️ <strong>Top Popular Places:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {topCity.popular_places.slice(0, 4).map((place, i) => (
                              <li key={i}>
                                {place.name}
                                {place.website && (
                                  <>
                                    {" "}
                                    • 🌐{" "}
                                    <a href={place.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                                      {place.website}
                                    </a>
                                  </>
                                )}
                                {place.phone && (
                                  <>
                                    {" "}
                                    • 📞{" "}
                                    <a href={`tel:${place.phone}`} className="text-blue-600 underline">
                                      {place.phone}
                                    </a>
                                  </>
                                )}
                                {place.address && <> • 📍 {place.address}</>}
                              </li>
                            ))}
                          </ul>
                        </p>
                      </>
                    );
                  })()}
                </aside>

                {/* Main Detail Column */}
                <div className="w-full lg:w-1/2">
                  {(() => {
                    const city = results.cities[currentPage];
                    if (!city) return null;

                    const Section = ({ title, children }) => (
                      <section className="space-y-2">
                        <button
                          type="button"
                          className="flex justify-between items-center w-full text-left text-md font-semibold py-2 px-3 rounded-md bg-gray-100 hover:bg-gray-200"
                          onClick={() => toggleExpand(title)}
                        >
                          {title} {expanded[title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {expanded[title] && <div className="p-2">{children}</div>}
                      </section>
                    );

                    return (
                      <Card className="p-6 space-y-6 shadow-lg border rounded-xl bg-white">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-bold tracking-tight">
                            🏙️ {city.city}
                          </h2>
                          {city.subheading && (
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {city.subheading}
                            </p>
                          )}
                        </div>
                        <Separator />
                        <p className="text-sm text-muted-foreground">
                          📊 <strong>Score:</strong> {city.score}% •{" "}
                          <strong>Audience Match:</strong> {city.audience_match}% •{" "}
                          <strong>Demand:</strong> {city.general_demand}%
                        </p>
                        <Separator />
                        <Section title="💡 Business Pitch">
                          <p className="text-sm whitespace-pre-wrap">{city.gpt_insights}</p>
                        </Section>
                        <div className="flex items-start space-x-2 pl-4 border-l-2 border-gray-200 mb-6 relative">
                          {/* Horizontal line from left to tip */}
                          <div className="relative">
                            <div className="absolute left-[-16px] top-[10px] w-4 h-px bg-gray-300" />
                          </div>

                          {/* Tip text */}
                          <div className="text-sm text-muted-foreground italic pb-2 pr-2">
                            💡 <strong>Tip:</strong> Collaborate with these influencers to boost credibility and expand reach. 
                            Consider gifting products, sponsoring posts, or co-hosting local events to build community engagement around your brand.
                          </div>
                        </div>
                        <Section title="🌟 Influencers">
                          <ul className="space-y-2">
                            {city.influencers.map((inf, i) => (
                              <li key={i} className="bg-slate-50 p-4 rounded-lg border text-sm leading-6 shadow-sm">
                                <div className="font-semibold text-base">{inf.name}</div>
                                <div className="text-xs text-muted-foreground italic">{inf.niche}</div>
                                <p className="mt-1 text-xs text-gray-600">{inf.bio}</p>
                                <div className="text-xs mt-1 text-muted-foreground">📱 Platform: {inf.platform}</div>
                                <div className="text-xs mt-1 text-muted-foreground">
                                  📧 <a href={`mailto:${inf.contact}`} className="text-blue-600 underline">{inf.contact}</a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Section>
                        <div className="flex items-start space-x-2 pl-4 border-l-2 border-gray-200 mb-6 relative">
                          <div className="relative">
                            <div className="absolute left-[-16px] top-[10px] w-4 h-px bg-gray-300" />
                          </div>

                          <div className="text-sm text-muted-foreground italic pb-2 pr-2">
                            🔧 <strong>Tip:</strong> Partnering with local suppliers can reduce logistics costs and improve delivery speed. 
                            Building strong relationships here also opens the door to exclusive deals, bulk discounts, and smoother inventory management.
                          </div>
                        </div>

                        <Section title="📦 Inventory Suppliers">
                          <ul className="space-y-2">
                            {city.inventory.map((inv, i) => (
                              <li key={i} className="bg-slate-50 p-4 rounded-lg border text-sm leading-6 shadow-sm">
                                <div className="font-semibold text-base">{inv.name}</div>
                                <div className="text-xs text-muted-foreground italic">{inv.inventory_type}</div>
                                <p className="mt-1 text-xs text-gray-600">{inv.location}</p>
                                <div className="text-xs mt-1 text-muted-foreground">
                                  📞 <a href={`tel:${inv.contact}`} className="text-blue-600 underline">{inv.contact}</a>
                                </div>
                                <div className="text-xs mt-1 text-muted-foreground">
                                  🌐 <a href={inv.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">{inv.website}</a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Section>
                        <div className="flex items-start space-x-2 pl-4 border-l-2 border-gray-200 mb-6 relative">
                          <div className="relative">
                            <div className="absolute left-[-16px] top-[10px] w-4 h-px bg-gray-300" />
                          </div>

                          <div className="text-sm text-muted-foreground italic pb-2 pr-2">
                            🏠 <strong>Tip:</strong> These agents specialize in commercial spaces. Reach out early to find high-footfall locations or niche areas aligned with your brand. 
                            They can also help negotiate flexible lease terms and scout up-and-coming neighborhoods.
                          </div>
                        </div>

                        <Section title="🏢 Real Estate Agents">
                          <ul className="space-y-2">
                            {city.agents.map((agent, i) => (
                              <li key={i} className="bg-slate-50 p-4 rounded-lg border text-sm leading-6 shadow-sm">
                                <div className="font-semibold text-base">{agent.name}</div>
                                <div className="text-xs text-muted-foreground italic">{agent.specialization}</div>
                                <p className="mt-1 text-xs text-gray-600">{agent.agency}</p>
                                <div className="text-xs mt-1 text-muted-foreground">
                                  📧 <a href={`mailto:${agent.contact}`} className="text-blue-600 underline">{agent.contact}</a>
                                </div>
                                <div className="text-xs mt-1 text-muted-foreground">
                                  🌐 <a href={agent.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">{agent.website}</a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Section>
                        <div className="flex items-start space-x-2 pl-4 border-l-2 border-gray-200 mb-6 relative">
                          <div className="relative">
                            <div className="absolute left-[-16px] top-[10px] w-4 h-px bg-gray-300" />
                          </div>

                          <div className="text-sm text-muted-foreground italic pb-2 pr-2">
                            🧠 <strong>Tip:</strong> These popular local spots can serve as prime touchpoints for brand visibility. 
                            Consider collaborating with them for promotional events, sponsored classes, or even simple flyer placements to drive awareness for your business.
                          </div>
                        </div>

                        <Section title="🗺️ Popular Places">
                          <ul className="grid gap-4">
                            {city.popular_places.map((place, idx) => (
                              <li key={idx} className="border rounded-xl p-4 bg-gray-50 shadow-sm space-y-2 text-sm">
                                <div className="font-semibold text-lg">{place.name}</div>
                                {place.address && <div>📍 <span>{place.address}</span></div>}
                                {place.phone && <div>📞 <a href={`tel:${place.phone}`}>{place.phone}</a></div>}
                                {place.website && (
                                  <div>🌐 <a href={place.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">{place.website}</a></div>
                                )}
                                {place.map_url && (
                                  <div>🗺️ <a href={place.map_url} className="text-blue-600 underline" target="_blank" rel="noreferrer">View on Map</a></div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </Section>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t">
                          <Button
                            variant="outline"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                          >
                            ← Previous
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            Page {currentPage + 1} of {results.cities.length}
                          </span>
                          <Button
                            variant="outline"
                            disabled={currentPage === results.cities.length - 1}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                          >
                            Next →
                          </Button>
                        </div>
                      </Card>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default function App() {
  const [idea, setIdea] = useState("");
  const [reportType, setReportType] = useState("country");
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(150); // 2.5 minutes in seconds
  const [timerInterval, setTimerInterval] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [username, setUsername] = useState("");
  const [reportHistory, setReportHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mainContentRef = useRef(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Handle login success
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/app");
  };

  // Helper functions to get code from name
  const getCountryCode = React.useCallback((countryName) => {
    const country = allCountries.find(c => c.name === countryName);
    return country ? String(country.isoCode) : "";
  }, [allCountries]);

  const getStateCode = React.useCallback((stateName) => {
    const state = allStates.find(s => s.name === stateName);
    return state ? String(state.isoCode) : "";
  }, [allStates]);

  // Handle history selection using new API endpoint
  const handleHistorySelect = async (historyId) => {
    try {
      // Clear current results when selecting history
      setResults(null);
      setError("");
      setCurrentPage(0);
      setExpanded({});
      setLoading(false);
      setProgress(0);
      
      // Call the new API endpoint
      const token = localStorage.getItem("token");
      const response = await fetch(API_URLS.HISTORY_SELECT(historyId), {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data,"data")
        // Set all form fields with the returned data
        setIdea(data.idea);
        setReportType(data.report_type);
        setCountryCode(data.country_code);
        setStateCode(data.state_code);
        console.log(countryCode,stateCode,"arrs")
        // Update available states
        if (data.available_states) {
          const states = data.available_states.map((s) => ({ isoCode: s.id, name: s.name }));
          setAllStates(states);
        }
      } else {
        console.error('Failed to fetch history data for form');
        setError("Failed to load history data");
      }
    } catch (error) {
      console.error('Error fetching history for form:', error);
      setError("Error loading history data");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // Clear timer if running
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    // Clear all form data and results
    setIdea("");
    setReportType("country");
    setCountryCode("");
    setStateCode("");
    setResults(null);
    setError("");
    setCurrentPage(0);
    setExpanded({});
    setLoading(false);
    setProgress(0);
    setTimer(150);
    setUsername("");

    navigate("/");
  };

  // Handle country change - clear state when country changes
  const handleCountryChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
    setStateCode(""); // Clear state selection
  };

  // Handle report type change - clear state when switching from state to country
  const handleReportTypeChange = (newReportType) => {
    setReportType(newReportType);
    if (newReportType === "country") {
      setStateCode("");
    }
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  useEffect(() => {
    // Fetch countries from backend API
    fetch(API_URLS.COUNTRIES)
      .then((res) => res.json())
      .then((data) => {
        if (data.countries) {
          const countries = data.countries.map((c) => ({ name: c.name, isoCode: c.id }));
          setAllCountries(countries);
        } else {
          // Fallback countries for testing
          setAllCountries([
            { name: "India", isoCode: "IN" },
            { name: "Ireland", isoCode: "IE" }, 
            { name: "United States", isoCode: "US" },
            { name: "United Kingdom", isoCode: "GB" },
            { name: "Canada", isoCode: "CA" },
            { name: "Australia", isoCode: "AU" },
            { name: "Germany", isoCode: "DE" },
            { name: "France", isoCode: "FR" }
          ]);
        }
      })
      .catch((error) => {
        // Fallback countries for testing
        setAllCountries([
          { name: "India", isoCode: "IN" },
          { name: "Ireland", isoCode: "IE" }, 
          { name: "United States", isoCode: "US" },
          { name: "United Kingdom", isoCode: "GB" },
          { name: "Canada", isoCode: "CA" },
          { name: "Australia", isoCode: "AU" },
          { name: "Germany", isoCode: "DE" },
          { name: "France", isoCode: "FR" }
        ]);
      });
  }, []);

  useEffect(() => {
    if (countryCode) {
      // Fetch states from backend API using country id
      fetch(API_URLS.STATES(countryCode))
        .then((res) => res.json())
        .then((data) => {
          if (data.states) {
            setAllStates(data.states.map((s) => ({ isoCode: s.id, name: s.name })));
          } else {
            setAllStates([]);
          }
        })
        .catch(() => setAllStates([]));
    } else {
      setAllStates([]);
    }
    // Reset state selection when country changes
    //setStateCode("");
  }, [countryCode]);

  // Reset country and state when report type changes
  useEffect(() => {
    //setCountryCode("");
    //setStateCode("");
  }, [reportType]);

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const generatePDF = async (type) => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const marginLeft = 14;
    const contentWidth = 180;
    let y = 20;
    const maxY = 270;

    const safeText = (text) =>
      (text || "").toString().replace(/[^\x00-\x7F]/g, "").trim();

    const checkPageSpace = (lines = 1) => {
      if (y + lines * 8 > maxY) {
        doc.addPage();
        y = 20;
      }
    };

    const addWrappedText = (label, text) => {
      const cleanText = safeText(text);
      const lines = doc.splitTextToSize(label ? `${label}: ${cleanText}` : cleanText, contentWidth);
      lines.forEach((line) => {
        checkPageSpace();
        doc.text(line, marginLeft, y);
        y += 8;
      });
      y += 2;
    };

    const addSimpleText = (text) => {
      const cleanText = safeText(text);
      checkPageSpace();
      doc.text(cleanText, marginLeft, y);
      y += 8;
    };

    const addLinkLine = (label, url) => {
      if (!url) return;
      checkPageSpace();
      doc.textWithLink(`${label}: ${safeText(url)}`, marginLeft, y, { url });
      y += 8;
    };

    const renderCity = (city, idx) => {
      y += 6;
      doc.setFont("helvetica", "bold");
      addWrappedText(`${idx + 1}.`, city.city);
      doc.setFont("helvetica", "normal");

      if (city.subheading) addWrappedText("Subheading", city.subheading);
      addSimpleText(`Score: ${city.score}%`);
      addSimpleText(`Audience Match: ${city.audience_match}%`);
      addSimpleText(`Demand: ${city.general_demand}%`);

      if (city.gpt_insights) {
        doc.setFont("helvetica", "bold");
        addSimpleText("Business Pitch");
        doc.setFont("helvetica", "normal");
        addWrappedText("", city.gpt_insights);
      }

      if (city.influencers?.length) {
        doc.setFont("helvetica", "bold");
        addSimpleText("Influencers");
        doc.setFont("helvetica", "normal");
        city.influencers.forEach((inf, i) => {
          addSimpleText(`${i + 1}. ${inf.name} (${inf.platform}) — ${inf.niche}`);
          if (inf.bio) addWrappedText("Bio", inf.bio);
          if (inf.contact) addWrappedText("Email", inf.contact);
        });
      }

      if (city.inventory?.length) {
        doc.setFont("helvetica", "bold");
        addSimpleText("Inventory Suppliers");
        doc.setFont("helvetica", "normal");
        city.inventory.forEach((inv, i) => {
          addSimpleText(`${i + 1}. ${inv.name} — ${inv.inventory_type}`);
          if (inv.location) addWrappedText("Location", inv.location);
          if (inv.phone) addWrappedText("Phone", inv.phone);
          if (inv.website) addLinkLine("Website", inv.website);
        });
      }

      if (city.agents?.length) {
        doc.setFont("helvetica", "bold");
        addSimpleText("Real Estate Agents");
        doc.setFont("helvetica", "normal");
        city.agents.forEach((a, i) => {
          addSimpleText(`${i + 1}. ${a.name} — ${a.specialization}`);
          if (a.agency) addWrappedText("Agency", a.agency);
          if (a.website) addLinkLine("Website", a.website);
          if (a.contact) addWrappedText("Email", a.contact);
        });
      }

      if (city.popular_places?.length) {
        doc.setFont("helvetica", "bold");
        addSimpleText("Popular Places");
        doc.setFont("helvetica", "normal");
        city.popular_places.forEach((p, i) => {
          addSimpleText(`${i + 1}. ${p.name}`);
          if (p.address) addWrappedText("Address", p.address);
          if (p.phone) addWrappedText("Phone", p.phone);
          if (p.website) addLinkLine("Website", p.website);
          if (p.map_url) addLinkLine("Map", p.map_url);
        });
      }

      y += 10;
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`${type === "summary" ? "Summary" : "Detailed"} Market Report for: ${idea}`, marginLeft, y);
    y += 12;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const cities = results?.cities || [];
    if (type === "summary" && cities[0]) {
      renderCity(cities[0], 0);
    } else {
      cities.forEach((c, i) => renderCity(c, i));
    }

    doc.save(`${type}-report-${idea}.pdf`);
  };

  // Helper function to format timer as MM:SS
  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setProgress(0);
    setResults(null);
    setError("");
    setCurrentPage(0);
    
    // Start countdown timer
    setTimer(150); // Reset to 2:30
    const countdownInterval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerInterval(countdownInterval);

    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress = Math.min(fakeProgress + 1, 95);
      setProgress(fakeProgress);
    }, 200);

    try {
      const payload = {
        idea,
        report_type: reportType,
        country: getCountryName(countryCode), // Always send country name
        state: reportType === "state" ? getStateName(stateCode) : null,
      };

      const token = localStorage.getItem("token");
      const res = await fetch(API_URLS.ANALYZE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setResults(data);
          // Refresh history after successful analysis so it's available when user opens sidebar
          if (sidebarRef.current) {
            console.log("Refreshing history after successful analysis, sidebarRef:", sidebarRef.current); // Debug
            console.log("refreshHistory method:", sidebarRef.current.refreshHistory); // Debug
            sidebarRef.current.refreshHistory();
          } else {
            console.log("sidebarRef.current is null/undefined"); // Debug
          }
        }
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to analyze");
      }
      setProgress(100);
    } catch (err) {
      setError("❌ Something went wrong. Please try again.");
    } finally {
      clearInterval(interval);
      // Clear countdown timer
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
      setProgress(100);
      setLoading(false);
    }
  };





  // Helper functions to get name from code
  const getCountryName = React.useCallback((code) => {
    const country = allCountries.find(c => String(c.isoCode) === String(code));
    return country ? country.name : code;
  }, [allCountries]);

  const getStateName = React.useCallback((code) => {
    const state = allStates.find(s => s.isoCode === code);
    return state ? state.name : code;
  }, [allStates]);

  // Fetch username after login
  useEffect(() => {
    if (!isAuthenticated) {
      setUsername("");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(API_URLS.ME, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.username) setUsername(data.username);
      });
  }, [isAuthenticated]);

  // Poll token validity every 3 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        handleLogout();
        return;
      }
      try {
        const res = await fetch(API_URLS.ME, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) {
          handleLogout();
        }
      } catch {
        handleLogout();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Landing handleLogin={handleLogin} />} />
      {/* Remove /login and /register routes, redirect to / if accessed */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainAppUI 
              idea={idea} setIdea={setIdea} reportType={reportType} setReportType={setReportType}
              countryCode={countryCode} setCountryCode={setCountryCode} stateCode={stateCode} setStateCode={setStateCode}
              loading={loading} setLoading={setLoading} progress={progress} setProgress={setProgress}
              timer={timer} setTimer={setTimer} timerInterval={timerInterval} setTimerInterval={setTimerInterval}
              results={results} setResults={setResults} error={error} setError={setError}
              currentPage={currentPage} setCurrentPage={setCurrentPage} expanded={expanded} setExpanded={setExpanded}
              allCountries={allCountries} allStates={allStates} isAuthenticated={isAuthenticated}
              username={username} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
              mainContentRef={mainContentRef} sidebarRef={sidebarRef}
              handleHistorySelect={handleHistorySelect} handleLogout={handleLogout}
              handleCountryChange={handleCountryChange} handleReportTypeChange={handleReportTypeChange}
              handleSubmit={handleSubmit} generatePDF={generatePDF} toggleExpand={toggleExpand}
              formatTimer={formatTimer} getCountryName={getCountryName} getStateName={getStateName}
            />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}