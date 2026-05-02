const canvas = document.getElementById("doodleCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const brushSizeValue = document.getElementById("brushSizeValue");
const clearCanvasButton = document.getElementById("clearCanvas");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = Number(brushSize.value);

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function startDrawing(event) {
  isDrawing = true;
  const point = getCanvasPoint(event);
  lastX = point.x;
  lastY = point.y;
}

function draw(event) {
  if (!isDrawing) {
    return;
  }

  const point = getCanvasPoint(event);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();

  lastX = point.x;
  lastY = point.y;
}

function stopDrawing() {
  isDrawing = false;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

colorPicker.addEventListener("input", (event) => {
  ctx.strokeStyle = event.target.value;
});

brushSize.addEventListener("input", (event) => {
  const size = Number(event.target.value);
  ctx.lineWidth = size;
  brushSizeValue.textContent = `${size}px`;
});

clearCanvasButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
