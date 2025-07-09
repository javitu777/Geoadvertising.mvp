 // sdk.js

window.GeoAd = {
  getAd: async function (location, containerElement) {
    try {
      const res = await fetch(`https://geoadvertising-mvp-4.onrender.com/api/get-ad?location=${encodeURIComponent(location)}`);
      const anuncio = await res.json();

      if (!anuncio || !anuncio.imageUrl) {
        containerElement.innerHTML = "<p>No ads available</p>";
        return;
      }

      containerElement.innerHTML = `
        <div style="background:#fff; padding:10px; border:1px solid #ccc; max-width:320px;">
          <h4>${anuncio.title}</h4>
          <img src="${anuncio.imageUrl}" alt="Ad image" style="width:100%;">
        </div>
      `;
    } catch (error) {
      containerElement.innerHTML = "<p>Error loading ad</p>";
      console.error("GeoAd Error:", error);
    }
  }
};
