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
    views: 51239,
    id: 2,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const see = (req, res) => {
  const { id } = req.params;
  const video = videos[id];

  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

export const edit = (req, res) => res.send("edit");

export const search = (req, res) => res.send("search");

export const upload = (req, res) => res.send("upload");

export const deleteVideo = (req, res) => res.send("deleteVideo");
