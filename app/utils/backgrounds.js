// Curated Unsplash photo backgrounds for the wallpaper renderer.
// Browser-only: loadBackgroundImage uses HTMLImageElement.

/** @type {Map<string, HTMLImageElement>} */
const loadedImages = new Map();

/** @type {Map<string, Promise<HTMLImageElement>>} */
const pendingLoads = new Map();

export const BACKGROUNDS = [
  {
    id: "dusk-gradient",
    label: "Dusk gradient",
    fullUrl:
      "https://images.unsplash.com/photo-1760865245994-741b5e06317e?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1760865245994-741b5e06317e?auto=format&fit=crop&w=200&q=60",
    photographer: "Philipp Hubert",
    profileUrl: "https://unsplash.com/@philipphubert?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/gradient-of-blue-to-orange-sky-at-dusk-_kan0MnNd4E?utm_source=ome&utm_medium=referral",
    dominantColor: "#1e3a8a",
    suggestedText: "light",
  },
  {
    id: "ocean-teal",
    label: "Teal ocean",
    fullUrl:
      "https://images.unsplash.com/photo-1575372030115-a03ee9c1a7a3?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1575372030115-a03ee9c1a7a3?auto=format&fit=crop&w=200&q=60",
    photographer: "Rayyu Maldives",
    profileUrl: "https://unsplash.com/@rayyu?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/aerial-photo-of-calm-ocean-7_mHxdheHDA?utm_source=ome&utm_medium=referral",
    dominantColor: "#0e7490",
    suggestedText: "light",
  },
  {
    id: "mountain-fog",
    label: "Foggy mountains",
    fullUrl:
      "https://images.unsplash.com/photo-1746157981411-05e0b952d3ec?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1746157981411-05e0b952d3ec?auto=format&fit=crop&w=200&q=60",
    photographer: "Yuheng Ouyang",
    profileUrl: "https://unsplash.com/@govizlora?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/mountains-are-shrouded-in-a-misty-cloudy-atmosphere-YZ_DKKufjI0?utm_source=ome&utm_medium=referral",
    dominantColor: "#64748b",
    suggestedText: "light",
  },
  {
    id: "desert-dune",
    label: "Desert dunes",
    fullUrl:
      "https://images.unsplash.com/photo-1770635427503-152eb094197b?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1770635427503-152eb094197b?auto=format&fit=crop&w=200&q=60",
    photographer: "Jan Suchanek",
    profileUrl: "https://unsplash.com/@johnny_slav?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/golden-sand-dunes-with-rippling-textures-at-sunset-iMOfqXZh3hY?utm_source=ome&utm_medium=referral",
    dominantColor: "#d97706",
    suggestedText: "dark",
  },
  {
    id: "forest-dark",
    label: "Deep forest",
    fullUrl:
      "https://images.unsplash.com/photo-1761469445230-55614d2ba5d0?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1761469445230-55614d2ba5d0?auto=format&fit=crop&w=200&q=60",
    photographer: "Zoltan Komives",
    profileUrl: "https://unsplash.com/@landr0ver?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/dark-moody-forest-with-faint-light-filtering-through-fkAYrP9eSxI?utm_source=ome&utm_medium=referral",
    dominantColor: "#14532d",
    suggestedText: "light",
  },
  {
    id: "city-night",
    label: "City lights",
    fullUrl:
      "https://images.unsplash.com/photo-1765437777365-8c20633f30a4?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1765437777365-8c20633f30a4?auto=format&fit=crop&w=200&q=60",
    photographer: "Tsuyoshi Kozu",
    profileUrl: "https://unsplash.com/@tsuyoshikozu?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/blurred-city-lights-at-night-create-a-bokeh-effect-luAFESue6Ws?utm_source=ome&utm_medium=referral",
    dominantColor: "#0f172a",
    suggestedText: "light",
  },
  {
    id: "sakura-soft",
    label: "Soft sakura",
    fullUrl:
      "https://images.unsplash.com/photo-1519882189396-71f93cb4714b?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1519882189396-71f93cb4714b?auto=format&fit=crop&w=200&q=60",
    photographer: "Masaaki Komori",
    profileUrl: "https://unsplash.com/@gaspanik?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/pink-cherry-blossom-flower-_SbeCWYjwCQ?utm_source=ome&utm_medium=referral",
    dominantColor: "#f9a8d4",
    suggestedText: "dark",
  },
  {
    id: "snow-minimal",
    label: "Snow field",
    fullUrl:
      "https://images.unsplash.com/photo-1610443817209-27cb6f47fd64?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1610443817209-27cb6f47fd64?auto=format&fit=crop&w=200&q=60",
    photographer: "Lydia Gulinkina",
    profileUrl: "https://unsplash.com/@madamrazor?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/white-snow-covered-field-during-daytime-cpfziUYu0uE?utm_source=ome&utm_medium=referral",
    dominantColor: "#e2e8f0",
    suggestedText: "dark",
  },
  {
    id: "sunset-warm",
    label: "Warm sunset",
    fullUrl:
      "https://images.unsplash.com/photo-1504941214544-9c1c44559ab4?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1504941214544-9c1c44559ab4?auto=format&fit=crop&w=200&q=60",
    photographer: "Mohammad Alizade",
    profileUrl: "https://unsplash.com/@mohamadaz?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/desert-under-starry-sky-S5uV7ro4UPY?utm_source=ome&utm_medium=referral",
    dominantColor: "#ea580c",
    suggestedText: "light",
  },
  {
    id: "marble-light",
    label: "Light marble",
    fullUrl:
      "https://images.unsplash.com/photo-1694378061128-d3df24b1ae47?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1694378061128-d3df24b1ae47?auto=format&fit=crop&w=200&q=60",
    photographer: "Akbar Nemati",
    profileUrl: "https://unsplash.com/@akbarnemati?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/a-close-up-of-a-white-marble-surface-ZVMlab81PFY?utm_source=ome&utm_medium=referral",
    dominantColor: "#f1f5f9",
    suggestedText: "dark",
  },
  {
    id: "night-sky",
    label: "Night sky",
    fullUrl:
      "https://images.unsplash.com/photo-1491439005413-4ed9f58ef2ad?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1491439005413-4ed9f58ef2ad?auto=format&fit=crop&w=200&q=60",
    photographer: "Greg Rakozy",
    profileUrl: "https://unsplash.com/@grakozy?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/a-night-sky-filled-with-lots-of-stars-YRwM11f8Cgo?utm_source=ome&utm_medium=referral",
    dominantColor: "#0b1220",
    suggestedText: "light",
  },
  {
    id: "paper-neutral",
    label: "Neutral paper",
    fullUrl:
      "https://images.unsplash.com/photo-1737276745810-ce753d468a34?auto=format&fit=crop&w=1600&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1737276745810-ce753d468a34?auto=format&fit=crop&w=200&q=60",
    photographer: "Alexander Nedviga",
    profileUrl: "https://unsplash.com/@sanches812?utm_source=ome&utm_medium=referral",
    photoUrl:
      "https://unsplash.com/photos/close-up-of-a-textured-off-white-surface-OvkSAWUicYM?utm_source=ome&utm_medium=referral",
    dominantColor: "#f5f0e8",
    suggestedText: "dark",
  },
];

/** @param {string} id */
export function getBackground(id) {
  return BACKGROUNDS.find((b) => b.id === id);
}

/**
 * Load a background photo as an HTMLImageElement. Cached by id after a successful load.
 * @param {string} id
 * @returns {Promise<HTMLImageElement>}
 */
export function loadBackgroundImage(id) {
  const entry = getBackground(id);
  if (!entry) {
    return Promise.reject(new Error(`Unknown background id: ${id}`));
  }

  const cached = loadedImages.get(id);
  if (cached) {
    return Promise.resolve(cached);
  }

  const pending = pendingLoads.get(id);
  if (pending) {
    return pending;
  }

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      pendingLoads.delete(id);
      loadedImages.set(id, img);
      resolve(img);
    };
    img.onerror = () => {
      pendingLoads.delete(id);
      reject(new Error(`Failed to load background: ${id}`));
    };
    img.src = entry.fullUrl;
  });

  pendingLoads.set(id, promise);
  return promise;
}
