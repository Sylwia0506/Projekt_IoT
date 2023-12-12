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
import TaxiMarker from "../taxi/TaxiMarker"
import PanOnChange from "./PanOnChange"
import { MapCar } from "../../store/map/types/mapTypes"

type LeafletMapProps = {
  activeTaxis: MapCar[]
  selectedTaxi: MapCar | null
  selectTaxi: (taxi: MapCar) => void
  trackTaxi: boolean
}

const DEFAULT_COORDINATES: LatLngExpression = [53.133298, 23.131781]

function LeafletMap({
  activeTaxis,
  selectedTaxi,
  selectTaxi,
  trackTaxi,
}: LeafletMapProps) {
  return (
    <MapContainer center={DEFAULT_COORDINATES} zoom={12} scrollWheelZoom={true}>
      <LayersControl position="bottomright">
        <LayersControl.Overlay checked name="Active taxi">
          <LayerGroup>
            {activeTaxis?.map((taxi) => {
              return (
                <TaxiMarker
                  key={taxi.id}
                  taxi={taxi}
                  selected={selectedTaxi?.id === taxi.id}
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
          taxi={activeTaxis.find((taxi) => taxi.id === selectedTaxi.id)}
          trackTaxi={trackTaxi}
        />
      )}
    </MapContainer>
  )
}

export default LeafletMap
