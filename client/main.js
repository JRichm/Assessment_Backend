const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton");

const newGoalForm = document.getElementById('newGoalForm');

const viewGoalTitle = document.getElementById('viewGoalTitle');
const viewGoalData = document.getElementById('viewGoalData');
const editGoalButton = document.getElementById('editGoalButton');
const editGoalTitle = document.getElementById('editGoalTitle');
const goalList = document.getElementById('goalsList');

let editing = false;


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

fortuneBtn.addEventListener('click', () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        })
});


newGoalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let body = {
        goalTitle: document.getElementById('new-goal-title').value,
        goalData: document.getElementById('new-goal-Data').value
    }


    if (body.goalData === '' && body.goalTitle === '') {
        alert('please enter goal\nempty fields: (title, goal)');
        return;
    } else if (body.goalData === '') {
        alert('please enter goal\nempty fields: (goal)');
        return;
    } else if (body.goalTitle === '') {
        alert('please enter goal\nempty fields: (title)');
        return;
    }

    axios.post('http://localhost:4000/api/goals', body).then(res => {
        while (goalList.firstChild) {
            goalList.removeChild(goalList.firstChild);
        }

        let newGoalButton = document.createElement('div');
        let newGoalButtonText = document.createElement('p');

        newGoalButtonText.textContent = ' + New Goal';
        newGoalButton.appendChild(newGoalButtonText);

        newGoalButton.id = 'newGoalhi';

        newGoalButton.addEventListener('click', newGoalButtonCallback)

        goalList.appendChild(newGoalButton);

        for (let i = 0; i < res.data.length; i++) {
            let goalButton = document.createElement('div');
            let goalButtonText = document.createElement('p');
            let goalDeleteButton = document.createElement('button');

            goalButtonText.textContent = res.data[i].goalTitle;
            goalButton.appendChild(goalButtonText);

            goalButton.id = 'goal';

            goalButton.addEventListener('click', buttonClickCallback);

            goalDeleteButton.id = "goalDeleteButton"
            goalDeleteButton.textContent = 'X'
            goalDeleteButton.addEventListener('click', deleteButtonCallback);

            goalButton.appendChild(goalDeleteButton);
            goalList.appendChild(goalButton);
        }
    })
    .catch((err) => alert(err.response.data));
});


function buttonClickCallback(e) {
    document.getElementById('newGoal').classList.add('hidden');
    document.getElementById('viewGoal').classList.remove('hidden');
    axios.get('http://localhost:4000/api/goals?goalTitle=' + this.textContent)
    .then((result) => {
        viewGoalTitle.textContent = result.data.goalTitle;
        viewGoalData.textContent = result.data.goalData;
    }).catch((err) => {
        console.log(err);
    })
}

function deleteButtonCallback(e) {
    axios.delete('http://localhost:4000/api/goals?goalTitle=' + this.parentElement.textContent)
    .then((result) => {
        while (goalList.firstChild) {
            goalList.removeChild(goalList.firstChild);
        }

        let newGoalButton = document.createElement('div');
        let newGoalButtonText = document.createElement('p');

        newGoalButtonText.textContent = ' + New Goal';
        newGoalButton.appendChild(newGoalButtonText);

        newGoalButton.id = 'goal';

        newGoalButton.addEventListener('click', newGoalButtonCallback)

        goalList.appendChild(newGoalButton);

        for (let i = 0; i < result.data.length; i++) {
            let goalButton = document.createElement('div');
            let goalButtonText = document.createElement('p');
            let goalDeleteButton = document.createElement('button');

            goalButtonText.textContent = result.data[i].goalTitle;
            goalButton.appendChild(goalButtonText);

            goalButton.id = 'goal';

            goalButton.addEventListener('click', buttonClickCallback);

            goalDeleteButton.id = "goalDeleteButton"
            goalDeleteButton.textContent = 'X'
            goalDeleteButton.addEventListener('click', deleteButtonCallback);

            goalButton.appendChild(goalDeleteButton);
            goalList.appendChild(goalButton);
        }

        if (viewGoalTitle.textContent + 'X' === this.parentElement.textContent) {
            document.getElementById('viewGoal').classList.add('hidden');
            document.getElementById('newGoal').classList.remove('hidden');
        }
    })
    .catch((err) => console.log(err));
}

function newGoalButtonCallback() {
    document.getElementById('viewGoal').classList.add('hidden');
    document.getElementById('newGoal').classList.remove('hidden');
}