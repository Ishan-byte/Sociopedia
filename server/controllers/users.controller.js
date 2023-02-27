const User = require("../models/User.model");

// Gets User
const getUser = async (req, res) => {

  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ error: "User does not exists" });

    // delete user.password;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getFriends = async (userId) => {
  const user = await User.findById(userId);
  const friends = await Promise.all([
    user.friends.map((id) => User.findById(id)),
  ]);

  const formattedData = friends.map(
    ({ _id, firstname, lastname, occupation, location, picturePath }) => {
      return { _id, firstname, lastname, occupation, location, picturePath };
    }
  );

  return formattedData;
};

// Gets User's Friends
const getUserFriends = async (req, res) => {
  try {
    const userId = req.params.userId;
    const formattedData = getFriends(userId);
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Adds or Removes Friend
const addOrRemoveFriend = async (req, res) => {
  try {
    const { userId, friendId, option } = req.params;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend)
      return res.status(400).json({
        error: "User you are trying to add to your friend list does not exists",
      });

    if (user.friends.includes(friendId))
      return res
        .status(409)
        .json({ error: "User is already in your friend's list" });

    if (option == "ADD") {
      user.friends.push(friendId);
      friend.friends.push(userId);
    } else if (option == "REMOVE") {
      user.friends.filter((id) => id !== friendId);
      friend.friends.filter((id) => id !== userId);
    }

    await user.save();
    await friend.save();

    const friendsData = await getFriends(userId);

    res.status(200).json(friendsData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getUser, getUserFriends, addOrRemoveFriend };
