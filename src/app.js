import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
import { AuthRouter, CateRouter, ProductRouter } from './routers/index.js'
import connect from './database/index.js'

dotenv.config()
const port = process.env.PORT || '3001'

const app = express();
app.use(cors());
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//     session({
//         secret: 'keyboard cat',
//         resave: false,
//         saveUninitialized: false,
//         // cookie: { maxAge: 30000 },

//         //https & http
//         cookie: { secure: false }
//     })
// )

//View engine configuration
// app.set('view engine', 'ejs');
// app.set('views', './src/views');

// app.get('/', (req, res) => {
//     const email = req.session.email || 'Không có thông tin đăng nhập';
//     res.render('homepage', { email })
// })

app.use('/products', ProductRouter)
app.use('/auth', AuthRouter)
app.use('/category', CateRouter)


app.listen(port, async () => {
    await connect()
    console.log(`Example app listening on port ${port}`)
})

