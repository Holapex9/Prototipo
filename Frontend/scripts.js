// script.js

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe de forma tradicional

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Enviar los datos al backend
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: estudiante,
            password: 123456
        })
    });

    // Verificar la respuesta
    if (response.ok) {
        const data = await response.json(); // Obtener el token JWT

        // Guardar el JWT en localStorage
        localStorage.setItem('token', data.token);

        // Redirigir a la pantalla de carga de archivo (upload.html)
        window.location.href = 'upload.html';
    } else {
        // Mostrar mensaje de error si las credenciales son incorrectas
        document.getElementById('error-message').textContent = 'Credenciales incorrectas';
        document.getElementById('error-message').style.display = 'block';
    }
});
