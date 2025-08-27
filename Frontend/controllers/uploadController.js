import { apiUpload, apiGetFiles } from "../services/apiService.js";
import { showSuccess, showError } from "../utils/uiHelpers.js";

document.addEventListener("DOMContentLoaded", async () => {
  const files = await apiGetFiles();
  files.forEach(file => addFileToTable(file.filename, file.fileType, file.fileSize));
});

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = document.getElementById('fileInput').files[0];
  if (!file) return showError("error-message", "Selecciona un archivo");

  const result = await apiUpload(file);
  if (result.success) {
    showSuccess("success-message", result.mensaje);
    addFileToTable(file.name, file.type, file.size);
  } else {
    showError("error-message", result.error || "Error al subir archivo");
  }
});

// función para añadir filas
function addFileToTable(name, type, size) {
  const tbody = document.querySelector("#filesTable tbody");
  const row = `<tr>
    <td>${name}</td>
    <td>${type}</td>
    <td>${(size / 1024).toFixed(2)} KB</td>
    <td><button class="btn btn-danger btn-sm">Eliminar</button></td>
  </tr>`;
  tbody.innerHTML += row;
}
