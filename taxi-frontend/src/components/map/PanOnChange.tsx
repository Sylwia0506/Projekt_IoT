import { useState, useEffect } from "react"
import { useMap } from "react-leaflet"
import { MarkerTaxiCar } from "../taxi/testTaxis"

type PanOnChangeProps = {
  taxi: MarkerTaxiCar | undefined
  trackTaxi: boolean
}

export default function PanOnChange({ taxi, trackTaxi }: PanOnChangeProps) {
  const [prevTaxiVIN, setPrevTaxiVIN] = useState<string>("-1")
  const map = useMap()

  useEffect(() => {
    if (!taxi) {
      return
    }
    if (trackTaxi) {
      map.setView(taxi.center)
      return
    }
    if (taxi.VIN !== prevTaxiVIN) {
      setPrevTaxiVIN(taxi.VIN)
      map.setView(taxi.center)
      return
    }
  }, [taxi, trackTaxi, map])

  return null
}
