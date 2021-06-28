const User = require("./../model/User");
const hashPassword = require("./../util/HashPassword");
const comparePassword = require("./../util/ComparePassword");
const generateToken = require("./../util/GeneareteToken");
const joiUserSchema = require("./../validations/AuthValidations");

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

const login = (userData) => {
  return new Promise(async (resolve, reject) => {
    const email = userData.email;
    const password = userData.password;

    try {
      const emailExists = await User.find({ email: email });

      if (emailExists.length === 0) {
        reject("Email does not exists");
      } else {
        const currentPassword = emailExists[0].password;
        const isPasswordMatch = await comparePassword(
          password,
          currentPassword
        );

        if (isPasswordMatch) {
          const token = generateToken(emailExists[0]._id, emailExists[0].email, emailExists[0].role, emailExists[0].profilePicture, emailExists[0].mobile);
          resolve(token);
        } else {
          reject("Invalid password");
        }
      }
    } catch (err) {
        console.log(err)
      reject(err);
    }
  });
};

const findUserByIdService = (id) => {
  return new Promise(async(resolve,reject) => {
    try {
      const findUser = await User.findById(id)
      resolve(findUser) 
      
    } catch (err) {
      reject(err)
    }
  })
}

module.exports.singup = singup;
module.exports.login = login;
module.exports.findUserByIdService = findUserByIdService;
