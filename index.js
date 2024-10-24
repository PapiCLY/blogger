import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.render('index.ejs')
})


app.get('/about', (req,res)=>{
    res.render('about.ejs')
})

let blogPosts = [];

app.post('/submit', (req,res)=>{
    const now = new Date()
    const readableDateTime = now.toLocaleString();

    const newPost = {
        bloggerName: req.body['bloggerName'],
        postTitle: req.body['title'],
        bloggerPost: req.body['blogPost'],
        timeStamp: readableDateTime
    }

    blogPosts.push(newPost)


    res.render('blogs.ejs', {posts:blogPosts})
})

app.get('/blogs', (req,res)=>{
    res.render('blogs.ejs', {posts: blogPosts})
})


app.post('/delete', (req,res)=>{
    const postIndex = req.body.index
    
    if(postIndex >= 0 && postIndex < blogPosts.length){
        blogPosts.splice(postIndex, 1)
    }

    res.render('blogs.ejs', {posts: blogPosts })
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})