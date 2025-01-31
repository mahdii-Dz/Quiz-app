let questionsElement = document.getElementById('question');
let answersContainer = document.getElementById('btns-container');
let nextBtn = document.getElementById('next-btn');
let i = 0;
let score = 0;
let apiData ;

function startQuiz(){
    answersContainer.style.display = 'block';
    fetchApi();
}
function fetchApi(){
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(respond => respond.json())
    .then(data => {
        if(data.response_code == 0){
            console.log(data);
            apiData = data;
            showQuestions();
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}
const showQuestions = () =>{
    resetState()
    let currentQuestion = apiData.results[i];
    questionsElement.innerHTML = `${i+1}. ${currentQuestion.question}`;
    let allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    allAnswers.sort( ()=> Math.random() -0.5 );
                
    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        answersContainer.appendChild(button);
        if(answer === currentQuestion.correct_answer){
            button.dataset.correct = 'true';
        }
        button.addEventListener('click',selectAnswer)
    })

}

function resetState(){
    nextBtn.style.display = 'none';
    while(answersContainer.firstChild){
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(e){
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        score++;
        selectedBtn.classList.add('correct');
    }
    else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answersContainer.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextBtn.style.display = 'block';
}

function showScore(){
    answersContainer.style.display = 'none';
    questionsElement.innerHTML = `you scored ${score} out of ${apiData.results.length}`;
    nextBtn.innerText = 'Restart Quiz';
    nextBtn.style.display = 'block';
}

function handleNextBtn(){
    i++;
    if(i < apiData.results.length){
        showQuestions()
    }
    else{
        showScore()
    }
}
nextBtn.addEventListener('click',()=>{
    if(i < apiData.results.length){
        handleNextBtn()
    }
    else{
        i = 0;
        score =0;
        startQuiz();
    }
})
startQuiz();

// const questions = 
// [
//     {
//         question:"Which animal is known as a symbol of Australia?",
//         answers :
//         [
//             {text:"Kangaroo",correct:'true'},
//             {text:'Eagle',correct:'false'},
//             {text:'Bear',correct:'false'},
//             {text:'Elephant',correct:'false'},
//         ]
//     },
//     {
//         question:"What animal is native to the Arctic region?",
//         answers :
//         [
//             {text:"Lion",correct:'false'},
//             {text:'Zebra',correct:'false'},
//             {text:'Polar bear',correct:'true'},
//             {text:'Chicken',correct:'false'},
//         ]
//     },
//     {
//         question:"Which country is famous for its Giant Pandas?",
//         answers :
//         [
//             {text:"India",correct:'false'},
//             {text:'China',correct:'true'},
//             {text:'Japan',correct:'false'},
//             {text:'Syria',correct:'false'},
//         ]
//     },
//     {
//         question:"What animal is traditionally associated with Egypt?",
//         answers :
//         [
//             {text:"Dog",correct:'false'},
//             {text:'Cat',correct:'true'},
//             {text:'Horse',correct:'false'},
//             {text:'Lion',correct:'false'},
//         ]
//     },
//     {
//         question:"What animal is prominently featured in the national emblem of the United States?",
//         answers :
//         [
//             {text:"Tiger",correct:'false'},
//             {text:'Bear',correct:'false'},
//             {text:'Horse',correct:'false'},
//             {text:'Bald Eagle',correct:'true'},
//         ]
//     },
// ];

// let questionsElement = document.getElementById('question');
// let answersContainer = document.getElementById('btns-container');
// let nextBtn = document.getElementById('next-btn');
// let i = 0;
// let score = 0;
// function startQuiz(){
//     answersContainer.style.display = 'block';
//     showQuestions();
// }
// function showQuestions(){
//     resetState()
//     let currentQuestion = questions[i];
//     questionsElement.innerHTML = currentQuestion.question;
//     currentQuestion.answers.forEach(answer => {
//         const button = document.createElement('button');
//         button.innerText = answer.text;
//         button.classList.add('btn');
//         answersContainer.appendChild(button);
//         if(answer.correct === 'true'){
//             button.dataset.correct = answer.correct;
//         }
//         button.addEventListener('click',selectAnswer)
//     })
// }

// function resetState(){
//     nextBtn.style.display = 'none';
//     while(answersContainer.firstChild){
//         answersContainer.removeChild(answersContainer.firstChild);
//     }
// }

// function selectAnswer(e){
//     let selectedBtn = e.target;
//     let isCorrect = selectedBtn.dataset.correct === 'true';
//     if(isCorrect){
//         score++;
//         selectedBtn.classList.add('correct');
//     }
//     else{
//         selectedBtn.classList.add('incorrect');
//     }
//     Array.from(answersContainer.children).forEach(button =>{
//         if(button.dataset.correct === 'true'){
//             button.classList.add('correct')
//         }
//         button.disabled = 'true';
//     })
//     nextBtn.style.display = 'block';
// }

// function showScore(){
//     answersContainer.style.display = 'none';
//     questionsElement.innerHTML = `you scored ${score} out of ${questions.length}`;
//     nextBtn.innerText = 'Restart Quiz';
//     nextBtn.style.display = 'block';
// }

// function handelNextBTn(){
//     i++;
//     if(i < questions.length){
//         showQuestions()
//     }
//     else{
//         showScore()
//     }
// }
// nextBtn.addEventListener('click',()=>{
//     if(i < questions.length){
//         handelNextBTn()
//     }
//     else{
//         i = 0;
//         score =0;
//         startQuiz();
//     }
// })
// startQuiz();