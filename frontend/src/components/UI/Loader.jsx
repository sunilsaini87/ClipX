const Loader = () => {
  return (
    <div className="w-full p-1 rounded-xl text-gray-200 mt-4 flex items-center bg-gray-800 border border-gray-600 shadow-loader relative overflow-hidden">
      <span className="block h-2 bg-loader-progress rounded-lg animate-loader-fwd relative">
        <span className="absolute w-2 h-1 bg-loader-animated transform rotate-45 top-1 right-[-2px] animate-pulse1"></span>
        <span className="absolute w-2 h-1 bg-loader-animated transform rotate-[-45deg] top-[-4px] right-[-2px] animate-pulse2"></span>
      </span>
    </div>
  );
};

export default Loader;
