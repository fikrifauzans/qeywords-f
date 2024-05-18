//  For Type Map
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { SearchIcon } from '@mui/icons-material';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useCallback, useMemo, useRef } from 'react';
import { DEFAULT_MAP } from 'app/utils/constant';
import { useEffect } from 'react';


Leaflet.Icon.Default.imagePath =
    '../node_modules/leaflet'
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




function DraggableMarker({ value, onChange }) {

    const [draggable, setDraggable] = useState(true)
    const [position, setPosition] = useState(value)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                    onChange(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    useEffect(() => {
        if (value !== "") {
            const val = JSON.parse(JSON.stringify(value));
            setPosition(val);

        }
    }, [value])


    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : (<b>Click here to make marker draggable</b>)}
                </span>
            </Popup>
        </Marker>
    )
}

const MapPicker = ({ value, onChange, onClear }) => {

    const [position, setPosition] = useState(DEFAULT_MAP)
    const handleDraggableMarker = (val) => {
        setPosition(val)
        onChange(val)
    }
    const handleClear = () => {
        setPosition(DEFAULT_MAP);
        onClear();
    };


    useEffect(() => {
        if (value !== "") {
            setPosition(JSON.parse(value))

        };

    }, [value])


    return (<>
        <MapContainer
            style={{ height: '400px', width: '100wh' }}
            fullWidth center={position} zoom={11} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker onChange={handleDraggableMarker} value={position} />
        </MapContainer>
        <TextField
            style={{ marginTop: '10px' }}
            fullWidth
            label="Column String"
            type="text"
            name="column_string"
            value={value}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClear} edge="end">
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    </>
    )
}


export default MapPicker;