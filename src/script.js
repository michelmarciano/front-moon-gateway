// BIN Database for card type detection
const cardTypes = {
    visa: {
        patterns: [/^4/],
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNTFBNSIvPgo8dGV4dCB4PSI1IiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPlZJU0E8L3RleHQ+Cjwvc3ZnPgo=',
        color: '#005CA5'
    },
    mastercard: {
        patterns: [/^5[1-5]/, /^2[2-7]/],
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0VCMDAxQiIvPgo8Y2lyY2xlIGN4PSIxNCIgY3k9IjEyIiByPSI2IiBmaWxsPSIjRkY1RjAwIi8+CjxjaXJjbGUgY3g9IjI2IiBjeT0iMTIiIHI9IjYiIGZpbGw9IiNGRkY1RjAiLz4KPC9zdmc+Cg==',
        color: '#EB001B'
    },
    amex: {
        patterns: [/^3[47]/],
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNkZDRiIvPgo8dGV4dCB4PSI1IiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+QU1FWDwvdGV4dD4KPC9zdmc+Cg==',
        color: '#006FCF'
    },
    discover: {
        patterns: [/^6(?:011|5)/],
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0ZGNjAwMCIvPgo8dGV4dCB4PSIzIiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjciIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+RElTQ09WRVI8L3RleHQ+Cjwvc3ZnPgo=',
        color: '#FF6000'
    },
    elo: {
        patterns: [/^4011/, /^4312/, /^4389/, /^4514/, /^4573/, /^5041/, /^5066/, /^5067/, /^509/],
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0ZGRkYwMCIvPgo8dGV4dCB4PSIxMCIgeT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9ImJsYWNrIj5FTE88L3RleHQ+Cjwvc3ZnPgo=',
        color: '#FFFF00'
    },
    hipercard: {
        patterns: [/^606282/],
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0ZGMDAwMCIvPgo8dGV4dCB4PSI1IiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjciIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+SElQRVI8L3RleHQ+Cjwvc3ZnPgo=',
        color: '#FF0000'
    }
};

// DOM Elements
const cardNumberInput = document.getElementById('cardNumber');
const cardHolderInput = document.getElementById('cardHolder');
const expiryDateInput = document.getElementById('expiryDate');
const cvvInput = document.getElementById('cvv');
const submitBtn = document.getElementById('submitBtn');

const cardNumberDisplay = document.querySelector('.card-number');
const cardHolderDisplay = document.querySelector('.card-holder-name');
const cardExpiryDisplay = document.querySelector('.card-expiry');
const cardLogoDisplay = document.querySelector('.card-logo');
const cardCvvDisplay = document.querySelector('.card-cvv');
const cardForm = document.querySelector('.card-form');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');

// Validation state
const validationState = {
    cardNumber: false,
    cardHolder: false,
    expiryDate: false,
    cvv: false
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // Card number input
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        
        if (formattedValue.length <= 19) {
            e.target.value = formattedValue;
            updateCardNumber(formattedValue);
            detectCardType(value);
            validateCardNumber(value);
        }
    });

    cardNumberInput.addEventListener('focus', function() {
        addFocusState(this);
    });

    cardNumberInput.addEventListener('blur', function() {
        removeFocusState(this);
    });

    // Card holder input
    cardHolderInput.addEventListener('input', function(e) {
        updateCardHolder(e.target.value);
        validateCardHolder(e.target.value);
    });

    cardHolderInput.addEventListener('focus', function() {
        addFocusState(this);
    });

    cardHolderInput.addEventListener('blur', function() {
        removeFocusState(this);
    });

    // Expiry date input
    expiryDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        updateExpiry(value);
        validateExpiryDate(value);
    });

    expiryDateInput.addEventListener('focus', function() {
        addFocusState(this);
    });

    expiryDateInput.addEventListener('blur', function() {
        removeFocusState(this);
    });

    // CVV input
    cvvInput.addEventListener('input', function(e) {
        updateCvv(e.target.value);
        validateCvv(e.target.value);
    });

    cvvInput.addEventListener('focus', function() {
        cardForm.classList.add('flipped');
        addFocusState(this);
    });

    cvvInput.addEventListener('blur', function() {
        cardForm.classList.remove('flipped');
        removeFocusState(this);
    });

    // Form submission
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (isFormValid()) {
            showSuccessMessage();
        }
    });
}

function addFocusState(element) {
    element.closest('.form-group').classList.add('focused');
}

function removeFocusState(element) {
    element.closest('.form-group').classList.remove('focused');
}

function updateCardNumber(value) {
    cardNumberDisplay.textContent = value || '#### #### #### ####';
}

function updateCardHolder(value) {
    cardHolderDisplay.textContent = value.toUpperCase() || 'NOME DO TITULAR';
}

function updateExpiry(value) {
    cardExpiryDisplay.textContent = value || 'MM/AA';
}

function updateCvv(value) {
    cardCvvDisplay.textContent = value || 'CVV';
}

function detectCardType(number) {
    let detectedType = null;
    
    for (const [type, config] of Object.entries(cardTypes)) {
        for (const pattern of config.patterns) {
            if (pattern.test(number)) {
                detectedType = type;
                break;
            }
        }
        if (detectedType) break;
    }

    if (detectedType) {
        const cardConfig = cardTypes[detectedType];
        cardLogoDisplay.style.backgroundImage = `url(${cardConfig.logo})`;
        cardFront.style.background = `linear-gradient(45deg, ${cardConfig.color} 0%, #2575fc 100%)`;
        cardBack.style.background = `linear-gradient(45deg, #2575fc 0%, ${cardConfig.color} 100%)`;
        
        // Animate the logo appearance
        cardLogoDisplay.style.opacity = '0';
        setTimeout(() => {
            cardLogoDisplay.style.opacity = '1';
            cardLogoDisplay.style.transition = 'opacity 0.3s ease';
        }, 100);
    } else {
        cardLogoDisplay.style.backgroundImage = '';
        cardFront.style.background = 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)';
        cardBack.style.background = 'linear-gradient(45deg, #2575fc 0%, #6a11cb 100%)';
    }
}

function validateCardNumber(number) {
    const isValid = number.length >= 13 && number.length <= 19 && luhnCheck(number);
    setValidationState('cardNumber', isValid, cardNumberInput);
    
    if (!isValid && number.length > 0) {
        if (number.length < 13) {
            showError(cardNumberInput, 'Número do cartão muito curto');
        } else if (!luhnCheck(number)) {
            showError(cardNumberInput, 'Número do cartão inválido');
        }
    } else {
        clearError(cardNumberInput);
    }
}

function validateCardHolder(name) {
    const isValid = name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
    setValidationState('cardHolder', isValid, cardHolderInput);
    
    if (!isValid && name.length > 0) {
        if (name.trim().length < 2) {
            showError(cardHolderInput, 'Nome muito curto');
        } else {
            showError(cardHolderInput, 'Nome deve conter apenas letras');
        }
    } else {
        clearError(cardHolderInput);
    }
}

function validateExpiryDate(date) {
    const isValid = /^\d{2}\/\d{2}$/.test(date);
    let isValidDate = false;
    
    if (isValid) {
        const [month, year] = date.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        
        isValidDate = monthNum >= 1 && monthNum <= 12 && 
                     (yearNum > currentYear || (yearNum === currentYear && monthNum >= currentMonth));
    }
    
    setValidationState('expiryDate', isValidDate, expiryDateInput);
    
    if (!isValidDate && date.length > 0) {
        if (!isValid) {
            showError(expiryDateInput, 'Formato inválido (MM/AA)');
        } else {
            showError(expiryDateInput, 'Data de validade expirada');
        }
    } else {
        clearError(expiryDateInput);
    }
}

function validateCvv(cvv) {
    const isValid = cvv.length >= 3 && cvv.length <= 4 && /^\d+$/.test(cvv);
    setValidationState('cvv', isValid, cvvInput);
    
    if (!isValid && cvv.length > 0) {
        if (cvv.length < 3) {
            showError(cvvInput, 'CVV muito curto');
        } else if (!/^\d+$/.test(cvv)) {
            showError(cvvInput, 'CVV deve conter apenas números');
        }
    } else {
        clearError(cvvInput);
    }
}

function setValidationState(field, isValid, inputElement) {
    validationState[field] = isValid;
    const container = inputElement.closest('.form-group');
    
    if (isValid) {
        container.classList.add('valid');
        container.classList.remove('invalid');
    } else if (inputElement.value.length > 0) {
        container.classList.add('invalid');
        container.classList.remove('valid');
    } else {
        container.classList.remove('valid', 'invalid');
    }
    
    updateSubmitButton();
}

function showError(inputElement, message) {
    const errorDiv = inputElement.closest('.form-group').querySelector('.error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearError(inputElement) {
    const errorDiv = inputElement.closest('.form-group').querySelector('.error-message');
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}

function updateSubmitButton() {
    const allValid = Object.values(validationState).every(state => state);
    submitBtn.disabled = !allValid;
    
    if (allValid) {
        submitBtn.classList.add('enabled');
    } else {
        submitBtn.classList.remove('enabled');
    }
}

function isFormValid() {
    return Object.values(validationState).every(state => state);
}

function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Cartão cadastrado com sucesso!</h3>
            <p>Seus dados foram validados e o cartão foi registrado.</p>
            <button onclick="this.parentElement.parentElement.remove()">Fechar</button>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Reset form after success
    setTimeout(() => {
        document.querySelector('form').reset();
        Object.keys(validationState).forEach(key => {
            validationState[key] = false;
        });
        updateSubmitButton();
        
        // Reset card display
        updateCardNumber('');
        updateCardHolder('');
        updateExpiry('');
        updateCvv('');
        
        // Remove validation classes
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('valid', 'invalid', 'focused');
        });
        
        // Reset card design
        cardLogoDisplay.style.backgroundImage = '';
        cardFront.style.background = 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)';
        cardBack.style.background = 'linear-gradient(45deg, #2575fc 0%, #6a11cb 100%)';
    }, 2000);
}

// Luhn algorithm for card number validation
function luhnCheck(cardNumber) {
    let sum = 0;
    let alternate = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let n = parseInt(cardNumber.charAt(i), 10);
        
        if (alternate) {
            n *= 2;
            if (n > 9) {
                n = (n % 10) + 1;
            }
        }
        
        sum += n;
        alternate = !alternate;
    }
    
    return (sum % 10) === 0;
}

