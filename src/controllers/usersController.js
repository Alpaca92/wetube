import User from "../models/User";
import fetch from "node-fetch";
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
  const user = await User.findOne({ username, socialOnly: false });

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

  req.session.loggedIn = true;
  req.session.user = user;

  res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };

  const URL = `https://github.com/login/oauth/authorize?${new URLSearchParams(
    config
  ).toString()}`;

  return res.redirect(URL);
};

export const finishGithubLogin = async (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRETS,
    code: req.query.code,
  };

  const URL = `https://github.com/login/oauth/access_token?${new URLSearchParams(
    config
  ).toString()}`;

  const tokenRequest = await (
    await fetch(URL, {
      method: "post",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = `https://api.github.com`;
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const { email } = emailData.find(
      (email) => email.primary === true && email.verified === true
    );

    if (!email) return res.redirect("/login");

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: userData.name,
        avatarUrl: userData.avatar_url,
        username: userData.login,
        email,
        location: userData.location,
        socialOnly: true,
        password: "",
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();

  return res.redirect("/");
};

export const getEdit = (req, res) =>
  res.render("edit-profile", { pageTitle: `Edit Profile` });

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, location, username, email },
    file,
  } = req;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      location,
      username,
      email,
    },
    { new: true }
  );

  req.session.user = updatedUser;

  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) =>
  res.render("change-password", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { currentPassword, newPassword, newPasswordConfirmation },
  } = req;

  const ok = await bcrypt.compare(currentPassword, password);

  if (!ok)
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "the current password is incorrect",
    });

  if (newPassword !== newPasswordConfirmation)
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "the new password does not match the confirmation",
    });

  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save();

  req.session.user.password = user.password;

  return res.redirect("/");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });

  if (!user) res.status(404).render("404", { pageTitle: "User not exist" });

  return res.render("profile", { pageTitle: user.name, user });
};
