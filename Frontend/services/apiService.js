// apiService.js

// 🔹 Subir archivo
export async function apiUpload(file) {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, error: "Debes iniciar sesión primero." };

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://touched-included-elephant.ngrok-free.app/upload", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData
    });

    if (response.ok) return { success: true, ...(await response.json()) };
    return { success: false, error: (await response.json()).error || "Error al subir archivo" };

  } catch (err) {
    console.error("Error en la conexión:", err);
    return { success: false, error: "No se pudo conectar con el servidor." };
  }
}

// 🔹 Listar archivos
export async function apiGetFiles() {
  try {
    const response = await fetch("https://touched-included-elephant.ngrok-free.app/files");
    if (response.ok) return { success: true, files: await response.json() };
    return { success: false, error: "Error al cargar archivos" };
  } catch (err) {
    console.error("Error al cargar archivos:", err);
    return { success: false, error: "No se pudo conectar con el servidor." };
  }
}

// 🔹 Eliminar archivo
export async function apiDeleteFile(id) {
  try {
    const response = await fetch(`https://touched-included-elephant.ngrok-free.app/files/${id}`, {
      method: "DELETE"
    });
    if (response.ok) return { success: true, ...(await response.json()) };
    return { success: false, error: "No se pudo eliminar el archivo" };
  } catch (err) {
    console.error("Error al eliminar archivo:", err);
    return { success: false, error: "No se pudo conectar con el servidor." };
  }
}
