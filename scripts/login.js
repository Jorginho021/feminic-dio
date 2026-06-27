// Lógica de autenticação e feedback visual para o fluxo de acesso.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const submitButton = document.getElementById('login-submit');
  const feedback = document.getElementById('login-feedback');

  if (!form || !submitButton) return;

  if (window.ProtegeCM && window.ProtegeCM.isAuthenticated()) {
    window.location.href = 'Home.html';
    return;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const login = document.getElementById('login-username').value;
    const senha = document.getElementById('login-password').value;
    const error = window.ProtegeCM.validateLoginForm(login, senha);
    window.ProtegeCM.setButtonLoading(submitButton, true, 'Entrar');
    window.setTimeout(() => {
      if (error) {
        window.ProtegeCM.showAlert('login-feedback', error, 'error');
        window.ProtegeCM.setButtonLoading(submitButton, false, 'Entrar');
        return;
      }
      window.ProtegeCM.showToast('Acesso autorizado. Bem-vinda!', 'success');
      window.location.href = 'Home.html';
    }, 700);
  });
});
