import Item from "../models/itemModel.js";
import Member from "../models/memberModel.js";

export const createMember = async (req, res) => {
  try {
    const members = new Member(req.body);
    await members.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const getMembers = async (req, res) => {
  const members = await Member.find();

  res.status(200).json(members);
};

export const deleteMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  await Member.deleteOne({ _id: member._id });
  await Item.deleteMany({ name: member.name });
  res.status(200).send("OK");
};
