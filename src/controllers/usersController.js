import User from "../models/User";

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

export const login = (req, res) => res.send("login");

export const logout = (req, res) => res.send("logout");

export const edit = (req, res) => res.send("edit");

export const remove = (req, res) => res.send("remove");

export const see = (req, res) => res.send(`${req.params.id} see`);
