import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const Chart = () => {
    const containerRef = useRef();
    const [data, setData] = useState();

    useEffect(() => {
        d3.csv('/ticker.csv', d3.autoType).then(setData);
        // d3.json('../data/ticker.json').then(() => {
        //     console.log('in')
        // });
    }, []);

    useEffect(() => {
        if (data === undefined) return;
        const plot = Plot.plot({
            inset: 6,
            width: 928,
            grid: true,
            y: { label: "↑ Apple stock price ($)" },
            color: { domain: [-1, 0, 1], range: ["#e41a1c", "#000000", "#4daf4a"] },
            marks: [
                Plot.ruleX(data, {
                    x: "Date",
                    y1: "Low",
                    y2: "High"
                }),
                Plot.ruleX(data, {
                    x: "Date",
                    y1: "Open",
                    y2: "Close",
                    stroke: (d) => Math.sign(d.Close - d.Open),
                    strokeWidth: 4,
                    strokeLinecap: "round"
                })
            ]
        });
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data]);

    return (<div ref={containerRef} />);
};

export default Chart;
