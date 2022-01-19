import User from "../models/User";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });

export const postJoin = async (req, res) => {
  const { email, username, password, name, location } = req.body;

  await User.create({
    email,
    username,
    password,
    name,
    location,
  });

  res.redirect("/login");
};


export const login = (req, res) => res.send("login");

export const logout = (req, res) => res.send("logout");

export const edit = (req, res) => res.send("edit");

export const remove = (req, res) => res.send("remove");

export const see = (req, res) => res.send(`${req.params.id} see`);
