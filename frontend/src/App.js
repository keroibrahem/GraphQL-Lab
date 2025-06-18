// App.js
import React from "react";
import { ApolloProvider, useQuery, useMutation, gql } from "@apollo/client";
import client from "./ApolloClient";
import DriverList from "./components/DriverList";
import AddCarForm from "./components/AddCarForm";

const GET_DRIVERS = gql`
  query {
    drivers {
      id
      name
      age
      cars {
        id
        name
        model
      }
    }
  }
`;

const ADD_CAR = gql`
  mutation AddCar($driverId: ID!, $name: String!, $model: String!) {
    addCar(driverId: $driverId, name: $name, model: $model) {
      id
      name
      model
    }
  }
`;

function AppContent() {
  const { loading, error, data, refetch } = useQuery(GET_DRIVERS);
  const [addCar] = useMutation(ADD_CAR);

  const handleAddCar = async (driverId, name, model) => {
    await addCar({ variables: { driverId, name, model } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading drivers</p>;

  return (
    <div>
      <h1>Drivers and Cars</h1>
      <AddCarForm drivers={data.drivers} onAddCar={handleAddCar} />
      <DriverList drivers={data.drivers} />
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}