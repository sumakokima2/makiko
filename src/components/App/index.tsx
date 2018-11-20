import * as React from 'react';
import Earth from "../Earth";
import loadData from "./data";
// import loadData from "./mapdata";

import "./style.css";

interface State {
  data: Data[];
  Mapdata: MapData[];
}

class App extends React.Component<{}, State> {
  state = {
    data: [],
    Mapdata: [],
  };
 
  async componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const result = await loadData();
    this.setState({
      data: result.data,
      Mapdata: result.Mapdata,
    });
  }

  public render() {
    return <Earth data={this.state.data} Mapdata={this.state.Mapdata} />;
  }
};
export default App;