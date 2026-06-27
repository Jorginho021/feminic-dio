// Funções de interface e inicialização geral do Protege CM.
import { renderSidebar, renderFooter } from './components.js';
import { getAuthenticatedUser, logout } from './auth.js';

export function initializePage(activePage = '') {
    renderSidebar(activePage);
    renderFooter();
    const quickExitButton = document.querySelector('.quick-exit');
    if (quickExitButton) {
        quickExitButton.addEventListener('click', () => {
            window.location.href = 'https://google.com';
        });
    }
}

export function initializeUserName() {
    const userNameElement = document.querySelector('#user-name');
    if (userNameElement) {
        userNameElement.textContent = getAuthenticatedUser();
    }
}

export function attachLogout() {
    const logoutButton = document.querySelector('#logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }
}

export function showAlert(containerId, message, type = 'error') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

export function clearAlert(containerId) {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '';
}

export function activatePageTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            if (!target) return;
            tabs.forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(target)?.classList.add('active');
        });
    });
}

export function prepareSms() {
    const text = encodeURIComponent('Estou em situação de emergência. Minha localização é: (latitude, longitude).');
    window.location.href = `sms:?body=${text}`;
}

export function requestLocation() {
    const output = document.getElementById('location-output');
    if (!output) return;
    if (!navigator.geolocation) {
        output.textContent = 'Geolocalização não é suportada neste navegador.';
        return;
    }
    navigator.geolocation.getCurrentPosition(
        position => {
            output.textContent = `Latitude: ${position.coords.latitude.toFixed(6)}, Longitude: ${position.coords.longitude.toFixed(6)}`;
        },
        () => {
            output.textContent = 'Não foi possível obter sua localização. Verifique as permissões do navegador.';
        }
    );
}
