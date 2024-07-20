import axios from "axios";
import "dotenv/config";
import aufs from "all-url-file-size";

export const startApi = (req, res, next) => {
  res.status(200).json({ message: "Welcome To ClipX Api" });
};

export const postYoutube = (req, res, next) => {
  const ytUrl = req.body.urls;
  let videoId = ytUrl.replace("https://www.youtube.com/watch?v=", "");
  videoId = videoId.replace("https://www.youtube.com/shorts/", "");
  videoId = videoId.replace("https://youtu.be/", "");
  videoId = videoId.replace("https://youtube.com/shorts/", "");
  videoId = videoId.replace("https://www.youtube.com/live/", "");
  videoId = videoId.slice(0, 11);
  console.log(videoId);
  const options = {
    method: "GET",
    url: "https://yt-api.p.rapidapi.com/dl",
    params: { id: videoId },
    headers: {
      "X-RapidAPI-Key": process.env.YT_API_KEY,
      "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
    },
  };

  try {
    axios
      .request(options)
      .then((response) => {
        const result = response.data;
        if (result.thumbnail) {
          let dataList = result.formats.map((obj) => {
            return {
              url: obj.url,
              quality: obj.qualityLabel,
              size: (
                (obj.bitrate * (+obj.approxDurationMs / 1000)) /
                (8 * 1024 * 1024)
              ).toFixed(1),
            };
          });

          res.status(200).json({
            thumb: result["thumbnail"][2].url,
            urls: dataList,
            title: result["title"],
          });

          req.users
            .addActivity({ yturl: ytUrl })
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              const error = new Error(err);
              error.httpStatusCode = 500;
              return next(error);
            });
        } else {
          res.status(403).json({
            status: "fail",
            error:
              "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
            code: 403,
          });
        }
      })
      .catch((error) => {
        res.status(403).json({
          status: "fail",
          error:
            "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
          code: 403,
        });
        const err = new Error(error);
        err.httpStatusCode = 403;
        return next(err);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "An unexpected error occurred. Please try again later.",
      code: 500,
    });
    const err = new Error(error);
    err.httpStatusCode = 500;
    return next(err);
  }
};

export const postTwitter = async (req, res, next) => {
  const twUrl = req.body.urls;

  const options = {
    method: "POST",
    url: "https://twitter65.p.rapidapi.com/api/twitter/links",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.TW_API_KEY,
      "X-RapidAPI-Host": "twitter65.p.rapidapi.com",
    },
    data: {
      url: twUrl,
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    const dataList = [];

    const dataUrl = data[0].urls;

    const sizePromises = dataUrl.map(async (urlObj) => {
      const size = await aufs(urlObj.url, "MB");
      dataList.push({
        url: urlObj.url,
        quality: `${urlObj.subName}P`,
        size: size.toFixed(1),
      });
    });

    await Promise.all(sizePromises);

    if (dataList.length === dataUrl.length) {
      res.status(200).json({
        thumb: data[0].pictureUrl,
        urls: dataList,
        title: data[0].meta.title,
      });

      try {
        const result = await req.users.addActivity({ twUrl });
        console.log(result);
      } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 403) {
      res.status(403).json({
        status: "fail",
        error:
          "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
        code: 403,
      });
    } else {
      res.status(500).json({
        status: "fail",
        error: "An unexpected error occurred. Please try again later.",
        code: 500,
      });
    }
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

export const postFb = (req, res, next) => {
  const fbUrl = req.body.urls;
  const options = {
    method: "GET",
    url: "https://fb-video-reels.p.rapidapi.com/api/getSocialVideo",
    params: {
      url: fbUrl,
    },
    headers: {
      "X-RapidAPI-Key": process.env.FB_API_KEY,
      "X-RapidAPI-Host": "fb-video-reels.p.rapidapi.com",
    },
  };

  try {
    axios
      .request(options)
      .then((response) => {
        const dataList = response.data;
        const format = dataList.links;

        if (dataList.error === true) {
          return res.status(403).json({
            status: "fail",
            error:
              "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
            code: 403,
          });
        }

        console.log(dataList);

        let urls = [];

        format.forEach((data, index) => {
          aufs(data.link, "MB")
            .then((size) => {
              urls.push({
                url: data.link,
                quality: data.quality.toUpperCase(),
                size: size.toFixed(1),
              });
            })
            .then((result) => {
              if (urls.length === format.length) {
                res.status(200).json({
                  thumb: dataList["picture"],
                  urls: urls,
                  title: dataList["description"],
                });
                req.users
                  .addActivity({ fbUrl: fbUrl })
                  .then((result) => {
                    console.log(result);
                  })
                  .catch((err) => {
                    const error = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error);
                  });
              }
            });
        });
      })
      .catch((err) => {
        res.status(403).json({
          status: "fail",
          error:
            "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
          code: 403,
        });

        const error = new Error(err);
        error.httpStatusCode = 403;
        return next(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "An unexpected error occurred. Please try again later.",
      code: 500,
    });
    const err = new Error(error);
    err.httpStatusCode = 500;
    return next(err);
  }
};

export const otherPost = (req, res, next) => {
  const igUrl = req.body.urls;

  const options = {
    method: "GET",
    url: "https://instagram243.p.rapidapi.com/searchfollower/5374017548/lemar",
    params: {
      url: igUrl,
    },
    headers: {
      "X-RapidAPI-Key": process.env.IG_API_KEY,
      "X-RapidAPI-Host": "instagram243.p.rapidapi.com",
    },
  };

  try {
    axios
      .request(options)
      .then((response) => {
        const formats = response.data;
        const videData = formats.links;

        if (formats.error === true) {
          return res.status(403).json({
            status: "fail",
            error:
              "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
            code: 403,
          });
        }

        const urls = [];

        videData.forEach((data) => {
          aufs(data.link, "MB")
            .then((size) => {
              urls.push({
                url: data.link,
                quality:
                  data.quality.length > 1 ? data.quality.toUpperCase() : "720P",
                size: size.toFixed(1),
              });
            })
            .then((result) => {
              if (urls.length === videData.length) {
                res.status(200).json({
                  thumb: formats.picture,
                  urls: urls,
                  title: "Your IG Videos",
                });
                req.users
                  .addActivity({ igUrl: igUrl })
                  .then((result) => {
                    console.log("OK");
                  })
                  .catch((err) => {
                    const error = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error);
                  });
              }
            });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(403).json({
          status: "fail",
          error:
            "Sorry, we couldn't locate the video you're looking for. It's possible that the video is set to private or has been removed.",
          code: 403,
        });

        const error = new Error(err);
        error.httpStatusCode = 403;
        return next(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "An unexpected error occurred. Please try again later.",
      code: 500,
    });
    const err = new Error(error);
    err.httpStatusCode = 500;
    return next(err);
  }
};
