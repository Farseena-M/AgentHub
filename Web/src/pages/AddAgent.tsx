import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axios/axiosInstance';
import { toast } from 'react-toastify';

const AddAgent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const Nvgt = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axiosInstance.post('/user/create-agent', { name, email, mobileNumber, password });
            setName('');
            setEmail('');
            setMobileNumber('');
            setPassword('');
            toast.success(`Agent added successfull`)
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 text-white relative flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 to-teal-800">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full sm:w-96 md:w-1/2 lg:w-1/3 relative">
                <button
                    onClick={() => Nvgt('/dashboard')}
                    className="absolute top-4 right-4 text-teal-600 text-xl hover:text-teal-800 transition duration-300"
                    title='Back To Dashboard'
                >
                    <FaArrowLeft className="inline-block mr-2" />
                </button>

                <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6 font-serif">Add Agent</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none text-black"
                            placeholder="Enter agent name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none text-black"
                            placeholder="Enter agent email"
                        />
                    </div>
                    <label className="block text-gray-700 font-medium mb-2 text-center">Mobile Number</label>

                    <div className="mb-4 flex justify-center">
                        <div className="w-full max-w-xs">
                            <PhoneInput
                                country={'us'}
                                value={mobileNumber}
                                onChange={setMobileNumber}
                                inputClass="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none text-black"
                                buttonClass="focus:outline-none"
                                containerClass="w-full"
                                dropdownClass="text-black"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none text-black"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Adding agent...' : 'Add Agent'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAgent;
