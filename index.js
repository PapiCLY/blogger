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

app.get('/blogs', (req,res)=>{
    res.render('blogs.ejs', {posts: blogPosts})
})

app.get('/posts', (req,res)=>{
    res.render('blogs.ejs', { posts: blogPosts })
})

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
    res.redirect('/posts')


    // res.render('blogs.ejs', {posts:blogPosts})
})


app.post('/delete', (req,res)=>{
    const postIndex = req.body.index

    if(postIndex >= 0 && postIndex < blogPosts.length){
        blogPosts.splice(postIndex, 1)
    }

    res.render('blogs.ejs', {posts: blogPosts })
})

//render edit page
app.get('/edit', (req,res)=>{
    res.render('edit.ejs')
})

app.get('/posts', (req,res)=>{
    res.render('post.ejs')
})

//render post for specific form
app.get('/edit/:index', (req,res)=>{
    const postIndex = parseInt(req.params.index);
    if(isNaN(postIndex) || postIndex < 0 || postIndex >= blogPosts.length){
        return res.status(404).send('Post not found')
    }

    const post = blogPosts[postIndex];
    res.render('edit.ejs', { post: post, index: postIndex })
    
});

//post route to handle post editing
app.post('edit/:index', (req,res)=>{
    const postIndex = parseInt(req.params.index);

    //check if post exists
    if(isNaN(postIndex) || postIndex < 0 || postIndex >= blogPosts.length){

        return res.status(404).send('Post not found')
    }else{
        
        blogPosts[postIndex].bloggerName = req.body.bloggerName;
        blodPosts[postIndex].postTitle = req.body.postTitle;
        blogPosts[postIndex].bloggerPost = req.body.blogPosts;
        blogPosts[postIndex].timeStamp = new Date().toLocaleString()

        res.redirect('/posts')
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})