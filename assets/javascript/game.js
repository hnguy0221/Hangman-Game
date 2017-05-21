//============================================================================
// Name        : game.js
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This file contains javascript code to play the hangman game.
// Pseudocode  :
// 1. Declare the following variables:
//     1a var wins - initialize it to 0
//     1b var guessesCnt - initialize it to 0
//     1c var userGuess
//     1d var computerGuess
//     1e var html
//     1f var userGuessesArr
//     1g var maxGuesses - initialize it to 9
//     1h var computerChoices - an array that contains name of each band.
//     1i var losses - initialize to 0
// 2. The application selects randomly a word.
// 3. The application displays the dashes that correspond the word randomly
//    selected.
// 4. The user selects a letter between a and z.
// 5. Each time the letter guessed by the user matches one of the letters on
//    the word, reveal it as "mad----". If the user guesses all the letters
//    correctly, add 1 to their wins.
// 6. If the letter guessed by the user does not match, decrement the number
//    of guesses remaining by 1. Display the letter under the Letters Already
//    Guessed. If after exceeding the number of guesses remaining, add 1 to 
//    their losses.
//============================================================================

// Our array of possible computer choices.
var computerChoices = ["blondie", "genesis", "theeagles", "boston", "jacksonbrowne", 
    "aerosmith", "reospeedwagon", "pinkfloyd", "thewho","defleppard", "queen", 
    "journey", "ledzeppelin"];

// Variables for tracking our wins, losses and guesses count. The wins and losses 
// variables begin at 0 and the guessesCnt begins at 9.
var wins = 0;
var losses = 0;
var userGuessesCnt = 0;
var userGuess;
var computerGuess;
var html;
var userGuessesArr = []; /*contains a list of guesses to check so that no 
                           duplicate guess is allowed*/
var userGuessesStr = "";
var maxGuesses = 12;
var noOfMatches = 0;
var revealLetters = [];
var dashesArr = [];
var winStr = "";
var youLoseStr = "";
var lossStr = "";
var imageStr = "<img class='img-responsive padded-img' src='assets/images/80sOldHangman.jpg'></img>";
var audioStr = "";
var songStr = "";

//============================================================================
// Name        : seqSearch
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function sequentially searches an item in the array. If
//               found, it returns the location of the array for that item.
//============================================================================
function seqSearch(list, searchItem)
{
    var found = "false";
    var loc = -1;
    var i;

    for (i = 0; i < list.length; i++)
    {
        if (searchItem === list[i])
        {
            found = "true";
            break;
        }
    }
    if (found === "true")
    {
        loc = i;
    }
    else
    {
        loc = -1;
    }

    return loc;
}

//============================================================================
// Name        : determineMatch
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function calls the seqSearch() function to determine if
//               letter entered by the user matches anyone of the letters
//               randomly selected by the application.
//============================================================================
function determineMatch(word, letter)
{
    var loc = seqSearch(word, letter);

    return loc;
}

//============================================================================
// Name        : initializeRevealLetters
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function sets the reveal letters array given a word and a 
//               character. For example, if the word is "blondie" and chr is 
//               "-", the array will be ["-", "-", "-", "-", "-", "-", "-"].
//============================================================================
function initializeRevealLetters(word, letter)
{
    for (var i = 0; i < word.length; i++)
    {
        revealLetters[i] = letter;
    }
}

//============================================================================
// Name        : setRevealLetters
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function sets the reveal letter array given a word and
//               a user selected leter. For example, if the word is "blondie" 
//               and chr is "b", the array will be ["b", "-", "-", "-", "-", 
//               "-", "-"].
//============================================================================
function setRevealLetters(word, letter)
{
    for (var i = 0; i < word.length; i++)
    {
        if (word[i] === letter)
        {
            revealLetters[i] = letter;
            noOfMatches++;
        }
    }
}

//============================================================================
// Name        : getRevealLetters
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function formats the reveal letters array. For example, 
//               if the array is ["b", "l", "o", "-", "-", "-", "-"], the
//               function will return "b l o - - - -".
//============================================================================
function getRevealLetters()
{
    var ret_val = "";
    var len = revealLetters.length;

    for (var i = 0; i < len; i++)
    {
        ret_val += revealLetters[i];
        if (i < len-1)
        {
            ret_val += " ";
        }
    }

    return ret_val;
}

//============================================================================
// Name        : setImageAudioStrings
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This function determines which image to play based on the 
//               the word the user guesses correctly. It returns the image, 
//               the song title and the audio that correspond to the word. 
//               function is called when the user gueses correctly.
//============================================================================
function setImageAudioStrings(word)
{   
    if (word === "blondie")
    {
        songStr  = "<p class='text-center'>Call Me Blondie</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/blondie.jpg'></img>";
        audioStr = "    <audio controls autoplay>" +
                   "        <source src='assets/audio/call_me.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "ledzeppelin")
    {
        songStr  = "<p class='text-center'>Stair Way To Heaven By Zep Zeppelin</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/led-zeppelin.jpeg'></img>";
        audioStr = "    <audio controls autoplay>" +
                   "        <source src='assets/audio/stairway_to_heaven_led_zeppelin.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "theeagles")
    {
        songStr  = "<p class='text-center'>Hotel California By The Eagles</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/theeagles.jpg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/hotel-california.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "queen")
    {
        songStr  = "<p class='text-center'>We Will Rock You By Queen</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/queen.jpg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/we-will-rock-you-queen.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "boston")
    {
        songStr  = "<p class='text-center'>Rock And Roll Band By Boston</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/boston-band.jpg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/rock-and-roll-band-boston.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "thewho")
    {
        songStr  = "<p class='text-center'>Who Are You By The Who</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/thewho.jpeg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/09WhoAreYou.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "pinkfloyd")
    {
        songStr  = "<p class='text-center'>Rock And Roll Band By Boston</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/pinkfloyd.jpg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/the-wall-pink-floyd.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "defleppard")
    {
        songStr  = "<p class='text-center'>Animal By Def Leppard</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/def-leppard.png'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/def-leppard-animal.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "jacksonbrowne")
    {
        songStr  = "<p class='text-center'>These Days By Jackson Browne</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/jackson-browne-3.jpg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/these-days.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "aerosmith")
    {
        songStr  = "<p class='text-center'>Dream On By Aerosmith</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/aerosmith.jpeg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/Dreamon.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "genesis")
    {
        songStr  = "<p class='text-center'>Land Of Confusion By Genesis</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/aerosmith.jpeg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/land-of-confusion.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "journey")
    {
        songStr  = "<p class='text-center'>Land Of Confusion By Genesis</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/journey.jpg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/open-arms.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else if (word === "reospeedwagon")
    {
        songStr  = "<p class='text-center'>Take It On The Run By Reo Speedwagon</p>";
        imageStr = "    <img class='img-responsive padded-img' src='assets/images/reo-speedwagon.jpeg'></img>";
        audioStr = "    <audio controls autoplay> " +
                   "        <source src='assets/audio/take-it-on-the-run.mp3' type='audio/mpeg' />" +
                   "    </audio>";
    }
    else
    {
        console.log(word + " does not exist!");
    }
}

// Sets the computerGuess variable equal to a random choice from the computerChoice array.
computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
console.log("Computer guess: " + computerGuess);

initializeRevealLetters(computerGuess, "-");


html = "<div class='col-md-offset-3 col-sm-2 dotted-line'>" +
       imageStr +
       "</div>" +
       "<div class='col-sm-2 dotted-line'>" +
       "    <p class= 'text-center'>Press any key to get started</p>" +
       "    <p class='text-center'>Wins</p>" +
       "    <p class='text-center'>" + getRevealLetters() + "</p>" +
       "    <p class='text-center'>Losses</p>" +
       "    <p class='text-center'>Number of Guesses Remaining</p>" +
       "    <p class='text-center'>" + maxGuesses + "</p>" +
       "    <p class='text-center'>Letters Already Guessed</p>" +
       "</div>";
// Injecting the HTML we just created into our div and updating the game 
// information on our page.
document.querySelector("#game").innerHTML = html;

// When the user presses a key, it will run the following function...
document.onkeyup = function(event) 
{
    // Determine which key was pressed
    //userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    userGuess = event.key;
    userGuess = userGuess.toLowerCase();
    console.log("User guess: " + userGuess);

    //this is to make sure no duplicate guess is allowed.
    var loc = seqSearch(userGuessesArr, userGuess);
    console.log("Location: " + loc);

    songStr = "";
    audioStr = "";
    imageStr = "<img class='img-responsive padded-img' src='assets/images/80sOldHangman.jpg'></img>";

    if ((userGuess.match(/[a-z0-9]/i)) && (userGuess !== "shift") && 
        (userGuess !== "control") && (userGuess !== "alt") &&
        (userGuess !== "meta") && (userGuess !== "enter") && 
        (userGuess !== "backspace") && (userGuess !== "escape") &&
        (userGuess !== "capslock") && (userGuess != "tab") && (loc === -1))
    {
        userGuessesArr[userGuessesCnt] = userGuess;
        console.log("User Guesses Arr[" + userGuessesCnt + "]: " + userGuessesArr[userGuessesCnt]);

        if (userGuessesCnt === 0)
        {
            userGuessesStr = userGuess;
        }
        else
        {
            userGuessesStr = userGuessesStr + ", " + userGuess;
        }

        userGuessesCnt++;  

        var index = determineMatch(computerGuess, userGuess);
        if (index === -1) //does not match
        {
            maxGuesses--;
            if (maxGuesses === 0)
            {
                losses++;
                youLoseStr = "<p class='text-center'>You lose</p>";
                lossStr = "    <p class='text-center'>" + losses + "</p>"; //four blank spaces are intented.
                noOfMatches = 0;
                maxGuesses = 12;
                userGuessesStr = "";
                userGuessesCnt = 0;
                //Reset the computerGuess variable equal to a random choice from the computerChoice array.
                computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
                console.log("Computer guess: " + computerGuess);
                //Reset our dashes and reveal letters arrays
                dashesArr = [];
                revealLetters = [];
                userGuessesArr = [];
                initializeRevealLetters(computerGuess, "-");
            }
            html = youLoseStr +
                   "<div class='col-md-offset-3 col-sm-2 dotted-line'>" +
                   imageStr +
                   "</div>" +
                   "<div class='col-sm-2 dotted-line'>" +
                   "    <p class= 'text-center'>Press any key to get started</p>" +
                   "    <p class='text-center'>Wins</p>" +
                   winStr +
                   "    <p class='text-center'>" + getRevealLetters() + "</p>" +
                   "    <p class='text-center'>Losses</p>" +
                   lossStr +
                   "    <p class='text-center'>Number of Guesses Remaining</p>" +
                   "    <p class='text-center'>" + maxGuesses + "</p>" +
                   "    <p class='text-center'>Letters Already Guessed</p>" +
                   "    <p class='text-center'>" + userGuessesStr + "</p>" +
                   "</div>";
            // Injecting the HTML we just created into our div and updating the game 
            // information on our page.
            document.querySelector("#game").innerHTML = html;
        } 
        else //match
        {
            setRevealLetters(computerGuess, userGuess);
            console.log("noOfMatches = " + noOfMatches);
            console.log("computerGuess.length = " + computerGuess.length);

            if (noOfMatches === computerGuess.length)
            {
                wins++;
                winStr = "    <p class='text-center'>" + wins + "</p>"
                setImageAudioStrings(computerGuess);
                noOfMatches = 0;
                maxGuesses = 12;
                userGuessesStr = "";
                userGuessesCnt = 0;
                //Reset the computerGuess variable equal to a random choice from the computerChoice array.
                computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
                console.log("Computer guess: " + computerGuess);
                //Reset our dashes and reveal letters arrays
                dashesArr = [];
                revealLetters = [];
                userGuessesArr = [];
                initializeRevealLetters(computerGuess, "-");
            }
            
            /*if (wins !== 0)
            {
                winStr = "    <p class='text-center'>" + wins + "</p>"
            }*/
        	  
            html = songStr +
                   "<div class='col-md-offset-3 col-sm-2 dotted-line'>" +
                   imageStr +
                   "</div>" +
                   "<div class='col-sm-2 dotted-line'>" +
                   "    <p class= 'text-center'>Press any key to get started</p>" +
                   "    <p class='text-center'>Wins</p>" + 
                   winStr +
                   "    <p class='text-center'>" + getRevealLetters() + "</p>" +
                   "    <p class='text-center'>Losses</p>" +
                   lossStr +
                   "    <p class='text-center'>Number of Guesses Remaining</p>" +
                   "    <p class='text-center'>" + maxGuesses + "</p>" +
                   "    <p class='text-center'>Letters Already Guessed</p>" +
                   "    <p class='text-center'>" + userGuessesStr + "</p>" +
                   "</div>" +
                   "<div class='col-sm-2'>" +
                   audioStr +
                   "</div>";
            // Injecting the HTML we just created into our div and updating the game 
            // information on our page.
            document.querySelector("#game").innerHTML = html;
        }     
    }
    else
    {
        var sound = document.getElementById("#alarm");
        if (sound != null)
        {
            sound.play();
        }
    }
 };