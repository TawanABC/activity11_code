import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
