// Variables globales
let puntajeTotal = 0;

// Función para mostrar una pantalla con animación
function mostrarPantalla(pantallaId) {
    const pantallaActual = document.querySelector('.screen.active');
    const nuevaPantalla = document.getElementById(pantallaId);
    
    // Añadir clase de salida a la pantalla actual
    pantallaActual.classList.add('exit');
    
    // Esperar a que termine la animación de salida
    setTimeout(() => {
        pantallaActual.classList.remove('active', 'exit');
        nuevaPantalla.classList.add('active');
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }, 500);
}

// Función para avanzar a la siguiente pregunta
function siguientePregunta(preguntaActual, siguientePregunta, nombreInput) {
    // Verificar si se seleccionó una respuesta
    const respuestaSeleccionada = document.querySelector(`input[name="${nombreInput}"]:checked`);
    
    if (!respuestaSeleccionada) {
        // Crear alerta personalizada
        mostrarAlerta('Por favor, selecciona una respuesta antes de continuar.');
        return;
    }
    
    // Agregar el valor al puntaje
    puntajeTotal += parseInt(respuestaSeleccionada.value);
    
    // Mostrar siguiente pantalla
    mostrarPantalla(siguientePregunta);
}

// Función para calcular y mostrar resultados
function calcularResultados() {
    // Verificar si se seleccionó la última respuesta
    const respuestaSeleccionada = document.querySelector('input[name="q6"]:checked');
    
    if (!respuestaSeleccionada) {
        mostrarAlerta('Por favor, selecciona una respuesta antes de continuar.');
        return;
    }
    
    // Agregar el valor al puntaje
    puntajeTotal += parseInt(respuestaSeleccionada.value);
    
    // Mostrar resultados
    const puntajeElemento = document.getElementById('puntaje');
    const mensajeElemento = document.getElementById('mensaje');
    
    puntajeElemento.textContent = `${puntajeTotal}/6`;
    
    // Mensajes según el puntaje
    let mensaje = '';
    if (puntajeTotal === 6) {
        mensaje = '¡PERFECTO! ¡Eres un verdadero gamer! 🎮🏆';
    } else if (puntajeTotal >= 4) {
        mensaje = '¡Muy bien! Conoces bastante de videojuegos 🎮';
    } else if (puntajeTotal >= 2) {
        mensaje = 'No está mal, pero puedes mejorar 💪';
    } else {
        mensaje = 'Sigue practicando, hay mucho por aprender 📚';
    }
    
    mensajeElemento.textContent = mensaje;
    
    // Mostrar pantalla de resultados
    mostrarPantalla('resultados');
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Resetear puntaje
    puntajeTotal = 0;
    
    // Limpiar todas las respuestas seleccionadas
    const todosLosRadios = document.querySelectorAll('input[type="radio"]');
    todosLosRadios.forEach(radio => {
        radio.checked = false;
    });
    
    // Volver a la pantalla de inicio
    mostrarPantalla('inicio');
}

// Función para mostrar alertas personalizadas
function mostrarAlerta(mensaje) {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = 'alerta-custom';
    alerta.textContent = mensaje;
    
    // Estilos de la alerta
    alerta.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 59, 48, 0.95);
        backdrop-filter: blur(10px);
        color: white;
        padding: 25px 40px;
        border-radius: 20px;
        font-size: 1.4rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        text-align: center;
        max-width: 500px;
        animation: alertaAppear 0.3s ease-out;
        border: 3px solid rgba(255, 255, 255, 0.3);
        text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    `;
    
    // Agregar al body
    document.body.appendChild(alerta);
    
    // Remover después de 2.5 segundos
    setTimeout(() => {
        alerta.style.animation = 'alertaDisappear 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(alerta);
        }, 300);
    }, 2500);
}

// Agregar estilos de animación para la alerta
const style = document.createElement('style');
style.textContent = `
    @keyframes alertaAppear {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes alertaDisappear {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Event listeners para efectos de hover en los radio buttons
document.addEventListener('DOMContentLoaded', () => {
    const opciones = document.querySelectorAll('.option');
    
    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const radio = opcion.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Efecto visual de selección
            opcion.style.transform = 'translateX(10px) scale(1.02)';
            setTimeout(() => {
                opcion.style.transform = '';
            }, 200);
        });
    });
});

// Prevenir envío de formulario con Enter
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});