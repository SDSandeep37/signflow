import {
  FiCheckCircle,
  FiFileText,
  FiMoreVertical,
  FiXCircle,
} from "react-icons/fi";
import UploadModel from "../UploadModel/UploadModel";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

const statusStyles: Record<string, string> = {
  PENDING: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  SIGNED: "border-green-400/30 bg-green-400/10 text-green-300",
  REJECTED: "border-red-400/30 bg-red-400/10 text-red-300",
};

interface Documents {
  id: string;
  title: string;
  owner_name: string;
  status: string;
  updated_at: string;
}

const ResponisveTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState<Documents[]>([]);
  const { user } = useContext(UserAuthContext)!;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuments();
  }, [user]);

  const getDocuments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/document/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (!response.ok) {
        const res = await response.json();
        console.log(res.message);
        setDocuments([]);
      }
      const docs = await response.json();
      if (response.ok && docs.success === true) {
        setDocuments(docs.documents);
      }
    } catch (error) {
      console.log("Error while fetching the documents", error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-bold font-stretch-50% text-shadow-white">
          Please wait loading documents....
        </p>
      </div>
    );
  }
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };
  if (!user) {
    return (
      <div className="text-center mt-20 text-2xl flex flex-col items-center gap-4">
        Please log in to access the dashboard.
        <Link to="/login" className="text-blue-400 hover:underline ml-2">
          Go to Login
        </Link>
      </div>
    );
  }
  return (
    <>
      <section className="w-full rounded-xl border border-blue-900/40 bg-black/60 p-4 text-white shadow-2xl shadow-black/20 backdrop-blur-lg sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Your Documents</h2>
            <p className="mt-1 text-sm text-gray-400">
              Track signatures, owners, and latest document activity.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 sm:w-auto"
          >
            <FiFileText className="text-lg" />
            Upload Document
          </button>
        </div>

        <div className="hidden overflow-hidden rounded-lg border border-blue-900/40 md:block">
          <table className="w-full table-fixed text-left text-sm text-gray-300">
            <thead className="bg-blue-950/40 text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Document</th>
                <th className="px-5 py-3 font-semibold">Owner</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Updated</th>
                <th className="w-32 px-5 py-3 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/40">
              {documents.map((document) => (
                <tr key={document.id} className="transition hover:bg-white/5">
                  <td className="px-5 py-4 font-medium text-white">
                    {document.title}
                  </td>
                  <td className="px-5 py-4">{document.owner_name}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                        statusStyles[document.status]
                      }`}
                    >
                      {document.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {formatDate(document.updated_at)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/dashboard/documents/${document.id}`}>
                        <button
                          className="rounded-md p-2 text-blue-300 transition hover:bg-blue-500/10 hover:text-blue-200"
                          aria-label={`View ${document.title}`}
                        >
                          <FiFileText />
                        </button>
                      </Link>
                      <button
                        className="rounded-md p-2 text-green-300 transition hover:bg-green-500/10 hover:text-green-200"
                        aria-label={`Approve ${document.title}`}
                      >
                        <FiCheckCircle />
                      </button>
                      <button
                        className="rounded-md p-2 text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                        aria-label={`Reject ${document.title}`}
                      >
                        <FiXCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {documents.map((document) => (
            <article
              key={document.id}
              className="rounded-lg border border-blue-900/40 bg-white/3 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-white">
                    {document.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {document.owner_name}
                  </p>
                </div>
                <button
                  className="shrink-0 rounded-md p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                  aria-label={`Open actions for ${document.title}`}
                >
                  <FiMoreVertical />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                    statusStyles[document.status]
                  }`}
                >
                  {document.status}
                </span>
                <span className="text-sm text-gray-400">
                  {formatDate(document.updated_at)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Link to={`/dashboard/documents/${document.id}`}>
                  <button className="inline-flex items-center justify-center rounded-lg border border-blue-400/30 px-3 py-2 text-blue-300 transition hover:bg-blue-500/10">
                    <FiFileText />
                  </button>
                </Link>
                <button className="inline-flex items-center justify-center rounded-lg border border-green-400/30 px-3 py-2 text-green-300 transition hover:bg-green-500/10">
                  <FiCheckCircle />
                </button>
                <button className="inline-flex items-center justify-center rounded-lg border border-red-400/30 px-3 py-2 text-red-300 transition hover:bg-red-500/10">
                  <FiXCircle />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <UploadModel isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ResponisveTable;
