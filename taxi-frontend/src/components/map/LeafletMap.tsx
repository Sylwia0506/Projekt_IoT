import { useEffect, useState } from "react"
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from "react-leaflet"
import { LatLngExpression } from "leaflet"
import "./LeafletMap.css"
import "leaflet/dist/leaflet.css"
import { TaxiCar, MarkerTaxiCar } from "../taxi/testTaxis"
import TaxiMarker from "../taxi/TaxiMarker"
import PanOnChange from "./PanOnChange"

type LeafletMapProps = {
  activeTaxis: TaxiCar[]
  selectedTaxi: TaxiCar | null
  selectTaxi: (taxi: TaxiCar) => void
  trackTaxi: boolean
}

const DEFAULT_COORDINATES: LatLngExpression = [53.133298, 23.131781]

function LeafletMap({
  activeTaxis,
  selectedTaxi,
  selectTaxi,
  trackTaxi,
}: LeafletMapProps) {
  const newTaxis = activeTaxis.map((taxi, index) => ({
    ...taxi,
    center: [53.133298 + index * 0.01, 23.131781 - index * 0.01] as [
      number,
      number,
    ],
    rotation: Math.floor(Math.random() * 360),
  }))
  const [tempTaxis, setTempTaxis] = useState<MarkerTaxiCar[]>(newTaxis)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTempTaxis(
        tempTaxis.map((taxi) => ({
          ...taxi,
          center: Math.floor(Math.random() * 2)
            ? [taxi.center[0] + 0.0005, taxi.center[1] + 0.0005]
            : [taxi.center[0] - 0.0005, taxi.center[1] - 0.0005],
          rotation: Math.floor(Math.random() * 2)
            ? taxi.rotation + 30
            : taxi.rotation - 30,
        }))
      )
    }, 1500)

    return () => clearInterval(intervalId)
  }, [tempTaxis, setTempTaxis])

  return (
    <MapContainer center={DEFAULT_COORDINATES} zoom={12} scrollWheelZoom={true}>
      <LayersControl position="bottomright">
        <LayersControl.Overlay checked name="Active taxi">
          <LayerGroup>
            {tempTaxis?.map((taxi) => {
              return (
                <TaxiMarker
                  key={taxi.VIN}
                  taxi={taxi}
                  selected={selectedTaxi?.VIN === taxi.VIN}
                  selectTaxi={selectTaxi}
                />
              )
            })}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Paths">
          <FeatureGroup pathOptions={{ color: "purple" }}>
            <Circle center={DEFAULT_COORDINATES} radius={200} />
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedTaxi && (
        <PanOnChange
          taxi={tempTaxis.find((taxi) => taxi.VIN === selectedTaxi.VIN)}
          trackTaxi={trackTaxi}
        />
      )}
    </MapContainer>
  )
}

export default LeafletMap
