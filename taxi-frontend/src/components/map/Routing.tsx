import L from "leaflet"
import "leaflet-routing-machine"
import { Marker, Polygon } from "react-leaflet"
import { MapCar } from "../../store/map/types/mapTypes"

type RoutingProps = {
  taxi: MapCar | undefined
}

export default function Routing({ taxi }: RoutingProps) {
  const taxiCenter: L.LatLngExpression = [taxi.latitude, taxi.longitude]
  const startPos: L.LatLngExpression = [taxi.startLatitude, taxi.startLongitude]
  const endPos: L.LatLngExpression = [taxi.endLatitude, taxi.endLongitude]

  return (
    <>
      <Marker position={taxiCenter}></Marker>
      <Marker position={startPos}></Marker>
      <Marker position={endPos}></Marker>
      <Polygon positions={[startPos, endPos]} />
    </>
  )
}
