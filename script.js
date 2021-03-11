var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particlesArray = [];
var hue = 1;
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
var mouse = {
    x: undefined,
    y: undefined
};
canvas.addEventListener("click", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (var i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
});
canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (var i = 0; i < 2; i++) {
        particlesArray.push(new Particle());
    }
});
var Particle = /** @class */ (function () {
    function Particle() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl(" + hue + ",100%,50%)";
    }
    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2)
            this.size -= 0.1;
    };
    Particle.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };
    return Particle;
}());
function init() {
}
init();
// console.log(particlesArray);
function handleParticles() {
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (var j = i; j < particlesArray.length; j++) {
            var dx = particlesArray[i].x - particlesArray[j].x;
            var dy = particlesArray[i].y - particlesArray[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.3;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle ="rgba(0,0,0,0.02)";
    // ctx.fillRect(0,0,canvas.width,canvas.height) 
    handleParticles();
    hue += 2;
    requestAnimationFrame(animate);
}
animate();
