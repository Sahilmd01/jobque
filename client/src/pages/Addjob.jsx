import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Bangalore');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, companyToken } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(backendUrl + '/api/company/post-job',
                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setTitle('')
                setSalary(0)
                quillRef.current.root.innerHTML = ""
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        // Initiate Quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                    ]
                }
            })
        }
    }, [])

    return (
        <motion.div 
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <motion.h2 
                        className="text-3xl font-bold text-gray-900"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Post a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Premium Job</span>
                    </motion.h2>
                    <motion.p 
                        className="text-gray-600 mt-2 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Attract top talent with our premium listing features
                    </motion.p>
                </div>

                <motion.form 
                    onSubmit={onSubmitHandler} 
                    className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-3 text-lg">Job Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Senior Frontend Developer" 
                            onChange={e => setTitle(e.target.value)} 
                            required 
                            value={title} 
                            className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-3 text-lg">Job Description</label>
                        <div 
                            ref={editorRef} 
                            className="min-h-[250px] border border-gray-200 rounded-xl shadow-sm"
                        />
                    </div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div>
                            <label className="block text-gray-700 font-medium mb-3">Job Category</label>
                            <select 
                                className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                                onChange={e => setCategory(e.target.value)}
                            >
                                {JobCategories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-3">Job Location</label>
                            <select 
                                className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                                onChange={e => setLocation(e.target.value)}
                            >
                                {JobLocations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-3">Job Level</label>
                            <select 
                                className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                                onChange={e => setLevel(e.target.value)}
                            >
                                <option value="Beginner level">Beginner Level</option>
                                <option value="Intermediate level">Intermediate Level</option>
                                <option value="Senior level">Senior Level</option>
                            </select>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label className="block text-gray-700 font-medium mb-3 text-lg">Salary (₹)</label>
                        <div className="relative w-full md:w-64">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                            <input 
                                min={0} 
                                className="w-full pl-10 pr-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all" 
                                onChange={e => setSalary(e.target.value)} 
                                type="number" 
                                placeholder="60000" 
                                value={salary}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.button 
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                        >
                            Post Premium Job
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </motion.form>
            </div>
        </motion.div>
    )
}

export default AddJob;