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
    <div id="job-listings" className="relative min-h-screen bg-white overflow-hidden">
      {/* Premium decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full filter blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full filter blur-[100px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-8">
          <motion.button
            onClick={() => setShowFilter(!showFilter)}
            className="w-full py-3 px-6 rounded-xl border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-300 bg-white shadow-sm flex items-center justify-between gap-3"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium">{showFilter ? "Hide Filters" : "Show Filters"}</span>
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
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
              {/* Current Search */}
              {issearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Current Search</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchFilter.title && (
                      <motion.span 
                        className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        {searchFilter.title}
                        <button
                          onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                          className="focus:outline-none text-blue-500 hover:text-blue-700"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </motion.span>
                    )}
                    {searchFilter.location && (
                      <motion.span 
                        className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        {searchFilter.location}
                        <button
                          onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                          className="focus:outline-none text-purple-500 hover:text-purple-700"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </motion.span>
                    )}
                  </div>
                </div>
              )}

              {/* Categories Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-lg mb-4 text-gray-900">Categories</h4>
                <ul className="space-y-3">
                  {JobCategories.map((category, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-gray-900">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
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
                <h4 className="font-semibold text-lg mb-4 text-gray-900">Locations</h4>
                <ul className="space-y-3">
                  {JobLocations.map((location, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-gray-900">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
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
              <h3 className="font-semibold text-2xl sm:text-3xl text-gray-900">Latest Jobs</h3>
              <p className="text-gray-600 mt-2">Discover your perfect career opportunity with top companies</p>
            </div>

            {/* Job Cards Grid */}
            {filteredJobs.length === 0 ? (
              <motion.div 
                className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-600">No jobs found matching your criteria</p>
                <motion.button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedLocations([]);
                    setSearchFilter({ title: "", location: "" });
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-500 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Clear all filters
                </motion.button>
              </motion.div>
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
                    <div className="text-sm text-gray-600">
                      Showing {Math.min((currentPage - 1) * 6 + 1, filteredJobs.length)}-
                      {Math.min(currentPage * 6, filteredJobs.length)} of {filteredJobs.length} jobs
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            className={`w-10 h-10 rounded-lg ${
                              currentPage === index + 1
                                ? "bg-blue-600 text-white shadow-md"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
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
                        className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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