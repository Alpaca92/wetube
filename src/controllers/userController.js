import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { email, password, name, username, location } = req.body;

  try {
    await User.create({
      email,
      password,
      name,
      username,
      location
    });
  
    return res.redirect("/login")
  } catch(error) {
    return res.render("join", { pageTitle: "Join" });
  }
};

export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remove");
export const login = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see");
