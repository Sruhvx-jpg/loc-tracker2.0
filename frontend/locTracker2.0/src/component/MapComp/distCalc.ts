export function HaversineFormula(
    prevLat: number,
    prevLong: number,
    currLat: number,
    currLong: number
) {
    const R = 6371000;

    const toRad = (deg: number) => deg * (Math.PI / 180);

    const dLat = toRad(currLat - prevLat);
    const dLong = toRad(currLong - prevLong);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(prevLat)) *
            Math.cos(toRad(currLat)) *
            Math.sin(dLong / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}