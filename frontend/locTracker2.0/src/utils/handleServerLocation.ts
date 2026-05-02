import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import type VectorSource from "ol/source/Vector";
import type { LocationData } from "../customTypes/serLocUpdateTypes.ts";
import type Style from "ol/style/Style";

const handleServerLocUpdate = 
  (data: LocationData, 
  userFeatureRef: Map<string, Feature>, 
  otherSrcRef: VectorSource,
  otherStyle: Style
  ) => {
  const { userID, lat, long } = data;

  const coords = fromLonLat([long, lat]);

  let feature = userFeatureRef.get(userID);

  if (!feature) {
    feature = new Feature({
      geometry: new Point(coords),
    });

    feature.setStyle(otherStyle); 
    userFeatureRef.set(userID, feature);
    otherSrcRef.addFeature(feature);
  } else {
    (feature.getGeometry() as Point).setCoordinates(coords);
  }
};

export default handleServerLocUpdate;