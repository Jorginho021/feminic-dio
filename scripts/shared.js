(function () {
  const app = {
    authenticatedKey: 'northstar-auth',
    userKey: 'northstar-user',
    tokenKey: 'northstar-auth-token',
    validUsers: [
      { login: 'aluna123', senha: 'protege123', nome: 'Aluna Protege' },
      { login: 'cm2026', senha: 'acolhe2026', nome: 'Estudante CM' }
    ],
    createSession(user) {
      const token = window.crypto?.randomUUID ? window.crypto.randomUUID() : `session-${Date.now()}`;
      sessionStorage.setItem(this.authenticatedKey, 'true');
      sessionStorage.setItem(this.userKey, user.nome);
      sessionStorage.setItem(this.tokenKey, token);
      sessionStorage.setItem('northstar-session', JSON.stringify({ createdAt: new Date().toISOString(), user: user.login }));
    },
    setAuthenticatedUser(user) {
      this.createSession(user);
    },
    logout() {
      sessionStorage.removeItem(this.authenticatedKey);
      sessionStorage.removeItem(this.userKey);
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem('northstar-session');
      window.location.href = '../index.html';
    },
    isAuthenticated() {
      return sessionStorage.getItem(this.authenticatedKey) === 'true';
    },
    getAuthenticatedUser() {
      return sessionStorage.getItem(this.userKey) || 'Usuária';
    },
    requireAuth(redirectTo = 'login.html') {
      if (!this.isAuthenticated()) {
        window.location.href = redirectTo;
      }
    },
    sanitizeInput(value) {
      return String(value ?? '').trim().replace(/[<>]/g, '');
    },
    escapeHtml(value) {
      return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
    },
    validateLoginForm(login, senha) {
      const normalizedLogin = this.sanitizeInput(login).toLowerCase();
      const normalizedSenha = this.sanitizeInput(senha);
      if (!normalizedLogin || !normalizedSenha) {
        return 'Preencha usuário e senha para continuar.';
      }
      if (normalizedLogin.length < 3) {
        return 'O usuário informado parece incompleto.';
      }
      const user = this.validUsers.find(item => item.login === normalizedLogin);
      if (!user) {
        return 'Usuário não encontrado. Verifique os dados informados.';
      }
      if (user.senha !== normalizedSenha) {
        return 'Senha incorreta. Tente novamente.';
      }
      this.setAuthenticatedUser(user);
      return '';
    },
    validateRegisterForm(nome, login, senha, confirma) {
      const normalizedNome = this.sanitizeInput(nome);
      const normalizedLogin = this.sanitizeInput(login).toLowerCase();
      const normalizedSenha = this.sanitizeInput(senha);
      const normalizedConfirma = this.sanitizeInput(confirma);
      if (!normalizedNome || !normalizedLogin || !normalizedSenha || !normalizedConfirma) {
        return 'Preencha todos os campos para criar sua conta.';
      }
      if (normalizedNome.length < 2) {
        return 'O nome precisa ter pelo menos 2 caracteres.';
      }
      if (!/[\w.-]+@[\w.-]+|\d{3,}/.test(normalizedLogin) && normalizedLogin.length < 4) {
        return 'Informe um RA, e-mail ou nome de usuário válido.';
      }
      if (normalizedSenha.length < 6) {
        return 'A senha precisa ter ao menos 6 caracteres.';
      }
      if (normalizedSenha !== normalizedConfirma) {
        return 'As senhas não conferem. Verifique e tente novamente.';
      }
      this.setAuthenticatedUser({ nome: normalizedNome, login: normalizedLogin });
      return '';
    },
    showAlert(containerId, message, type = 'error') {
      const container = document.getElementById(containerId);
      if (!container) return;
      const alert = document.createElement('div');
      alert.className = `alert alert-${type}`;
      alert.textContent = message;
      container.innerHTML = '';
      container.appendChild(alert);
    },
    setButtonLoading(button, isLoading, label = 'Continuar') {
      if (!button) return;
      button.disabled = isLoading;
      button.innerHTML = isLoading ? '<span class="spinner" aria-hidden="true"></span> Processando...' : label;
    },
    showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      if (!toast) return;
      toast.className = `toast show ${type}`;
      toast.textContent = message;
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.className = 'toast';
      }, 2800);
    },
    renderSidebar(activePage = 'home') {
      const sidebarRoot = document.getElementById('sidebar');
      if (!sidebarRoot) return;
      const items = [
        { label: 'Início', href: 'Home.html', icon: '🏠', key: 'home' },
        { label: 'Relacionamentos', href: 'relacionamentos-abusivos.html', icon: '🛡️', key: 'relacionamentos' },
        { label: 'Saúde emocional', href: 'violencia-psicologica.html', icon: '🧠', key: 'psicologica' },
        { label: 'Segurança física', href: 'violencia-fisica.html', icon: '🚑', key: 'fisica' },
        { label: 'Assédio', href: 'assedio.html', icon: '⚠️', key: 'assedio' },
        { label: 'Apoio', href: 'dependencia-emocional.html', icon: '🤝', key: 'dependencia' },
        { label: 'Direitos', href: 'direitos-da-mulher.html', icon: '⚖️', key: 'direitos' },
        { label: 'Denúncias', href: 'denuncias.html', icon: '📩', key: 'denuncias' },
        { label: 'Emergência', href: 'emergencia.html', icon: '🚨', key: 'emergencia' },
        { label: 'Configurações', href: 'configuracoes.html', icon: '⚙️', key: 'configuracoes' },
        { label: 'Perfil', href: 'perfil.html', icon: '👤', key: 'perfil' }
      ];
      sidebarRoot.innerHTML = `
        <aside class="sidebar" aria-label="Menu principal">
          <div class="brand-block">
            <div class="brand-mark">N</div>
            <div>
              <p class="eyebrow">Northstar Safe</p>
              <h3>Centro de apoio</h3>
            </div>
          </div>
          <nav>
            ${items.map(item => `
              <a class="nav-link ${activePage === item.key ? 'active' : ''}" href="${item.href}">
                <span>${item.icon}</span>
                <span>${item.label}</span>
              </a>
            `).join('')}
          </nav>
        </aside>
      `;
    },
    renderFooter() {
      const footer = document.getElementById('footer');
      if (!footer) return;
      footer.innerHTML = `
        <footer class="footer">
          <p>Northstar Safe • Segurança, acolhimento e apoio responsável.</p>
          <p><a href="../index.html">Voltar ao início</a> • <a href="https://google.com" target="_blank" rel="noreferrer">Saída rápida</a></p>
        </footer>
      `;
    },
    activateTabs() {
      const tabs = document.querySelectorAll('.tab');
      const panels = document.querySelectorAll('.tab-panel');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.target;
          tabs.forEach(item => item.classList.remove('active'));
          panels.forEach(panel => panel.classList.remove('active'));
          tab.classList.add('active');
          if (target) {
            const panel = document.getElementById(target);
            if (panel) panel.classList.add('active');
          }
        });
      });
    },
    prepareSms() {
      const text = encodeURIComponent('Estou em situação de emergência. Minha localização é: (latitude, longitude).');
      window.location.href = `sms:?body=${text}`;
    },
    requestLocation(outputId = 'location-output') {
      const output = document.getElementById(outputId);
      if (!output) return;
      if (!navigator.geolocation) {
        output.textContent = 'Geolocalização não suportada neste navegador.';
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
  };
  window.ProtegeCM = app;
})();
