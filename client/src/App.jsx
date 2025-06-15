import React, {useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJobs from './pages/ApplyJobs'
import Applications from './pages/Applications'
import RecuiterLogin from './components/RecuiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'
const App = () => {
  const {showRecruiterLogin} = useContext(AppContext)
  return (
    <div>
      {
        showRecruiterLogin && <RecuiterLogin/>
      }
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<ApplyJobs/>}/>
        <Route path='/applications' element={<Applications/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='add-job' element={<AddJob/>}/>
        <Route path='manage-jobs' element={<ManageJobs/>}/>
        <Route path='view-applications' element={<ViewApplication/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
