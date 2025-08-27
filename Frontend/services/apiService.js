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
  const token = localStorage.getItem("token");
  if (!token) return { success: false, error: "Debes iniciar sesión primero." };

  try {
    const response = await fetch("https://touched-included-elephant.ngrok-free.app/files", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.ok) {
      // 👇 Si la respuesta no es JSON válido, lo captura
      const data = await response.json().catch(() => null);
      if (data) return { success: true, files: data };
      return { success: false, error: "Respuesta inválida del servidor" };
    } else {
      const error = await response.json().catch(() => ({ error: "Error desconocido" }));
      return { success: false, error: error.error };
    }
  } catch (err) {
    console.error("Error al cargar archivos:", err);
    return { success: false, error: "No se pudo conectar con el servidor" };
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

// 🔑 Login
export async function login(username, password) {
  try {
    const response = await fetch("https://touched-included-elephant.ngrok-free.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // guarda el JWT
      return { success: true, token: data.token };
    } else {
      const error = await response.json().catch(() => ({ error: "Credenciales inválidas" }));
      return { success: false, error: error.error };
    }
  } catch (err) {
    console.error("Error en login:", err);
    return { success: false, error: "No se pudo conectar con el servidor" };
  }
}
