const Notification = require('../model/Notification');
const User = require('../model/User');

const sendNotification = async (req, res) => {
    try{
        if(req.body) {
            const { userId, message } = req.body;
            const newNotification =  new Notification({ message });
            const data = await newNotification.save();

            await User.findByIdAndUpdate(userId, {
                $addToSet: { notifications: data._id }
            })
            res.status(201).json({ notification: data });
        }
    } catch(err) {
        res.status(400).json({ msg: err });
    }
}

const viewUserNotifications = async (req, res) => {
    try{
        if (req.params.id) {
            const user = await User.findById(req.params.id)
            .populate('notifications', 'message createdAt');
            const { notifications } = user;
            res.status(200).json({ notifications });
        }
    } catch(err) {
        res.status(400).json({ msg: err });
    }
}

module.exports = {
    sendNotification,
    viewUserNotifications
}