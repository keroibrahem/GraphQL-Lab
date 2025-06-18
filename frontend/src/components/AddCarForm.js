import { useState } from "react";

export default function AddCarForm({ drivers, onAddCar }) {
  const [driverId, setDriverId] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCar(driverId, name, model);
    setName("");
    setModel("");
    setDriverId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={driverId} onChange={e => setDriverId(e.target.value)} required>
        <option value="">Select Driver</option>
        {drivers.map(driver => (
          <option key={driver.id} value={driver.id}>
            {driver.name}
          </option>
        ))}
      </select>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Car Name" required />
      <input value={model} onChange={e => setModel(e.target.value)} placeholder="Car Model" required />
      <button type="submit">Add Car</button>
    </form>
  );
}