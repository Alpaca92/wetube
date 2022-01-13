let videos = [
  {
    title: "1st video",
    rating: 5,
    comments: 3,
    createdAt: "2 minutes ago",
    views: 593,
    id: 0,
  },
  {
    title: "2nd video",
    rating: 5,
    comments: 3,
    createdAt: "412 minutes ago",
    views: 1359,
    id: 1,
  },
  {
    title: "3rd video",
    rating: 5,
    comments: 3,
    createdAt: "21 minutes ago",
    views: 1,
    id: 2,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id];

  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id];

  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  videos[id].title = req.body.title;

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = (req, res) => {
  const id = Math.floor(Math.random() * 10 + 3);
  const video = {
    title: req.body.title,
    rating: 3,
    comments: 2,
    createdAt: "1 minute ago",
    views: 0,
    id,
  };

  videos.push(video);

  return res.redirect("/");
};
