import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEnvelope, FaTasks, FaArrowLeft } from "react-icons/fa";
import { axiosInstance } from "../axios/axiosInstance";

const ViewAgentsTasks = () => {
    const Nvgt = useNavigate()
    const location = useLocation();
    const [agentsData, setAgentsData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<any>(null);

    const fetchAgentsData = async () => {
        try {
            const response = await axiosInstance.get('/agent/tasks');
            if (response.data && response.data.data) {
                setAgentsData(response.data.data);
            } else {
                console.error('Data format is incorrect');
            }
        } catch (error) {
            console.error('Error fetching agent tasks:', error);
        }
    };

    useEffect(() => {
        console.log("Received Location State:", location.state);
        fetchAgentsData();
    }, [location.state]);

    const handleTaskIconClick = (agent: any) => {
        setSelectedAgent(agent);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAgent(null);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 bg-teal-50">
            <button
                onClick={() => Nvgt('/dashboard')}
                className="absolute top-4 right-4 text-teal-600 text-xl hover:text-teal-800 transition duration-300"
                title='Back To Dashboard'
            >
                <FaArrowLeft className="inline-block mr-2" />
            </button>
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-3xl font-extrabold text-center text-teal-800 mb-8">
                    Agents & Their Tasks
                </h1>

                {agentsData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {agentsData.map((agent: any, index: number) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-xl transition-transform hover:scale-105 duration-300 ease-in-out hover:bg-teal-100">
                                <div className="flex items-center justify-center mb-4">
                                    <h2 className="text-2xl font-semibold text-teal-700 truncate w-full font-serif">{agent.name}</h2>
                                </div>
                                <div className="flex justify-center items-center mb-3">
                                    <FaEnvelope className="text-teal-500 mr-2" />
                                    <p className="text-teal-600">{agent.email}</p>
                                </div>

                                <div className="flex justify-center items-center">
                                    <h3
                                        className="text-xl text-teal-700 flex items-center cursor-pointer font-serif"
                                        onClick={() => handleTaskIconClick(agent)}>
                                        <FaTasks className="text-teal-500 mr-2" />
                                        View Tasks
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-teal-500 text-center mt-6">No data available</p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && selectedAgent && (
                <div className="fixed inset-0 bg-teal-700 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-semibold text-teal-700 mb-4 text-center font-serif">Tasks for {selectedAgent.name}</h2>

                        {selectedAgent.tasks && selectedAgent.tasks.length > 0 ? (
                            <div className="max-h-80 overflow-y-auto">
                                <ul className="space-y-4 text-center">
                                    {selectedAgent.tasks.map((task: any, index: number) => (
                                        <li key={index} className="p-4 bg-teal-50 rounded-md shadow-sm">
                                            <p className="text-teal-600 font-medium">
                                                Name: <span className="font-normal">{task.firstName}</span>
                                            </p>
                                            <p className="text-teal-600 font-medium">
                                                Notes: <span className="font-normal">{task.notes}</span>
                                            </p>
                                            <p className="text-teal-600 font-medium">
                                                Phone: <span className="font-normal">{task.phone}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-teal-500 text-center ">No tasks available</p>
                        )}

                        <button
                            onClick={closeModal}
                            className="mt-4 w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAgentsTasks;
