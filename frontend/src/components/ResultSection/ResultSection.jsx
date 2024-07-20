/* eslint-disable react/prop-types */
const ResultSection = (props) => {
  const title = props.result.title.slice(0, 60) + " ....";
  const thumb = props.result.thumb;

  return (
    <div className="w-full border border-gray-300 rounded-lg bg-gray-500 my-4 p-4 text-center shadow-lg">
      <div className="border border-gray-300 w-[190px] h-[170px] flex justify-center items-center mx-auto rounded-sm">
        <img
          src={thumb}
          alt="thumb"
          className="w-[180px] h-[160px] rounded-sm opacity-90"
        />
      </div>
      <h3 className="my-4 text-gray-700 text-xl">{title}</h3>
      <div className="bg-gray-100 border border-gray-300 w-full rounded-sm">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className="py-4 text-xs uppercase">Quality</th>
              <th className="py-4 text-xs uppercase">Size</th>
              <th className="py-4 text-xs uppercase">Download</th>
            </tr>
          </thead>
          <tbody>
            {props.result.urls.map((url) => (
              <tr key={url.size}>
                <td className="py-3 text-sm">{url.quality}</td>
                <td className="py-3 text-sm">{url.size} MB</td>
                <td className="py-3 text-sm">
                  <a
                    href={url.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-pink-600 text-gray-100 py-2 px-4 rounded hover:bg-pink-700"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultSection;
