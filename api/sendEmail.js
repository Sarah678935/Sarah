async function sendEmail(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      alert('Message sent successfully!');
    } else {
      alert('Failed to send message. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while sending the message.');
  }
}