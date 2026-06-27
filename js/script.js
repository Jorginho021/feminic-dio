// Script de interações leves e acessibilidade para Protege CM.

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

if (tabs.length) {
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((item) => {
                item.classList.remove('active');
                item.setAttribute('aria-selected', 'false');
            });
            panels.forEach((panel) => panel.classList.remove('active'));

            const target = tab.getAttribute('data-target');
            const panel = document.getElementById(target);
            if (panel) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                panel.classList.add('active');
            }
        });
    });
}

function prepareSms(event) {
    event.preventDefault();
    const message = encodeURIComponent('Estou em situação de emergência. Minha localização é: (latitude, longitude).');
    const smsLink = `sms:?body=${message}`;
    window.location.href = smsLink;
}

function requestLocation() {
    const output = document.getElementById('location-output');
    if (!navigator.geolocation) {
        output.textContent = 'Geolocalização não é suportada neste navegador.';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude.toFixed(6);
            const longitude = position.coords.longitude.toFixed(6);
            output.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
        },
        () => {
            output.textContent = 'Não foi possível obter sua localização. Verifique permissões do navegador.';
        }
    );
}
