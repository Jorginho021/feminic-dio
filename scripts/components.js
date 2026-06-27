// Componentes reutilizáveis do Protege CM em HTML puro.

export function renderSidebar(activePage = '') {
    const items = [
        { label: 'Início', href: '../index.html', icon: '🏠', key: 'home' },
        { label: 'Relacionamentos Abusivos', href: 'relacionamentos-abusivos.html', icon: '💔', key: 'relacionamentos' },
        { label: 'Violência Psicológica', href: 'violencia-psicologica.html', icon: '🧠', key: 'psicologica' },
        { label: 'Violência Física', href: 'violencia-fisica.html', icon: '🤕', key: 'fisica' },
        { label: 'Assédio', href: 'assedio.html', icon: '🚫', key: 'assedio' },
        { label: 'Dependência Emocional', href: 'dependencia-emocional.html', icon: '🤝', key: 'dependencia' },
        { label: 'Direitos da Mulher', href: 'direitos-da-mulher.html', icon: '⚖️', key: 'direitos' },
        { label: 'Denúncias', href: 'denuncias.html', icon: '📩', key: 'denuncias' },
        { label: 'Emergência', href: 'emergencia.html', icon: '🚨', key: 'emergencia' },
        { label: 'Configurações', href: 'configuracoes.html', icon: '⚙️', key: 'configuracoes' },
        { label: 'Perfil', href: 'perfil.html', icon: '👤', key: 'perfil' },
    ];

    const nav = document.querySelector('#sidebar');
    if (!nav) return;

    nav.innerHTML = `
        <div class="sidebar">
            <div class="header">
                <div class="logo-circle">CM</div>
                <div class="header-content">
                    <h2>Protege CM</h2>
                    <p>Espaço seguro e acolhedor.</p>
                </div>
            </div>
            <nav>
                <ul class="nav-list">
                    ${items.map(item => `
                        <li class="nav-item"><a class="${activePage === item.key ? 'active' : ''}" href="${item.href}"><span>${item.icon}</span>${item.label}</a></li>
                    `).join('')}
                </ul>
            </nav>
        </div>
    `;
}

export function renderFooter() {
    const footer = document.querySelector('#footer');
    if (!footer) return;
    footer.innerHTML = `
        <div class="footer">
            <p>Protege CM • Projeto Educacional • Escola Estadual Cecília Meireles</p>
            <p><a href="../index.html">Voltar para página inicial</a> • <a href="https://www.google.com" target="_blank" rel="noreferrer">Saída rápida</a></p>
        </div>
    `;
}
