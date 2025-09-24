import {curveMonotoneX} from "d3-shape";
import {line} from "@visx/shape";
import React, {useEffect, useState} from "react";
import {scaleLinear} from "@visx/scale";
import {useAppSelector} from "@app/store/store";
import {StreamPoint} from "@entities/session-stream/model/types";

interface Point {
  x: number;
  y: number;
}

const STEP = 10;

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
  dataSource: StreamPoint[];
}) => {
  const [offset, setOffset] = useState(0);
  const xScale = scaleLinear({domain: [0, width], range: [0, width]});
  const yScale = scaleLinear({domain: yDomain, range: [height, 0]});

  useEffect(() => {
    const lastElement: StreamPoint = dataSource[dataSource.length - 1];
    const preLastElement: StreamPoint = dataSource[dataSource.length - 2];

    if (lastElement && lastElement.x > width - 500) {
      setOffset((prev) => prev - (lastElement.x - preLastElement.x));
    }
  }, [dataSource.length]);

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
      transform={`translate(${offset},0)`}
    />
  );
};


const WIDTH = "100%";
const HEIGHT = 300;
const SPEED = 50;

const Threshold = () => {
  const ref = React.useRef<SVGSVGElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setWidth(ref.current.getBoundingClientRect().width);
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const fhrData = useAppSelector(state => state.sessionStream.heartRates);
  const ucData = useAppSelector(state => state.sessionStream.uterineContractions);

  return (
    <svg ref={ref} width={WIDTH} height={HEIGHT} style={{border: "1px solid black"}}>
      <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#fff" rx={14}/>

      <LivePath
        color="red"
        yDomain={[100, 250]}
        width={width}
        height={HEIGHT}
        dataSource={fhrData}
      />

      <LivePath
        color="blue"
        yDomain={[0, 100]}
        width={width}
        height={HEIGHT}
        dataSource={ucData}
      />
    </svg>
  );
};


export default Threshold;