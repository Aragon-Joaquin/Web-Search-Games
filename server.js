import e from "express";
import { createServer } from "vite";
import { magicStrings } from "./src/magicStrings.js";
import { readFileSync } from "node:fs";

// Create http server
const app = e();

// Add Vite
let vite;

vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
app.use(vite.middlewares);

// Serve HTML
app.use("/", async (req, res) => {
  try {
    const url = req.originalUrl;

    let template;
    let render;

    // Always read fresh template
    template = readFileSync("./index.html", "utf-8"); //! read index
    template = await vite.transformIndexHtml(url, template); //! transform any html plugin
    render = (await vite.ssrLoadModule("./src/entry-server.jsx")).render; //! load the given url and .render serves the getter

    const rendered = await render(url); //! renders the HTML

    const html = template.replace(`<!--ssr-outlet-->`, rendered.html ?? ""); //! replaces the html comment for the rendered content

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    res.status(500).end(e.stack);
  }
});

app.use("*", (req, res) => {
  res.json({ Invalid: 'Route expression invalid, please redirect to "/" ' });
});

// Start http server
app.listen(magicStrings.PORT, () => {
  console.log(`Server started at ${magicStrings.LOCAL_URL}`);
});
