import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Dashboard = () => {
    const navigate = useNavigate()
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

    // Function to logout for a company
    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-jobs')
        }
    }, [companyData])

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800'>
            {/* Premium Top Navigation Bar */}
            <header className='bg-white shadow-sm py-4 border-b border-gray-200'>
                <div className='px-6 flex justify-between items-center max-w-7xl mx-auto'>
                    <motion.div 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img 
                            className="w-10 h-10" 
                            src={assets.hirely} 
                            alt="Hirely Logo"
                        />
                        <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block'>Hirely</span>
                    </motion.div>
                    
                    {companyData && (
                        <div className='flex items-center gap-4'>
                            <p className='max-sm:hidden text-gray-600'>Welcome, <span className='font-medium text-gray-900'>{companyData.name}</span></p>
                            <div className='relative group'>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <img 
                                        className='w-10 h-10 rounded-full object-cover ring-2 ring-indigo-200' 
                                        src={companyData.image} 
                                        alt="Company Logo" 
                                    />
                                </motion.div>
                                <div className='absolute hidden group-hover:block top-full right-0 z-10 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-gray-200 overflow-hidden'>
                                    <div className='py-1'>
                                        <motion.button
                                            onClick={logout}
                                            className='block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2'
                                            whileHover={{ x: 5 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sign Out
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className='flex items-start max-w-7xl mx-auto'>
                {/* Premium Desktop Sidebar */}
                <aside className='hidden md:block min-h-[calc(100vh-80px)] bg-white border-r border-gray-200 w-64 py-6'>
                    <ul className='space-y-2 px-4'>
                        <li>
                            <NavLink 
                                className={({ isActive }) => `flex items-center p-3 gap-3 w-full rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-indigo-700 font-medium shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
                                to={'/dashboard/add-job'}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={`p-2 rounded-lg ${isActive ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <img className='w-5 h-5' src={assets.add_icon} alt="Add Job" />
                                        </div>
                                        <span>Post New Job</span>
                                        {isActive && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className={({ isActive }) => `flex items-center p-3 gap-3 w-full rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-indigo-700 font-medium shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
                                to={'/dashboard/manage-jobs'}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={`p-2 rounded-lg ${isActive ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <img className='w-5 h-5' src={assets.home_icon} alt="Manage Jobs" />
                                        </div>
                                        <span>Manage Jobs</span>
                                        {isActive && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className={({ isActive }) => `flex items-center p-3 gap-3 w-full rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-indigo-700 font-medium shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
                                to={'/dashboard/view-applications'}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={`p-2 rounded-lg ${isActive ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <img className='w-5 h-5' src={assets.person_tick_icon} alt="View Applications" />
                                        </div>
                                        <span>Applications</span>
                                        {isActive && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </aside>

                {/* Premium Main Content Area */}
                <main className='flex-1 h-full p-6'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className='bg-white rounded-xl p-8 shadow-lg min-h-[calc(100vh-180px)] border border-gray-200'
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>

            {/* Premium Mobile Bottom Navigation */}
            <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 shadow-2xl'>
                <ul className='flex justify-around py-3 px-2'>
                    <li className='flex-1'>
                        <NavLink 
                            className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-indigo-600' : 'text-gray-500'}`}
                            to={'/dashboard/add-job'}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`p-2 rounded-full ${isActive ? 'bg-gradient-to-r from-blue-100 to-purple-100 shadow-sm' : ''}`}>
                                        <img className='w-5 h-5' src={assets.add_icon} alt="Add Job" />
                                    </div>
                                    <span className='text-xs mt-1'>Post Job</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className='flex-1'>
                        <NavLink 
                            className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-indigo-600' : 'text-gray-500'}`}
                            to={'/dashboard/manage-jobs'}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`p-2 rounded-full ${isActive ? 'bg-gradient-to-r from-blue-100 to-purple-100 shadow-sm' : ''}`}>
                                        <img className='w-5 h-5' src={assets.home_icon} alt="Manage Jobs" />
                                    </div>
                                    <span className='text-xs mt-1'>Jobs</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className='flex-1'>
                        <NavLink 
                            className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-indigo-600' : 'text-gray-500'}`}
                            to={'/dashboard/view-applications'}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`p-2 rounded-full ${isActive ? 'bg-gradient-to-r from-blue-100 to-purple-100 shadow-sm' : ''}`}>
                                        <img className='w-5 h-5' src={assets.person_tick_icon} alt="View Applications" />
                                    </div>
                                    <span className='text-xs mt-1'>Applications</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Dashboard