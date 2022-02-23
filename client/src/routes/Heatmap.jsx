import React, { useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import Tooltip from "@uiw/react-tooltip";

import { formatDuration } from "../utility";

function UserHeatmap(props) {
  const [range, setRange] = useState(null);

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
          props.data
            ? props.data.map((item) => {
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
          new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)
        }
        legendRender={(props) => (
          <rect {...props} y={props.y + 10} rx={range} />
        )}
        rectProps={{
          rx: range,
        }}
        rectRender={(props, data) => {
          if (!data.count) return <rect {...props} />;
          return (
            <Tooltip
              key={props.key}
              placement="top"
              content={`Study Time: ${formatDuration(data.count) || 0}`}
            >
              <rect {...props} />
            </Tooltip>
          );
        }}
      />
    </div>
  );
}

export { UserHeatmap };
