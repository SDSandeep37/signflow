import { useParams } from "react-router-dom";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useEffect, useRef, useState } from "react";
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

interface DocumentTypes {
  id: string;
  full_url: string;
  original_filename: string;
}

interface SignatureBox {
  id: number;
  page: number;
  xPercent: number;
  yPercent: number;
}

const DocumentViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [document, setDocument] = useState<DocumentTypes>({
    id: "",
    full_url: "",
    original_filename: "",
  });

  // Signature placement state
  const [signatures, setSignatures] = useState<SignatureBox[]>([]);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) getDocument();
  }, [id]);

  const getDocument = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/document/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      const docs = await response.json();

      if (response.ok && docs.success === true) {
        setDocument(docs.document);
      } else {
        console.error(docs.message || "Failed to fetch document");
        setDocument({ id: "", full_url: "", original_filename: "" });
      }
    } catch (error) {
      console.error("Error while fetching the document:", error);
      setDocument({ id: "", full_url: "", original_filename: "" });
    } finally {
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  // Add new signature box
  const handleAddSignature = (): void => {
    setSignatures((prev) => [
      ...prev,
      {
        id: Date.now(),
        page: pageNumber,
        xPercent: 50,
        yPercent: 20,
      },
    ]);
  };

  const saveSignatureFields = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/document/${id}/signature-fields`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            signatures,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Signature fields saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save signature fields");
    }
  };
  // Dragging logic
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (draggingId === null || !pdfContainerRef.current) return;

    const rect = pdfContainerRef.current.getBoundingClientRect();

    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setSignatures((prev) =>
      prev.map((sig) =>
        sig.id === draggingId
          ? {
              ...sig,
              xPercent,
              yPercent,
            }
          : sig,
      ),
    );
  };

  const handlePointerUp = (): void => {
    setDraggingId(null);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-bold text-white">Please wait, loading document...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-[#0a0f1f] to-[#000000] text-white flex flex-col">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-blue-900/40 bg-black/60 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="SignFlow Logo" className="w-8 h-8" />
          <h1 className="text-lg font-semibold">
            {document.original_filename}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={saveSignatureFields}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiSend /> Send for Signature
          </button>
          <button
            onClick={handleAddSignature}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiPenTool /> Add Signature
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <FiDownload /> Download
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg">
            <FiMoreVertical />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div
        className="flex flex-1 overflow-hidden relative"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* PDF Viewer */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto relative">
          {document.full_url ? (
            <div ref={pdfContainerRef} className="relative inline-block">
              <Document
                file={document.full_url}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer
                  renderAnnotationLayer
                />
              </Document>

              {signatures
                .filter((sig) => sig.page === pageNumber)
                .map((sig) => (
                  <div
                    key={sig.id}
                    className="absolute z-50 w-32 h-12 bg-blue-500/80 border border-blue-400 rounded-md flex items-center justify-center text-white cursor-move select-none shadow-lg"
                    style={{
                      left: `${sig.xPercent}%`,
                      top: `${sig.yPercent}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const target = e.target as HTMLElement;

                      if (target.closest("button")) return;
                      // (e.currentTarget as HTMLDivElement).setPointerCapture(
                      //   e.pointerId,
                      // );
                      setDraggingId(sig.id);
                    }}
                    onPointerUp={() => {
                      setDraggingId(null);
                    }}
                  >
                    Sign Here
                    <button
                      className="cursor-pointer absolute -top-2 -right-2 w-5 h-5 z-9999 rounded-full bg-red-500 text-xs"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("delete clicked");
                        setSignatures((prev) =>
                          prev.filter((s) => s.id !== sig.id),
                        );
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-red-400">No document found</p>
          )}

          {/* Toolbar */}
          <div className="flex items-center gap-4 mt-6 bg-black/60 backdrop-blur-lg px-6 py-3 rounded-lg border border-blue-900/40">
            <button
              onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Prev
            </button>
            <span className="text-gray-400">
              Page {pageNumber} / {numPages ?? 0}
            </span>
            <button
              onClick={() => {
                if (!numPages) return;
                setPageNumber((prev) => Math.min(prev + 1, numPages));
              }}
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Next
            </button>
            <button
              onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
              className="text-gray-300 hover:text-blue-400"
            >
              <FiZoomOut />
            </button>
            <button
              onClick={() => setScale((prev) => Math.min(3, prev + 0.1))}
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
