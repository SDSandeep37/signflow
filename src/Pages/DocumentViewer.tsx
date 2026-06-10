import { useParams } from "react-router-dom";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FiSend,
  FiDownload,
  FiMoreVertical,
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiFileText,
  FiPenTool,
  FiClock,
} from "react-icons/fi";
import { CiStickyNote } from "react-icons/ci";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
console.log(pdfjs.GlobalWorkerOptions.workerSrc);
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url,
// ).toString();
const DocumentViewer = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const { id } = useParams();
  console.log(id);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-[#0a0f1f] to-[#000000] text-white flex flex-col">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-blue-900/40 bg-black/60 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="SignFlow Logo" className="w-8 h-8" />
          <h1 className="text-lg font-semibold">NDA Agreement.pdf</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2">
            <FiSend /> Send for Signature
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <FiFileText /> Add Fields
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <FiDownload /> Download
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg">
            <FiMoreVertical />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/background.png"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-300">John Doe</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* PDF Viewer */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto">
          <Document
            file="/gateSyllabus.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>

          {/* Toolbar */}
          <div className="flex items-center gap-4 mt-6 bg-black/60 backdrop-blur-lg px-6 py-3 rounded-lg border border-blue-900/40">
            <button
              onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Prev
            </button>
            <span className="text-gray-400">
              Page {pageNumber} / {numPages}
            </span>
            <button
              onClick={() =>
                setPageNumber(Math.min(pageNumber + 1, numPages ?? 1))
              }
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Next
            </button>
            <button
              onClick={() => setScale(scale - 0.1)}
              className="text-gray-300 hover:text-blue-400"
            >
              <FiZoomOut />
            </button>
            <button
              onClick={() => setScale(scale + 0.1)}
              className="text-gray-300 hover:text-blue-400"
            >
              <FiZoomIn />
            </button>
            <button
              onClick={() => setScale(1)}
              className="text-gray-300 hover:text-blue-400"
            >
              <FiMaximize />
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <aside className="w-72 bg-black/70 backdrop-blur-lg border-l border-blue-900/40 p-6">
          <h2 className="text-lg font-semibold mb-4">Document Options</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition">
              <FiClock /> Audit Trail
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition">
              <FiPenTool /> Add Signature
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition">
              <CiStickyNote /> Notes
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition">
              <FiFileText /> Version History
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DocumentViewer;
