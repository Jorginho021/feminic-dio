// Autenticação simulada para o site HTML-only do Protege CM.

const validUsers = [
    { login: 'aluna123', senha: 'protege123', nome: 'Aluna Protege' },
    { login: 'cm2026', senha: 'acolhe2026', nome: 'Estudante CM' }
];

export function setAuthenticatedUser(user) {
    sessionStorage.setItem('protegecm-auth', 'true');
    sessionStorage.setItem('protegecm-user', user.nome);
}

export function logout() {
    sessionStorage.removeItem('protegecm-auth');
    sessionStorage.removeItem('protegecm-user');
    window.location.href = '../index.html';
}

export function isAuthenticated() {
    return sessionStorage.getItem('protegecm-auth') === 'true';
}

export function getAuthenticatedUser() {
    return sessionStorage.getItem('protegecm-user') || 'Usuária';
}

export function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

export function validateLoginForm(login, senha) {
    if (!login || !senha) {
        return 'Preencha RA/e-mail e senha para continuar.';
    }
    const user = validUsers.find(item => item.login === login.trim().toLowerCase());
    if (!user) {
        return 'Usuário não encontrado. Verifique os dados informados.';
    }
    if (user.senha !== senha) {
        return 'Senha incorreta. Tente novamente.';
    }
    setAuthenticatedUser(user);
    return '';
}

export function validateRegisterForm(nome, login, senha, confirma) {
    if (!nome || !login || !senha || !confirma) {
        return 'Preencha todos os campos para criar sua conta.';
    }
    if (senha.length < 6) {
        return 'A senha precisa ter ao menos 6 caracteres.';
    }
    if (senha !== confirma) {
        return 'As senhas não conferem. Verifique e tente novamente.';
    }
    setAuthenticatedUser({ nome: nome.trim(), login: login.trim().toLowerCase() });
    return '';
}
