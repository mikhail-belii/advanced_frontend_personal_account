import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import markerIcon from "../../assets/icons/MapMarker.svg"

type MapProps = {
    latitude: number
    longitude: number
    addressName?: string
}

const Map = ({ latitude, longitude, addressName }: MapProps) => {
    const position: [number, number] = [latitude, longitude]
    const customIcon = new Icon({
        iconUrl: markerIcon,
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -36]
    })

    return (
        <div className="map-container">
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon}>
                    {addressName && <Popup>{addressName}</Popup>}
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map 