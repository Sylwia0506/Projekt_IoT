export type TaxiCar = {
  VIN: string
  licensePlate: string
  model: string
  producent: string
  driver: string
  fuelConsumption: number
}

export type MarkerTaxiCar = TaxiCar & {
  center: [number, number]
  rotation: number
}

export const testTaxis: TaxiCar[] = [
  {
    VIN: "12345678901234561",
    licensePlate: "BIA1234",
    model: "Passat",
    producent: "Volkswagen",
    driver: "",
    fuelConsumption: 10.0,
  },
  {
    VIN: "12345678901234562",
    licensePlate: "BIA5678",
    model: "Passat",
    producent: "Volkswagen",
    driver: "Jan Kowalski",
    fuelConsumption: 10.0,
  },
  {
    VIN: "12345678901234563",
    licensePlate: "BIA9012",
    model: "Passat",
    producent: "Volkswagen",
    driver: "Jan Kowalski",
    fuelConsumption: 10.0,
  },
  {
    VIN: "12345678901234564",
    licensePlate: "BIA3456",
    model: "Passat",
    producent: "Volkswagen",
    driver: "Jan Kowalski",
    fuelConsumption: 10.0,
  },
  {
    VIN: "12345678901234565",
    licensePlate: "BIA7890",
    model: "Passat",
    producent: "Volkswagen",
    driver: "Jan Kowalski",
    fuelConsumption: 10.0,
  },
  {
    VIN: "12345678901234566",
    licensePlate: "BIA1234",
    model: "Passat",
    producent: "Volkswagen",
    driver: "Jan Kowalski",
    fuelConsumption: 10.1,
  },
  {
    VIN: "12345678901234567",
    licensePlate: "BIA1234",
    model: "Passat",
    producent: "Volkswagen",
    driver: "Jan Kowalski",
    fuelConsumption: 10.4,
  },
  {
    VIN: "12345678901234568",
    licensePlate: "BIA1234",
    model: "Passat",
    producent: "Volkswagen",
    driver: "Jan Kowalski",
    fuelConsumption: 10.7,
  },
  {
    VIN: "12345678901234569",
    licensePlate: "BIA1234",
    model: "Passat",
    producent: "Volkswagen",
    driver: "Jan Kowalski",
    fuelConsumption: 10.0,
  },
]
