import { useState, type SubmitEvent } from "react";
import SelectBox from "../SelectBox/SelectBox";

interface SearchBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBox = ({ isOpen, onClose }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // select box related state
  const [showSelectBox, setShowSelectBox] = useState(false);

  if (!isOpen) return null;

  const timer = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") {
      setMessageType("error");
      setMessage("Please enter an email for search");
      timer();
    }
    handleApiCall();
  };
  const handleApiCall = async () => {
    try {
      setMessageType("");
      setMessage("Please wait...");
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/user/search?email=${query}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const result = await response.json();
      if (!result.success) {
        setMessageType("error");
        setMessage(result.message);
        return;
      }
      setMessageType("success");
      setMessage("Check below for signer list");
      setSearchResult(result.users);
      setShowSelectBox(true);
    } catch (error) {
      console.error("Search failed:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    } finally {
      timer();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-300"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">
          Search signer by their email
        </h2>

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter email for search"
            className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white 
                       border border-gray-700 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-500 text-white 
                       hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
        {message && (
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
              maxWidth: "300px",
              padding: "5px 0px",
            }}
            className={
              messageType === "success" ? "text-green-500" : "text-red-500"
            }
          >
            {message}
          </p>
        )}
        <SelectBox searchResult={searchResult} isOpen={showSelectBox} />
      </div>
    </div>
  );
};

export default SearchBox;
