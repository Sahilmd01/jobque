import React, { useContext, useState, useEffect } from 'react'
import { jobsData, manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import { motion } from 'framer-motion'

const ManageJobs = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState(false)
    const { backendUrl, companyToken } = useContext(AppContext)

    // Function to fetch company Job Applications data 
    const fetchCompanyJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
                { headers: { token: companyToken } }
            )
      
            if (data.success) {
                setJobs(data.jobsData.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to change job visibility
    const changeJobVisiblity = async (id) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/company/change-visiblity',
                { id },
                { headers: { token: companyToken } }
            )
      
            if (data.success) {
                toast.success(data.message)
                fetchCompanyJobs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobs()
        }
    }, [companyToken])

    return jobs ? jobs.length === 0 ? (
        <motion.div 
            className="flex items-center justify-center min-h-[70vh] bg-gradient-to-b from-gray-50 to-white px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center p-6 sm:p-8 bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 w-full max-w-md">
                <div className="bg-indigo-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-2 sm:mb-4 font-bold">No Jobs Posted Yet</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Start attracting top talent by posting your first job opportunity</p>
                <motion.button
                    onClick={() => navigate('/dashboard/add-job')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-medium transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Post Your First Job
                </motion.button>
            </div>
        </motion.div>
    ) : (
        <motion.div 
            className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-3 xs:px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Premium Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <motion.h2 
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Manage Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Job Listings</span>
                    </motion.h2>
                    <motion.p 
                        className="mt-2 sm:mt-4 text-base sm:text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        View, edit, and track all your posted opportunities in one place
                    </motion.p>
                </div>

                {/* Stats Cards */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {[
                        { 
                            title: 'Total Jobs', 
                            value: jobs.length, 
                            icon: (
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            ),
                            bg: 'bg-blue-100'
                        },
                        { 
                            title: 'Active Listings', 
                            value: jobs.filter(job => job.visible).length, 
                            icon: (
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            bg: 'bg-green-100'
                        },
                        { 
                            title: 'Total Applicants', 
                            value: jobs.reduce((sum, job) => sum + job.applicants, 0), 
                            icon: (
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ),
                            bg: 'bg-purple-100'
                        }
                    ].map((stat, index) => (
                        <motion.div 
                            key={index}
                            className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ y: -3 }}
                        >
                            <div className="flex items-center">
                                <div className={`${stat.bg} p-2 sm:p-3 rounded-md sm:rounded-lg mr-3 sm:mr-4`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-500">{stat.title}</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Jobs Table */}
                <motion.div 
                    className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="px-4 sm:px-6 py-3 sm:py-5 border-b border-gray-200">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Your Job Postings</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">#</th>
                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {jobs.map((job, index) => (
                                    <motion.tr 
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors"
                                        whileHover={{ scale: 1.002 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <td className="py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{index + 1}</td>
                                        <td className="py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm font-medium text-gray-900">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">{job.title}</div>
                                                    <div className="text-gray-500 text-xxs xs:text-xs sm:hidden">
                                                        {moment(job.date).format('ll')} • {job.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                                            {moment(job.date).format('ll')}
                                        </td>
                                        <td className="py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm text-gray-500 hidden md:table-cell truncate max-w-[100px] lg:max-w-[150px]">
                                            {job.location}
                                        </td>
                                        <td className="py-3 px-3 sm:py-4 sm:px-6 text-center">
                                            <span className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm ${
                                                job.applicants > 0 
                                                    ? 'bg-indigo-100 text-indigo-800 font-semibold' 
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {job.applicants}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 sm:py-4 sm:px-6">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only peer" 
                                                    checked={job.visible}
                                                    onChange={() => changeJobVisiblity(job._id)}
                                                />
                                                <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                                <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700 hidden xs:inline">
                                                    {job.visible ? 'Visible' : 'Hidden'}
                                                </span>
                                            </label>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Add Job Button */}
                <motion.div 
                    className="mt-6 sm:mt-8 flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.button 
                        onClick={() => navigate('/dashboard/add-job')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium flex items-center gap-1 sm:gap-2 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Job
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    ) : (
        <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-b from-gray-50 to-white">
            <Loading />
        </div>
    )
}

export default ManageJobs