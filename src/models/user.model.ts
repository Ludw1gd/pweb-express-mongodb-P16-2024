import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    token?: string;
    borrowedBooks: mongoose.Types.ObjectId[]; // Array of book IDs
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);