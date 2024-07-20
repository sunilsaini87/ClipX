import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  deviceInfo: {
    type: Object,
    unique: false,
  },
  activity: [
    {
      type: Object,
      required: true,
      unique: false,
    },
  ],
});

userSchema.methods.addActivity = function (activity) {
  const date = new Date();
  let ISToffSet = 330;
  let offset = ISToffSet * 60 * 1000;
  let ISTTime = new Date(date.getTime() + offset);
  const updatedActivity = [...this.activity];
  updatedActivity.push({ ...activity, dateIST: ISTTime });
  this.activity = updatedActivity;
  return this.save();
};

export default mongoose.model("User", userSchema);
