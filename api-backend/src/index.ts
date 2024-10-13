import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define User schema and model
const userSchema = new mongoose.Schema({
  address: { type: String, required: true },
  txProof: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// GET all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// GET user by identifier
app.get('/users/:identifier', async (req: Request, res: Response) => {
  try {
    //const user = await User.findById(req.params.id);
    const { identifier } = req.params;
    let user;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      // If it's a valid ObjectId, search by _id
      user = await User.findById(identifier);
    } else {
      // If it's not a valid ObjectId, search by Address or txProof
      user = await User.findOne({
        $or: [
          { address: identifier },
          { txProof: identifier }
        ]
      });
    }

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// POST new user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// PUT update user
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

// DELETE user
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});