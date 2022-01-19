import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });

export const postJoin = async (req, res) => {
  const { email, username, password, confirmPassword, name, location } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "Password confirmation does not match",
    });
  }

  const exists = await User.exists({
    $or: [{ username }, { email }],
  });

  if (exists) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "This username/email is already taken.",
    });
  }

  await User.create({
    email,
    username,
    password,
    name,
    location,
  });

  return res.redirect("/login");
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists",
    });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong password",
    });
  }

  res.redirect("/");
};

export const logout = (req, res) => res.send("logout");

export const edit = (req, res) => res.send("edit");

export const remove = (req, res) => res.send("remove");

export const see = (req, res) => res.send(`${req.params.id} see`);
