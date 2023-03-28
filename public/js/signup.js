const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

function toLogin(){
  document.location.replace('/login')
}

document
  .querySelector('.to-login')
  .addEventListener('click', toLogin)

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
