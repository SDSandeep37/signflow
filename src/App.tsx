import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Banner from "./components/Banner/Banner";
import Features from "./components/Features/Features";
const App = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Features />
    </>
  );
};

export default App;
// const App = () => {
//   return (
//     <div className="bg-fuchsia-500">
//       <ul className="flex flex-col items-center justify-center h-screen text-white text-4xl font-bold">
//         <li>Every signature tells a story — securely</li>
//         <li>Secure digital signing made effortless.</li>
//       </ul>
//     </div>
//   );
// };

// export default App;
