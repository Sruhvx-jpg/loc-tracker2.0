import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

export const createOtherMarkerStyle = () => {
  return new Style({
    image: new Icon({
      src: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      scale: 0.05,
      anchor: [0.5, 1],
    }),
  });
};