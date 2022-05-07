const apiConfig = {
  baseURL: "https://api.themoviedb.org/3/",

  apiKey: "5edba3948f6cf39c5da651f0e9324123",

  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,

  w500Image: (imgPath) => ` https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
