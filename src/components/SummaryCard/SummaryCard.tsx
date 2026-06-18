import { Link } from "react-router-dom";

const SummaryCard = ({ icon, label, count, color, link }: any) => {
  return (
    <div className="bg-black/60 backdrop-blur-lg border border-blue-900/40 rounded-xl p-6 flex items-center gap-4">
      <div className={`text-3xl ${color}`}>{icon}</div>
      <Link to={`/${link}`}>
        <div className="cursor-pointer">
          <p className="text-gray-400">{label}</p>
          <h3 className="text-2xl font-bold">{count}</h3>
        </div>
      </Link>
    </div>
  );
};

export default SummaryCard;
