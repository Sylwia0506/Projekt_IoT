import { Marker, Popup } from "react-leaflet"
import { TaxiCar } from "./testTaxis"

type MarkerTaxiCar = TaxiCar & { center: [number, number] }

type TaxiMarkerProps = {
  taxi: MarkerTaxiCar
}

export default function TaxiMarker({ taxi }: TaxiMarkerProps) {
  return (
    // <Marker key={taxi.VIN} position={[53.133298, 23.131781]}>
    <Marker key={taxi.VIN} position={taxi.center}>
      <Popup>{`${taxi.licensePlate} - ${taxi.producent} ${taxi.model}`}</Popup>
    </Marker>
  )
}
