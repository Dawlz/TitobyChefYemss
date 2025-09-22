async function handleSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;

  const isLiveServer = window.location.hostname === '127.0.0.1' && window.location.port === '5500';
  const backendBase = isLiveServer ? 'http://localhost:3000' : '';
  try {
    
    const response = await fetch(`${backendBase}/subscribe`, {
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
      document.getElementById('message').innerHTML = '<p class = "success-signup">Thank you for signing up! We will notify you soon.</p>';
      document.getElementById('form-group').classList.add('hidden');
    }
  } 
  catch (error) {
    alert(`${error} Error encountered while submitting the email please try again.`);
  }
  document.getElementById('email').value = '';
}