import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import { User } from '../models/userSchema';
import { Agent } from '../models/agentSchema';


//user register

export const registerUser = async (req: Request, res: Response): Promise<any> => {
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

//user login

export const loginUser = async (req: Request, res: Response): Promise<any> => {
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


//create user to the agents

export const addAgent = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, mobileNumber, password } = req.body;

        if (!name || !email || !mobileNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAgent = await Agent.findOne({
            $or: [{ email }, { mobileNumber }]
        });

        if (existingAgent) {
            return res.status(400).json({ message: 'Agent with this email or mobile number already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newAgent = new Agent({
            name,
            email,
            mobileNumber,
            password: hashedPassword,
        });

        await newAgent.save();

        return res.status(201).json({ message: 'Agent added successfully', data: newAgent });
    } catch (error) {
        console.error('Error adding agent:', error);
        return res.status(500).json({ message: 'An error occurred while adding the agent' });
    }
};

