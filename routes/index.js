authRouter = require('./auth')
userRouter = require('./user')
postRouter = require('./post')
commentRouter = require('./comment')
tagRouter = require('./tag')

function route(app){
  app.use('/api/post', postRouter)
  app.use('/api/comment', commentRouter)
  app.use('/api/tags', tagRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/user', userRouter)
  // app.use('/', (req, res, next)=>{
  //   res.render('index', {title:'Home Page'})
  // })
}
module.exports = route;
