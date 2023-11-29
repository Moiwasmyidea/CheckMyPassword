//calls upon variables from index.txt file
//sets our variables to their ID from index file
const strengthMeter = document.getElementById('strength-meter') /*sets strength meter variable*/
const passwordInput = document.getElementById('password-input') /*sets password-input variable*/
const reasonsContainer = document.getElementById('reasons')/*sets reason variable*/

//check for anytime there is an unput on page
passwordInput.addEventListener('input', updateStrengthMeter)
updateStrengthMeter()

function updateStrengthMeter() {  /* starts the function to calculate strength */
  const weaknesses = calculatePasswordStrength(passwordInput.value)/* start weakness variable*/

  let strength = 100 /* sets strength to 100 returns reasons from container */
  reasonsContainer.innerHTML = ''
  weaknesses.forEach(weakness => {
    if (weakness == null) return
    strength -= weakness.deduction
    const messageElement = document.createElement('div')
    messageElement.innerText = weakness.message
    reasonsContainer.appendChild(messageElement)
  })
  strengthMeter.style.setProperty('--strength', strength)
}

// calculates password strength by checking weaknesses
function calculatePasswordStrength(password) {
  const weaknesses = []
  weaknesses.push(lengthWeakness(password))
  weaknesses.push(lowercaseWeakness(password))
  weaknesses.push(uppercaseWeakness(password))
  weaknesses.push(numberWeakness(password))
  weaknesses.push(specialCharactersWeakness(password))
  weaknesses.push(repeatCharactersWeakness(password))
  return weaknesses
}

//weaknesses List
//length
function lengthWeakness(password) {
  const length = password.length

  if (length <= 5) {
    return {
      message: 'Your password is too short',
      deduction: 40
    }
  }

  if (length <= 10) {
    return {
      message: 'Your password could be longer',
      deduction: 15
    }
  }
}



//lowercasing
function lowercaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters') /* returns array of lowercase characters*/
}

//uppercasing
function uppercaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters')

}

//numbers
function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, 'numbers')
}

//specials
function specialCharactersWeakness(password) {
  return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
}

//helper function characterTypeWeakness
//checks if for repeatcharacters and the use of all 4 types of inputs
function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || []

  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20
    }
  }

  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type}`,
      deduction: 5
    }
  }
}

//checks for repeat characters
function repeatCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || []
  if (matches.length > 0) {
    return {
      message: 'Your password has repeat characters',
      deduction: matches.length * 10
    }
  }
}