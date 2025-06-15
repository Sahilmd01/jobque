import { createContext, useEffect, useState } from "react";
import {jobsData} from '../assets/assets'
export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:'',
    })

    const [issearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    //Function To fecth data
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs();
    },[])

const  value = {
    setSearchFilter, searchFilter,
    setIsSearched, issearched,
    setJobs, jobs,
    setShowRecruiterLogin, showRecruiterLogin
}

return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}