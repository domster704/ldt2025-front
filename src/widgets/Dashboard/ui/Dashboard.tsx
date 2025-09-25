import React, {FC} from "react";
import {useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream/model/selectors";
import LivePath from "@shared/ui/LivePath";
import {scaleLinear} from "@visx/scale";
import {GridColumns, GridRows} from "@visx/grid";

import * as style from './Dashboard.module.css';

const HEIGHT = 300;
const MARGIN = {top: 8, right: 20, bottom: 24, left: 32};
const PADDING = 10;
const WINDOW = 60;

interface ChartProps {
  color: string;
  dataSource: { x: number; y: number }[];
}

const Chart: FC<ChartProps> = ({
                                 color,
                                 dataSource,
                               }) => {
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

  const xMax = width - MARGIN.left - MARGIN.right;
  const yMax = HEIGHT - MARGIN.top - MARGIN.bottom;

  const ys = dataSource.map((d) => d.y).filter((y) => !isNaN(y));

  const minY = ys.length ? Math.min(...ys) : 0;
  const maxY = ys.length ? Math.max(...ys) : 1;

  const xScale = scaleLinear<number>({
    domain: [0, WINDOW],
    range: [0, xMax],
  });

  const yScale = scaleLinear<number>({
    domain: [minY - PADDING, maxY + PADDING],
    range: [yMax, 0],
  });

  return (
    <svg ref={ref} width="100%" height={HEIGHT}>
      <rect x={0} y={0} width="100%" height={HEIGHT} fill="#fff"/>

      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        <GridRows scale={yScale} width={xMax} height={yMax} stroke="#eee"/>
        <GridColumns scale={xScale} width={xMax} height={yMax} stroke="#eee"/>

        <LivePath
          color={color}
          width={xMax}
          height={yMax}
          dataSource={dataSource}
          xScale={xScale}
          yScale={yScale}
        />
      </g>
    </svg>
  );
};

const Dashboard = () => {
  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);

  return (
    <div className={style.dashboard}>
      <Chart color="red" dataSource={fhrData}/>
      <Chart color="blue" dataSource={ucData}/>
    </div>
  );
};

export default Dashboard;
