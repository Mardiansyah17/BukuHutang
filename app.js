const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("./util/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const Costumers = require("./model/costumer");
const { db } = require("./model/costumer");

const app = express();
// setup method override
app.use(methodOverride("_method"));
// setup ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//
// konfigurasi flash
app.use(cookieParser("scret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.get("/", async (req, res) => {
  const costumers = await Costumers.find();

  res.render("home", {
    layout: "layouts/main",
    title: "home",
    costumers,
    msg: req.flash("msg"),
  });
});

//

//masuk ke halaman detail
app.get("/costumer/:_id", async (req, res) => {
  const costumer = await Costumers.findOne({ _id: req.params._id });

  res.render("detail", {
    layout: "layouts/main",
    title: "Detail Pelanggan",
    costumer,
  });
});

//
// masuk ke halaman tambah
app.get("/add", async (req, res) => {
  res.render("add", {
    layout: "layouts/main",
    title: "Tambah Hutang",
  });
});

// proses tambah data
app.post("/", async (req, res) => {
  Costumers.insertMany(req.body);
  res.redirect("/");
});

//
// masuk ke halaman produk
app.get("/product", (req, res) => {
  res.render("product", {
    layout: "layouts/main",
    title: "Produk",
  });
});

//
// hapus kontak
app.delete("/costumer", (req, res) => {
  Costumers.deleteOne({ _id: req.body._id }).then((result) => {
    req.flash("msg", "data berhasil di hapus");

    res.redirect("/");
  });
});

//
// ke halaman update
//
// masuk ke halaman tambah
app.get("/update/:id", async (req, res) => {
  const costumer = await Costumers.findOne({ _id: req.params.id });

  res.render("update", {
    layout: "layouts/main",
    title: "Tambah Hutang",
    costumer,
  });
});

app.put("/update", (req, res) => {
  // res.send(req.body.id);
  Costumers.updateOne(
    { _id: req.body._id },
    {
      $set: {
        nama: req.body.nama,
        terima: req.body.terima,
        berikan: req.body.berikan,
      },
    }
  ).then((result) => {
    res.redirect("/");
  });
});

//
const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
// db.costumer.updateOne(
//   { nama: "bayu" },
//   {
//     $set: {
//       nama: "kawaki",
//       terima: "30",
//       berikan: "40",
//     },
//   }
// );
// // db.costumer.updateOne(
// //   {
// //     nama: "bayu",
// //   },
// //   {
// //     nama: "kawaki",
// //     terima: "30",
// //     berikan: "40",
// //   }
// // );
