const goalTab = document.getElementById('goalTrackerTab');
const motivationTab = document.getElementById('motivationTab');

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton");

const newGoalForm = document.getElementById('newGoalForm');

const viewGoalTitle = document.getElementById('viewGoalTitle');
const viewGoalData = document.getElementById('viewGoalData');
const editGoalButton = document.getElementById('edit-button');
const editGoalTitle = document.getElementById('editGoalTitle');
const editTitleInput = document.getElementById('edit-title-input');
const goalList = document.getElementById('goalsList');

let editing = false;
let previouslySavedGoal;
let currentGoal;


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            document.getElementById('motivationp').textContent = data;
    });
};

complimentBtn.addEventListener('click', getCompliment)

fortuneBtn.addEventListener('click', () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            document.getElementById('motivationp').textContent = data;
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

editGoalButton.addEventListener('click', () => {
    if (editing) {
        body = {
            oldGoal: previouslySavedGoal,
            editTitleInput: editTitleInput.value,
            goalBody: viewGoalData.value            
        }

        axios.put('http://localhost:4000/api/goals', body).then(response => {
            console.log(response.data);
            viewGoalTitle.innerHTML = response.data.goalTitle;
            currentGoal.firstChild.innerHTML = response.data.goalTitle;

            viewGoalTitle.classList.remove('hidden');
            editTitleInput.classList.add('hidden');
            editGoalButton.textContent = 'edit';
            viewGoalData.disabled = true;
        }).catch(err => console.log(err))
        
        
    } else {
        editGoalButton.textContent = 'save';
        viewGoalData.disabled = false;
        viewGoalTitle.classList.add('hidden');
        editTitleInput.value = '' + viewGoalTitle.textContent;
        editTitleInput.classList.remove('hidden');
        previouslySavedGoal = viewGoalTitle.innerHTML;
    }
    editing = !editing;
});

function buttonClickCallback(e) {
    document.getElementById('newGoal').classList.add('hidden');
    document.getElementById('viewGoal').classList.remove('hidden');
    currentGoal = e.target || e.srcElement;
    console.log(currentGoal);

    axios.get('http://localhost:4000/api/goals?goalTitle=' + this.textContent)
    .then((result) => {
        console.log(`\nresult`);
        console.log(result.data[0][result.data[1]]);
        viewGoalTitle.textContent = result.data[0][result.data[1]].goalTitle;
        viewGoalData.value = result.data[0][result.data[1]].goalData;

        console.log(result.data[0][result.data[1]].goalTitle);
        console.log(result.data[0][result.data[1]].goalData);
        viewGoalData.disabled = true;
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

function newGoalButtonCallback(e) {
    document.getElementById('viewGoal').classList.add('hidden');
    document.getElementById('newGoal').classList.remove('hidden');
}

goalTab.addEventListener('click', () => {
    document.getElementById('goals').classList.remove('hidden');
    document.getElementById('motivation').classList.add('hidden');
});

motivationTab.addEventListener('click', () => {
    document.getElementById('goals').classList.add('hidden');
    document.getElementById('motivation').classList.remove('hidden');
});