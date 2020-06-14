const router = require("express").Router();
const { User } = require("../db");

router.param("id", async (req, res, next, id) => {
  const foundUser = await User.findByPk(id);
  if (!foundUser) {
    res.status(404).send("User not found");
  } else {
    req.foundUser = foundUser;
    next();
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const foundUser = await req.foundUser;
    const updateUser = await foundUser.update(req.body);
    res.send(updateUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
