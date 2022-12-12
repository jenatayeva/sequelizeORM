const express = require('express');
const { sequelize, User, Post } = require('./models')

const app = express();
app.use(express.json());

app.post('/users', async(req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = await User.create({ name, email, role })

    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
});

app.get('/users', async(req, res) => {
  try{
    const users = await User.findAll()

    return res.json(users)
  }catch(err){
    console.log(err)
    return res.status(500).json({ err: 'Something went wrong' })
  }
})

app.get('/users/:uuid', async(req, res) => {
  const uuid = req.params.uuid
  try{
    const users = await User.findOne({
      where: { uuid }
    })

    return res.json(users)
  }catch(err){
    console.log(err)
    return res.status(500).json({ err: 'Something went wrong' })
  }
});

app.post('/posts', async(req, res) => {
  const { userUuid, body } = req.body 
  console.log(req.body)
  try {
    const user = await User.findOne({
      where: {uuid: userUuid}
    })
    console.log(user)
    const post = await Post.create({ body, userId: user.id })
    return res.json(post)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
})

app.listen({port: 8080}, async () => {
  console.log('Server is running!');
  // alter true updates database schema
  // force true removes all data from db and recreates it
  await sequelize.authenticate()
  console.log('Database connected!');
})
