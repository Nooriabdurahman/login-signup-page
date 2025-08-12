const bcrypt = require('bcryptjs');
const prisma = require('../prisma-connect/prisma');
const generateToken = require('../utils/genratetoken');

// Check if email exists
async function existEmail(email) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  return existingUser !== null;
}

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
    console.log('✅ Users fetched successfully');
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ error: 'There was an error fetching users' });
  }
};

// CREATE new user
exports.createUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  if (await existEmail(email))
    return res.status(400).json({ error: 'Email already exists' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    console.error('❌ Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
