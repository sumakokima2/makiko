import * as React from "react";
import { Cartesian3, Color, NearFarScalar } from "cesium";
import { ImageryLayer} from "cesium-react";


interface Props {
  id: string;
  name: string;
  lat: number;
  lon: number;
  lat1: number;
  lon1: number;
}

interface State {
  mapImage: ImageData | null;
}

const height = 400;

export default class ImageryLayer1 extends React.PureComponent<Props, State> {
  state: State = {
    mapImage: null,
  };

  private image: HTMLImageElement | null = null;

  render() {
    const { id, name, lat, lon } = this.props;
    const { mapImage } = this.state;
    if (!mapImage) {
      console.log("error");
      return null;
    }
    return (
      <ImageryLayer
        id={id}
        name={name}
        position={Cartesian3.fromDegrees(lon, lat, height)}
        billboard={{
          image: iconImage,
          scaleByDistance: new NearFarScalar(5000, 1, 50000, 0.2),
        }}
        polyline={{
          positions: [
            Cartesian3.fromDegrees(lon, lat, 0),
            Cartesian3.fromDegrees(lon, lat, height),
          ],
          material: Color.WHITE,
          show: true,
        }}
      />
    );
  }

  private getImage(thisimage: string | undefined): Promise<HTMLImageElement> {
    if (!thisimage) {
      return Promise.reject(undefined);
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = e => {
        reject(e);
      };
      img.src = thisimage as string;
    });
  }
}
