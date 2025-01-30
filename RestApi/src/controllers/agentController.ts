import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { Request, Response } from 'express';
import { Agent } from '../models/agentSchema';
import { Task } from '../models/taskSchema';

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//multer configuration


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const safeFilename = file.originalname.replace(/\s+/g, '_');
        cb(null, `${Date.now()}-${safeFilename}`);
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
        const jsonData = xlsx.utils.sheet_to_json<{ FirstName: string; Phone: number; Notes: string }>(sheet);

        if (!jsonData.length || !jsonData[0]['FirstName'] || !jsonData[0]['Phone'] || !jsonData[0]['Notes']) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ message: 'Invalid CSV format. Must contain FirstName, Phone, Notes' });
        }

        const agents = await Agent.find().limit(5);
        if (agents.length === 0) {
            return res.status(400).json({ message: 'No agents found' });
        }

        let distributedTasks: DistributedTask[] = [];
        let index = 0;

        jsonData.forEach((task: any) => {
            const agent = agents[index % agents.length];
            if (!distributedTasks[index % agents.length]) {
                distributedTasks[index % agents.length] = { agent, tasks: [] };
            }
            distributedTasks[index % agents.length].tasks.push(task);
            index++;
        });

        for (const item of distributedTasks) {
            for (const task of item.tasks) {
                await Task.create({
                    agentId: item.agent._id,
                    firstName: task.FirstName,
                    phone: task.Phone,
                    notes: task.Notes
                });
            }
        }

        fs.unlinkSync(filePath);
        return res.status(200).json({ message: 'Tasks distributed successfully', data: distributedTasks });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

