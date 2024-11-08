import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const registerUser = async (username: string, email: string, password: string) => {
    const newUser = new User({ username, email, password });
    await newUser.save();
    return { id: newUser._id, username: newUser.username, email: newUser.email };
};

// Fungsi untuk melakukan login dan menghasilkan token JWT
export const loginUser = async (usernameOrEmail: string, password: string) => {
    const user = await User.findOne({ username: usernameOrEmail }) || await User.findOne({ email: usernameOrEmail });

    if (!user) {
        throw new Error('User not found!');
    }

    // verifikasi passwordnya
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password!');
    }

    // Generate token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret_key', // gunakan JWT_SECRET dari .env
        { expiresIn: '1h' }
    );

    //simpan token ke document user's di database
    user.token = token;
    await user.save();
    
    return {
        user: {
            username: user.username,
            email: user.email,
        },
        token,
    };
};
