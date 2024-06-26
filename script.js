document.addEventListener("DOMContentLoaded", function () {
    // Configuración de los fuegos artificiales
    var fireworks = new Fireworks();
    fireworks.start();
});

// Objeto para crear los fuegos artificiales
function Fireworks() {
    var particles = [];
    var canvas = document.getElementById("fireworks");
    var ctx = canvas.getContext("2d");

    // Configuración del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Función para crear un nuevo fuego artificial
    function Particle() {
        this.x = canvas.width / 2;
        this.y = canvas.height + 10;
        this.radius = Math.random() * 2 + 1;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    }

    // Dibuja los fuegos artificiales
    this.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = p.color;
            ctx.fill();

            p.x += Math.random() * 2 - 1;
            p.y -= p.speedY;
            p.radius -= 0.01;

            if (p.radius <= 0) {
                particles.splice(i, 1);
            }
        }
    };

    // Genera nuevos fuegos artificiales
    this.update = function () {
        var numParticles = 3;
        for (var i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    };

    // Animación continua de los fuegos artificiales
    this.start = function () {
        var self = this;
        setInterval(function () {
            self.update();
        }, 300);

        (function loop() {
            self.draw();
            requestAnimationFrame(loop);
        })();
    };
}
