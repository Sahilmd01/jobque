import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";
import { motion } from "framer-motion";

const JobListing = () => {
  const { issearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Filter jobs based on selections
  useEffect(() => {
    const matchesCategory = job => 
      selectedCategories.length === 0 || selectedCategories.includes(job.category);
    const matchesLocation = job => 
      selectedLocations.length === 0 || selectedLocations.includes(job.location);
    const matchesTitle = job => 
      searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = job => 
      searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs.slice().reverse().filter(
      job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
    );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  return (
    <div id="job-listings" className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Background elements matching Hero section */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-10 -right-1/2 transform-gpu blur-3xl">
          <div 
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-10"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>
        <div className="absolute -top-52 left-1/2 -translate-x-1/2 transform-gpu blur-3xl">
          <div 
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-10"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <motion.button
            onClick={() => setShowFilter(!showFilter)}
            className="w-full py-2 px-4 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center justify-between"
            whileTap={{ scale: 0.98 }}
          >
            <span>{showFilter ? "Hide Filters" : "Show Filters"}</span>
            <svg
              className={`w-5 h-5 transition-transform ${showFilter ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-1/4 ${showFilter ? "block" : "hidden lg:block"}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
              {/* Current Search */}
              {issearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3 text-white">Current Search</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchFilter.title && (
                      <span className="inline-flex items-center gap-2 bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {searchFilter.title}
                        <button
                          onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                          className="focus:outline-none"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    )}
                    {searchFilter.location && (
                      <span className="inline-flex items-center gap-2 bg-red-900/30 text-red-400 px-3 py-1 rounded-full text-sm">
                        {searchFilter.location}
                        <button
                          onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                          className="focus:outline-none"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Categories Filter */}
              <div className="mb-8">
                <h4 className="font-medium text-lg mb-4 text-white">Categories</h4>
                <ul className="space-y-3">
                  {JobCategories.map((category, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white">
                        <input
                          type="checkbox"
                          className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <span>{category}</span>
                      </label>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Locations Filter */}
              <div>
                <h4 className="font-medium text-lg mb-4 text-white">Locations</h4>
                <ul className="space-y-3">
                  {JobLocations.map((location, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white">
                        <input
                          type="checkbox"
                          className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedLocations.includes(location)}
                          onChange={() => handleLocationChange(location)}
                        />
                        <span>{location}</span>
                      </label>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="mb-8">
              <h3 className="font-medium text-2xl sm:text-3xl text-white">Latest Jobs</h3>
              <p className="text-gray-400 mt-1">Get your desired job from top companies</p>
            </div>

            {/* Job Cards Grid */}
            {filteredJobs.length === 0 ? (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
                <p className="text-gray-400">No jobs found matching your criteria</p>
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedLocations([]);
                    setSearchFilter({ title: "", location: "" });
                  }}
                  className="mt-4 text-indigo-400 hover:text-indigo-300"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredJobs
                    .slice((currentPage - 1) * 6, currentPage * 6)
                    .map((job, index) => (
                      <JobCard key={`${job._id}-${index}`} job={job} />
                    ))}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 6 && (
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-400">
                      Showing {Math.min((currentPage - 1) * 6 + 1, filteredJobs.length)}-
                      {Math.min(currentPage * 6, filteredJobs.length)} of {filteredJobs.length} jobs
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                      
                      <div className="flex gap-1">
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-10 h-10 rounded-md ${
                              currentPage === index + 1
                                ? "bg-indigo-600 text-white"
                                : "border border-gray-600 text-gray-400 hover:bg-gray-800"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {index + 1}
                          </motion.button>
                        ))}
                      </div>
                      
                      <motion.button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredJobs.length / 6)))}
                        disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
                        className="p-2 rounded-md border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobListing;