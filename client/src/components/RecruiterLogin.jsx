import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const RecruiterLogin = () => {
    const navigate = useNavigate()
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(false)
    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state == 'Sign Up' && !isTextDataSubmited) {
            return setIsTextDataSubmited(true)
        }

        try {
            if (state === "Login") {
                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }
            } else {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
           toast.error(error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center'
        >
            <motion.form 
                onSubmit={onSubmitHandler}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className='relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'
            >
                <div className='flex justify-between items-center mb-6'>
                    <div>
                        <h1 className='text-2xl font-semibold text-gray-800'>Recruiter {state}</h1>
                        <p className='text-gray-500'>Welcome back! Please sign in to continue</p>
                    </div>
                    <motion.img 
                        onClick={() => setShowRecruiterLogin(false)} 
                        className='w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
                        src={assets.cross_icon} 
                        alt="Close"
                        whileHover={{ rotate: 90 }}
                    />
                </div>

                {state === 'Sign Up' && isTextDataSubmited ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex items-center gap-4 my-6 p-4 bg-gray-50 rounded-xl'
                    >
                        <label htmlFor="image" className='cursor-pointer'>
                            <div className='relative'>
                                <img 
                                    className='w-20 h-20 rounded-full object-cover border-2 border-gray-200'
                                    src={image ? URL.createObjectURL(image) : assets.upload_area}  
                                    alt="Company logo" 
                                />
                                <div className='absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                    <span className='text-white text-xs font-medium'>Upload</span>
                                </div>
                            </div>
                            <input 
                                onChange={e => setImage(e.target.files[0])} 
                                type="file" 
                                id='image' 
                                hidden 
                                accept="image/*"
                            />
                        </label>
                        <p className='text-gray-600'>Upload Company logo</p>
                    </motion.div>
                ) : (
                    <>
                        {state !== 'Login' && (
                            <motion.div 
                                className='border border-gray-300 px-4 py-3 flex items-center gap-3 rounded-xl mt-4'
                                whileFocus={{ borderColor: "#3B82F6", boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)" }}
                            >
                                <img src={assets.person_icon} alt="" className='w-5 opacity-70' />
                                <input 
                                    className='outline-none w-full text-gray-700 placeholder-gray-400'
                                    onChange={e => setName(e.target.value)} 
                                    value={name} 
                                    type="text" 
                                    placeholder='Company Name' 
                                    required 
                                />
                            </motion.div>
                        )}

                        <motion.div 
                            className='border border-gray-300 px-4 py-3 flex items-center gap-3 rounded-xl mt-4'
                            whileFocus={{ borderColor: "#3B82F6", boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)" }}
                        >
                            <img src={assets.email_icon} alt="" className='w-5 opacity-70' />
                            <input 
                                className='outline-none w-full text-gray-700 placeholder-gray-400'
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                type='email' 
                                placeholder='Email' 
                                required
                            />
                        </motion.div>

                        <motion.div 
                            className='border border-gray-300 px-4 py-3 flex items-center gap-3 rounded-xl mt-4'
                            whileFocus={{ borderColor: "#3B82F6", boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)" }}
                        >
                            <img src={assets.lock_icon} alt="" className='w-5 opacity-70' />
                            <input 
                                className='outline-none w-full text-gray-700 placeholder-gray-400'
                                onChange={e => setPassword(e.target.value)} 
                                value={password} 
                                type='password' 
                                placeholder='Password' 
                                required
                            />
                        </motion.div>
                    </>
                )}

                {state === "Login" && (
                    <motion.p 
                        className='text-sm text-blue-600 mt-3 cursor-pointer inline-block'
                        whileHover={{ x: 2 }}
                    >
                        Forgot password?
                    </motion.p>
                )}
                
                <motion.button
                    type='submit'
                    className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl mt-6 font-medium shadow-md hover:shadow-lg transition-all'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {state === 'Login' ? 'Login' : isTextDataSubmited ? 'Create Account' : 'Next'}
                </motion.button>

                <div className='mt-6 text-center text-gray-500'>
                    {state === 'Login' ? (
                        <p>
                            Don't have an account?{' '}
                            <motion.span 
                                className='text-blue-600 font-medium cursor-pointer'
                                onClick={() => setState("Sign Up")}
                                whileHover={{ textDecoration: 'underline' }}
                            >
                                Sign Up
                            </motion.span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <motion.span 
                                className='text-blue-600 font-medium cursor-pointer'
                                onClick={() => setState("Login")}
                                whileHover={{ textDecoration: 'underline' }}
                            >
                                Login
                            </motion.span>
                        </p>
                    )}
                </div>
            </motion.form>
        </motion.div>
    )
}

export default RecruiterLogin