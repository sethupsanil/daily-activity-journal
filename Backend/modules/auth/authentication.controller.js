export const authenticate = async (req, res) => {
  res.success(
    {
      userId: req.user.uid,
      email: req.user.email,
      email_verified: req.user.email_verified,
    },
    "Login successful"
  );
};
