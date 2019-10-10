
const COLOR = "red";


var selectedAwnserId= null;
var questionId = 0;
var correctAwnsers = 0;
var currQuestion = null;


var question = [{"type":"std","question":"Wie heißt dieser junge Kerl ? ","awnser":{"ans1":"Spongebob","ans2":"Patrick","ans3":"Mr Crabbs","ans4":"Mrs.Puff"},"solution":"ans1","qImage":"img/spongebob.jpg" },
                {"type":"free","question":"Das is ein anderer typ von frage. Die felder geben tipps auf die antwort, es konnen alle felder angeklickt werden.", "awnser":{"ans1":1,"ans2":2,"ans3":3,"ans4":4},"hint":{"ans1":"i","ans2":"ii","ans3":"iii","ans4":"iv"},"qImage":""},
                {"type":"std","question":"frage 1","awnser":{"ans1":"A1","ans2":"B1","ans3":"C1","ans4":"D1"},"solution":"ans1","qImage":"" },
                {"type":"std","question":"frag 2","awnser":{"ans1":"A2","ans2":"B2","ans3":"C2","ans4":"D2"} ,"solution":"ans2","qImage":"" },
                {"type":"std","question":"frage 3","awnser":{"ans1":"A3","ans2":"B3","ans3":"C3","ans4":"D3"},"solution":"ans3","qImage":"" },
              ];

var freezeButtons = false

console.log("Hello Question")

function displayDate() {
  document.getElementById('ans1').innerHTML=Date()
}

function showCorrectAnwsers(){
  document.getElementById("corrAwnsers").innerHTML = correctAwnsers
}

function confirmAwnser(){
  if ( selectedAwnserId == currQuestion["solution"] ) {
    document.getElementById( selectedAwnserId ).style.backgroundColor = "#6ad66aff"
    correctAwnsers++
  } else {
    document.getElementById( selectedAwnserId ).style.backgroundColor = "#ff5868ff"
    document.getElementById( currQuestion["solution"] ).style.backgroundColor = "#6ad66aff"
  }
  showCorrectAnwsers()
  freezeButtons = true
  console.log("freeze buttons = ", freezeButtons)
}

function resetBackgroundById (id) {
  if (id != null) {
    e = document.getElementById(id)
    e.style.backgroundColor = '#cbcbcbff'
  }
}

function setAwnser(elm) {
  console.log("setAwnser::freeze buttons = ", freezeButtons)

  if (freezeButtons) {
    return
  }

  if (currQuestion.type == "std"){
    resetBackgroundById(selectedAwnserId)
    p = elm.parentElement
    elm.style.backgroundColor = "#ffffc0ff" // yellow
    selectedAwnserId = elm.id
    console.log( "the selected Awnser is" ,selectedAwnserId)
  } else if (currQuestion.type == "free") {
    elm.innerHTML = currQuestion.hint[elm.id]
    elm.style.backgroundColor = "#ffccaaff" //orange
  }
}

function resetColors() {
  awnsers = document.getElementsByClassName("awn")
  for ( i = 0 ; i < awnsers.length;i++){
    awnsers[i].style.backgroundColor = '#cbcbcbff'
  }
}

function nextQuestion(){
  freezeButtons = false
  showNextQuestion()
  setQuestionImage()

}

function showNextQuestion() {
  var x = document.getElementById("questionText")
  console.log(x)
  resetColors()
  var question = getQuestion()
  if (question.type == "std"){
    showNextAwnsers( question )
    x.innerHTML = question.question
    currQuestion = question
  } else if (question.type=="free") {
    showNextAwnsers( question )
    x.innerHTML = question.question
    currQuestion = question
  }
}

function setQuestionImage() {
  if (currQuestion.qImage != ""){
    document.getElementById("questionImage").src = currQuestion.qImage
  } else {
    document.getElementById("questionImage").src = ""
  }
}

function showNextAwnsers( question ){
  console.log(question.awnser)
  for (x in question.awnser ){
    document.getElementById(x).innerHTML = question.awnser[x]
    console.log(question.awnser[x])
  }
}

function getQuestion(){

  if (questionId == question.length){
    questionId=0
  }
  return question[questionId++];
}
