import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

function Applications() {
  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {
    try {
      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setIsEdit(false)
    setResume(null)
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user])

  return (
    <>
      <Navbar />
      <motion.div 
        className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Applications</span>
            </motion.h2>
            <motion.p 
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Track and manage all your job applications in one place
            </motion.p>
          </div>

          {/* Resume Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Your Resume</h3>
                <p className="text-gray-600 mt-1">Keep your resume updated for better opportunities</p>
              </div>
              {!isEdit && userData?.resume && (
                <motion.button
                  onClick={() => setIsEdit(true)}
                  className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Update Resume
                </motion.button>
              )}
            </div>

            {isEdit || !userData?.resume ? (
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <label className="w-full" htmlFor="resumeUpload">
                  <div className="px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-center">
                    {resume ? (
                      <div className="flex flex-col items-center">
                        <svg className="w-10 h-10 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-gray-700">{resume.name}</span>
                        <span className="text-sm text-gray-500 mt-1">Click to change</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="font-medium text-gray-700">Upload your resume</span>
                        <span className="text-sm text-gray-500 mt-1">PDF format recommended</span>
                      </div>
                    )}
                  </div>
                  <input 
                    id="resumeUpload" 
                    onChange={e => setResume(e.target.files[0])} 
                    accept="application/pdf" 
                    type="file" 
                    className="hidden" 
                  />
                </label>
                <div className="flex gap-4 w-full sm:w-auto">
                  <motion.button 
                    onClick={updateResume} 
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!resume}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Save Resume
                  </motion.button>
                  {userData?.resume && (
                    <motion.button 
                      onClick={() => setIsEdit(false)} 
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Current Resume</h4>
                    <p className="text-sm text-gray-500">Uploaded on {moment(userData.resumeUpdatedAt).format('MMMM D, YYYY')}</p>
                  </div>
                </div>
                <motion.a
                  href={userData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  View Resume
                </motion.a>
              </motion.div>
            )}
          </motion.div>

          {/* Applications Table */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="px-8 py-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Your Job Applications</h3>
              <p className="text-gray-600 mt-1">{userApplications.length} total applications</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Location</th>
                    <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Applied On</th>
                    <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userApplications.length > 0 ? (
                    userApplications.map((job, index) => (
                      <motion.tr 
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-8 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-white border border-gray-200 p-1">
                              <img className="h-10 w-10 rounded-md object-contain" src={job.companyId.image} alt={job.companyId.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{job.companyId.name}</div>
                              <div className="text-sm text-gray-500 sm:hidden">{job.jobId.location}</div>
                              <div className="text-xs text-gray-400 sm:hidden">
                                {moment(job.date).format('MMM D, YYYY')}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{job.jobId.title}</div>
                          <div className="text-sm text-gray-500 md:hidden">
                            {moment(job.date).format('MMM D, YYYY')}
                          </div>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                          {job.jobId.location}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {moment(job.date).format('MMMM D, YYYY')}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <motion.span 
                            className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                              job.status === 'Accepted' 
                                ? 'bg-green-100 text-green-800' 
                                : job.status === 'Rejected' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-blue-100 text-blue-800'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {job.status}
                          </motion.span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h4>
                          <p className="text-gray-600 max-w-md">
                            You haven't applied to any jobs yet. Start your job search to find exciting opportunities!
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}

export default Applications;