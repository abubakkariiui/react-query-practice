/* eslint-disable no-unused-vars */
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import useSuperHeroesData from "../hooks/useSuperHeroesData";

const onSuccess = (data) => {
  console.log("Perform side effect after data fetching.", data);
};

const onError = (error) => {
  console.log("Perform side effect after encoutering error.", error);
};

export const RQSuperHeroesPage = () => {
  const { data, isLoading, isError, error, isFetching } = useSuperHeroesData(
    onSuccess,
    onError
  );
  // {
  //   refetchInterval: 2000                  // refetch at specific interval
  //   refetchIntervalInBackground: true
  // }
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

  // console.log(isLoading, isFetching);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map((hero, index) => {
        return (
          <div key={hero.id}>
            <Link to={`rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
