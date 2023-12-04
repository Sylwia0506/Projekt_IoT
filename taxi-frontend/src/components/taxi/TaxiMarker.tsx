import { Marker, Popup } from "react-leaflet"
import { TaxiCar } from "./testTaxis"
import L from "leaflet"

type MarkerTaxiCar = TaxiCar & { center: [number, number]; rotation: number }

type TaxiMarkerProps = {
  taxi: MarkerTaxiCar
  selected: boolean
}

export default function TaxiMarker({ taxi, selected }: TaxiMarkerProps) {
  const svgIcon = L.divIcon({
    html: `
      <svg
        width="32"
        height="38"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(${taxi.rotation})"
      >
        <g>
          <rect
            rx="5"
            height="38"
            width="20"
            y="0"
            x="6"
            fill="${selected ? "blue" : "black"}"
          />
          <path d="
              M 8 13
              A 12 5 0 0 1 24 13
              L 23 20
              L 9 20
              Z
            "
            fill="white"
          />
          <path d="
              M 11.5 0.5
              a 5 4 0 0 0 -5 4
              l 5 0
              l 1 0
              l 0 -4
              Z
            "
            fill="${selected ? "yellow" : "white"}"
          />
          <path d="
              M 25.5 4.5
              a 5 4 0 0 0 -5 -4
              l -1 0
              l 0 4
              Z
            "
            fill="${selected ? "yellow" : "white"}"
          />
        </g>
      </svg>`,
    className: "svg-icon",
    iconSize: [20, 20],
    iconAnchor: [20, 20],
  })

  return (
    <Marker key={taxi.VIN} position={taxi.center} icon={svgIcon}>
      <Popup>{`${taxi.licensePlate} - ${taxi.producent} ${taxi.model}`}</Popup>
    </Marker>
  )
}
