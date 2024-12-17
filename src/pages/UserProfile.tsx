import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import Api from '../Api';

const BASE_URL = "http://192.168.0.104:8000";

const UserProfile = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        //confirm_password: '',
        phonenumber: '',
        email: '',
        county: '',
    });

    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileCreated, setProfileCreated] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (profileCreated) {
          // Do something, like show a success message or trigger a navigation
          console.log('Profile created successfully');
        }
      }, [profileCreated]);
      

    useEffect(() => {
        const storedStatus = localStorage.getItem('profileCreated');
        if (storedStatus === 'true') {
            setProfileCreated(true);
        }
    }, []);

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
            console.log(formData);
            const res = await Api.post(BASE_URL + '/api/create/profile/', formData);

            setProfileCreated(true);

            localStorage.setItem('profileCreated', 'true');

            // Open the modal on successful profile creation
            setIsModalOpen(true);

            // Reset form fields
            setFormData({
                fullname: '',
                username: '',
                password: '',
                //confirm_password: '',
                phonenumber: '',
                email: '',
                county: '',
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
                {/* Full Name */}
                <div className="mb-4">
                    <label htmlFor="fullname" className="block text-lg font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Username */}
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

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Confirm Password 
                <div className="mb-4">
                    <label htmlFor="confirm_password" className="block text-lg font-semibold text-gray-700 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                */}

                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="phonenumber" className="block text-lg font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Email */}
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                        <h3 className="text-xl font-bold text-center text-gray-800">Profile Created Successfully!</h3>
                        <p className="text-gray-600 mt-2 text-center">You can now update your profile or return to the homepage.</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    console.log("Update Profile logic here");
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Update Profile
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/'); // Navigate to /home
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Go Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
