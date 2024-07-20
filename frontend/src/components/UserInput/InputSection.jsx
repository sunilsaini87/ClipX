/* eslint-disable react/prop-types */
import { useState } from "react";
import urlDarkIcon from "/icons8-url-48-dark.png";

const InputSection = (props) => {
  const [userInput, setUserInput] = useState("");
  const [isInputValid, setInputValid] = useState(true);

  const userInputHandler = (e) => {
    setInputValid(true);
    setUserInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const pattern = /^(https:\/\/|http:\/\/)/;
    if (pattern.test(userInput)) {
      setInputValid(true);
      let type;

      if (userInput.includes("youtu")) {
        type = "yt";
      }
      if (userInput.includes("x.com") || userInput.includes("twitter.com")) {
        type = "tw";
      }

      if (userInput.includes("fb") || userInput.includes("facebook")) {
        type = "fb";
      }

      if (userInput.includes("instagram")) {
        type = "ig";
      }

      props.userUrls(userInput, type);
      setUserInput("");
    } else {
      setUserInput("");
      props.userUrls("Please enter a valid URL.", "error");
      setInputValid(false);
    }
  };

  return (
    <form
      method="POST"
      onSubmit={submitHandler}
      className="relative flex items-center mb-36 p-4 bg-gray-900 shadow-lg rounded-lg"
    >
      <img
        className="absolute top-4 left-4 w-10 h-10"
        src={urlDarkIcon}
        alt="url icon"
      />
      <input
        className={`w-full h-14 pl-12 pr-4 rounded-md border border-gray-700 bg-gray-800 text-white shadow-md placeholder-gray-400 ${
          !isInputValid ? "border-red-500" : ""
        }`}
        type="text"
        name="search"
        placeholder="Paste Link Here"
        onChange={userInputHandler}
        value={userInput || ""}
        required
        aria-required="true"
      />
      <button
        className="absolute top-4 right-4 h-12 text-base font-bold px-4 py-2 border-0 rounded-md bg-blue-950 text-white cursor-pointer hover:bg-blue-900"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default InputSection;
