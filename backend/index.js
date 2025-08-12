const express = require('express');
const { PrismaClient } = require('../New Folder/generated/prisma/client');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const prisma = new PrismaClient();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function existEmail(email) {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  return existingUser !== null;
}




app.get('/users', async (req, res) => {

    
  try {
    const users = await prisma.user.findMany();
    res.json(users);
    console.log('user isget it succec fully')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'thier is error to getting the client' });
  }
});


const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },   // payload
    process.env.JWT_SECRET,                // کلید مخفی (در پروژه واقعی از env استفاده کن)
    { expiresIn: '1h' }                   // مدت اعتبار توکن
  );
};



app.post('/users', async (req, res) => { 
    const { email, name, password } = req.body;

      if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  if (await existEmail(email)){
        return res.status(400).json({error: 'email exist'})
    }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error to gitting the data' });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000/users');
});




app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});
