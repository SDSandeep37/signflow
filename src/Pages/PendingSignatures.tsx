import { useEffect, useState } from "react";
import { userPendingSignature } from "../utils/userPendingSignatures";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiFileText,
  FiMoreVertical,
  FiXCircle,
} from "react-icons/fi";
interface Documents {
  id: string;
  title: string;
  owner_name: string;
  original_filename: string;
  created_at: string;
}
const PendingSignatures = () => {
  const [pendingSignatures, setPendingSignatures] = useState<Documents[]>([]);

  useEffect(() => {
    async function getPendingSignatures() {
      const result = await userPendingSignature();
      setPendingSignatures(result);
    }
    getPendingSignatures();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <>
      <section className="w-full rounded-xl border border-blue-900/40 bg-black/60 p-4 text-white shadow-2xl shadow-black/20 backdrop-blur-lg sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Pending Signatures</h2>
            <p className="mt-1 text-sm text-gray-400">
              Pending documents for your signature
            </p>
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-lg border border-blue-900/40 md:block">
          <table className="w-full table-fixed text-left text-sm text-gray-300">
            <thead className="bg-blue-950/40 text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Document</th>
                <th className="px-5 py-3 font-semibold">Owner</th>
                <th className="px-5 py-3 font-semibold">File Name</th>
                <th className="px-5 py-3 font-semibold">Created</th>
                <th className="w-32 px-5 py-3 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/40">
              {pendingSignatures.length > 0 ? (
                pendingSignatures.map((document) => (
                  <tr key={document.id} className="transition hover:bg-white/5">
                    <td className="px-5 py-4 font-medium text-white">
                      {document.title}
                    </td>
                    <td className="px-5 py-4">{document.owner_name}</td>
                    <td className="px-5 py-4">{document.original_filename}</td>
                    <td className="px-5 py-4">
                      {formatDate(document.created_at)}
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="text-lg text-center p-1.5 text-white"
                    colSpan={5}
                  >
                    No document/s found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {pendingSignatures.map((document) => (
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
                <span>{document.original_filename}</span>
                <span className="text-sm text-gray-400">
                  {formatDate(document.created_at)}
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
    </>
  );
};

export default PendingSignatures;
