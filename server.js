const app = require("express")();
app.use(require("cors")());

// hardcoded contact data
const contacts = [
  {
    id: "5ev7xcu",
    createdAt: 1678806647759,
    first: "Jack",
    last: "hohoh",
    twitter: "@jackhohoho",
    avatar: "https://thumbs.dreamstime.com/z/funny-face-baby-27701492.jpg",
    notes: "milk ?",
  },
  {
    id: "t52em94",
    createdAt: 1678806678721,
    first: "Mohammed",
    last: "Biryani",
    twitter: "@glassesMohammed",
    avatar:
      "https://cdn.britannica.com/64/121664-004-73C27A0C/Steve-Jobs.jpg?s=1500x700&q=85",
    notes: "He has glasses 🤓",
  },
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

// endpoint for retrieving all or some contacts
app.get("/api/contacts", (req, res) => {
  let { q } = req.query;
  if (typeof q !== "string") q = "";
  else q = q.toLowerCase();

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

// endpoint for retrieving a specific contact with id
app.get("/api/contacts/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json(contacts.find((object) => object.id === id) ?? null);
});

// endpoint for deleting a specific contact with id
app.delete("/api/contacts/:id", (req, res) => {
  const { id } = req.params;

  const index = contacts.findIndex((object) => object.id === id);
  if (index < 0) res.status(200).json(JSON.stringify(false));

  contacts.splice(index, 1);
  res.status(200).json(JSON.stringify(true));
});

// endpoint for creating a new contact with id
app.post("/api/contacts/:id", (req, res) => {
  const { id } = req.params;

  const newObject = {
    id,
    createdAt: Date.now(),
    first: "",
    last: "",
    twitter: "",
    avatar: "",
    notes: "",
  };

  contacts.push(newObject);
  res.status(200).json(newObject);
});

// endpoint for modifying a specific contact
app.put("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { updates } = req.query;

  try {
    const updateObject = JSON.parse(updates);
    const sourceIndex = contacts.findIndex((object) => object.id === id);

    if (sourceIndex < 0) throw new Error();

    contacts[sourceIndex] = {
      ...contacts[sourceIndex],
      ...updateObject,
    };

    res.status(200).json(contacts[sourceIndex]);
  } catch {
    res.status(400).end();
  }
});

app.listen(4000, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info("server listening at port 4000");
  }
});
