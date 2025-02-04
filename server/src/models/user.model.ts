import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gradeCard: mongoose.Types.ObjectId ;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gradeCard: { type: Schema.Types.ObjectId, ref: "GradeCard" },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
