import { useQuery } from "@tanstack/react-query";
import { Grid } from "@mui/material";
import DataContext, { Data } from "../core/DataContext";
import Chart from "../components/Chart";
import Table from "../components/Table";
import { getCars } from "../core/api";
import { Car } from "../core/models";
import Error from "../components/Error";
import Loading from "../components/Loading";

const HomePage = () => {
  const query = useQuery<Car[]>(["cars"], getCars);

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <Error />;
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const data: Data = { cars: query.data ?? [] };

  return (
    <DataContext.Provider value={data}>
      <Grid container>
        <Grid item md={12} lg={6}>
          <Chart />
        </Grid>
        <Grid item md={12} lg={6}>
          <Table />
        </Grid>
      </Grid>
    </DataContext.Provider>
  );
};

export default HomePage;
