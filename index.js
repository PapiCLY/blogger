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

app.get('/edit', (req,res)=>{
    res.render('edit.ejs')
})

//render post for specific form
app.get('/edit/:index', (req,res)=>{
    const postIndex = req.params.index;
    const post = blogPosts[postIndex];
    
    if(post){
        //render the edit form with the current post data
        res.render('edit.ejs', { post, index: postIndex })
    }else{
        res.status(404).send('post not found')
    }
});

//post route to handle post editing
app.post('edit/:index', (req,res)=>{
    const postIndex = req.params.index;

    //check if post exists
    if(postIndex >= 0 && postIndex < blogPosts.length){
        blogPosts[postIndex].bloggerName = req.body.bloggerName;
        blodPosts[postIndex].postTitle = req.body.postTitle;
        blogPosts[postIndex].bloggerPost = req.body.blogPosts;

        //after edit is complete, re-render the blogs page where the updated post is
        res.render('blogs.ejs', { posts: blogPosts })
    }else{
        res.status(404).send('Posts not found')
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})