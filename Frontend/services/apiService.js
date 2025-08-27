export async function apiUpload(file) {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, error: "Debes iniciar sesión primero." };
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://touched-included-elephant.ngrok-free.app/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, ...data };
    } else {
      const error = await response.json();
      return { success: false, error: error.error || "Error al subir archivo" };
    }
  } catch (err) {
    console.error("Error en la conexión:", err);
    return { success: false, error: "No se pudo conectar con el servidor." };
  }
}
export async function apiGetFiles() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://touched-included-elephant.ngrok-free.app/files", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      return await response.json(); // lista de archivos
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error al cargar archivos:", err);
    return [];
  }
}
