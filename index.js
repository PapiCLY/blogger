import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})