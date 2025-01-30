AgentHub:
A Node.js and React-based application that allows user authentication, agent management, CSV file uploads, and task distribution among agents.

Features:
User Authentication (Login): Secure login using JWT tokens.
Agent Management: Add new agents with basic details (Name, Email, Mobile Number, Password).
CSV Upload & Task Distribution: Upload CSV files containing tasks/items, and distribute them among 5 agents. Tasks are equally distributed, and any remaining items are distributed sequentially.

Technologies Used:
Backend: Node.js, Express.js
Frontend: React.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
File Upload: multer
CSV Parsing: csv-parser or similar library
