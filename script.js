document.addEventListener('DOMContentLoaded', () => {
  const habitInput = document.getElementById('habit-input');
  const addHabitBtn = document.getElementById('add-habit');
  const habitsContainer = document.getElementById('habits-container');
  const toggleThemeBtn = document.getElementById('toggle-theme');

  const congratsMessage = document.getElementById('congrats-message');
  const levelSpan = document.getElementById('level');

  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  let habits = JSON.parse(localStorage.getItem('habits')) || [];
  let level = parseInt(localStorage.getItem('level')) || 0;
  let currentClassIndex = parseInt(localStorage.getItem('currentClassIndex')) || 0;

  const classes = [
    { name: 'Soldado', emoji: '🪖', levels: 10 },
    { name: 'Mago', emoji: '🧙‍♂️', levels: 10 },
    { name: 'Bárbaro', emoji: '🪓', levels: 10 },
    { name: 'Assassino', emoji: '🥷', levels: 10 },
    { name: 'Paladino', emoji: '🛡️', levels: 10 },
    { name: 'Arqueiro', emoji: '🏹', levels: 10 }
  ];

  const saveAll = () => {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('level', level);
    localStorage.setItem('currentClassIndex', currentClassIndex);
  };

  const calculateProgress = () =>
    habits.reduce((total, h) => total + h.completed.filter(Boolean).length, 0);

  function updateStatus() {
    const total = calculateProgress();
    level = total;

    let lvlCount = level;
    let idx = 0;
    while (idx < classes.length && lvlCount > classes[idx].levels) {
      lvlCount -= classes[idx].levels;
      idx++;
    }
    if (idx >= classes.length) { idx = classes.length - 1; lvlCount = classes[idx].levels; }

    const cls = classes[idx];

    if (idx > currentClassIndex) {
      congratsMessage.textContent = `Você atingiu o cargo de ${cls.name}! 🥇`;
    } else if (idx < currentClassIndex) {
      congratsMessage.textContent = `Poxa, você perdeu seu cargo de ${classes[currentClassIndex].name}. 😰`;
    } else {
      congratsMessage.textContent = '';
    }

    currentClassIndex = idx;

    levelSpan.innerHTML =
      `<span class="class-name"><span class="emoji">${cls.emoji}</span> <span class="text">${cls.name}</span></span>` +
      `<span class="level-count">| Nível ${lvlCount} - ${cls.levels}</span>`;

    saveAll();
  }

  function createHabitElement(habit, index) {
    const habitEl = document.createElement('div');
    habitEl.className = 'habit';

    const header = document.createElement('div');
    header.className = 'habit-header';

    const title = document.createElement('h3');
    title.textContent = habit.name;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Excluir';
    delBtn.className = 'delete-btn';
    delBtn.ariaLabel = `Excluir hábito ${habit.name}`;
    delBtn.addEventListener('click', () => {
      habits.splice(index, 1);
      saveAll();
      renderHabits();
    });

    header.append(title, delBtn);
    habitEl.appendChild(header);


    const daysResetContainer = document.createElement('div');
    daysResetContainer.className = 'days-reset-container';

    const daysDiv = document.createElement('div');
    daysDiv.className = 'days';

    days.forEach((d, di) => {
      const label = document.createElement('label');
      label.className = 'day';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = habit.completed[di];

      cb.addEventListener('change', () => {
        habit.completed[di] = cb.checked;
        saveAll();
        updateStatus();
      });

      label.append(cb, d);
      daysDiv.appendChild(label);
    });

    daysResetContainer.appendChild(daysDiv);

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Limpar semana';
    resetBtn.className = 'reset-btn';
    resetBtn.ariaLabel = `Desmarcar todos os dias do hábito ${habit.name}`;
    resetBtn.addEventListener('click', () => {
      habit.completed = Array(7).fill(false);
      saveAll();
      renderHabits();
    });

    daysResetContainer.appendChild(resetBtn);

    habitEl.appendChild(daysResetContainer);
    habitsContainer.appendChild(habitEl);
  }

  function renderHabits() {
    habitsContainer.innerHTML = '';
    habits.forEach(createHabitElement);
    updateStatus();
  }

  addHabitBtn.addEventListener('click', () => {
    const name = habitInput.value.trim();
    if (!name) return;
    habits.push({ name, completed: Array(7).fill(false) });
    habitInput.value = '';
    saveAll();
    renderHabits();
  });

  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '⚪' : '⚫';
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleThemeBtn.textContent = '⚪';
  }

  renderHabits();
});
