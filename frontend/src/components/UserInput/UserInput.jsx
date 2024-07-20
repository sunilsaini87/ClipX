import InputSection from "./InputSection";
import ResultSection from "../ResultSection/ResultSection";
import Loader from "../UI/Loader";
import { useState } from "react";
import Error from "../UI/Error";

const UserInput = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoader, setLoader] = useState(false);
  const [isServerOk, setServerOk] = useState(true);
  const [urlResult, setUrlResult] = useState({
    thumb: [],
    urls: [],
    title: [],
  });

  const apiEndpoints = {
    yt: "http://localhost:3000/api/v1/yt",
    tw: "http://localhost:3000/api/v1/tw",
    fb: "http://localhost:3000/api/v1/fb",
    ig: "http://localhost:3000/api/v1/ig",
  };

  const userInputHandler = async (url, type) => {
    setUrlResult({
      thumb: [],
      urls: [],
      title: [],
    });

    if (type === "error") {
      setServerOk(false);
      setErrorMessage(url);
      return;
    }

    const apiUrl = apiEndpoints[type];
    if (!apiUrl) {
      setServerOk(false);
      setErrorMessage("Invalid URL type.");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls: url }),
    };

    setLoader(true);
    setServerOk(true);
    try {
      const response = await fetch(apiUrl, options);
      const result = await response.json();
      setLoader(false);

      if (result.status === "fail") {
        setServerOk(false);
        setErrorMessage(result.error);
      } else {
        setServerOk(true);
        setUrlResult(result);
      }
    } catch (err) {
      setLoader(false);
      setServerOk(false);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="relative mx-auto mt-12 mb-0 max-w-4xl md:max-w-3xl sm:max-w-xl xs:max-w-xs">
      <InputSection userUrls={userInputHandler} />
      {isLoader && <Loader />}
      {urlResult.urls.length > 0 && isServerOk && (
        <ResultSection result={urlResult} />
      )}
      {!isServerOk && <Error error={errorMessage} />}
    </div>
  );
};

export default UserInput;
