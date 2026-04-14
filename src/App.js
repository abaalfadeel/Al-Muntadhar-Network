async function loadSection(type) {
    const app = document.getElementById('app');
    const title = document.getElementById('page-title');
    
    // تنظيف الشاشة وإظهار مؤشر تحميل
    app.innerHTML = '<div class="text-center">جاري تحميل البيانات...</div>';
    
    if (type === 'sahaba') {
        title.innerText = 'الصحابة العدول';
        title.style.color = '#D4AF37';
    } else {
        title.innerText = 'المخالفون';
        title.style.color = '#ef4444';
    }

    try {
        // جلب البيانات من المجلد المحلي
        const response = await fetch(`./data/${type}.json`);
        const data = await response.json();
        
        app.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${data.map(item => createCard(item, type)).join('')}
        </div>`;
    } catch (error) {
        app.innerHTML = `<div class="text-center text-red-500">حدث خطأ أثناء جلب البيانات. تأكد من وجود ملف ${type}.json في مجلد data</div>`;
    }
}

function createCard(item, type) {
    const isRed = type === 'mukhalifeen';
    return `
        <div class="bg-black border ${isRed ? 'border-red-900 hover:border-red-500' : 'border-gold/30 hover:border-gold'} p-5 rounded-lg transition-all">
            ${isRed ? '<div class="text-xs text-red-600 font-bold mb-1">الملعون / الملعونة</div>' : ''}
            <h3 class="text-xl font-bold mb-3">${item.name}</h3>
            <div class="text-sm text-gray-400 space-y-1">
                <p><span class="text-gray-500">الوفاة:</span> ${item.death || 'غير معروف'}</p>
                <p><span class="text-gray-500">المصدر:</span> ${item.source || '-'}</p>
            </div>
        </div>
    `;
}
