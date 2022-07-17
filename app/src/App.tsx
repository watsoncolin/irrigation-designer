import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useCallback } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Canvas from "./Canvas";
import { Zones } from "./data/Zones";
import { Sprinklers } from "./data/Sprinklers";
import { Zone } from "./models/Zone";
import { v4 as uuidv4 } from "uuid";
import { Sprinkler } from "./models/Sprinkler";
import { ZoneList } from "./components/ZoneList";
import { degToRadians, hexToRgb } from "./utilities";

const COLOR_PALETTE = {
  1: "#D3EBCD",
  2: "#AEDBCE",
  3: "#839AA8",
  4: "#635666",
};

const App = () => {
  const zoneData = new Zones();
  const sprinklerData = new Sprinklers();
  const [zones, setZones] = useState(zoneData.get());
  const [sprinklers, setSprinklers] = useState(sprinklerData.get());

  const addZone = useCallback(() => {
    zoneData.add({
      id: uuidv4(),
      label: "zone",
      color: COLOR_PALETTE[1],
      x: 0,
      y: 0,
      w: 500,
      h: 500,
    });
    setZones(zoneData.get());
  }, [zones, setZones]);

  const clearCanvas = useCallback(() => {
    sprinklerData.clear();
    zoneData.clear();
    setSprinklers(sprinklerData.get());
    setZones(zoneData.get());
  }, [setSprinklers, setZones]);

  const addSprinkler = useCallback(
    (zone: Zone) => {
      sprinklerData.add({
        id: uuidv4(),
        zoneId: zone.id,
        label: "a",
        color: COLOR_PALETTE[2],
        x: 100,
        y: 100,
        r: 50,
        startAngle: 0,
        endAngle: degToRadians(360),
      });
      setSprinklers(sprinklerData.get());
    },
    [sprinklers, setSprinklers]
  );

  const updateZone = useCallback(
    (zone: Zone, key: keyof Zone, value: any) => {
      zone[key] = value;
      zoneData.update(zone);
      setZones(zoneData.get());
    },
    [zones, setZones]
  );
  const updateSprinkler = useCallback(
    (sprinkler: Sprinkler, key: keyof Sprinkler, value: any) => {
      sprinkler[key] = value;
      sprinklerData.update(sprinkler);
      setSprinklers(sprinklerData.get());
    },
    [sprinklers, setSprinklers]
  );

  const draw = (ctx: CanvasRenderingContext2D) => {
    console.log(ctx.canvas.width);
    console.log(ctx.canvas.height);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    zones.map((zone) => {
      ctx.fillStyle = zone.color;
      ctx.fillRect(zone.x, zone.y, zone.w, zone.h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000000";
      ctx.fillText(zone.label, zone.x + zone.w / 2, zone.y + zone.h / 2);
    });
    sprinklers.map((sprinkler) => {
      ctx.beginPath();
      const rgb = hexToRgb(sprinkler.color)!;
      ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.6)`;
      ctx.moveTo(sprinkler.x, sprinkler.y);
      ctx.arc(
        sprinkler.x,
        sprinkler.y,
        sprinkler.r,
        sprinkler.startAngle,
        sprinkler.endAngle
      );
      ctx.lineTo(sprinkler.x, sprinkler.y);
      ctx.fill();
    });
  };

  return (
    <div className="App">
      <Container>
        <Row>header</Row>
        <Row>
          <Col>
            <>
              <div>
                <button onClick={() => clearCanvas()}>clear data</button>
              </div>
              <h2>Tool menu</h2>
              <h3>Zones</h3>
              <div>
                <button onClick={() => addZone()}>add zone</button>
              </div>
              <ZoneList
                zones={zones}
                sprinklers={sprinklers}
                updateZone={updateZone}
                updateSprinkler={updateSprinkler}
                addSprinkler={addSprinkler}
              />
            </>
          </Col>
          <Col>
            <Canvas draw={draw}></Canvas>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
