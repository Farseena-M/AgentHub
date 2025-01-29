import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';
import util from 'util';
import { Request, Response } from 'express';
import { Agent } from '../models/agentSchema';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /csv|xlsx|xls/;
        const extname = fileTypes.test(file.originalname.toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('File must be CSV, XLSX, or XLS'));
    }
}).single('file');

const uploadAsync = util.promisify(upload);

interface DistributedTask {
    agent: { _id: string; name: string };
    tasks: any[];
}

export const distributeTasks = async (req: Request, res: Response): Promise<any> => {
    try {
        await uploadAsync(req, res);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        const agents = await Agent.find();
        if (agents.length === 0) {
            return res.status(400).json({ message: 'No agents found' });
        }

        const tasksPerAgent = Math.floor(jsonData.length / agents.length);
        let distributedTasks: DistributedTask[] = [];

        agents.forEach((agent, index) => {
            const start = index * tasksPerAgent;
            const end = start + tasksPerAgent;
            const agentTasks = jsonData.slice(start, end);
            distributedTasks.push({ agent, tasks: agentTasks });
        });

        fs.unlinkSync(filePath);
        return res.status(200).json(distributedTasks);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};
