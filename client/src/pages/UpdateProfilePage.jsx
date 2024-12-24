import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Camera, Lock ,Loader} from 'lucide-react';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/AuthContext';

function UpdateProfilePage() {

  const {currentUser,updateUser}= useContext(AuthContext)
  const initialUserData = {
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    bio:currentUser.bio,
  };


  const [userData, setUserData] = useState(initialUserData);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const cloudName = 'dffzh8blg'
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'QuizCraft'); // Replace with your Cloudinary upload preset
      formData.append('cloud_name',cloudName)

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data.url)
        setUserData(prevData => ({ ...prevData, avatar: data.url }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }finally{
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    try {
      const updatedData = { ...userData };
      if (password) {
        updatedData.password = password;
      }
      
      const response = await apiRequest.put('/user/profile/update', updatedData);   
      updateUser(response.data)  
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mt-14 mx-auto px-4 py-8 h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 pt-0">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-800">Update Profile</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex items-center justify-center">
            <div className="text-center">
              <img
                src={userData.avatar}
                alt={userData.username}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-200"
              />
              {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red bg-opacity-50 rounded-full">
                    <Loader className="w-2 h-8 text-white animate-spin" />
                  </div>
                )
              }
              <label htmlFor="avatar-upload" className="cursor-pointer bg-purple-100 text-purple-600 py-2 px-4 rounded-full hover:bg-purple-200 transition duration-200">
                {isUploading ? (
                  <Loader className="w-4 h-4 inline-block mr-2 animate-spin" />
                  ) : (
                  <Camera className="w-4 h-4 inline-block mr-2" />)
                }
                {isUploading ? 'Uploading...' : 'Change Avatar'}
              </label>
              <input
                id="avatar-upload"
                type="file"
                // accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
                disabled={isUploading}
              />
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            ></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfilePage;

