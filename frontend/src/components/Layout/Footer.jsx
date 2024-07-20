import gitLogo from "/github.png";
import emailLogo from "/email.png";
import discordLogo from "/discord.png";
import twitterLogo from "/x.png";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-slate-900 flex flex-col items-center mt-auto">
      <a
        href="https://github.com/sunilsaini87"
        className="flex items-center gap-2.5 text-white mb-4"
      >
        <img src={gitLogo} alt="GitHub" className="w-8 h-8 rounded-full" />
        <span className="text-lg font-medium">Sunil Kumar Saini</span>
      </a>
      <div className="flex gap-5 ">
        <a
          href="mailto:your-email@example.com"
          className="flex items-center gap-2.5 text-white bg-slate-400"
        >
          <img src={emailLogo} alt="Email" className="w-8 h-8 rounded-full" />
        </a>
        <a
          href="https://discord.com/invite/your-discord-invite"
          className="flex items-center gap-2.5 text-white bg-slate-400"
        >
          <img
            src={discordLogo}
            alt="Discord"
            className="w-8 h-8 rounded-full"
          />
        </a>
        <a
          href="https://twitter.com/your-twitter-handle"
          className="flex items-center gap-2.5 text-white bg-slate-400"
        >
          <img
            src={twitterLogo}
            alt="Twitter"
            className="w-8 h-8 rounded-full"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
