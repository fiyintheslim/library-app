const sendToken = async (user, res, token) => {
  res
    .status(200)
    .cookie("token", token, {
      maxAge: process.env.COOKIE_EXP * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .json({ sucess: true, token, user });
};

module.exports = sendToken;
