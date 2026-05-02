import ErrorUtil from "./error.ts"


const fetchCoords = async():Promise<{lat: number, long: number}> => {
    try {
        const data = await new Promise<GeolocationPosition>((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej)
        })

        return {
            lat: data.coords.latitude,
            long:data.coords.longitude
        }
    } catch (err: unknown) {
        if(err == 1){
            throw ErrorUtil.permDenied("Permission denied")
        }
        if(err == 2){
            throw ErrorUtil.navigatorNotFOund()
        }

        throw err
    }
}

export default fetchCoords