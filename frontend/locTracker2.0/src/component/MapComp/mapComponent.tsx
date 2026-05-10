import { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import fetchCoords from "../../utils/getUserLocation.ts";
import socket from "../socketComp/socket.ts";
import type { LocationData } from "../../customTypes/serLocUpdateTypes.ts";
import handleServerLocUpdate from "../../utils/handleServerLocation.ts";
import { socketConUtil } from "../../utils/onCon.ts";
import createSelfMarkerStyle from "./MarkerStyle/selfMarker.ts";
import { createOtherMarkerStyle } from "./MarkerStyle/otherMarker.ts";
import { HaversineFormula } from "./distCalc.ts";
{/*  */ }
function MapComponent() {

    const prevCoords = useRef<{ lat: number, long: number } | null>(null)
    const threshold: number = 10

    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapObj = useRef<Map | null>(null)

    const selfSrc = useRef(new VectorSource())
    const otherSrc = useRef(new VectorSource())

    const selfFeature = useRef<Feature | null>(null)
    const userFeature = useRef<globalThis.Map<string, Feature>>(new globalThis.Map())

    const selfStyle = useRef(createSelfMarkerStyle());
    const otherStyle = useRef(createOtherMarkerStyle());

    const LocFetchTime: number = 2000


    //--------------------------------------Initializin the map-----------------------------------------
    useEffect(() => {
        if (!mapRef.current) return;

        const baseLayer = new TileLayer({
            source: new OSM(),
        });

        const selfLayer = new VectorLayer({
            source: selfSrc.current,
        });

        const othersLayer = new VectorLayer({
            source: otherSrc.current,
        });

        const map = new Map({
            target: mapRef.current,
            layers: [baseLayer, othersLayer, selfLayer],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });

        mapObj.current = map;

        return () => {
            map.setTarget(undefined);
        };
    }, []);

    //--------------------------initialize a socket-------------------------------------------
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        return socketConUtil(
            socket,
            'connect',
            () => {
                console.log("CONNECTED SOCKET ID: ", socket.id);
            }
        );
    }, []);

    //--------------------------self location reading and writing--------------------------------------- 
    useEffect(() => {
        const interval = setInterval(
            async () => {
                try {
                    const { lat, long } = await fetchCoords()
                    const coords = fromLonLat([long, lat]);
                    console.log("Location fetched successfully")

                    if (!selfFeature.current) {
                        selfFeature.current = new Feature({
                            geometry: new Point(coords),
                        });

                        selfFeature.current.setStyle(selfStyle.current);
                        selfSrc.current.addFeature(selfFeature.current);
                        mapObj.current?.getView().setCenter(coords);
                    } else {
                        (selfFeature.current.getGeometry() as Point).setCoordinates(coords);
                    }

                    if (!socket.connected || !socket.id) return

                    if (!prevCoords.current) {
                        prevCoords.current = { lat, long }

                        socket.emit('client:location:update', {
                            userID: socket.id,
                            socketId: socket.id,
                            lat: lat,
                            long: long
                        })

                        return
                    }

                    const DiffIndist = HaversineFormula(
                        prevCoords.current.lat,
                        prevCoords.current.long,
                        lat,
                        long
                    )

                    if (DiffIndist >= threshold) {
                        socket.emit('client:location:update', {
                            userID: socket.id,
                            socketId: socket.id,
                            lat: lat,
                            long: long
                        })

                        prevCoords.current = {lat, long}
                    }

                } catch (error: unknown) {
                    console.error("Location Error: ", error);
                }
            }, LocFetchTime)


        // DO NOT REMOVE clearInterval
        return () => clearInterval(interval)
    }, [])


    //------------------------Recieving other's location from server-------------------------------------
    useEffect(() => {
        const mainHandler = (data: LocationData) => {
            if (data.socketId === socket.id) return
            handleServerLocUpdate(data, userFeature.current, otherSrc.current, otherStyle.current)
        }

        socket.on('server:location:update', mainHandler)

        return () => {
            socket.off('server:location:update', mainHandler)
        }
    }, [])


    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "100vh" }}
        />
    );
};

export default MapComponent