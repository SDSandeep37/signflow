import { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { BiSolidCheckShield } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const UploadModel = ({ isOpen, onClose }: any) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const timer = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessageType("error");
      setMessage("Please select a PDF document to process the upload.");
      timer();
      return;
    }
    if (!title) {
      setMessageType("error");
      setMessage("Please write a meaning full title for this document");
      timer();
      return;
    }

    try {
      setMessageType("");
      setMessage("Please wait...");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("document", selectedFile);

      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/document/upload`,
        {
          method: "POST",
          body: formData,
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
      setMessage(result.message);
      onClose();

      //redirect user to the document view page
      const document = result.document;
      const id = document.id;
      navigate(`/dashboard/documents/${id}`);
    } catch (error) {
      console.error("Error uploading document:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    } finally {
      timer();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-[#0a0f1f] border border-blue-500/40 rounded-xl shadow-2xl w-full max-w-lg p-8 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition"
        >
          <FiX size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="SignFlow Logo" className="h-20 mb-2" />
          <h2 className="text-2xl font-bold">Upload a Document</h2>
          <p className="text-gray-400 text-sm mt-1">
            Enter a title and upload your file
          </p>
        </div>

        {/* Title Field */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter document title"
          className="w-full mb-4 rounded-lg border border-gray-700 bg-black/40 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
        />

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-10 text-center transition cursor-pointer ${
            dragActive ? "border-blue-400 bg-blue-900/20" : "border-blue-500/40"
          }`}
        >
          <FiUploadCloud className="mx-auto text-blue-400 text-5xl mb-3" />
          {selectedFile ? (
            <>
              <p className="text-gray-300 font-semibold">{selectedFile.name}</p>
              <p className="text-gray-500 text-sm mt-1">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-300">Drop your files here</p>
              <p className="text-gray-500 text-sm mt-1">PDF</p>
            </>
          )}
        </div>

        {/* File Input */}
        <div className="flex items-center my-6">
          <div className="grow border-t border-gray-700"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="grow border-t border-gray-700"></div>
        </div>

        <label className="w-full">
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf"
            // accept=".pdf,.docx,.png,.jpg,.jpeg"
          />
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg text-center transition cursor-pointer">
            Browse Files
          </div>
        </label>
        {message && (
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
              maxWidth: "90%",
              padding: "5px 0px",
              margin: "auto",
            }}
            className={
              messageType === "success" ? "text-green-500" : "text-red-500"
            }
          >
            {message}
          </p>
        )}
        {/* Footer */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <div className="flex items-center gap-2 text-green-400">
            <BiSolidCheckShield />
            Secure & Encrypted Uploads
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="cursor-pointer px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="cursor-pointer px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModel;
