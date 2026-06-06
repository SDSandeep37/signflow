const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-6xl font-bold text-[gostwhite]">404</h1>
      <p className="text-2xl text-[gostwhite]">Page Not Found</p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        <a href="/">Go Home</a>
      </button>
    </div>
  );
};

export default NotFound;
