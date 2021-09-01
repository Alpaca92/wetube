let videos = [
  {
    title: "Hello",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Hola",
    rating: 15,
    comments: 32,
    createdAt: "277 minutes ago",
    views: 159,
    id: 2,
  },
  {
    title: "안녕",
    rating: 51,
    comments: 22,
    createdAt: "23 minutes ago",
    views: 591,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];

  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];

  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  videos[id - 1].title = title;

  return res.redirect(`/videos/${id}`);
};

export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) => res.send("deleteVideo");
