import { apiUpload, apiGetFiles, apiDeleteFile } from "../services/apiService.js";
import { showSuccess, showError } from "../utils/uiHelpers.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadFiles();
});

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("fileInput").files[0];
  if (!file) return showError("error-message", "Selecciona un archivo");

  const result = await apiUpload(file);
  if (result.success) {
    showSuccess("success-message", result.mensaje);
    await loadFiles();
  } else {
    showError("error-message", result.error || "Error al subir archivo");
  }
});

// 🔹 Cargar y mostrar los archivos de la BD
async function loadFiles() {
  const result = await apiGetFiles();
  const tbody = document.querySelector("#filesTable tbody");
  tbody.innerHTML = "";

  if (result.success && result.files.length > 0) {
    result.files.forEach((file) => {
      const sizeKB = file.size ? (file.size / 1024).toFixed(2) + " KB" : "N/A";
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${file.filename}</td>
        <td>${file.fileType || "desconocido"}</td>
        <td>${sizeKB}</td>
        <td>
          <button class="btn btn-danger btn-sm" data-id="${file.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Eventos para eliminar archivo
    document.querySelectorAll(".btn-danger").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const del = await apiDeleteFile(id);
        if (del.success) {
          showSuccess("success-message", del.mensaje);
          await loadFiles();
        } else {
          showError("error-message", del.error || "Error al eliminar archivo");
        }
      });
    });
  } else {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">No hay archivos subidos</td></tr>`;
  }
}
