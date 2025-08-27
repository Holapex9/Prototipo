async function loadFiles() {
  const result = await apiGetFiles();
  const tbody = document.querySelector("#filesTable tbody");
  tbody.innerHTML = "";

  // ✅ Si el backend devuelve un array plano, lo normalizamos
  const files = Array.isArray(result) ? result : (result.files || []);

  if (files.length > 0) {
    files.forEach(file => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${file.filename}</td>
        <td>${file.size ? (file.size / 1024).toFixed(2) + " KB" : "N/A"}</td>
        <td>
          <button class="btn btn-danger btn-sm" data-id="${file.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Eventos para eliminar
    document.querySelectorAll(".btn-danger").forEach(btn => {
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
    tbody.innerHTML = `<tr><td colspan="3">No hay archivos subidos</td></tr>`;
  }
}
