const API_URL = "https://backgeneromusical.onrender.com/api/songs";

// POST - Agregar canción
document.getElementById("songForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await postSong();
});

// POST - Agregar y limpiar
async function postSong() {
  const song = {
    song_name: document.getElementById("song_name").value,
    genre: document.getElementById("genre").value,
    artist: document.getElementById("artist").value,
    album: document.getElementById("album").value,
    author: document.getElementById("author").value,
    duration: document.getElementById("duration").value,
    cover_url: document.getElementById("cover_url").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    });

    const result = await response.json();
    console.log("✅ Canción agregada:", result);

    // Limpiar formulario
    document.getElementById("songForm").reset();

    // Recargar canciones automáticamente
    await getSongs();

    // Scroll automático hacia la lista
    setTimeout(() => {
      document.getElementById("songsList").scrollIntoView({ behavior: "smooth" });
    }, 300);

    // Mensaje de éxito
    alert("✅ ¡Canción agregada exitosamente!");

  } catch (error) {
    console.error("❌ Error al agregar canción:", error);
    alert("❌ Error al agregar la canción");
  }
}

// GET - Cargar canciones
async function getSongs() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("🎵 Canciones:", data);

    const list = document.getElementById("songsList");
    list.innerHTML = ""; // limpiar

    data.forEach((song) => {
      const div = document.createElement("div");
      div.className = "song-card";

      div.innerHTML = `
        <img src="${song.cover_url}" alt="Portada">
        <div class="song-info">
          <h3>${song.song_name}</h3>
          <p><strong>Género:</strong> ${song.genre}</p>
          <p><strong>Artista:</strong> ${song.artist}</p>
          <p><strong>Álbum:</strong> ${song.album}</p>
          <p><strong>Autor:</strong> ${song.author}</p>
          <p><strong>Duración:</strong> ${song.duration}</p>
        </div>
        <button onclick="deleteSong(${song.id})">Eliminar</button>
      `;

      list.appendChild(div);
    });

  } catch (error) {
    console.error("❌ Error al cargar canciones:", error);
  }
}

// DELETE - Eliminar canción
async function deleteSong(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log("🗑️ Eliminado:", result);
    getSongs();
  } catch (error) {
    console.error("❌ Error al eliminar:", error);
  }
}
