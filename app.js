// 1. نظام الثيم
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    body.className = isDark ? 'light-mode' : 'dark-mode';
    document.getElementById('theme-btn').innerText = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', body.className);
}

// 2. المحرك الأساسي: تحميل الصفحات (SPA)
async function loadPage(pageName) {
    const app = document.getElementById('app');
    app.innerHTML = '<h3 style="text-align:center; color:var(--secondary); margin-top:50px;">جاري التحميل...</h3>';

    try {
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error('Page not found');
        app.innerHTML = await response.text();

        // توجيه البيانات بناءً على الصفحة المحملة
        if (pageName === 'sahaba') loadData('data/sahaba.json', renderCards);
        else if (pageName === 'mazalim') loadData('data/mazalim.json', renderTimeline);
        else if (pageName === 'research') loadData('data/research.json', renderArticles);
        else if (['aqeeda', 'shubuhat', 'fadhail', 'daif', 'mukhalifeen'].includes(pageName)) {
            loadContentSection(pageName);
        }
        else if (pageName === 'shia') initMisbaha();

        window.scrollTo(0, 0);
    } catch (error) {
        app.innerHTML = `<div class="card"><h3 style="color:red">خطأ!</h3><p>تعذر تحميل الصفحة. تأكد من عملك على سيرفر (Live Server) أو GitHub Pages.</p></div>`;
    }
}

// 3. جلب البيانات
async function loadData(url, renderCallback) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderCallback(data);
    } catch (error) {
        console.error("Data load error", error);
    }
}

async function loadContentSection(sectionKey) {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        renderCards(data[sectionKey]);
    } catch (error) {
        console.error("Content load error", error);
    }
}

// 4. دوال العرض (Renderers)
function renderCards(data) {
    const container = document.getElementById('data-container');
    if (!container || !data) return;
    container.innerHTML = data.map(item => `
        <div class="card">
            <h3>${item.title || item.name}</h3>
            <p>${item.desc || item.details}</p>
            <small style="color:var(--primary)">المصدر: ${item.source || 'غير محدد'}</small>
        </div>
    `).join('');
}

function renderTimeline(data) {
    const container = document.getElementById('data-container');
    if (!container || !data) return;
    container.innerHTML = data.map(item => `
        <div class="card">
            <div class="timeline-date">${item.date}</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `).join('');
}

function renderArticles(data) {
    const container = document.getElementById('data-container');
    if (!container || !data) return;
    container.innerHTML = data.map(item => `
        <div class="card" style="margin-bottom:2rem">
            <h3>${item.title}</h3>
            <small>الكاتب: ${item.author}</small>
            <hr style="border-color:var(--border); margin:10px 0;">
            <p>${item.body}</p>
        </div>
    `).join('');
}

// 5. نظام المسبحة
function initMisbaha() {
    const countDisplay = document.getElementById('tasbeeh-count');
    if (!countDisplay) return;
    
    let currentCount = parseInt(localStorage.getItem('tasbeeh')) || 0;
    countDisplay.innerText = currentCount;

    window.tasbeehCounter = function(action) {
        if (action === 'add') currentCount++;
        if (action === 'reset') currentCount = 0;
        countDisplay.innerText = currentCount;
        localStorage.setItem('tasbeeh', currentCount);
    };
}

// التهيئة عند فتح الموقع
window.onload = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    document.body.className = savedTheme;
    document.getElementById('theme-btn').innerText = savedTheme === 'dark-mode' ? '☀️' : '🌙';
    loadPage('home');
};
