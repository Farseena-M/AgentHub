const App = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">Welcome to My App</h1>
        <p className="text-gray-600 text-center text-lg mb-6">
          This is a beautiful UI built with Tailwind CSS. Enjoy exploring the features!
        </p>
        <div className="flex justify-center">
          <button className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300 ease-in-out">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
