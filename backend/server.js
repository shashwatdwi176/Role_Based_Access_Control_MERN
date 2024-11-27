import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DbCon from './utils/db.js'
import cookieparser from 'cookie-parser'
import AuthRoutes from './routes/Auth.js'
import AdminRoutes from './routes/AdminRoutes.js'

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();

DbCon();
app.use(express.json())
app.use(cookieparser())
app.use(cors())

app.use('/api/auth' , AuthRoutes)
app.use('/api/admin', AdminRoutes)

app.get('/', (req , res) => {
    res.send('test')
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
