import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const ViewApplications = () => {
    const { backendUrl, companyToken } = useContext(AppContext)
    const [applicants, setApplicants] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)

    // Function to fetch company Job Applications data 
    const fetchCompanyJobApplications = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/applicants',
                { headers: { token: companyToken } }
            )

            if (data.success) {
                setApplicants(data.applications.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to Update Job Applications Status 
    const changeJobApplicationStatus = async (id, status) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/company/change-status',
                { id, status },
                { headers: { token: companyToken } }
            )

            if (data.success) {
                toast.success(`Application ${status.toLowerCase()}`)
                setOpenDropdown(null) // Close dropdown after selection
                fetchCompanyJobApplications()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id)
    }

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobApplications()
        }
    }, [companyToken])

    return applicants ? applicants.length === 0 ? (
        <motion.div 
            className="flex items-center justify-center h-[70vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200 w-full max-w-md">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-sm sm:text-base text-gray-600">Your job postings haven't received any applications yet. Check back later or promote your listings.</p>
            </div>
        </motion.div>
    ) : (
        <motion.div 
            className="p-3 sm:p-4 md:p-6 w-full mx-auto max-w-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Job Applications</h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">Review and manage candidate applications for your positions</p>
            </div>

            <motion.div 
                className="overflow-x-auto rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                        <tr>
                            <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">#</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">Candidate</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Job</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Location</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">Resume</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                            <motion.tr 
                                key={index}
                                className="hover:bg-gray-50 transition-colors"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.002 }}
                            >
                                <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm text-gray-500 text-center">{index + 1}</td>
                                <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm font-medium text-gray-900">
                                    <div className="flex items-center">
                                        <img 
                                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full mr-2 sm:mr-3 object-cover border-2 border-indigo-100 shadow-sm" 
                                            src={applicant.userId.image} 
                                            alt={applicant.userId.name} 
                                        />
                                        <span className="truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[150px]">{applicant.userId.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm text-gray-500 hidden sm:table-cell truncate max-w-[100px] md:max-w-[150px] lg:max-w-[180px]">
                                    {applicant.jobId.title}
                                </td>
                                <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm text-gray-500 hidden md:table-cell truncate max-w-[80px] lg:max-w-[120px]">
                                    {applicant.jobId.location}
                                </td>
                                <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm">
                                    <motion.a 
                                        href={applicant.userId.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 sm:gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg transition-all text-xs shadow-sm"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="hidden xs:inline">View</span> Resume
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </motion.a>
                                </td>
                                <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm">
                                    {applicant.status === "Pending" ? (
                                        <div className="relative inline-block text-left">
                                            <motion.button 
                                                onClick={() => toggleDropdown(applicant._id)}
                                                className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none shadow-sm"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                </svg>
                                            </motion.button>
                                            {openDropdown === applicant._id && (
                                                <motion.div 
                                                    className="z-50 absolute right-0 mt-1 sm:mt-2 w-32 sm:w-40 bg-white border border-gray-200 rounded-md sm:rounded-lg shadow-xl overflow-hidden"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.button 
                                                        onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                                                        className="block w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 text-green-600 hover:bg-green-50 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Accept
                                                    </motion.button>
                                                    <motion.button 
                                                        onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                                                        className="block w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 text-red-600 hover:bg-red-50 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        Reject
                                                    </motion.button>
                                                </motion.div>
                                            )}
                                        </div>
                                    ) : (
                                        <span className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium ${
                                            applicant.status === "Accepted" 
                                                ? "bg-green-100 text-green-800 shadow-sm" 
                                                : "bg-red-100 text-red-800 shadow-sm"
                                        }`}>
                                            {applicant.status}
                                        </span>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* Stats Card at Bottom */}
            <motion.div 
                className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center">
                        <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-blue-100 mr-3 sm:mr-4">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Applications</p>
                            <p className="text-xl sm:text-2xl font-semibold text-gray-900">{applicants.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center">
                        <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-green-100 mr-3 sm:mr-4">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-500">Accepted</p>
                            <p className="text-xl sm:text-2xl font-semibold text-gray-900">{applicants.filter(a => a.status === "Accepted").length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center">
                        <div className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-purple-100 mr-3 sm:mr-4">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-500">Pending</p>
                            <p className="text-xl sm:text-2xl font-semibold text-gray-900">{applicants.filter(a => a.status === "Pending").length}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    ) : <Loading />
}

export default ViewApplications