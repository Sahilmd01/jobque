import { createContext, useEffect, useState } from "react";
import { jobsData } from '../assets/assets'

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
    })

    const [issearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    // Function To fetch data
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs();
    }, [])

    const value = {
        setSearchFilter, searchFilter,
        setIsSearched, issearched,
        setJobs, jobs,
        setShowRecruiterLogin, showRecruiterLogin
    }

    return (
        <div className="relative min-h-screen bg-gray-900 overflow-hidden">
            {/* Background elements matching Hero section */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-10 -right-1/2 transform-gpu blur-3xl opacity-10">
                    <div 
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff]"
                        style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                    />
                </div>
                <div className="absolute -top-52 left-1/2 -translate-x-1/2 transform-gpu blur-3xl opacity-10">
                    <div 
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff]"
                        style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                    />
                </div>
            </div>

            {/* Context provider with original logic */}
            <AppContext.Provider value={value}>
                {props.children}
            </AppContext.Provider>
        </div>
    )
}