import { useEffect, useRef, useState } from "react";
import { animate, createSpring } from "animejs";


export default function Loading() {
    const root = useRef(null);

    const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    useEffect(() => {
        animate('.shape1', {
            x: random(-500, 500),
            y: random(-500, 500),
            rotate: random(-180, 180),
            duration: random(500, 1000),
            composition: 'blend',
            autoplay: true
        });

        animate('.shape2', {
            x: random(-300, 300),
            y: random(-300, 300),
            rotate: random(-180, 130),
            duration: random(500, 1000),
            composition: 'blend',
            autoplay: true
        });
    }, []);

    return (

        <div ref={root} style={{ width: "100%", height: "100svh", position: "relative", border: "1px solid #ddd", padding: "20px" }}>
            <div
                className="shape1"
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "2px solid #1976d2",
                    backgroundColor: "transparent",
                }}
            />

            <div
                className="shape2"
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: "2px solid #1976d2",
                    backgroundColor: "transparent",
                }}
            />

        </div>

    );
}
