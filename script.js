const demoCollections = [
  { title: 'Eclipsing Nebula', date: '2026-10-07', category: 'stars', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80', description: 'A glowing stellar nursery emits energy across the dark reaches of interstellar space.' },
  { title: 'Europa Ice Shell', date: '2026-10-02', category: 'planets', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80', description: 'A frozen moon reveals clues about the hidden ocean beneath its cracked icy surface.' },
  { title: 'Galactic Spiral', date: '2026-09-29', category: 'galaxies', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80', description: 'The swirl of ancient stars reveals the beauty of a barred spiral structure.' },
  { title: 'Earth at Dawn', date: '2026-09-25', category: 'earth', image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=900&q=80', description: 'Sunrise over Earth highlights atmospheric patterns and the planet’s dynamic climate system.' },
  { title: 'Lunar Lander', date: '2026-09-18', category: 'space missions', image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=900&q=80', description: 'A lunar lander studies the terrain to prepare for future science and transport systems.' },
  { title: 'Red Planet Map', date: '2026-09-11', category: 'planets', image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80', description: 'New observations refine our understanding of Mars dunes, dust storms and mineral composition.' }
];

const asteroidData = [
  {
    name: '2024 QZ5',
    size: '190 m',
    velocity: '18.7 km/s',
    distance: '6.4 million km',
    hazard: 'No immediate risk',
    closest: '2026-11-14',
    risk: 'low'
  },
  {
    name: 'APO-17',
    size: '520 m',
    velocity: '24.1 km/s',
    distance: '9.3 million km',
    hazard: 'Watchlist',
    closest: '2026-12-06',
    risk: 'moderate'
  },
  {
    name: 'Astra-9',
    size: '780 m',
    velocity: '31.8 km/s',
    distance: '3.1 million km',
    hazard: 'Monitoring required',
    closest: '2027-01-10',
    risk: 'high'
  }
];

const missionData = {
  artemis: {
    name: 'Artemis II',
    objective: 'Prepare for deep-space crewed missions around the Moon and validate systems for future exploration.',
    status: 'ACTIVE',
    launch: '2026',
    location: 'Deep space',
    focus: 'Human exploration',
    fact: 'Up to 4 crew members'
  },
  mars: {
    name: 'Mars Exploration',
    objective: 'Analyze surface chemistry, climate and geology to understand whether Mars ever supported life.',
    status: 'ACTIVE',
    launch: '2026',
    location: 'Mars orbit',
    focus: 'Planetary science',
    fact: 'Dust storms can span the planet'
  },
  earth: {
    name: 'Earth Observation',
    objective: 'Track climate shifts, wildfires, ocean heat and atmospheric changes through advanced satellite data.',
    status: 'MONITORING',
    launch: 'Ongoing',
    location: 'Earth orbit',
    focus: 'Climate health',
    fact: 'More than 20 satellites in orbit'
  },
  webb: {
    name: 'James Webb',
    objective: 'Study the earliest galaxies, star formation and exoplanet atmospheres with infrared precision.',
    status: 'SCIENCE',
    launch: '2021',
    location: 'L2 orbit',
    focus: 'Infrared astronomy',
    fact: 'Designed to see through dust clouds'
  },
  lunar: {
    name: 'Lunar Exploration',
    objective: 'Map lunar resources and terrain in support of future sustainable missions and habitats.',
    status: 'PLANNED',
    launch: '2027',
    location: 'Moon surface',
    focus: 'Resource mapping',
    fact: 'Water ice is a key target'
  }
};

const quickReplies = {
  'What is a solar flare?': 'A solar flare is a sudden burst of energy from the Sun. It releases radiation and charged particles that can affect satellites, radio communication and power systems on Earth.',
  'Why is Mars red?': 'Mars looks red because its surface is rich in iron oxide, also known as rust. The dust and soil across the planet give it that warm reddish appearance.',
  'How are asteroids tracked?': 'Asteroids are tracked by telescopes that repeatedly measure their position in the sky. Scientists calculate their orbit and estimate size, speed and potential risk using data from observatories and radar.',
  'Can solar storms affect Earth?': 'Yes. Strong solar storms can disturb Earth’s magnetic field, disrupt radio signals, stress power grids and expose astronauts and satellites to more radiation.',
  'What is the James Webb telescope?': 'The James Webb Space Telescope is a large infrared observatory that studies the early universe, distant galaxies, exoplanets and star-forming clouds with extraordinary detail.'
};

const quizData = {
  question: 'Which telescope observes the universe primarily in infrared?',
  options: ['Hubble', 'James Webb', 'Voyager', 'Apollo'],
  answer: 'James Webb',
  fact: 'Webb can detect heat from the earliest stars and planets hidden behind dust.'
};

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count || 0);
    let current = 0;
    const duration = 1200;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = current;
    }, 16);
  });
}

function revealOnScroll() {
  const observers = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  observers.forEach((element) => observer.observe(element));
}

function setupStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  function resize() {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }

  const stars = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.2 + 0.7,
    speed: Math.random() * 0.6 + 0.2,
    alpha: Math.random() * 0.7 + 0.3
  }));

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  resize();
  render();
  window.addEventListener('resize', resize);
}

function renderDiscoveryCards(filter = 'all') {
  const target = document.getElementById('discovery-grid');
  target.innerHTML = '';

  const items = demoCollections.filter((item) => filter === 'all' || item.category === filter);

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'discovery-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="content">
        <div class="meta">
          <span>${item.category}</span>
          <span>${item.date}</span>
        </div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    `;
    target.appendChild(card);
  });
}

function renderMissionDetails(id) {
  const data = missionData[id];
  if (!data) return;

  document.getElementById('mission-name').textContent = data.name;
  document.getElementById('mission-objective').textContent = data.objective;
  document.getElementById('mission-launch').textContent = data.launch;
  document.getElementById('mission-location').textContent = data.location;
  document.getElementById('mission-focus').textContent = data.focus;
  document.getElementById('mission-fact').textContent = data.fact;

  const tag = document.querySelector('.mission-tag');
  tag.textContent = data.status;
}

function setupMissionCards() {
  const cards = document.querySelectorAll('.mission-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((item) => item.classList.toggle('active', item === card));
      renderMissionDetails(card.dataset.mission);
    });
  });
}

function setupEarthLayers() {
  const buttons = document.querySelectorAll('.layer-btn');
  const globe = document.querySelector('.earth-globe');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      const layer = button.dataset.layer;
      globe.className = `earth-globe layer-${layer} active`;
    });
  });
}

function updateAsteroidDetails(index) {
  const asteroid = asteroidData[index];
  const name = document.getElementById('neo-name');
  const size = document.getElementById('neo-size');
  const velocity = document.getElementById('neo-velocity');
  const distance = document.getElementById('neo-distance');
  const closest = document.getElementById('neo-closest');
  const hazard = document.getElementById('neo-hazard');
  const pill = document.querySelector('.risk-pill');

  name.textContent = asteroid.name;
  size.textContent = asteroid.size;
  velocity.textContent = asteroid.velocity;
  distance.textContent = asteroid.distance;
  closest.textContent = asteroid.closest;
  hazard.textContent = asteroid.hazard;
  pill.textContent = asteroid.risk.toUpperCase();
  pill.className = `risk-pill ${asteroid.risk}`;

  document.querySelectorAll('.asteroid-trail').forEach((trail, idx) => {
    trail.classList.toggle('active', idx === index);
    trail.style.transform = idx === index ? 'scale(1.55)' : '';
  });
}

function setupAsteroids() {
  const objects = document.querySelectorAll('.asteroid-trail');
  objects.forEach((item, index) => {
    item.addEventListener('click', () => updateAsteroidDetails(index));
  });
}

function setupChat() {
  const messages = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-chat');
  const quickBtns = document.querySelectorAll('.chip');

  function addMessage(content, type = 'ai') {
    const div = document.createElement('div');
    div.className = `message ${type === 'ai' ? 'ai-message' : 'user-message'}`;
    div.textContent = content;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function getAnswer(question) {
    const normalized = question.trim();
    const direct = quickReplies[normalized] || quickReplies[Object.keys(quickReplies).find((key) => normalized.toLowerCase().includes(key.toLowerCase()))];

    if (direct) return direct;

    return 'Great question. In simple terms: space is full of systems that interact over vast distances, and scientific missions help us understand them through observation, measurement and comparison.';
  }

  function handleSubmit() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    setTimeout(() => addMessage(getAnswer(text), 'ai'), 350);
  }

  sendBtn.addEventListener('click', handleSubmit);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleSubmit();
  });

  quickBtns.forEach((button) => {
    button.addEventListener('click', () => {
      const question = button.dataset.question || '';
      if (!question) return;
      addMessage(question, 'user');
      setTimeout(() => addMessage(getAnswer(question), 'ai'), 350);
    });
  });
}

async function loadApod() {
  const dateNode = document.getElementById('apod-date');
  const titleNode = document.getElementById('apod-title');
  const explanationNode = document.getElementById('apod-explanation');
  const imageNode = document.getElementById('apod-image');

  const today = new Date().toISOString().slice(0, 10);
  dateNode.textContent = today;

  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${today}`);
    if (!response.ok) throw new Error('API unavailable');
    const data = await response.json();
    if (data.url) {
      imageNode.src = data.url;
    }
    if (data.title) titleNode.textContent = data.title;
    if (data.explanation) explanationNode.textContent = data.explanation.slice(0, 420);
  } catch (error) {
    titleNode.textContent = 'The Cosmic Veil';
    explanationNode.textContent = 'A luminous cloud of stellar dust and gas reveals the beauty of deep-space evolution and the forces shaping our universe.';
  }
}

function setupFeedFilters() {
  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((item) => item.classList.toggle('active', item === button));
      renderDiscoveryCards(button.dataset.filter);
    });
  });
}

function setupQuiz() {
  const questionNode = document.getElementById('quiz-question');
  const optionsNode = document.getElementById('quiz-options');
  const feedbackNode = document.getElementById('quiz-feedback');
  const scoreNode = document.getElementById('score-value');
  const youScore = document.getElementById('you-score');
  const progressNode = document.getElementById('progress-bar');
  const factNode = document.getElementById('fun-fact');

  let score = 0;
  let answered = false;

  function buildOptions() {
    optionsNode.innerHTML = '';
    feedbackNode.classList.add('hidden');
    feedbackNode.textContent = '';
    answered = false;

    quizData.options.forEach((option) => {
      const button = document.createElement('button');
      button.className = 'quiz-option';
      button.type = 'button';
      button.textContent = option;
      button.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const isCorrect = option === quizData.answer;
        if (isCorrect) {
          score += 1;
          feedbackNode.textContent = 'Correct! 🚀';
          feedbackNode.style.background = 'rgba(50, 187, 100, 0.08)';
          feedbackNode.style.borderColor = 'rgba(100, 255, 170, 0.45)';
        } else {
          feedbackNode.textContent = `Not quite. The correct answer is ${quizData.answer}.`;
          feedbackNode.style.background = 'rgba(255, 93, 93, 0.08)';
          feedbackNode.style.borderColor = 'rgba(255, 93, 93, 0.38)';
        }

        feedbackNode.classList.remove('hidden');
        scoreNode.textContent = `${score}`;
        youScore.textContent = `${Math.round((score / 1) * 100)}%`;
        progressNode.style.width = `${Math.min(score * 100, 100)}%`;
        factNode.textContent = quizData.fact;

        Array.from(optionsNode.children).forEach((child) => {
          child.disabled = true;
          if (child.textContent === quizData.answer) child.classList.add('correct');
          if (child === button && !isCorrect) child.classList.add('incorrect');
        });
      });
      optionsNode.appendChild(button);
    });
  }

  questionNode.textContent = quizData.question;
  buildOptions();
}


renderDiscoveryCards();
initCounters();
revealOnScroll();
setupStarfield();
setupMissionCards();
setupEarthLayers();
setupAsteroids();
setupChat();
loadApod();
setupFeedFilters();
setupQuiz();
updateAsteroidDetails(0);
renderMissionDetails('artemis');
