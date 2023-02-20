import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const { data, isLoading, isError, error, isFetching } = useQuery(
    "super-heros",
    fetchSuperHeroes,
    // {
    //   cacheTime: 5000      // length of time before inactive data gets removed from the cache.
    // }
    // {
    //   staleTime: 30000     // length of time before your data becomes stale.
    // }
    // {
    //   refetchOnMount: true,          // refetching data on focus lost and gain
    //   refetchOnWindowFocus: true
    // }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map((hero, index) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
