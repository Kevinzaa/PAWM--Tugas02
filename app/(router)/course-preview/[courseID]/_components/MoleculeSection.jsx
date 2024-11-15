"use client";

import React, { useEffect } from "react";

// Kode warna atom
const orange = "#FFA24C";
const blue = "#08C2FF";

function InteractiveMoleculeSection() {
  useEffect(() => {
    const canvas = document.getElementById("moleculeCanvas");
    const ctx = canvas.getContext("2d");

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawAtom = (x, y, label, color) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fillText(label, x - 5, y + 5);
      ctx.strokeStyle = "#FFB6C1";
    };

    const drawBond = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const drawLinear = () => {
      clearCanvas();
      drawAtom(100, 200, "A", orange);
      drawAtom(300, 200, "B", orange);
      drawBond(120, 200, 280, 200);
    };

    const drawBent = () => {
      clearCanvas();
      drawAtom(200, 200, "A", blue);
      drawAtom(100, 300, "B", orange);
      drawAtom(300, 300, "C", orange);
      drawBond(180, 220, 110, 280);
      drawBond(220, 220, 280, 280);
    };

    const drawTrigonal = () => {
      clearCanvas();
      drawAtom(200, 200, "A", blue);
      drawAtom(100, 300, "B", orange);
      drawAtom(300, 300, "C", orange);
      drawAtom(200, 100, "D", orange);
      drawBond(200, 180, 200, 120);
      drawBond(200, 220, 280, 280);
      drawBond(200, 220, 120, 280);
    };

    const drawTetrahedral = () => {
      clearCanvas();
      drawAtom(200, 200, "A", blue);
      drawAtom(100, 300, "B", orange);
      drawAtom(300, 300, "C", orange);
      drawAtom(200, 100, "D", orange);
      drawAtom(200, 50, "E", orange);
      drawBond(200, 220, 120, 280);
      drawBond(200, 220, 280, 280);
      drawBond(200, 180, 200, 120);
      drawBond(200, 180, 200, 70);
    };

    const drawOctahedral = () => {
      clearCanvas();
      drawAtom(200, 200, "A", blue);
      drawAtom(100, 200, "B", orange);
      drawAtom(300, 200, "C", orange);
      drawAtom(200, 100, "D", orange);
      drawAtom(200, 300, "E", orange);
      drawAtom(200, 50, "F", orange);
      drawAtom(200, 350, "G", orange);
      drawBond(120, 200, 180, 200);
      drawBond(220, 200, 280, 200);
      drawBond(200, 180, 200, 120);
      drawBond(200, 220, 200, 280);
      drawBond(200, 50, 200, 100);
      drawBond(200, 300, 200, 350);
    };

    const drawTShaped = () => {
      clearCanvas();
      drawAtom(200, 200, "A", blue);
      drawAtom(200, 100, "B", orange);
      drawAtom(300, 200, "C", orange);
      drawAtom(100, 200, "D", orange);
      drawBond(200, 180, 200, 120);
      drawBond(220, 200, 280, 200);
      drawBond(180, 200, 120, 200);
    };

    const drawSquarePlanar = () => {
      clearCanvas();
      drawAtom(200, 200, "A", blue);
      drawAtom(100, 200, "B", orange);
      drawAtom(300, 200, "C", orange);
      drawAtom(200, 100, "D", orange);
      drawAtom(200, 300, "E", orange);
      drawBond(120, 200, 180, 200);
      drawBond(220, 200, 280, 200);
      drawBond(200, 180, 200, 120);
      drawBond(200, 220, 200, 280);
    };

    const handleShapeSelection = () => {
      const shape = document.getElementById("moleculeShapes").value;
      switch (shape) {
        case "linear":
          drawLinear();
          break;
        case "bent":
          drawBent();
          break;
        case "trigonal":
          drawTrigonal();
          break;
        case "tetrahedral":
          drawTetrahedral();
          break;
        case "octahedral":
          drawOctahedral();
          break;
        case "tshaped":
          drawTShaped();
          break;
        case "squarePlanar":
          drawSquarePlanar();
          break;
        default:
          break;
      }
    };

    document.getElementById("moleculeShapes").addEventListener("change", handleShapeSelection);
  }, []);

  return (
    <section className="p-5 bg-white rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600 text-center">Interactive Molecule Shapes</h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <canvas
            id="moleculeCanvas"
            width="350"
            height="350"
            className="border border-gray-300 rounded-lg shadow-lg"
          ></canvas>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">Visualisasi Sederhana</h3>
          <p className="text-sm text-gray-600 mb-4 text-center md:text-left">
            Dalam kimia, bentuk molekul menggambarkan bagaimana atom dalam sebuah molekul tersusun. Bentuk ini
            tergantung pada jumlah pasangan elektron ikatan dan pasangan elektron bebas di sekitar atom pusat.
          </p>
          <div className="w-full">
            <select
              id="moleculeShapes"
              className="w-full p-3 border border-indigo-400 rounded-lg text-gray-700 focus:ring focus:ring-indigo-300"
            >
              <option value="">Pilih Bentuk Molekul</option>
              <option value="linear">Linear</option>
              <option value="bent">Bent</option>
              <option value="trigonal">Trigonal Planar</option>
              <option value="tetrahedral">Tetrahedral</option>
              <option value="octahedral">Octahedral</option>
              <option value="tshaped">T-Shaped</option>
              <option value="squarePlanar">Square Planar</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveMoleculeSection;
