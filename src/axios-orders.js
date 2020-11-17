import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-17d60.firebaseio.com/",
});

export default instance;
