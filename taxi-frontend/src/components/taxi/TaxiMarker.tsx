import { Marker, Popup } from "react-leaflet"
import { TaxiCar } from "./testTaxis"
import L from "leaflet"

type MarkerTaxiCar = TaxiCar & { center: [number, number]; rotation: number }

type TaxiMarkerProps = {
  taxi: MarkerTaxiCar
}

export default function TaxiMarker({ taxi }: TaxiMarkerProps) {
  const svgIcon = L.divIcon({
    html: `
    <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          // fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(${taxi.rotation})"
        >
          <circle cx="10" cy="10" r="10" fill="red" />
          <circle cx="10" cy="3" r="2" fill="aquamarine" />
        </svg>`,
    className: "svg-icon",
    iconSize: [20, 20],
    iconAnchor: [20, 20],
  })

  console.log(taxi)

  return (
    // <Marker key={taxi.VIN} position={[53.133298, 23.131781]}>
    <Marker key={taxi.VIN} position={taxi.center} icon={svgIcon}>
      <Popup>{`${taxi.licensePlate} - ${taxi.producent} ${taxi.model}`}</Popup>
    </Marker>
  )
}
