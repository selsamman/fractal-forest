import {observer} from "proxily";
import React, {createRef, useLayoutEffect} from "react";
import {state} from "./state";
const random = Array(100).fill(0).map(() => Math.random());
function Tree ({n, posX, posY} : { n : number, posX : number, posY : number}) {


    const size = random[n] * (state.maxSize - state.minSize) + state.minSize;
    console.log(`tree min=${state.minSize} max=${state.maxSize} ${n} = ${size}`);
    posX -= size - 300;
    const canvasRef = createRef<HTMLCanvasElement>();
    const color = state.color;
    getContextAndDraw();
    useLayoutEffect (() => {
        getContextAndDraw();
    });
    function getContextAndDraw() {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            if (ctx)  {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                draw(ctx, size / 2, size, size * .18, 0, size / 50);
            }
        }
    }
    function draw(ctx : CanvasRenderingContext2D, startX : number, startY : number, len : number, angle : number, branchWidth : number) {
        ctx.lineWidth = branchWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(0,0,0,0.3)";

        ctx.beginPath();
        ctx.save();

        ctx.translate(startX, startY);
        ctx.rotate(angle * Math.PI/180);
        ctx.moveTo(0, 0);
        if(angle > 0) {
            ctx.bezierCurveTo(10, -len/2, 10, -len/2, 0, -len);
        } else {
            ctx.bezierCurveTo(-10, -len/2, -10, -len/2, 0, -len);
        }
        ctx.stroke();

        if(len < 10) {
            ctx.beginPath();
            ctx.arc(0, -len, 10, 0, Math.PI/2);
            ctx.fill();
            ctx.restore();
            return;
        }

        draw(ctx, 0, -len, len*0.8, angle+10, branchWidth*0.8);
        draw(ctx, 0, -len, len*0.8, angle-10, branchWidth*0.8);

        ctx.restore();
    }
    return (
        <div style={{position: 'relative'}}>
            <canvas ref={canvasRef} width={size} height={size}
                    style={{position: "absolute", top: posX, left: posY}}></canvas>
        </div>
    );


};

export default observer(Tree);
