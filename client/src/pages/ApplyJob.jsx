import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import JobCard from '../components/JobCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import kconvert from 'k-convert'
import moment from 'moment'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

function ApplyJob() {
  const { id } = useParams()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
  const [JobData, setJobData] = useState(null)
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)
      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login to apply for jobs')
      }
      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply')
      }

      const token = await getToken()
      const { data } = await axios.post(
        backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => {
    fetchJob()
  }, [id])

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied()
    }
  }, [JobData, userApplications, id])

  return JobData ? (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Gradient Background Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-16 top-16 -z-10 transform-gpu blur-3xl">
            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-20"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />
          </div>
          <div className="absolute right-16 bottom-16 -z-10 transform-gpu blur-3xl">
            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] opacity-20"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Job Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      className="w-24 h-24 bg-white rounded-xl p-4 border border-gray-200 shadow-md" 
                      src={JobData.companyId.image} 
                      alt={JobData.companyId.name} 
                    />
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">{JobData.title}</h1>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
                      <span className="flex items-center gap-2 text-gray-700 bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200">
                        <img src={assets.suitcase_icon} alt="" className="w-4 h-4" />
                        {JobData.companyId.name}
                      </span>
                      <span className="flex items-center gap-2 text-gray-700 bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200">
                        <img src={assets.location_icon} alt="" className="w-4 h-4" />
                        {JobData.location}
                      </span>
                      <span className="flex items-center gap-2 text-gray-700 bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200">
                        <img src={assets.person_icon} alt="" className="w-4 h-4" />
                        {JobData.level}
                      </span>
                      <span className="flex items-center gap-2 text-gray-700 bg-white px-3 py-1 rounded-full text-sm shadow-sm border border-gray-200">
                        <img src={assets.money_icon} alt="" className="w-4 h-4" />
                        CTC: {kconvert.convertTo(JobData.salary)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="flex flex-col items-center lg:items-end gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={applyHandler}
                    disabled={isAlreadyApplied}
                    className={`px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all ${
                      isAlreadyApplied 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                    whileHover={!isAlreadyApplied ? { scale: 1.03 } : {}}
                    whileTap={!isAlreadyApplied ? { scale: 0.98 } : {}}
                  >
                    {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
                  </motion.button>
                  <p className="text-sm text-gray-500">Posted {moment(JobData.date).fromNow()}</p>
                </motion.div>
              </div>
            </div>

            {/* Job Content Section */}
            <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-10">
              <div className="lg:w-2/3">
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Job Description
                </motion.h2>
                <motion.div 
                  className="prose max-w-none text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  dangerouslySetInnerHTML={{ __html: JobData.description }}
                />
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={applyHandler}
                    disabled={isAlreadyApplied}
                    className={`px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all ${
                      isAlreadyApplied 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                    whileHover={!isAlreadyApplied ? { scale: 1.03 } : {}}
                    whileTap={!isAlreadyApplied ? { scale: 0.98 } : {}}
                  >
                    {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
                  </motion.button>
                </motion.div>
              </div>

              {/* More Jobs Section */}
              <div className="lg:w-1/3">
                <motion.h2 
                  className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  More Jobs from {JobData.companyId.name}
                </motion.h2>
                <div className="space-y-6">
                  {jobs
                    .filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                    .filter(job => {
                      const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                      return !appliedJobsIds.has(job._id)
                    })
                    .slice(0, 4)
                    .map((job, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                      >
                        <JobCard job={job} />
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  ) : (
    <Loading />
  )
}

export default ApplyJob