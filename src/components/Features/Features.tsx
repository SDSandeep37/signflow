import { FiCheckSquare, FiEdit3, FiFileText, FiUpload } from "react-icons/fi";

const features = [
  {
    title: "Upload Document",
    icon: FiUpload,
  },
  {
    title: "Place Signatures",
    icon: FiEdit3,
  },
  {
    title: "Signed & Complete",
    icon: FiCheckSquare,
  },
  {
    title: "Audit Trail",
    icon: FiFileText,
  },
];

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-[#040b18] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.98)_0%,rgba(5,13,30,0.84)_48%,rgba(3,8,18,0.98)_100%)]" />
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-4 bg-linear-to-r from-transparent via-[#78b7ff]/70 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {features.map(({ title, icon: Icon }) => (
          <div
            key={title}
            className="relative flex flex-col items-center text-center"
          >
            <div className="absolute top-6.5 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(112,183,255,0.95),0_0_22px_8px_rgba(42,111,255,0.5)]" />

            <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-1 rounded-full bg-[#2f7eff]/20 blur-lg" />
              <Icon className="relative h-12 w-12 text-[#dce8ff] drop-shadow-[0_0_10px_rgba(89,159,255,0.9)]" />
            </div>

            <h2 className="text-base font-bold tracking-normal text-white sm:text-lg">
              {title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
