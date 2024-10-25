const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.EXPO_PUBLIC_MAILGUN_API_KEY,
});

mg.messages
  .create("process.env.EXPO_PUBLIC_MAILGUN_URL", {
    from: "SolSync <solsync340@gmail.com>",
    to: ["kbae1@vols.utk.edu"],
    subject: "Hello",
    text: "Testing some Mailgun.",
    html: "<h1>Hello, world.</h1>",

  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)); // logs any error
