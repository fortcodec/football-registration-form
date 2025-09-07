// frontend/script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const formMessage = document.getElementById('formMessage');

   if (!form) {
    console.error('Form with ID "registration-form" not found.');
    return;
  }
  
  // Helper: display a message to the user
  const displayMessage = (text, type = 'info') => {
    formMessage.textContent = text;
    formMessage.classList.remove('success', 'error', 'info');
    formMessage.classList.add(type);
  };

  // Optional: function to clear message after a delay
  const clearMessageAfter = (ms) => {
    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.classList.remove('success', 'error', 'info');
    }, ms);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation using HTML5 constraint validation
    if (!form.checkValidity()) {
      form.reportValidity();
      displayMessage('Please fill out all required fields correctly.', 'error');
      clearMessageAfter(4000);
      return;
    }

    // Collect data from the form
    const data = {
      fullName: document.getElementById('fullName').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      position: document.getElementById('position').value,
      dob: document.getElementById('dob').value
    };

    displayMessage('Submitting registration...', 'info');

    try {
      const apiUrl = 'http://localhost:5000/register';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        form.reset();
        displayMessage(result.message || 'Registration successful!', 'success');
      } else {
        displayMessage(result.message || 'Registration failed.', 'error');
      }
    } catch (err) {
      displayMessage('Registration failed: Network error', 'error');
    } finally {
      clearMessageAfter(4000);
    }
  });
});