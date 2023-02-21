import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heros", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroeNames = data.data.map((hero) => hero.name);
    //   return superHeroeNames;
    // },
  });
};

export default useSuperHeroesData;
