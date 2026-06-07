const form = document.querySelector('form');
const successMessage = document.querySelector('.form-status.container');
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const phone = document.getElementById('phone').value;
    const problem = document.getElementById('issueType').value;

    
    // Here you can add code to send the form data to a server or an email address
    const formData = {
        access_key: 'adb7c06b-188a-409d-95cb-b45f0443703b',
        name: name,
        email: email,
        message: message,
        phone: phone,
        problem: problem
    };

    try {

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // <-- Do not put the access key here!
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            successMessage.style.display = 'block';
            const successMessageParagraph = document.createElement('p');
            successMessageParagraph.classList.add('success-message');
            successMessageParagraph.textContent = 'تم إرسال رسالتك بنجاح!';
            successMessage.appendChild(successMessageParagraph);
            form.reset();
        } else {
            successMessage.style.display = 'block';
            const successMessageParagraph = document.createElement('p');
            successMessageParagraph.classList.add('error-message');
            successMessageParagraph.textContent = 'يرجى ملء جميع الحقول قبل إرسال النموذج.';
            successMessage.appendChild(successMessageParagraph);
            form.reset();
        }   
    } catch (error) {
        successMessage.style.display = 'block';
        const successMessageParagraph = document.createElement('p');
        successMessageParagraph.classList.add('error-message');
        successMessageParagraph.textContent = 'حدث خطأ أثناء إرسال رسالتك. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.';
        successMessage.appendChild(successMessageParagraph);
        form.reset();
    }

    setTimeout(() => {
        successMessage.style.display = 'none';
        successMessage.innerHTML = '';
    }, 5000);
});