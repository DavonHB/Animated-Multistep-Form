const multiStepForm = document.querySelector("[data-multi-step")
const formSteps = [...multiStepForm.querySelectorAll("[data-step")]

//finds the current step with the active class that displays the step
let currentStep = formSteps.findIndex(step => {
   return step.classList.contains("active")
})

//if current step is less than zero then currentStep = 0, defaults to step 1
if (currentStep < 0) {
    currentStep = 0
    showCurrentStep()
}


// logic to pass through each step and increment the index on each click
multiStepForm.addEventListener("click", event => {
    let incrementor
    if (event.target.matches("[data-next")) {
        incrementor = 1
    } else if (event.target.matches("[data-previous")) {
        incrementor = -1
    } 

    if (incrementor == null) return 


    //puts each step into an array to check the validity of each input
    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const validInputs = inputs.every(input => input.reportValidity())

    //if each input is false, increment the index + or - 1 and show the current step on that index
    if (validInputs) {
        currentStep += incrementor
        showCurrentStep()
    }

})


//takes form steps and adds a transition end animation 
formSteps.forEach(step => {
    step.addEventListener("animationend", event => {
        // remove hide class only when the animation starts
        formSteps[currentStep].classList.remove("hide")
        event.target.classList.toggle("hide", !event.target.classList.contains("active"))
    })
})

// applies active class to the currentStep which is found based on the index of the array each step is in 
function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep)
    })
}