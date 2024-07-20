/* eslint-disable react/prop-types */
const Error = (props) => {
  return (
    <div className="w-full flex justify-center items-center p-8 rounded-lg border border-red-500 bg-red-100 shadow-lg text-red-700 text-sm uppercase">
      <h3>{props.error}</h3>
    </div>
  );
};

export default Error;
