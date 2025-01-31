import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const Nvgt = useNavigate();
    const baseURL = import.meta.env.VITE_API_URL

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${baseURL}/user/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            Nvgt('/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-teal-50">
            <div className="bg-white shadow-xl rounded-lg p-8 w-[450px] border border-teal-200">
                <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6 flex items-center border-b border-teal-300 focus-within:border-teal-600">
                        <FiMail className="text-teal-600 mr-4 text-xl" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 text-gray-600 focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6 flex items-center border-b border-teal-300 focus-within:border-teal-600">
                        <FiLock className="text-teal-600 mr-4 text-xl" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 text-gray-600 focus:outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
