import React, { useRef, useEffect } from "react";

type props = {
  draw: (ctx: CanvasRenderingContext2D) => any;
};

const Canvas = (props: props) => {
  const { draw, ...rest } = props;

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = (canvasRef.current as unknown) as HTMLCanvasElement;
    if (canvas == null) {
      throw new Error("canvas unexpectedly null");
    }
    const context = canvas.getContext("2d");
    if (context == null) {
      throw new Error("context unexpectedly null");
    }

    const render = () => {
      draw(context);
    };
    render();
  }, [draw]);

  return <canvas width="500" height="500" ref={canvasRef} {...rest} />;
};

export default Canvas;
