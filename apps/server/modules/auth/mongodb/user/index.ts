import { Document, model, Model, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export interface IUserDocument extends Document {
  email: string;
  name: string;
  password: string;
}

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
  getVerifyToken(): string;
  getAccessToken(): string;
  getRefreshToken(): string;
  getResetPasswordToken(): string;
  toJSON(): any;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): boolean;
}

export const userSchema: Schema = new Schema({
  email: { type: String, index: { unique: true }, required: true },
  name: { type: String, index: { unique: true }, required: true },
  password: { type: String, required: true }
});

export const docSchema: Schema = new Schema({
  name: { type: String }
});

userSchema.pre('save', function(next) {
  const user = this as IUser;
  if (!user.isModified('password')) {
    return next();
  }
  return bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    return bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      return next();
    });
  });
});

userSchema.method('comparePassword', function(password: string): boolean {
  if (password === this.password) return true;

  if (bcrypt.compareSync(password, this.password)) return true;
  return false;
});

userSchema.method('toJSON', function() {
  const user = this.toObject();

  delete user.password;
  delete user._id;
  delete user.__v;
  delete user._v;

  console.log('user', user);

  return { user };
});

userSchema.static(
  'hashPassword',
  (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
);

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
