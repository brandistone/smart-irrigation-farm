import React, { useState } from 'react';
import axios from 'axios';
import Api from '../Api'

const BASE_URL = "http://192.168.1.103:8000"

const UserProfile = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          // Adjust the URL to match your backend server
          console.log(formData)
          const res = await Api.post(BASE_URL +'/api/profile/create/', formData);
          
          // Success handling
          alert('Profile submitted successfully!');
          
          // Reset form
          setFormData({
              username: '',
              email: ''
          });
      } catch (error: any) {
          console.error('Submission error:', error);
          
          const errorMessage = 
              error.response?.data?.message || 
              error.message || 
              'Unable to submit profile. Please try again.';
          
          setError(errorMessage);
      }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Create Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-lg font-semibold text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
                    Submit
                </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default UserProfile;
