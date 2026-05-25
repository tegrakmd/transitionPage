// "use client";

// import { useEffect, useRef } from "react";

// export function GridAnimation() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animationRef = useRef<number>();
//   const timeRef = useRef<number>(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set canvas size
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     // Grid parameters inspired by Terminal Industries
//     const gridSpacing = 60;
//     const perspectiveZ = 1200;
//     const gridColumns = Math.ceil(window.innerWidth / gridSpacing) + 5;
//     const gridRows = Math.ceil(window.innerHeight / gridSpacing) + 5;

//     interface GridPoint {
//       x: number;
//       y: number;
//       z: number;
//       originalX: number;
//       originalY: number;
//     }

//     // Create initial grid points
//     const createGridPoints = (): GridPoint[] => {
//       const points: GridPoint[] = [];
//       const centerX = (gridColumns * gridSpacing) / 2;
//       const centerY = (gridRows * gridSpacing) / 2;

//       for (let x = 0; x < gridColumns; x++) {
//         for (let y = 0; y < gridRows; y++) {
//           const px = x * gridSpacing - centerX;
//           const py = y * gridSpacing - centerY;
//           points.push({
//             x: px,
//             y: py,
//             z: 0,
//             originalX: px,
//             originalY: py,
//           });
//         }
//       }
//       return points;
//     };

//     const gridPoints = createGridPoints();

//     // Project 3D point to 2D screen
//     const project = (
//       point: GridPoint,
//       time: number
//     ): [number, number, number, number] => {
//       // Add depth movement animation
//       let z = point.z - (time % 15000) / 15 + 800;

//       // Subtle wave effect
//       const waveX = Math.sin(point.originalX * 0.003 + time * 0.0005) * 30;
//       const waveY = Math.cos(point.originalY * 0.003 + time * 0.0005) * 30;

//       // Perspective projection
//       if (z < 50) z = 50;

//       const scale = perspectiveZ / z;
//       const x2d = canvas.width / 2 + (point.originalX + waveX) * scale;
//       const y2d = canvas.height / 2 + (point.originalY + waveY) * scale;

//       return [x2d, y2d, z, scale];
//     };

//     // Animation loop
//     const animate = () => {
//       timeRef.current += 16; // ~60fps

//       // Clear canvas with semi-transparent dark background
//       ctx.fillStyle = "rgba(5, 14, 12, 0.08)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Draw grid lines
//       ctx.strokeStyle = "rgba(166, 252, 56, 0.2)";
//       ctx.lineWidth = 0.5;

//       // Horizontal lines
//       for (let y = 0; y < gridRows; y++) {
//         ctx.beginPath();
//         let firstPoint = true;
//         for (let x = 0; x < gridColumns; x++) {
//           const idx = y * gridColumns + x;
//           const [x2d, y2d] = project(gridPoints[idx], timeRef.current);

//           if (firstPoint) {
//             ctx.moveTo(x2d, y2d);
//             firstPoint = false;
//           } else {
//             ctx.lineTo(x2d, y2d);
//           }
//         }
//         ctx.stroke();
//       }

//       // Vertical lines
//       ctx.strokeStyle = "rgba(166, 252, 56, 0.15)";
//       for (let x = 0; x < gridColumns; x++) {
//         ctx.beginPath();
//         let firstPoint = true;
//         for (let y = 0; y < gridRows; y++) {
//           const idx = y * gridColumns + x;
//           const [x2d, y2d] = project(gridPoints[idx], timeRef.current);

//           if (firstPoint) {
//             ctx.moveTo(x2d, y2d);
//             firstPoint = false;
//           } else {
//             ctx.lineTo(x2d, y2d);
//           }
//         }
//         ctx.stroke();
//       }

//       // Draw intersection points (dots)
//       for (let i = 0; i < gridPoints.length; i++) {
//         // Only draw every other point to reduce clutter
//         if (i % 6 === 0) {
//           const [x2d, y2d, z, scale] = project(gridPoints[i], timeRef.current);

//           // Opacity and size based on depth
//           const opacity = Math.max(0.1, Math.min(0.8, scale * 0.4));
//           const pointSize = Math.max(0.5, scale);

//           ctx.fillStyle = `rgba(166, 252, 56, ${opacity})`;
//           ctx.beginPath();
//           ctx.arc(x2d, y2d, pointSize, 0, Math.PI * 2);
//           ctx.fill();

//           // Glow effect for closer points
//           if (scale > 0.5) {
//             ctx.fillStyle = `rgba(166, 252, 56, ${opacity * 0.3})`;
//             ctx.beginPath();
//             ctx.arc(x2d, y2d, pointSize * 2.5, 0, Math.PI * 2);
//             ctx.fill();
//           }
//         }
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 -z-10"
//       style={{
//         background:
//           "radial-gradient(ellipse at center, rgba(5,14,12,0.6) 0%, rgba(5,14,12,0.95) 100%)",
//         filter: "drop-shadow(0 0 20px rgba(166, 252, 56, 0.1))",
//       }}
//     />
//   );
// }
