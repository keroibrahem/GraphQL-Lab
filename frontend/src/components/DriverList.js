// src/components/DriverList.js
import { useQuery, gql } from "@apollo/client";

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

export default function DriverList() {
  const { loading, error, data } = useQuery(GET_DRIVERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.drivers.map((driver) => (
    <div key={driver.id}>
      <h3>{driver.name} (Age: {driver.age})</h3>
      <ul>
        {driver.cars.map((car) => (
          <li key={car.id}>
            {car.name} - {car.model}
          </li>
        ))}
      </ul>
    </div>
  ));
}
