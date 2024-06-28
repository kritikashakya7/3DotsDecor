export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    res.status(200).json("Account Created");
  } catch (error) {
    console.log(error);
  }
};
