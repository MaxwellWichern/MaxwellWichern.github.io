import Express from 'express'
import gameRouter from './serverAPI/Routing.js'

const app = new Express()

// Create a universal route
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// final static route
app.use(Express.static('./public'))
app.use('/data',gameRouter )
 
// start listen
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
 