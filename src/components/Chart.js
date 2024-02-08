import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function Chart({ uri }) {
    const containerRef = useRef();
    const [data, setData] = useState();

    useEffect(() => {
        // d3.csv('/ticker.csv', d3.autoType).then(setData);
        d3.json(uri, d3.autoType).then(setData);
    }, [uri]);

    useEffect(() => {
        console.log(data);
        if (data === undefined) return;
        const width = 900;
        const candleMarksWidth = width / (data.length * 2.2);
        const candleStickMarksWidth = Math.min(candleMarksWidth / 2.5, 1.5);
        const plot = Plot.plot({
            inset: 6,
            width: width,
            x: { // x 축 설정
                label: "date",
                tickFormat: d3.timeFormat('%Y-%m-%d')
            },
            color: { domain: [-1, 0, 1], range: ["#1c1ae4", "#000000", "#e41a1c"] },
            marks: [
                Plot.areaY(data, {
                    x: "date",
                    y1: "bollingerBandLower",
                    y2: "bollingerBandUpper",
                    stroke: 'steelblue',
                    strokeLinejoin: 'bevel',
                    strokeLinecap: 'butt', // butt, round, or square
                    fill: "steelblue",
                    fillOpacity: 0.1
                }),
                Plot.ruleX(data, {
                    x: "date",
                    y1: "low",
                    y2: "high",
                    stroke: (d) => Math.sign(d.close - d.open),
                    strokeWidth: candleStickMarksWidth
                }),
                Plot.ruleX(data, {
                    x: "date",
                    y1: "open",
                    y2: "close",
                    stroke: (d) => Math.sign(d.close - d.open),
                    strokeWidth: candleMarksWidth,
                }),
                Plot.crosshairX(data, { x: "date", y: "close" }),
                Plot.text(data, Plot.pointerX({
                    px: "date",
                    py: "close",
                    dy: -17,
                    frameAnchor: "top-left",
                    fontVariant: "tabular-nums",
                    text: ({ open, high, low, close }) => [`시 ${open}`, `고 ${high}`, `저 ${low}`, `종 ${close}`].join("   ")
                }))
            ]
        });
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data]);

    return (<div ref={containerRef} />);
};
