document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('afiliacionForm');
    const radiosPlan = document.querySelectorAll('input[name="plan"]');
    const inversionInicialInput = document.getElementById('inversionInicial');
    const totalPlanElem = document.getElementById('totalPlan');
    const saldoPendienteElem = document.getElementById('saldoPendiente');

    // Actualizar montos de forma dinámica
    function calcularSaldos() {
        const planSeleccionado = document.querySelector('input[name="plan"]:checked');
        const costoTotal = parseFloat(planSeleccionado.dataset.costo);
        const inversionInicial = parseFloat(inversionInicialInput.value) || 0;

        const saldo = costoTotal - inversionInicial;

        totalPlanElem.textContent = `$${costoTotal.toLocaleString('es-MX')} MXN`;
        saldoPendienteElem.textContent = `$${Math.max(0, saldo).toLocaleString('es-MX')} MXN`;
    }

    radiosPlan.forEach(radio => radio.addEventListener('change', calcularSaldos));
    inversionInicialInput.addEventListener('input', calcularSaldos);

    // Validación del pago inicial mínimo ($200)
    inversionInicialInput.addEventListener('blur', () => {
        if (parseFloat(inversionInicialInput.value) < 200 || !inversionInicialInput.value) {
            alert('La aportación inicial mínima es de $200 MXN.');
            inversionInicialInput.value = 200;
            calcularSaldos();
        }
    });

    // Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Registro enviado con éxito! Un ejecutivo de PABS se pondrá en contacto contigo.');
    });

    // Lógica del Asistente Interactivo (Chatbot)
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatBox = document.getElementById('chatBox');
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.querySelectorAll('.chat-opt');

    chatToggle.addEventListener('click', () => chatBox.classList.toggle('hidden'));
    chatClose.addEventListener('click', () => chatBox.classList.add('hidden'));

    const respuestas = {
        explicar_planes: 'Ofrecemos dos modalidades: el Plan Básico / Imperial ($28,900 MXN) con servicios esenciales, y el Plan Premium ($32,900 MXN) con velación preferencial.',
        explicar_pagos: 'Puedes realizar una aportación inicial desde $200 MXN y elegir la frecuencia de aportaciones: Semanal ($150), Quincenal ($300) o Mensual ($600).',
        guiar_registro: 'Para afiliarte, simplemente llena tus datos en el formulario central, elige tu plan, define tu pago inicial y da clic en "Completar Registro de Afiliación".'
    };

    chatOptions.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            const userText = e.target.textContent;

            // Agregar mensaje del usuario
            appendMessage(userText, 'user');

            // Respuesta automatizada
            setTimeout(() => {
                appendMessage(respuestas[action], 'bot');
            }, 400);
        });
    });

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Inicializar cálculo
    calcularSaldos();
});
