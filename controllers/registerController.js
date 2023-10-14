/* ..Hashing is a one-way process that converts a password to ciphertext using hash algorithms. 
...A hashed password cannot be decrypted, but a hacker can try to reverse engineer it
...Password salting adds random characters before or after a password prior to hashing to obfuscate the actual password. 
..Ciphertext is encrypted text transformed from plaintext using an encryption algorithm. 
...installing npm i bcrpyt
*/

const User = require("../model/Users");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
