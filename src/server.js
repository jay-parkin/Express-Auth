const express = require("express");
const { User } = require("./models/UserModel");
const { generateJWT, validateUserAuth } = require("./functions/jwtFunctions");
const cors = require("cors");

const app = express();

app.use(express.json());

// Enable this if you want front-ends to have more freedom about how they make requests
// eg. this is for HTML URL-encoded forms
// app.use(express.urlencoded({extended: true}));

let corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (request, response) => {
  response.json({
    message: "Hello, world!",
  });
});

app.post("/signup", async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).json({
        message: "Incorrect or missing sign-up credentials provided.",
      });
    }

    // Attempt to create the user
    const newUser = await User.create({ username, password });
    const newJwt = generateJWT(newUser.id, newUser.username);

    return response.json({
      jwt: newJwt,
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return response.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.get("/protectedRoute", validateUserAuth, (request, response) => {
  response.json({
    message: "You can see protected content because you're signed in!",
  });
});

module.exports = {
  app,
};
