import React, { Component } from "react";
import HeatMap from "@uiw/react-heat-map";

class UserHeatmap extends Component {
  state = {
    range: 3,
  };

  render() {
    return (
      <div>
        <HeatMap
          style={{ color: "#fff" }}
          panelColors={{
            0: "#5d4f50",
            21600: "#822d3c",
            40000: "#cd3b4f",
            86400: "#fa0934",
          }}
          value={
            this.props.data
              ? this.props.data.map((item) => {
                  return {
                    date: item._id,
                    count: item.totalTime,
                  };
                })
              : []
          }
          width="100%"
          startDate={
            // last month
            new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
          }
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
