import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function ChartD3({ uri }) {
    const svgRef = useRef();
    const [data, setData] = useState([]);

    const width = 640,
        height = 400,
        marginTop = 20,
        marginRight = 20,
        marginBottom = 30,
        marginLeft = 40

    useEffect(() => {
        // d3.csv('/ticker.csv', d3.autoType).then(setData);
        d3.json(uri, d3.autoType).then(setData);
    }, []);

    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc()
        .domain([new Date("2023-01-01"), new Date("2024-01-01")])
        .range([marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height);

    // Add the x-axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x));

    // Add the y-axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y));

    // Return the SVG element.
    useEffect(()=>{
        if(svgRef.current){
            svgRef.current.appendChild(svg.node())
        }
    }, [svgRef, svg]);

    return (<svg ref={svgRef} />)
};
