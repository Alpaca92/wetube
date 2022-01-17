import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});

    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    return res.end();
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }

  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }

  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const existVideo = await Video.exists({ _id: id });

  if (!existVideo) {
    return res.render("404", { pageTitle: "Video not found" });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;

  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(","),
    });

    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: `Upload Video`,
      errorMessage: error._message,
    });
  }
};
