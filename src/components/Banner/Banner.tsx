const Banner = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[url('/background.png')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(64,139,255,0.18),transparent_32%),linear-gradient(90deg,rgba(1,8,20,0.94)_0%,rgba(3,12,30,0.72)_43%,rgba(1,8,20,0.2)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 pb-12 pt-28 md:px-10 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-4 lg:pt-20">
        <div className="w-full max-w-xl text-center lg:-mt-4 lg:text-left">
          <img
            src="/logo.png"
            alt="SignFlow"
            className="mx-auto mb-7 w-60 max-w-full sm:w-72 lg:mx-0 lg:w-80"
          />

          <h1 className="text-4xl font-bold leading-tight tracking-normal text-white sm:text-5xl lg:text-[3.35rem]">
            Secure Digital Signing
            <span className="mt-1 block font-normal">
              Made{" "}
              <span className="font-medium text-[#5fa1ff]">Effortless.</span>
            </span>
          </h1>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button className="h-12 w-full rounded-md bg-linear-to-r from-[#70c8ff] to-[#345cff] px-8 text-base font-bold text-white shadow-[0_0_22px_rgba(66,139,255,0.58)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(92,168,255,0.72)] sm:w-44">
              Get Started
            </button>
            <button className="h-12 w-full rounded-md border border-white/25 bg-[#071229]/55 px-8 text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition duration-300 hover:border-[#6ca8ff] hover:bg-[#0c1f42]/80 sm:w-44">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative flex w-full items-center justify-center lg:justify-end">
          <div className="absolute inset-x-6 bottom-2 h-16 rounded-full blur-3xl lg:inset-x-16" />
          <img
            src="/banner.png"
            alt="Document signing dashboard preview"
            className="relative w-full max-w-xl object-cover drop-shadow-[0_34px_55px_rgba(45,121,255,0.24)] sm:max-w-2xl lg:max-w-180 xl:max-w-195"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
