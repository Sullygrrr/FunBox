// utils/preloadAssets.ts

export const preloadAssets = async (assets: { images: string[], sounds: string[] }) => {
  // Préchargement des images
  const imagePromises = assets.images.map((src) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    });
  });

  // Préchargement des sons
  const soundPromises = assets.sounds.map((src) => {
    return new Promise<HTMLAudioElement>((resolve, reject) => {
      const audio = new Audio(src);
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = () => reject(new Error(`Failed to load sound: ${src}`));
    });
  });

  // Attendre que toutes les images et sons soient chargés
  await Promise.all([...imagePromises, ...soundPromises]);
};

