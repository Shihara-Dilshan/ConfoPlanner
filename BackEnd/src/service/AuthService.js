const User = require("./../model/User");
const hashPassword = require("./../util/HashPassword");
const joiUserSchema = require("./../util/AuthValidations");

const singup = (userData) => {
  return new Promise(async (resolve, reject) => {
    const name = userData.name;
    const email = userData.email;
    const password = await hashPassword(userData.password);
    const mobile = userData.mobile;
    const profilePicture = userData.profilePicture;
    const role = userData.role;

    try {
      //validate inputs
      await joiUserSchema.validateAsync({
        name,
        email,
        password,
        mobile,
        profilePicture,
        role,
      });

      //duplicate email check
      const emailExists = await User.find({ email: email });

      if (emailExists.length !== 0) {
        reject("Email already exists");
      } else {
        const user = new User({
          name,
          email,
          password,
          mobile,
          profilePicture,
          role,
        });
        await user.save();
        resolve("successfully signup");
      }
    } catch (err) {
      if (err.details[0].message) {
        reject(err.details[0].message);
      } else {
        reject(err);
      }
    }
  });
};

module.exports.singup = singup;
