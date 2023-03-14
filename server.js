const app = require("express")();
app.use(require("cors")());

const contacts = [
  {
    id: "heq5of8",
    createdAt: 1678802542011,
    first: "Orwa",
    last: "Diraneyya",
    twitter: "@ODiraneyya",
    avatar:
      "https://yt3.googleusercontent.com/ytc/AL5GRJXnjrU7kq-g_FhDSbPzOfp_MDITcF3_SlHgUwiCBQ=s176-c-k-c0x00ffffff-no-rj",
    notes: "A poor man 😝",
  },
  {
    id: "3emys0s",
    createdAt: 1678803228972,
    first: "Steve",
    last: "Jobs",
    twitter: "@dead",
    avatar:
      "https://cdn.britannica.com/04/171104-050-AEFE3141/Steve-Jobs-iPhone-2010.jpg",
    notes: "Not with us anymore 🥲",
  },
];

app.get("/api/contacts", (req, res) => {
  let { q } = req.query;
  if (typeof q !== "string")
    q = "";
  else
    q = q.toLowerCase();

  res
    .status(200)
    .json(
      contacts.filter(
        (object) =>
          object.first.toLowerCase().includes(q) ||
          object.last.toLowerCase().includes(q)
      )
    );
});

app.listen(4000, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info("server listening at port 4000");
  }
});
