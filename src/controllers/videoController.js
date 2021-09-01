export const trending = (req, res) => {
  const videos = [
    {
      title: 'Hello',
      rating: 5,
      comments: 2,
      createdAt: '2 minutes ago',
      views: 59,
      id: 1
    },
    {
      title: 'Hola',
      rating: 15,
      comments: 32,
      createdAt: '277 minutes ago',
      views: 159,
      id: 2
    },
    {
      title: '안녕',
      rating: 51,
      comments: 22,
      createdAt: '23 minutes ago',
      views: 591,
      id: 3
    },
  ];

  return res.render("home", { pageTitle: "home", videos });
};
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) => res.send("deleteVideo");
