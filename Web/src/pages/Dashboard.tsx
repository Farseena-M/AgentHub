import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaUserPlus, FaUpload, FaTasks } from 'react-icons/fa';
import Image from '../assets/download.png';
import { useState, useRef } from 'react';
import { axiosInstance } from '../axios/axiosInstance';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const Nvgt = useNavigate();

    const Logout = () => {
        localStorage.removeItem('token');
        Nvgt('/');
        toast.success(`Logout Success`)
    };

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        setLoading(true);
        setSuccess('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post('/agent/distribute', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('File uploaded successfully');
            setFile(null);
            Nvgt('/view-agents-tasks', { state: { agentsData: response.data.data } });
            toast.success(`File Uploaded Successfull`)
        } catch (err) {
            toast.error('Error uploading file');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    return (
        <div className="min-h-screen p-8 text-white relative flex flex-col items-center justify-center bg-gradient-to-r from-teal-600 to-teal-900">
            <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${Image})` }} />
            <FiLogOut className="text-2xl absolute top-4 right-4 text-white c hover:text-teal-300 transition duration-300 cursor-pointer" onClick={Logout} title='Logout' />

            <div className="w-full md:w-2/3 text-center relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-5xl font-bold tracking-wide font-serif text-white mb-4">AgentHub</h1>
                </div>

                <p className="text-lg text-gray-100 mt-2 mb-8">Manage agents, files, and settings with ease.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <FaUserPlus className="text-4xl text-teal-700 mx-auto" />
                        <h2 className="text-2xl font-semibold text-teal-700 mt-4">Add Agent</h2>
                        <p className="text-gray-600 mt-2 mb-4">Easily add new agents to the system.</p>
                        <Link to="/add-agent">
                            <button className="mt-4 bg-teal-700 text-white px-5 py-3 rounded-lg hover:bg-teal-800 transition duration-300">
                                Add New Agent
                            </button>
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <FaUpload className="text-4xl text-teal-700 mx-auto cursor-pointer" onClick={handleFileUploadClick}
                        />
                        <h2 className="text-2xl font-semibold text-teal-700 mt-4">Upload Files</h2>
                        <p className="text-gray-600 mt-2 mb-4">Upload agent-related files for management.</p>
                        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col">
                            <button
                                className="mt-4 bg-teal-700 text-white px-5 py-3 rounded-lg hover:bg-teal-800 transition duration-300"
                            >
                                Upload New File
                            </button>
                            {loading ? 'Uploading...' : 'Upload File'}
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileChange}
                                accept=".csv, .xlsx, .xls"
                                className="hidden"
                            />
                            {success && <p className="text-green-500">{success}</p>}
                        </form>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <FaTasks className="text-4xl text-teal-700 mx-auto" />
                        <h2 className="text-2xl font-semibold text-teal-700 mt-4">View Agents & Tasks</h2>
                        <p className="text-gray-600 mt-2 mb-4">Monitor agent progress and tasks efficiently.</p>
                        <Link to="/view-agents-tasks">
                            <button className="mt-4 bg-teal-700 text-white px-5 py-3 rounded-lg hover:bg-teal-800 transition duration-300">
                                View Agents & Tasks
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
