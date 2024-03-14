let capturedImage = null;
let currentStep = 1;
let isButtonPressed = false; 
let form = document.getElementById('step2Form');
let capturedImageElement = document.getElementById('capturedImage');
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
        var context = canvas.getContext('2d');

        document.getElementById('captureButton').addEventListener('click', function () {
            if (!isButtonPressed) { 
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                capturedImage = canvas.toDataURL('image/png');
                capturedImageElement.src = capturedImage;
                capturedImageElement.style.display = 'block';

                // Hide overlay image
                document.querySelector('.overlayimage').style.display = 'none';

                video.style.display = 'none';
                canvas.style.display = 'none';

                isButtonPressed = true;
                document.getElementById('captureButton').disabled = true;
            }
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!capturedImage) {
                alert('Please capture an image before proceeding.');
                return;
            }

            var imageDataInput = document.createElement('input');
            imageDataInput.type = 'hidden';
            imageDataInput.name = 'capturedImage';
            imageDataInput.value = capturedImage;
            form.appendChild(imageDataInput);

            console.log('Form submitted successfully!'); 
        });
    })
    .catch(function (error) {
        console.error('Error accessing the webcam:', error);
    });

function nextStep() {
        var dobInput = document.getElementById('dob');
        var dobValue = new Date(dobInput.value);
        var currentDate = new Date();
        var minAgeDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

        if (dobValue > minAgeDate) {
            alert('You must be at least 18 years old to proceed.');
            dobInput.focus();
            return false;
        }
    const currentForm = document.querySelector`#step${currentStep}Form`;
    if (currentForm.checkValidity()) {
        if (currentStep < 3) {
            if (!isButtonPressed && currentStep === 2) { // Check if the button is not pressed
                alert('Please capture an image before proceeding.');
                return;
            } else {
                currentStep++;
                showStep(currentStep);
            }
        }
    } else {
        currentForm.reportValidity();
    }
}

function previewImage(event, previewId) {
    const file = event.target.files[0];
    const preview = document.getElementById(previewId);

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            const img = document.createElement('img');
            img.src = reader.result;
            img.style.maxWidth = '200px';
            preview.innerHTML = '';
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

document.getElementById('pancard').addEventListener('change', (event) => {
    previewImage(event, 'pancardPreview');
});

document.getElementById('aadhaar').addEventListener('change', (event) => {
    previewImage(event, 'aadhaarPreview');
});

document.getElementById('signature').addEventListener('change', (event) => {
    previewImage(event, 'signaturePreview');
});

function showStep(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((stepElement, index) => {
        if (index === step - 1) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });
}

function submitform(){
    document.getElementById("success-message");
}

const step3Form = document.querySelector('#step3Form');
step3Form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (step3Form.checkValidity()) {
        
        console.log('Form submitted successfully!'); 
        
    } else {
        step3Form.reportValidity();
    }
});

function toggleChatbot() {
    var chatbotContainer = document.getElementById("chatbot-container");
    chatbotContainer.style.display = chatbotContainer.style.display === "block" ? "none" : "block";
}


function navigateTo(page) {
    window.location.href = page;
}

function closeChatbot() {
    var chatbotContainer = document.getElementById("chatbot-container");
    chatbotContainer.style.display = "none";
}

showStep(currentStep);

function validateForm() {
    var income = document.getElementById('income').value;
    var employment = document.getElementById('employment').value;

    // Check if income and employment are selected
    if (income === "" || employment === "") {
        alert("Please select both Income Range and Type of Employment.");
        return false; // Prevent form submission
    }
    

    // If form is valid, display success message
    alert("Form submitted successfully!");
    step1Form.reset();
    step2Form.reset();
    step3Form.reset();
    return true; // Allow form submission
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        console.log("Go to previous step");
    }
}