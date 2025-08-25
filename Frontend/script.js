// script.js

document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe de forma tradicional

    // Obtener el archivo seleccionado
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];  // Primer archivo seleccionado

    const token = localStorage.getItem('token');  // Obtener el token JWT desde localStorage

    if (!token) {
        alert("Por favor, inicie sesión primero.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);  // Agregar el archivo al FormData

    // Hacer la petición POST al backend
    const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`  // Agregar el token en el header
        },
        body: formData
    });

    // Verificar si la subida fue exitosa
    if (response.ok) {
        const data = await response.json();  // Si la subida es exitosa, obtener la respuesta
        document.getElementById('success-message').textContent = 'Archivo subido exitosamente';
        document.getElementById('success-message').style.display = 'block';  // Mostrar el mensaje de éxito
    } else {
        const error = await response.text();  // Si ocurre un error, obtener el mensaje de error
        document.getElementById('error-message').textContent = error;
        document.getElementById('error-message').style.display = 'block';  // Mostrar el mensaje de error
    }
});
