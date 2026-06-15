import { useState } from "react";

interface SearchResult {
  id: number;
  name: string;
  email: string;
}

interface SelectBoxProps {
  searchResult: SearchResult[];
  isOpen: boolean;
  // onSelect: (value: string) => void;
}

const SelectBox = ({ searchResult, isOpen }: SelectBoxProps) => {
  if (!isOpen) return null;
  const timer = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const documentId = localStorage.getItem("documentId");
  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmail = e.target.value;
    const selectedUser = searchResult.find((u) => u.email === selectedEmail);

    if (!selectedUser || !documentId) return;

    try {
      setMessageType("");
      setMessage("Adding Signer....");
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/document-signer/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentId,
            userId: selectedUser.id,
          }),
          credentials: "include",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message);
      }
      if (data.success) {
        setMessageType("success");
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error assigning signer:", error);
      setMessageType("error");
      setMessage("Something went wrong try again later.");
    } finally {
      timer();
    }
  };
  return (
    <div className="w-full max-w-md mt-4">
      <label
        htmlFor="searchSelect"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Select a document signer
      </label>
      <select
        id="searchSelect"
        onChange={handleSelect}
        // onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-gray-900 text-white 
                   border border-gray-700 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Choose Signer</option>
        {searchResult.length > 0 ? (
          searchResult.map((user) => (
            <option key={user.id} value={user.email}>
              {user.name} ({user.email})
            </option>
          ))
        ) : (
          <option>No signer with this email</option>
        )}
      </select>
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
    </div>
  );
};

export default SelectBox;
