import {
  Circle,
  FeatureGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from "react-leaflet"
import { LatLngExpression } from "leaflet"
import "./LeafletMap.css"
import "leaflet/dist/leaflet.css"
import { TaxiCar } from "../taxi/testTaxis"
import TaxiMarker from "../taxi/TaxiMarker"

type LeafletMapProps = {
  activeTaxis: TaxiCar[]
}

const DEFAULT_COORDINATES: LatLngExpression = [53.133298, 23.131781]

function LeafletMap({ activeTaxis }: LeafletMapProps) {
  return (
    <MapContainer center={DEFAULT_COORDINATES} zoom={12} scrollWheelZoom={true}>
      <LayersControl position="bottomright">
        <LayersControl.Overlay checked name="Active taxi">
          {activeTaxis?.map((taxi) => {
            return <TaxiMarker key={taxi.VIN} taxi={taxi} />
          })}
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
    </MapContainer>
  )
}

export default LeafletMap
