 const GeoAd = {
  getAd: async function (location, containerElement, apiKey) {
    if (!apiKey) {
      containerElement.innerHTML = "<p style='color:red'>⚠️ Missing API Key</p>";
      return;
    }

    try {
      const res = await fetch(
        `https://geoadvertising-mvp-4.onrender.com/api/get-ad?location=${location}&key=${apiKey}`
      );
      if (!res.ok) {
        throw new Error("No ad found or invalid API Key");
      }

      const anuncio = await res.json();

      containerElement.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 10px; max-width: 300px;">
          <h3>${anuncio.title}</h3>
          <img src="${anuncio.imageUrl}" alt="Ad" style="width: 100%;" />
          <p style="font-size: 0.9em; color: #555;">Anunciante: ${anuncio.advertiser}</p>
        </div>
      `;
    } catch (err) {
      containerElement.innerHTML = `<p style="color:red">❌ ${err.message}</p>`;
    }
  },
};
