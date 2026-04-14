// تحديد الحاوية الرئيسية
const app = document.getElementById('app');

/**
 * دالة تحميل الصفحات المركزية
 * @param {string} pageName - اسم الصفحة المراد تحميلها
 */
async function loadPage(pageName) {
    app.innerHTML = '<div class="loader">جاري التحميل...</div>'; // حالة التحميل

    try {
        // جلب ملف HTML للصفحة
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error('لم يتم العثور على الصفحة');
        
        const html = await response.text();
        app.innerHTML = html; // حقن الكود داخل التطبيق

        // بعد حقن HTML، نقوم بتحميل البيانات الخاصة بالصفحة إن وجدت
        if (pageName === 'sahaba') await loadData('data/sahaba.json', renderSahaba);
        if (pageName === 'mazalim') await loadData('data/mazalim.json', renderMazalim);
        if (pageName === 'research') await loadData('data/research.json', renderResearch);

    } catch (error) {
        console.error(error);
        app.innerHTML = `<div class="card" style="text-align:center; color:red;">
            <h2>خطأ 404</h2>
            <p>عذراً، حدث خطأ أثناء تحميل الصفحة أو أن الصفحة غير موجودة.</p>
        </div>`;
    }
}

/**
 * دالة جلب البيانات من JSON
 */
async function loadData(url, renderFunction) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderFunction(data); // تمرير البيانات لدالة العرض المخصصة
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// ==========================================
// دوال العرض (Render Functions)
// ==========================================

function renderSahaba(data) {
    const container = document.getElementById('sahaba-container');
    if (!container) return;
    
    let html = '';
    data.forEach(item => {
        html += `
            <div class="card">
                <h3>${item.name}</h3>
                <p><strong>سنة الولادة:</strong> ${item.birth}</p>
                <p><strong>سنة الوفاة:</strong> ${item.death}</p>
                <p><strong>الحقبة:</strong> ${item.era}</p>
                <p><strong>الروايات:</strong> ${item.narrations}</p>
                <p><strong>المصدر:</strong> <span style="color:var(--gold-primary)">${item.source}</span></p>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderMazalim(data) {
    const container = document.getElementById('mazalim-container');
    if (!container) return;

    let html = '';
    data.forEach(item => {
        html += `
            <div class="timeline-item">
                <div class="date">${item.date}</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p style="margin-top:10px; font-size:0.85rem; color:var(--text-muted);">
                    <strong>المصدر:</strong> ${item.source}
                </p>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderResearch(data) {
    const container = document.getElementById('research-container');
    if (!container) return;

    let html = '';
    data.forEach(item => {
        html += `
            <div class="card" style="margin-bottom:20px;">
                <h3 style="font-size:1.5rem;">${item.title}</h3>
                <p style="color:var(--text-muted); margin-bottom:15px;">الكاتب: ${item.author} | التاريخ: ${item.date}</p>
                <p>${item.content}</p>
                <div style="margin-top:15px; padding-top:10px; border-top:1px solid #333;">
                    <strong>المراجع:</strong> ${item.references}
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// ==========================================
// نظام التوجيه (Router)
// ==========================================
function router() {
    // الحصول على اسم الصفحة من الرابط (Hash)، الافتراضي هو home
    let hash = window.location.hash.substring(1);
    if (!hash) hash = 'home';
    
    loadPage(hash);
}

// الاستماع لتغير الرابط للتبديل بين الصفحات
window.addEventListener('hashchange', router);

// تشغيل الموجه عند تحميل الموقع لأول مرة
window.addEventListener('DOMContentLoaded', router);
