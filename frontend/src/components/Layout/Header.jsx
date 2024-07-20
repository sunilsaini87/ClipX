const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-6 py-4 sm:px-8 h-20 relative bg-slate-900">
      <a
        href="/"
        className="no-underline text-header-logo-color cursor-pointer"
      >
        <h2 className="font-extrabold text-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff512f] to-[#dd2476]">
            ClipX
          </span>
        </h2>
      </a>
    </header>
  );
};

export default Header;
