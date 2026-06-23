document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('[data-section-link]');
    const sections = document.querySelectorAll('section.screen');

    if (tabs.length && sections.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function (event) {
                event.preventDefault();
                const target = tab.dataset.sectionLink;
                openSection(target);
            });
        });
        const activeHash = window.location.hash.replace('#', '');
        if (activeHash) {
            openSection(activeHash);
        } else {
            document.querySelector('section.screen')?.classList.add('active');
        }
    }

    function openSection(id) {
        sections.forEach((el) => el.classList.remove('active'));
        tabs.forEach((el) => el.classList.remove('active'));
        const targetSection = document.querySelector(`section#${id}`);
        const targetLink = document.querySelector(`[data-section-link='${id}']`);
        if (targetSection) targetSection.classList.add('active');
        if (targetLink) targetLink.classList.add('active');
        window.location.hash = id;
    }

    const dateInput = document.querySelector('#appointment-date');
    const repeatWrapper = document.querySelector('#repeat-wrapper');
    if (dateInput && repeatWrapper) {
        dateInput.addEventListener('change', updateRepeatField);
        updateRepeatField();
    }

    function updateRepeatField() {
        const value = dateInput.value;
        if (!value) {
            repeatWrapper.style.display = 'none';
            return;
        }
        const date = new Date(value + 'T00:00:00');
        repeatWrapper.style.display = date.getDay() === 2 ? 'block' : 'none';
    }

    const agentButtons = document.querySelectorAll('[data-agent]');
    if (agentButtons.length) {
        agentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const agent = button.dataset.agent;
                const prompt = button.closest('.agent-card').querySelector('textarea').value.trim();
                const output = button.closest('.agent-card').querySelector('.agent-output');
                output.textContent = createAgentResponse(agent, prompt);
            });
        });
    }

    function createAgentResponse(agent, prompt) {
        if (agent === 'psychology') {
            if (!prompt) {
                return 'Escolha um tópico sobre ABA, transição, reforço positivo ou rotina para receber uma orientação prática.';
            }
            return `Sugestão ABA: considere começar com reforço positivo imediato e escalonar tarefas. Para "${prompt}", use linguagem simples, objetivos claros e revise progresso a cada 50 min.`;
        }
        if (agent === 'finance') {
            if (!prompt) {
                return 'Insira um tema financeiro para receber uma dica sobre controle de receitas, despesas ou investimentos em materiais terapêuticos.';
            }
            return `Sugestão financeira: para "${prompt}", registre cada entrada e saída, priorize compras que suportem a terapia padrão e mantenha saldo mensal atualizado.`;
        }
        return 'Agente não encontrado.';
    }

    window.renderCharts = function (data) {
        if (!data) return;
        renderAgeChart(data.ageGroups);
        renderConsultationChart(data.consultationCounts);
    };

    function renderAgeChart(groups) {
        const canvas = document.getElementById('ageChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const labels = Object.keys(groups);
        const values = Object.values(groups);
        const maxValue = Math.max(...values, 1);
        const width = canvas.width = canvas.clientWidth * 2;
        const height = canvas.height = canvas.clientHeight * 2;
        ctx.clearRect(0, 0, width, height);
        const barWidth = width / labels.length * 0.6;
        labels.forEach((label, index) => {
            const x = index * (width / labels.length) + (width / labels.length - barWidth) / 2;
            const barHeight = (values[index] / maxValue) * (height * 0.7);
            ctx.fillStyle = '#2563eb';
            ctx.fillRect(x, height - barHeight - 30, barWidth, barHeight);
            ctx.fillStyle = '#111827';
            ctx.font = '24px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(values[index], x + barWidth / 2, height - barHeight - 40);
            ctx.font = '18px Inter';
            ctx.fillText(label, x + barWidth / 2, height - 10);
        });
    }

    function renderConsultationChart(items) {
        const canvas = document.getElementById('consultationChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const labels = items.slice(0, 5).map((item) => item.name);
        const values = items.slice(0, 5).map((item) => item.count);
        const maxValue = Math.max(...values, 1);
        const width = canvas.width = canvas.clientWidth * 2;
        const height = canvas.height = canvas.clientHeight * 2;
        ctx.clearRect(0, 0, width, height);
        const sliceAngle = (Math.PI * 2) / values.length;
        let startAngle = -Math.PI / 2;
        values.forEach((value, index) => {
            const angle = sliceAngle * (value / Math.max(...values));
            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);
            ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.35, startAngle, startAngle + angle);
            ctx.closePath();
            ctx.fillStyle = `hsl(${index * 52}, 75%, 55%)`;
            ctx.fill();
            startAngle += angle;
        });
    }
});
