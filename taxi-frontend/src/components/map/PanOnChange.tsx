import { useMap } from "react-leaflet"
// import { LatLngExpression } from "leaflet"
import { useEffect } from "react"

type PanOnChangeProps = {
  // destination: LatLngExpression
  destination: [number, number] | undefined
}

export default function PanOnChange({ destination }: PanOnChangeProps) {
  const map = useMap()

  useEffect(() => {
    if (destination) {
      map.setView(destination)
    }
  }, [destination, map])

  return null
}
