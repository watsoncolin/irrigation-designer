import { Zone } from "../models/Zone";
import React from "react";
import { Sprinkler } from "../models/Sprinkler";
import { SprinklerList } from "./SprinklerList";

interface Props {
  zones: Array<Zone>;
  sprinklers: Array<Sprinkler>;
  updateZone: (zone: Zone, key: keyof Zone, value: string | number) => void;
  updateSprinkler: (
    sprinkler: Sprinkler,
    key: keyof Sprinkler,
    value: string | number
  ) => void;
  addSprinkler: (zone: Zone) => void;
}

export const ZoneList = (props: Props) => {
  const { zones, updateZone } = props;
  return (
    <>
      {zones.map((zone: Zone) => {
        return (
          <>
            <label>Label</label>
            <form>
              <input
                type="text"
                value={zone.label}
                onChange={(evt) => updateZone(zone, "label", evt.target.value)}
              />
              <br />
              <label>X</label>
              <input
                type="number"
                value={zone.x}
                onChange={(evt) =>
                  updateZone(zone, "x", parseInt(evt.target.value))
                }
              />
              <br />
              <label>Y</label>
              <input
                type="number"
                value={zone.y}
                onChange={(evt) =>
                  updateZone(zone, "y", parseInt(evt.target.value))
                }
              />
              <br />
              <label>height</label>
              <input
                type="number"
                value={zone.h}
                onChange={(evt) =>
                  updateZone(zone, "h", parseInt(evt.target.value))
                }
              />
              <br />
              <label>width</label>
              <input
                type="number"
                value={zone.w}
                onChange={(evt) =>
                  updateZone(zone, "w", parseInt(evt.target.value))
                }
              />
            </form>
            <div key={zone.id}>{zone.label}</div>
            <SprinklerList zone={zone} {...props} />
          </>
        );
      })}
    </>
  );
};
