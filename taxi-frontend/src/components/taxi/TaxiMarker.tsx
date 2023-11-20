import { Marker, Popup } from "react-leaflet"
import { TaxiCar } from "./testTaxis"

type TaxiMarkerProps = {
  taxi: TaxiCar
}

export default function TaxiMarker({ taxi }: TaxiMarkerProps) {
  return (
    <Marker key={taxi.VIN} position={[53.133298, 23.131781]}>
      <Popup>{`${taxi.licensePlate} - ${taxi.producent} ${taxi.model}`}</Popup>
    </Marker>
  )
}
