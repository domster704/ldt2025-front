import {curveMonotoneX} from "d3-shape";
import {line} from "@visx/shape";
import {useEffect, useState} from "react";
import {scaleLinear} from "@visx/scale";
import React from "react";

interface Point {
  x: number;
  y: number;
}

const LivePath = ({
                    color,
                    yDomain,
                    generator,
                    width,
                    height,
                    step,
                    speed,
                  }: {
  color: string;
  yDomain: [number, number];
  generator: () => number;
  width: number;
  height: number;
  step: number;
  speed: number;
}) => {
  const [data, setData] = useState<Point[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let x = 0;
    const id = setInterval(() => {
      x += step;
      setData((old) => [...old, {x, y: generator()}]);
      if (x > width) {
        setOffset((prev) => prev - step);
      }
    }, speed);
    return () => clearInterval(id);
  }, [generator, step, speed, width]);

  const xScale = scaleLinear({domain: [0, width], range: [0, width]});
  const yScale = scaleLinear({domain: yDomain, range: [height, 0]});

  const lineGenerator = line<Point>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(curveMonotoneX);

  const pathD = lineGenerator(data) || "";

  return <path d={pathD} fill="none" stroke={color} strokeWidth={2} transform={`translate(${offset},0)`}/>;
};

const WIDTH = 1920;
const HEIGHT = 300;
const STEP = 10;
const SPEED = 50;

const Threshold = () => {
  return (
    <svg width={WIDTH} height={HEIGHT} style={{border: "1px solid black"}}>
      <LivePath
        color="red"
        yDomain={[50, 200]}
        generator={() => 120 + Math.sin(Date.now() / 300) * 20 + Math.random() * 10}
        width={WIDTH}
        height={HEIGHT}
        step={STEP}
        speed={SPEED}
      />

      <LivePath
        color="blue"
        yDomain={[0, 100]}
        generator={() => (Math.sin(Date.now() / 1000) + 1) * 40 + Math.random() * 5}
        width={WIDTH}
        height={HEIGHT}
        step={STEP}
        speed={SPEED}
      />
    </svg>
  );
};

export default Threshold;