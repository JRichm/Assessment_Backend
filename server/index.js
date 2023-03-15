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
    let {goalTitle} = req.body;

    let index;

    for(let i = 0; i < goalDB.length; i++) {
        let currentTitle = goalDB[i].goalTitle;
        if (currentTitle === goalTitle) {
            index = i;
        }
    }

    if (index === undefined) {
        if (goalDB.length >= 14) {
            res.status(400).send('too many goals, delete one to add new');
            return;
        } else if (req.body.goalTitle.length > 23) {
            res.status(400).send('too many characters in goal title');
        }
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
        console.log(`\n index is undefined`);
        console.log(goalDB);
        res.status(400).send('goal not found');
    } else {
        console.log(`\n index is ${index}`);
        console.log(goalDB);

        let DBWithIndex = [goalDB, index];
        res.status(200).send(DBWithIndex);
    }

});

app.put('/api/goals', (req, res) => {
    console.log(`response received on backend`);
    console.log(req.body);

    let {oldGoal, editTitleInput, goalBody} = req.body;
    let index;

    console.log(oldGoal, editTitleInput, goalBody)

    for (let i = 0; i < goalDB.length; i++) {

        if (oldGoal === goalDB[i].goalTitle) {
            console.log(`\nbefore`);
            console.log(goalDB);
            goalDB[i].goalTitle = editTitleInput;
            goalDB[i].goalData = goalBody;
            console.log(`\nafter`);
            console.log(goalDB);
            index = i;
            break;
        }
    }

    if (index === undefined) {
        console.log('goal not found');
    } else {
        res.status(200).send(goalDB[index]);
        console.log(`sent back:`)
        console.log(goalDB[index])
        return;
    }
    console.log('problem editing goal');
    console.log(oldGoal);
    console.log(goalDB);
    console.log(index);

    res.status(400).send('problem editing goal');
});

app.delete('/api/goals', (req,res) => {
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
        goalDB.splice(index, 1);
        res.status(200).send(goalDB);
    }
});


app.listen(4000, () => console.log("Server running on 4000"));
