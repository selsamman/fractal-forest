import React from "react";
// @ts-ignore
import { interpolateViridis } from "d3-scale";
import {observer} from "proxily";
import {state} from "./state";
const svg = {
    width: 1280,
    height: 600,
};
const heightFactor = 0.4;
const maxTreeSize = 22;
const random = Array(100).fill(0).map(() => Math.random());

const deg = (radians : number) => radians * (180 / Math.PI);

const treeCalc = function ({ w, heightFactor, lean } : { w: number, heightFactor: number, lean: number}) {
    const trigH = heightFactor * w;

    // @ts-ignore
    return {
        nextRight: Math.sqrt(trigH ** 2 + (w * (0.5 - lean)) ** 2),
        nextLeft: Math.sqrt(trigH ** 2 + (w * (0.5 + lean)) ** 2),
        A: deg(Math.atan(trigH / ((0.5 + lean) * w))),
        B: deg(Math.atan(trigH / ((0.5 - lean) * w)))
    };
};


function Tree ({n, posX, posY} : { n : number, posX : number, posY : number}) {
    const isLeaning = false;
    const size = random[n] * (state.maxSize - state.minSize) + state.minSize;
    const width = size * 18;
    console.log(`tree min=${state.minSize} max=${state.maxSize} ${n} = ${size}`);
    posX -= size - 200;
    const baseWidth = size * .18;
    const treeSize = size;
    const treeLean = 0;
    return (

        <div style={{position: 'relative'}}>
            <svg
                width={svg.width}
                height={400}
                className={isLeaning ? "pending" : "done"}
                style={{
                    opacity: 0.8,
                    position: "absolute", top: posX, left: posY
                }}
            >
                <Pythagoras
                    w={baseWidth}
                    heightFactor={heightFactor}
                    lean={-treeLean}
                    x={100}
                    y={100}
                    lvl={0}
                    maxlvl={50}
                    left={false}
                    right={false}
                />
            </svg>
        </div>
    );
}


const Pythagoras = observer(function (

    {
        w,
        x,
        y,
        heightFactor,
        lean,
        lvl,
        maxlvl,
        left,
        right,

    } :
    {
        w : number,
        x : number,
        y : number,
        heightFactor : number,
        lean : number,
        lvl : number,
        maxlvl : number,
        left: boolean,
        right: boolean
    } ) {

    if (lvl >= maxlvl || w < 1) {
        return null;
    }

    const { nextRight, nextLeft, A, B } = treeCalc({
        w: w,
        heightFactor: heightFactor,
        lean: lean,
    });

    let rotate = "";

    if (left) {
        rotate = `rotate(${-A} 0 ${w})`;
    } else if (right) {
        rotate = `rotate(${B} ${w} ${w})`;
    }

    return (
        <g transform={`translate(${x} ${y}) ${rotate}`}>
            <rect
                width={w}
                height={w}
                x={0}
                y={0}
                style={{ fill: interpolateViridis(lvl / 8) }}
            />

            <Pythagoras

                w={nextLeft}
                x={0}
                y={-nextLeft}
                lvl={lvl + 1}
                maxlvl={maxlvl}
                heightFactor={heightFactor}
                lean={lean}
                left={true}
                right={false}
            />

            <Pythagoras

                w={nextRight}
                x={w - nextRight}
                y={-nextRight}
                lvl={lvl + 1}
                maxlvl={maxlvl}
                heightFactor={heightFactor}
                lean={lean}
                left={false}
                right={true}
            />
        </g>
    );
});

export default observer(Tree);
