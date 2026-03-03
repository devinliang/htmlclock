// Theme toggle functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

initTheme();

(() => {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    function updateClock() {
        const now = new Date();
        const ms = now.getMilliseconds();
        const s = now.getSeconds() + ms / 1000;
        const m = now.getMinutes() + s / 60;
        const h = now.getHours() % 12 + m / 60;

        const sDeg = (s / 60) * 360 - 90;
        const mDeg = (m / 60) * 360 - 90;
        const hDeg = (h / 12) * 360 - 90;

        secondHand.style.transform = `translateY(-50%) rotate(${sDeg}deg)`;
        minuteHand.style.transform = `translateY(-50%) rotate(${mDeg}deg)`;
        hourHand.style.transform = `translateY(-50%) rotate(${hDeg}deg)`;
    }

    // Start smooth clock animation
    function tick() {
        updateClock();
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Generate clock ticks
    const clockEl = document.querySelector('.clock');
    for (let i = 0; i < 60; i++) {
        const t = document.createElement('div');
        t.className = 'tick' + (i % 5 === 0 ? '' : ' small');
        t.style.transform = `translate(-50%, 0) rotate(${i * 6}deg) translateY(0)`;
        t.style.top = '16px';
        t.style.left = '50%';
        clockEl.appendChild(t);
    }

    /* Calendar functionality */
    let viewYear, viewMonth;
    const monthYearEl = document.querySelector('.month-year');
    const tbody = document.querySelector('.calendar-table tbody');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    function generateCalendar(year, month) {
        tbody.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        monthYearEl.textContent = new Date(year, month, 1).toLocaleString('zh-TW', {
            month: 'long',
            year: 'numeric'
        });

        let date = 1;
        for (let r = 0; r < 6; r++) {
            const tr = document.createElement('tr');
            for (let c = 0; c < 7; c++) {
                const td = document.createElement('td');
                if (r === 0 && c < firstDay) {
                    td.className = 'empty';
                    td.textContent = '';
                } else if (date > daysInMonth) {
                    td.className = 'empty';
                    td.textContent = '';
                } else {
                    td.textContent = date;
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        td.classList.add('today');
                    }
                    date++;
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }

    function initCalendar() {
        const now = new Date();
        viewYear = now.getFullYear();
        viewMonth = now.getMonth();
        generateCalendar(viewYear, viewMonth);
    }

    prevBtn.addEventListener('click', () => {
        viewMonth--;
        if (viewMonth < 0) {
            viewMonth = 11;
            viewYear--;
        }
        generateCalendar(viewYear, viewMonth);
    });

    nextBtn.addEventListener('click', () => {
        viewMonth++;
        if (viewMonth > 11) {
            viewMonth = 0;
            viewYear++;
        }
        generateCalendar(viewYear, viewMonth);
    });

    initCalendar();
})();