import jwt from "jsonwebtoken";
export const userCheck = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decode.id;
    req.role = decode.role;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const adminOnly = (req, res, next) => {
  try {
    if (req.role != "Admin")
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
