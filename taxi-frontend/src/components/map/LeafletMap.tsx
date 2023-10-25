import { MapContainer, TileLayer } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import "./LeafletMap.css"
import "leaflet/dist/leaflet.css"

const DEFAULT_COORDINATES: LatLngExpression = [53.133298, 23.131781]

function LeafletMap() {
  return (
    <MapContainer center={DEFAULT_COORDINATES} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default LeafletMap
