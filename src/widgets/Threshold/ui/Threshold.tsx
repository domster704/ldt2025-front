import {curveMonotoneX} from "d3-shape";
import {line} from "@visx/shape";
import React from "react";
import {scaleLinear} from "@visx/scale";
import {useAppSelector} from "@app/store/store";

interface Point {
  x: number;
  y: number;
}

const LivePath = ({
                    color,
                    yDomain,
                    width,
                    height,
                    dataSource,
                  }: {
  color: string;
  yDomain: [number, number];
  width: number;
  height: number;
  dataSource: { x: number; y: number }[];
}) => {
  const xScale = scaleLinear({domain: [0, width], range: [0, width]});
  const yScale = scaleLinear({domain: yDomain, range: [height, 0]});

  const lineGenerator = line<Point>()
    .defined((d) => !isNaN(d.y))
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(curveMonotoneX);

  const pathD = lineGenerator(dataSource) || "";

  return (
    <path
      d={pathD}
      fill="none"
      stroke={color}
      strokeWidth={2}
    />
  );
};


const WIDTH = 1920;
const HEIGHT = 300;
const STEP = 10;
const SPEED = 50;

const Threshold = () => {
  const fhrData = useAppSelector(state => state.sessionStream.heartRates);
  const ucData = useAppSelector(state => state.sessionStream.uterineContractions);

  return (
    <svg width={WIDTH} height={HEIGHT} style={{border: "1px solid black"}}>
      <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#000" rx={14}/>

      <LivePath
        color="red"
        yDomain={[-200, 200]}
        width={WIDTH}
        height={HEIGHT}
        dataSource={fhrData}
      />

      <LivePath
        color="blue"
        yDomain={[0, 100]}
        width={WIDTH}
        height={HEIGHT}
        dataSource={ucData}
      />
    </svg>
  );
};


export default Threshold;