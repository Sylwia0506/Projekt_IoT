import { useState, useEffect } from "react"
import { useMap } from "react-leaflet"
import { MapCar } from "../../store/map/types/mapTypes"
import { LatLngExpression } from "leaflet"

type PanOnChangeProps = {
  taxi: MapCar | undefined
  trackTaxi: boolean
}
const PanOnChange = ({ taxi, trackTaxi }: PanOnChangeProps) => {
  const [prevId, setPrevId] = useState<string>("-1")
  const map = useMap()

  useEffect(() => {
    if (!taxi) {
      return
    }

    const taxiCenter: LatLngExpression = [taxi.latitude, taxi.longitude]

    if (trackTaxi) {
      map.setView(taxiCenter)
      return
    }
    if (taxi.id !== prevId) {
      setPrevId(taxi.id)
      map.setView(taxiCenter)
      return
    }
  }, [taxi, trackTaxi, map, prevId])

  return null
}

export default PanOnChange
