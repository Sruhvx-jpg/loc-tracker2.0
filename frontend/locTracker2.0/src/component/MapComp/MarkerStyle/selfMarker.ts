import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

const createSelfMarkerStyle = () => {
  return new Style({
    image: new Icon({
      src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      scale: 0.05,
      anchor: [0.5, 1],
    }),
  });
};

export default createSelfMarkerStyle