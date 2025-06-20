import React, { useContext, useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { FiUser, FiMail, FiBriefcase, FiCalendar, FiLogOut, FiSave, FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    skills: []
  });
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // Initialize form data and profile image
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumbers[0]?.phoneNumber || "",
        skills: ["React", "JavaScript", "Node.js", "UI/UX Design", "HTML/CSS"]
      });

      // Get Google profile picture if available
      const googleAccount = user.externalAccounts.find(
        account => account.provider === "google"
      );
      
      // Use Google picture if available, otherwise use Clerk's profile image
      setProfileImageUrl(
        googleAccount?.avatarUrl || 
        user.profileImageUrl || 
        assets.userPlaceholder
      );
    }
  }, [user]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      console.log("Resume uploaded:", file.name);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumbers[0]?.phoneNumber || "",
      skills: formData.skills
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSkillAdd();
    }
  };

  const toggleSkillsEdit = () => {
    setIsEditingSkills(!isEditingSkills);
  };

  const saveSkills = () => {
    setIsEditingSkills(false);
    console.log("Skills saved:", formData.skills);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-400">My Profile</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="h-32 w-32 rounded-full border-4 border-indigo-500/30 object-cover"
                    onError={(e) => {
                      e.target.src = assets.userPlaceholder;
                    }}
                  />
                </div>
                <h2 className="text-xl font-bold text-center">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{user?.primaryEmailAddress?.emailAddress}</p>
                
                <div className="w-full bg-gray-700 h-px my-4"></div>
                
                <div className="w-full space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Member since</span>
                    <span className="text-gray-300">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Job applications</span>
                    <span className="text-indigo-400 font-medium">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Profile complete</span>
                    <span className="text-green-400 font-medium">85%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-6 bg-gray-800/50 rounded-xl border border-gray-700 p-4 shadow-lg">
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg bg-gray-700 text-indigo-400">
                  <FiUser className="text-indigo-400" />
                  Profile Information
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-700 text-gray-300 hover:text-indigo-400 transition-colors">
                  <FiBriefcase className="text-gray-400" />
                  My Applications
                </button>
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-700 text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  <FiLogOut className="text-gray-400" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            {/* Profile Information */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 shadow-lg mb-6">
              <h3 className="text-lg font-bold mb-4 text-indigo-400 flex items-center gap-2">
                <FiUser />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-300">
                      {user?.firstName || "Not provided"}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-300">
                      {user?.lastName || "Not provided"}
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-300 flex items-center gap-2">
                    <FiMail className="text-indigo-400" />
                    {user?.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="+1 234 567 8900"
                    />
                  ) : (
                    <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-300">
                      {user?.phoneNumbers[0]?.phoneNumber || "Not provided"}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Member Since</label>
                  <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-300 flex items-center gap-2">
                    <FiCalendar className="text-indigo-400" />
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              {isEditing ? (
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={handleSaveProfile}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <FiSave />
                    Save Changes
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <FiX />
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleEditClick}
                  className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Resume Section */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4 text-indigo-400 flex items-center gap-2">
                <FiBriefcase />
                Resume & Skills
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Resume</label>
                  <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-8 text-center">
                    {resumeFile ? (
                      <div className="flex flex-col items-center">
                        <p className="text-gray-300 mb-3">{resumeFile.name}</p>
                        <button 
                          onClick={() => setResumeFile(null)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mr-2"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-400 mb-3">No resume uploaded</p>
                        <label className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer">
                          Upload Resume
                          <input 
                            type="file" 
                            className="hidden" 
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-400">Skills</label>
                    {isEditingSkills ? (
                      <button 
                        onClick={saveSkills}
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button 
                        onClick={toggleSkillsEdit}
                        className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 min-h-16">
                    {isEditingSkills ? (
                      <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.skills.map(skill => (
                            <div key={skill} className="flex items-center bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-xs">
                              {skill}
                              <button 
                                onClick={() => handleSkillRemove(skill)}
                                className="ml-1 text-gray-300 hover:text-white"
                              >
                                <FiTrash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Add new skill"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                          />
                          <button
                            onClick={handleSkillAdd}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map(skill => (
                          <span key={skill} className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;