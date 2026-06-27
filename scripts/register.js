// Lógica de cadastro com validação e feedback visual.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const submitButton = document.getElementById('register-submit');
  const feedback = document.getElementById('register-feedback');

  if (!form || !submitButton) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const nome = document.getElementById('register-name').value;
    const login = document.getElementById('register-login').value;
    const senha = document.getElementById('register-password').value;
    const confirma = document.getElementById('register-confirm').value;
    const error = window.ProtegeCM.validateRegisterForm(nome, login, senha, confirma);
    window.ProtegeCM.setButtonLoading(submitButton, true, 'Criar conta');
    window.setTimeout(() => {
      if (error) {
        window.ProtegeCM.showAlert('register-feedback', error, 'error');
        window.ProtegeCM.setButtonLoading(submitButton, false, 'Criar conta');
        return;
      }
      window.ProtegeCM.showToast('Conta criada com sucesso.', 'success');
      window.location.href = 'Home.html';
    }, 700);
  });
});
