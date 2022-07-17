import { Zone } from "../models/Zone";
import React from "react";
import { Sprinkler } from "../models/Sprinkler";
import { radiansToDeg, degToRadians } from "../utilities";

interface Props {
  zone: Zone;
  sprinklers: Array<Sprinkler>;
  updateSprinkler: (
    sprinkler: Sprinkler,
    key: keyof Sprinkler,
    value: string | number
  ) => void;
  addSprinkler: (zone: Zone) => void;
}

export const SprinklerList = (props: Props) => {
  const { zone, sprinklers, updateSprinkler, addSprinkler } = props;
  return (
    <>
      <h4>Sprinklers</h4>
      <div>
        <button onClick={() => addSprinkler(zone)}>
          add sprinkler to zone
        </button>
      </div>
      {sprinklers.map((sprinkler) => {
        if (sprinkler.zoneId === zone.id) {
          return (
            <>
              <label>Label</label>
              <form>
                <input
                  type="text"
                  value={sprinkler.label}
                  onChange={(evt) =>
                    updateSprinkler(sprinkler, "label", evt.target.value)
                  }
                />
                <br />
                <label>X</label>
                <input
                  type="number"
                  value={sprinkler.x}
                  onChange={(evt) =>
                    updateSprinkler(sprinkler, "x", parseInt(evt.target.value))
                  }
                />
                <br />
                <label>Y</label>
                <input
                  type="number"
                  value={sprinkler.y}
                  onChange={(evt) =>
                    updateSprinkler(sprinkler, "y", parseInt(evt.target.value))
                  }
                />
                <br />
                <label>radius</label>
                <input
                  type="number"
                  value={sprinkler.r}
                  onChange={(evt) =>
                    updateSprinkler(sprinkler, "r", parseInt(evt.target.value))
                  }
                />
                <br />
                <label>start angle</label>
                <input
                  type="number"
                  value={radiansToDeg(sprinkler.startAngle)}
                  onChange={(evt) =>
                    updateSprinkler(
                      sprinkler,
                      "startAngle",
                      degToRadians(parseInt(evt.target.value))
                    )
                  }
                />
                <br />
                <label>end angle</label>
                <input
                  type="number"
                  value={radiansToDeg(sprinkler.endAngle)}
                  onChange={(evt) =>
                    updateSprinkler(
                      sprinkler,
                      "endAngle",
                      degToRadians(parseInt(evt.target.value))
                    )
                  }
                />
              </form>
            </>
          );
        }
      })}
    </>
  );
};
