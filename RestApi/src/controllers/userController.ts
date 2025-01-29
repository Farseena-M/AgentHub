import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/userSchema.js';
import { generateToken } from '../utils/generateToken.js';



export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error: any) {
        return res.status(500).json({
            status: "failure",
            message: "Something went wrong...!",
            error: error.message
        });
    }
};



export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id)

        res.json({ token });
    } catch (error: any) {
        return res.status(500).json({
            status: "failure",
            message: "Something went wrong...!",
            error: error.message
        });
    }
};
