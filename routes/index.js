const router = require("express").Router();
const { generateToken } = require("../token");
const verifikasi = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

// route home
router.get("/", (req, res) => {
  res.send("Ini adalah assigment 2");
});

// route login
router.post("/login", (req, res) => {
  // ambil req dari body
  const { username, password } = req.body;

  // ambil data dari data/user.json
  const usersRaw = fs.readFileSync(
    path.join(__dirname, "..", "data", "users.json")
  );

  // parsing data
  const users = JSON.parse(usersRaw);

  // cek data
  const data = users.find((user) => {
    return user.username === username && user.password === password;
  });

  // cek username dan password
  if (!data) {
    res.status(404).json({
      message: "Username atau password salah",
    });
  } else {
    //   ambil data sebagai data token
    const dataToken = {
      id: data.id,
      username: data.username,
    };

    //   lakukan generate token
    const token = generateToken(dataToken);

    //   kirim response
    res.status(200).json({
      message: "Login berhasil",
      token: token,
    });
  }
});

// route menampilkan data teachers
router.get("/teachers", verifikasi, (req, res) => {
  // ambil data
  const teachersRaw = fs.readFileSync(
    path.join(__dirname, "..", "data", "teachers.json")
  );

  // parsing data
  const teachers = JSON.parse(teachersRaw);

  // kirim respon
  res.send(teachers);
});

module.exports = router;
