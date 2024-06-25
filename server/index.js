import express from "express";
const app = express();
const PORT = 4000;
app.get("/hello", (req, res) => {
  return res.status(200).json("hello from backend");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
