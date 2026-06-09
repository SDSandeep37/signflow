import { FiCheckCircle, FiFileText, FiMoreVertical, FiXCircle } from "react-icons/fi";

const documents = [
  {
    id: 1,
    name: "NDA Agreement",
    owner: "Aarav Mehta",
    status: "Pending",
    updated: "Today, 10:45 AM",
  },
  {
    id: 2,
    name: "Sales Contract",
    owner: "Priya Shah",
    status: "Signed",
    updated: "Yesterday, 3:15 PM",
  },
  {
    id: 3,
    name: "Partnership Agreement",
    owner: "Karan Patel",
    status: "Rejected",
    updated: "Mar 22, 2026",
  },
  {
    id: 4,
    name: "Employment Offer",
    owner: "Neha Rao",
    status: "Signed",
    updated: "Mar 18, 2026",
  },
];

const statusStyles: Record<string, string> = {
  Pending: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  Signed: "border-green-400/30 bg-green-400/10 text-green-300",
  Rejected: "border-red-400/30 bg-red-400/10 text-red-300",
};

const ResponisveTable = () => {
  return (
    <section className="w-full rounded-xl border border-blue-900/40 bg-black/60 p-4 text-white shadow-2xl shadow-black/20 backdrop-blur-lg sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Documents</h2>
          <p className="mt-1 text-sm text-gray-400">
            Track signatures, owners, and latest document activity.
          </p>
        </div>

        <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 sm:w-auto">
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
              <th className="w-32 px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-900/40">
            {documents.map((document) => (
              <tr key={document.id} className="transition hover:bg-white/5">
                <td className="px-5 py-4 font-medium text-white">{document.name}</td>
                <td className="px-5 py-4">{document.owner}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusStyles[document.status]
                    }`}
                  >
                    {document.status}
                  </span>
                </td>
                <td className="px-5 py-4">{document.updated}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="rounded-md p-2 text-blue-300 transition hover:bg-blue-500/10 hover:text-blue-200"
                      aria-label={`View ${document.name}`}
                    >
                      <FiFileText />
                    </button>
                    <button
                      className="rounded-md p-2 text-green-300 transition hover:bg-green-500/10 hover:text-green-200"
                      aria-label={`Approve ${document.name}`}
                    >
                      <FiCheckCircle />
                    </button>
                    <button
                      className="rounded-md p-2 text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                      aria-label={`Reject ${document.name}`}
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
            className="rounded-lg border border-blue-900/40 bg-white/[0.03] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-white">{document.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{document.owner}</p>
              </div>
              <button
                className="shrink-0 rounded-md p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                aria-label={`Open actions for ${document.name}`}
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
              <span className="text-sm text-gray-400">{document.updated}</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <button className="inline-flex items-center justify-center rounded-lg border border-blue-400/30 px-3 py-2 text-blue-300 transition hover:bg-blue-500/10">
                <FiFileText />
              </button>
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
  );
};

export default ResponisveTable;
