window.addEventListener('load', function() {

let userField = document.querySelector('.user-field'),
    compField = document.querySelector('.comp-field'),
    sound = document.querySelector('.sound'),
    res = document.querySelector('.result'),
    fields = document.querySelectorAll('.field'),
    userStep, compStep, blocked = false;

function choiceUser(e) {
    if (blocked) return; // makes other selections (rock/paper/scissors) inactive, so user can not change his choice while computer is making his choice.
    let target = e.target;
    if (target.classList.contains('field')) {
        userStep = target.dataset.field; // user result
        fields.forEach(item => item.classList.remove('active', 'error')); // cleaning user choice (background color) before committing user's new choice (adding green background to the new selected selection)
        target.classList.add('active'); // committing user's choice (adding green background to the selected selection)
        choiceComp(); // running choiceComp() function after making a decision
    }
}

function choiceComp() {
    blocked = true; // while the computer is "thinking" we could not change our mind (basically cheating)
    let rand = Math.floor(Math.random() * 3);
    compField.classList.add('blink'); // adding blinking animation to the computer choice (rapidly changing green background)
    let compFields = compField.querySelectorAll('.field'); 

    setTimeout(() => { // making a 3sec pause (pretending that computer is thinking/making his choice)
        compField.classList.remove('blink'); // removing blinking animation
        compStep = compFields[rand].dataset.field; // computer result
        compFields[rand].classList.add('active'); // committing computer's choice (adding green background to the randomly selected selection)
        winner();
    }, 3000);

}

function winner() {
    blocked = false; // giving the user the opportunity to make a choice again
    let comb = userStep + compStep; // making short version of general result of the game (for example: rs (r (rock)= user's choice, s (scissors) = computer's choice))
    
    switch(comb) {
        // draw cases
        case 'rr':
        case 'pp':
        case 'ss':
            res.innerText = 'Draw!';
            sound.setAttribute('src', 'audio/draw.mp3'); // setting audio source
            sound.play();
            break;
        
        // winning cases
        case 'rs':
        case 'pr':
        case 'sp':
            res.innerText = 'You won!';
            sound.setAttribute('src', 'audio/win.mp3'); // setting audio source
            sound.play();
           
            compField.querySelector('[data-field='+compStep+']').classList.add('error'); // changing computer's choice background color to red (since user won)
            break;
        
        // losing cases
        case 'sr':
        case 'rp':
        case 'ps':
            res.innerText = 'You lost!';
            sound.setAttribute('src', 'audio/loss.mp3'); // setting audio source
            sound.play();
           
            userField.querySelector('[data-field='+userStep+']').classList.add('error'); // changing user's choice background color to red (since computer won)
            break;
    }
}

userField.addEventListener('click', choiceUser);

});