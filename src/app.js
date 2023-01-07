import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body
  users.push({ username, avatar })
  console.log(users)
  res.send('OK')
})

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body

  if (!username) {
    res.status(401).send({ error: 'UNAUTHORIZED' })
  }

  const { avatar } = users.find(user => user.username === username)

  tweets.push({ username, tweet, avatar })

  res.send('OK')
})

app.get('/tweets', (req, res) => {
  const lastTen = tweets.slice(-10)

  res.send(lastTen)
})

app.listen(5000, () => {
  console.log('listening on port 5000')
})
