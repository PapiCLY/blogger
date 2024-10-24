import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.render('index.ejs')
})

app.get('/blogs', (req,res)=>{
    res.render('blogs.ejs')
})

app.get('/about', (req,res)=>{
    res.render('about.ejs')
})

app.post('/submit', (req,res)=>{
    const now = new Date()
    const readableDateTime = now.toLocaleString();
    const data = {
        bloggerName: req.body['bloggerName'],
        postTitle: req.body['title'],
        bloggerPost: req.body['blogPost'],
        timeStamp: readableDateTime
    }
    res.render('blogs.ejs', data)
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})