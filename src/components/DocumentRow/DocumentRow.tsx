import { FiFileText, FiCheckCircle, FiXCircle } from "react-icons/fi";

const DocumentRow = ({ name, status, date }: any) => {
  const statusColor =
    status === "Signed"
      ? "text-green-400"
      : status === "Pending"
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <tr className="border-b border-blue-900/40">
      <td className="py-3">{name}</td>
      <td className={`py-3 font-semibold ${statusColor}`}>{status}</td>
      <td className="py-3">{date}</td>
      <td className="py-3 flex gap-3 text-blue-400">
        <FiFileText className="cursor-pointer hover:text-blue-300" />
        <FiCheckCircle className="cursor-pointer hover:text-blue-300" />
        <FiXCircle className="cursor-pointer hover:text-blue-300" />
      </td>
    </tr>
  );
};

export default DocumentRow;
