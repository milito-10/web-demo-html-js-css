/**
 * TechNova Solutions - Script Principal
 * Funcionalidades: Menú Responsive y Validación de Contacto
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initContactForm();
});

/**
 * Inicializa el comportamiento del menú móvil (toggle)
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (!menuToggle || !mainNav) return;

    // Toggle del menú al hacer clic en el botón
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Inicializa la validación del formulario de contacto
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Limpiar mensajes anteriores
        clearMessages(form);

        // Validar Nombre
        const nombreInput = form.querySelector('#nombre');
        const nombreValue = nombreInput.value.trim();
        if (nombreValue === '') {
            showError(nombreInput, 'Por favor, ingrese su nombre completo.');
            isValid = false;
        } else if (nombreValue.length < 3) {
            showError(nombreInput, 'El nombre debe tener al menos 3 caracteres.');
            isValid = false;
        }

        // Validar Email
        const emailInput = form.querySelector('#email');
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, 'Por favor, ingrese su correo electrónico.');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(emailInput, 'Por favor, ingrese un correo válido.');
            isValid = false;
        }

        // Validar Mensaje
        const mensajeInput = form.querySelector('#mensaje');
        const mensajeValue = mensajeInput.value.trim();
        if (mensajeValue === '') {
            showError(mensajeInput, 'Por favor, escriba su mensaje.');
            isValid = false;
        } else if (mensajeValue.length < 10) {
            showError(mensajeInput, 'El mensaje debe ser más detallado (mín. 10 caracteres).');
            isValid = false;
        }

        if (isValid) {
            // Simulación de envío exitoso
            showSuccess(form, '¡Gracias! Hemos recibido su mensaje correctamente.');
            form.reset();
        }
    });

    // Limpiar errores al escribir
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            clearInputError(input);
        });
    });
}

/**
 * Validador de formato email con Regex simple y efectiva
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Muestra un mensaje de error debajo del input
 */
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    const errorDisplay = document.createElement('span');
    errorDisplay.className = 'error-message';
    errorDisplay.innerText = message;
    
    formGroup.appendChild(errorDisplay);
}

/**
 * Muestra mensaje de éxito global en el formulario
 */
function showSuccess(form, message) {
    const successDisplay = document.createElement('div');
    successDisplay.className = 'success-message';
    successDisplay.innerText = message;
    
    form.insertBefore(successDisplay, form.firstChild);
    
    // Eliminar mensaje después de 5 segundos
    setTimeout(() => {
        if(successDisplay.parentNode) {
            successDisplay.remove();
        }
    }, 5000);
}

/**
 * Limpia todos los mensajes de error y éxito previos
 */
function clearMessages(form) {
    // Quitar clases de error de los inputs
    form.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
    });

    // Eliminar textos de error
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());
    
    // Eliminar mensajes de éxito previos
    const successMsg = form.querySelector('.success-message');
    if (successMsg) successMsg.remove();
}

/**
 * Limpia el error de un input específico
 */
function clearInputError(input) {
    const formGroup = input.parentElement;
    if (formGroup.classList.contains('error')) {
        formGroup.classList.remove('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    }
}
