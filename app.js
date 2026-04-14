const state = {
    theme: localStorage.getItem('theme') || 'dark-theme',
    misbahaCount: parseInt(localStorage.getItem('misbaha')) || 0,
    content: null
};

// 1. نظام التنقل (Routing)
async function navigateTo(page, params = '') {
    const app = document.getElementById('app');
    app.innerHTML = '<div class="loader">جاري التحميل...</div>';

    try {
        const response = await fetch(`pages/${page}.html`);
        const html = await response.text();
        app.innerHTML = html;

        // تشغيل دوال خاصة لكل صفحة
        if (page === 'home') initHome();
        if (page === 'section') renderSectionContent(params);
        if (page === 'dashboard') initDashboard();
    } catch (err) {
        app.innerHTML = '<h2>عذراً، حدث خطأ في التحميل.</h2>';
    }
}

// 2. جلب البيانات من JSON
async function getContent() {
    if (!state.content) {
        const res = await fetch('data/content.json');
        state.content = await res.json();
    }
    return state.content;
}

// 3. عرض محتوى الأقسام ديناميكياً
async function renderSectionContent(sectionId) {
    const data = await getContent();
    const sectionData = data.sections[sectionId];
    const container = document.getElementById('section-content');
    
    document.getElementById('section-title').innerText = sectionData.title;
    
    container.innerHTML = sectionData.items.map(item => `
        <div class="card" style="background:var(--card-bg); padding:1.5rem; margin-bottom:1rem; border-radius:10px; border-right:5px solid var(--secondary)">
            <h3>${item.subject}</h3>
            <p>${item.body}</p>
            <small>المصدر: ${item.source || 'غير محدد'}</small>
        </div>
    `).join('');
}

// 4. نظام المسبحة
function handleMisbaha(action) {
    const display = document.getElementById('misbaha-count');
    if (action === 'count') state.misbahaCount++;
    if (action === 'reset') state.misbahaCount = 0;
    
    display.innerText = state.misbahaCount;
    localStorage.setItem('misbaha', state.misbahaCount);
}

// 5. تبديل الثيم
document.getElementById('theme-toggle').addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    document.getElementById('theme-toggle').innerText = newTheme === 'dark-theme' ? '🌙' : '☀️';
});

// التشغيل الأولي
window.onload = () => {
    document.body.className = state.theme;
    navigateTo('home');
};
