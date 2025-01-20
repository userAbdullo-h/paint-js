const canvas = document.querySelector('canvas'),
	toolBtns = document.querySelectorAll('.tool')

let ctx = canvas.getContext('2d'),
	isDrawing = false,
	brushWidth = 5,
	selectedTool = 'brush',
	prevMouseX, 
	prevMouseY,
	snapShot


window.addEventListener('load', () => {
	canvas.width = canvas.offsetWidth
	canvas.height = canvas.offsetHeight
})

const startDraw = e => {
	isDrawing = true
	prevMouseX = e.offsetX
	prevMouseY = e.offsetY
	ctx.beginPath()
	ctx.lineWidth = brushWidth
	snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height)
	console.log(snapShot);
	
} 

const stopDraw = () =>{
	isDrawing = false
}

const drawRectangle = e => {
	ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

const drawing = e => {
	if(!isDrawing) return
	ctx.putImageData(snapShot, 0, 0)

	switch (selectedTool) {
		case 'brush':
			ctx.lineTo(e.offsetX, e.offsetY)
			ctx.stroke()
			break;
		case 'rectangle':
			drawRectangle(e)
			break
		default:
			break;
	}
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)

toolBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		document.querySelector('.options .active').classList.remove('active')
		btn.classList.add('active')
		selectedTool = btn.id
		console.log(selectedTool);
		
	})
})