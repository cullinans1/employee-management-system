async function logout() {
    const response = await fetch('/logout', {  //need another logout for the employee logout   
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert("No user is logged in!");
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);
  