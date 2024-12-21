import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, MapPin, Camera } from 'lucide-react';
import { AsyncPaginate } from 'react-select-async-paginate';

// Mock initial user data
const initialUserData = {
  username: 'quizmaster123',
  email: 'quizmaster@example.com',
  avatar: '/placeholder.svg?height=100&width=100',
  birthdate: '1990-01-01',
  city: null,
  bio: 'Passionate about creating and taking quizzes!',
};

// City search function (replace with actual API call in a real application)
const loadCityOptions = async (inputValue) => {
  // This is a mock function. In a real app, you'd call an API here.
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return {
    options: [
      { value: 'new-york', label: 'New York, USA' },
      { value: 'london', label: 'London, UK' },
      { value: 'paris', label: 'Paris, France' },
      { value: 'tokyo', label: 'Tokyo, Japan' },
      { value: 'sydney', label: 'Sydney, Australia' },
    ].filter(city => city.label.toLowerCase().includes(inputValue.toLowerCase())),
    hasMore: false,
  };
};

function UpdateProfilePage() {
  const [userData, setUserData] = useState(initialUserData);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCityChange = (selectedOption) => {
    setUserData(prevData => ({ ...prevData, city: selectedOption }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prevData => ({ ...prevData, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user data:', userData);
    navigate('/profile');
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
              <label htmlFor="avatar-upload" className="cursor-pointer bg-purple-100 text-purple-600 py-2 px-4 rounded-full hover:bg-purple-200 transition duration-200">
                <Camera className="w-4 h-4 inline-block mr-2" />
                Change Avatar
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
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
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleInputChange}
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3 z-10" />
              <AsyncPaginate
                value={userData.city}
                loadOptions={loadCityOptions}
                onChange={handleCityChange}
                placeholder="Search for a city..."
                additional={{
                  page: 1,
                }}
                classNames={{
                  control: (state) => 'pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300',
                }}
              />
            </div>
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

