const { db } = require("./server/db/");
const app = require("./server/server");
const PORT = process.env.PORT || 8080;

db.sync({ force: false }).then(() => {
  console.log("db synced");
  app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
});