const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

let goalDB = [];

const { getCompliment, getFortune } = require('./controller')

app.get("/api/compliment", getCompliment);

app.get("/api/fortune/", getFortune);

app.post('/api/goals', (req, res) => {
    console.log(`new Post`)
    let {goalTitle} = req.body;

    let index;

    for(let i = 0; i < goalDB.length; i++) {
        let currentTitle = goalDB[i].goalTitle;
        if (currentTitle === goalTitle) {
            index = i;
        }
    }

    if (index === undefined) {
        goalDB.push(req.body);
        res.status(200).send(goalDB);
    } else {
        res.status(400).send('goal already tracked')
    }    
});

app.get('/api/goals', (req, res) => {
    let goalTitle = req.query.goalTitle.split('')
    let index;

    goalTitle.splice(goalTitle.length - 1, 1);
    goalTitle = goalTitle.join('');

    for(let i = 0; i < goalDB.length; i++) {
        let currentTitle = goalDB[i].goalTitle;
        if (currentTitle === goalTitle) {
            index = i;
        }
    }

    if (index === undefined) {
        res.status(400).send('goal not found');
    } else {
        res.status(200).send(goalDB[index]);
    }

});

app.delete('/api/goals', (req,res) => {
    console.log(`\ndelete method called`);
    let goalTitle = req.query.goalTitle.split('')
    let index;

    goalTitle.splice(goalTitle.length - 1, 1);
    goalTitle = goalTitle.join('');
    console.log(goalTitle);

    for(let i = 0; i < goalDB.length; i++) {
        let currentTitle = goalDB[i].goalTitle;
        if (currentTitle === goalTitle) {
            index = i;
        }
    }

    if (index === undefined) {
        res.status(400).send('goal not found');
    } else {
        goalDB.splice(index, 1);
        res.status(200).send(goalDB);
    }
});


app.listen(4000, () => console.log("Server running on 4000"));
