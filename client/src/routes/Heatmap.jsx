import React, { Component } from "react";
import HeatMap from "@uiw/react-heat-map";

class UserHeatmap extends Component {
  state = {
    range: 0,
    value: [
      { date: "2016/01/11", count: 2 },
      ...[...Array(17)].map((_, idx) => ({
        date: `2016/01/${idx + 10}`,
        count: idx,
      })),
      ...[...Array(17)].map((_, idx) => ({
        date: `2016/02/${idx + 10}`,
        count: idx,
      })),
      { date: "2016/04/12", count: 2 },
      { date: "2016/05/01", count: 5 },
      { date: "2016/05/02", count: 5 },
      { date: "2016/05/03", count: 1 },
      { date: "2016/05/04", count: 11 },
      { date: "2016/05/08", count: 32 },
    ],
  };

  render() {
    return (
      <div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={this.state.range}
          onChange={(e) => this.setState({ range: e.target.value })}
        />
        {this.state.range}
        <HeatMap
          value={this.state.value}
          width={600}
          startDate={new Date("2016/01/01")}
          legendRender={(props) => (
            <rect {...props} y={props.y + 10} rx={this.state.range} />
          )}
          rectProps={{
            rx: this.state.range,
          }}
        />
      </div>
    );
  }
}

export { UserHeatmap };
