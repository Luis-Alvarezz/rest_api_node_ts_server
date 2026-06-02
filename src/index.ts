import server, { connectDB } from "./server";
import  colors  from "colors";

connectDB()

const port = process.env.PORT || 4000
server.listen(port, () => {
  console.log(colors.bgBlack.white(`🚀REST API en el puerto: ${port}🚀`));
})