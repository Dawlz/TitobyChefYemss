async function handleSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  try {
    
    const response = await fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email})
    });
    console.log(response);
    const result = await response.json();
    console.log(result)
    if (!result.success) {
      alert(`${result.message}`);
      console.log('Email submitted:', email);
    }
    if (result.success) {
      alert(`Success: ${result.message}` )
      document.getElementById('message').textContent = 'Thank you for signing up! We will notify you soon.';
    }
  } 
  catch (error) {
    alert(`${error} Error encountered while submitting the email please try again.`);
  }
  document.getElementById('email').value = '';
}