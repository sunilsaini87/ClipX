const IndexMessage = () => {
  return (
    <div className="w-4/5 text-center p-4 relative my-20 mx-auto sm:w-4/5 md:w-9/10 lg:w-full xl:w-3/4 2xl:w-2/3">
      <h1 className="text-5xl text-gray-100">
        <span className="font-extrabold text-gray-200">ClipX </span>
        <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#4b6cb7] to-[#182848]">
          Video{" "}
        </span>
        Down
        <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#6a82fb] to-[#fc5c7d]">
          loader
        </span>
      </h1>
      <p className="text-gray-400 text-xs mt-4 mb-4 mx-auto capitalize w-3/5 leading-9 font-semibold sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-2/3">
        Discover the ultimate solution for effortless video downloads from
        popular platforms like YouTube, Facebook, Instagram, and X.
      </p>
      <img
        className="absolute w-14 h-14 top-[-10%] right-[1%] filter drop-shadow-lg"
        width="144"
        height="144"
        src="https://img.icons8.com/fluency/144/youtube-play.png"
        alt="youtube-play"
      />
      <img
        className="absolute w-14 h-14 bottom-[1%] right-[3%] filter drop-shadow-lg"
        width="144"
        height="144"
        src="https://img.icons8.com/fluency/144/facebook-new.png"
        alt="facebook-new"
      />
      <img
        className="absolute w-14 h-14 bottom-[5%] left-[1%] filter drop-shadow-lg"
        width="144"
        height="144"
        src="https://img.icons8.com/fluency/144/instagram-new.png"
        alt="instagram-new"
      />
      <img
        className="absolute w-14 bg-slate-400 h-14 top-[95%] left-[15%] filter drop-shadow-lg"
        width="144"
        height="144"
        src="/x.png"
        alt="x"
      />
    </div>
  );
};

export default IndexMessage;
