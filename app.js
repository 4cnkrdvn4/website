/**
 * RIDVAN PORTFOLIO - CORE APPLICATION LOGIC
 * Features: Interactive Terminal, Typewriter, Project Filtering, Modal Preview, Scroll Spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initSpotlight();
  initTerminal();
  initProjectFilter();
  initScrollSpy();
  initContactForm();
  initMobileMenu();
});

/* -------------------------------------------------------------
 * 1. DYNAMIC TYPEWRITER EFFECT
 * ------------------------------------------------------------- */
function initTypewriter() {
  const words = [
    "Full-Stack Web Geliştirici",
    "Python & Backend Mimarı",
    "Modern Web & SaaS Çözümleri",
    "Yapay Zeka & API Entegratörü"
  ];
  const target = document.getElementById("typewriter-text");
  if (!target) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const holdTime = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = holdTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* -------------------------------------------------------------
 * 2. MOUSE SPOTLIGHT EFFECT
 * ------------------------------------------------------------- */
function initSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

/* -------------------------------------------------------------
 * 3. INTERACTIVE TERMINAL EMULATOR
 * ------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  const terminalData = {
    help: `Mevcut komutlar:
  • <span class="highlight">skills</span>     : Rıdvan'ın teknik yetenekleri
  • <span class="highlight">projects</span>   : Geliştirilen öne çıkan projeler
  • <span class="highlight">about</span>      : Rıdvan kimdir? Kısa biyografi
  • <span class="highlight">contact</span>    : İletişim bilgileri ve bağlantılar
  • <span class="highlight">python</span>     : Python sürümü ve kütüphaneler
  • <span class="highlight">hire</span>       : Rıdvan'ı ekibine kat!
  • <span class="highlight">clear</span>      : Terminal ekranını temizle`,
    
    skills: `🚀 Teknik Yetenek Seti:
  [Backend]  : Python (FastAPI, Django, Flask), RESTful API, PostgreSQL, Redis
  [Frontend] : JavaScript (ES6+), HTML5/CSS3, Modern Reactive UI, Tailwind/Vanilla
  [Desktop]  : Tkinter, PyQt, Desktop Automation, System Scripts
  [DevOps]   : Git, GitHub, Docker, Linux Shell, Cloud Deployments`,
    
    projects: `📦 Seçkin Projeler:
  1. <span class="highlight">Quantum SaaS Analytics</span> - Gerçek zamanlı veri görselleştirme & panel
  2. <span class="highlight">NeuroFlow AI Suite</span> - Python tabanlı yapay zeka & kod üreticisi
  3. <span class="highlight">Hyperion Python Suite</span> - Masaüstü hesap makinesi & performans optimizasyon aracı`,
    
    about: `👋 Rıdvan:
  Modern web teknolojileri ve Python ekosisteminde ölçeklenebilir, 
  estetik ve kullanıcı odaklı çözümler üreten full-stack geliştirici.
  "Temiz kod, güçlü performans ve göz alıcı arayüzler."`,
    
    contact: `📬 İletişim:
  • E-posta   : ridvan.dev@gmail.com
  • GitHub    : github.com/ridvan
  • LinkedIn  : linkedin.com/in/ridvan-dev
  • Konum     : Türkiye (Remote / Hibrit)`,
    
    python: `Python 3.13.14 (CPython)
Temel kütüphaneler: NumPy, Pandas, Requests, Tkinter, PyTorch, FastAPI
Durum: Aktif ve çalışmaya hazır. 🐍`,
    
    hire: `🎉 Harika bir karar! Rıdvan ile hemen iletişime geçmek için
aşağıdaki iletişim formunu doldurabilir veya doğrudan 
ridvan.dev@gmail.com adresine yazabilirsiniz!`
  };

  function appendLine(content, type = 'result') {
    const div = document.createElement('div');
    div.className = `terminal-line ${type}`;
    div.innerHTML = content;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  window.runTerminalCommand = function(cmd) {
    appendLine(`ridvan@dev:~$ ${cmd}`, 'command');
    executeCommand(cmd);
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();

    if (cmd === 'clear') {
      output.innerHTML = '';
      return;
    }

    if (cmd in terminalData) {
      appendLine(terminalData[cmd].replace(/\n/g, '<br>'), 'result');
    } else if (cmd === 'sudo hire ridvan' || cmd === 'hire ridvan') {
      appendLine(terminalData.hire.replace(/\n/g, '<br>'), 'highlight');
    } else if (cmd === '') {
      // boş giriş
    } else {
      appendLine(`Komut bulunamadı: "${cmd}". Komut listesi için <span class="highlight">help</span> yazın.`, 'system');
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim()) {
        runTerminalCommand(val);
        input.value = '';
      }
    }
  });
}

/* -------------------------------------------------------------
 * 4. PROJECT FILTER & MODAL
 * ------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* Modal Helper */
window.openProjectModal = function(title, category, desc, techList) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-category').textContent = category;
  document.getElementById('modal-desc').textContent = desc;

  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = '';
  techList.split(',').forEach(tech => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = tech.trim();
    techContainer.appendChild(span);
  });

  modal.classList.add('active');
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
};

/* -------------------------------------------------------------
 * 5. SCROLL SPY & NAVBAR ACTIVE STATE
 * ------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* -------------------------------------------------------------
 * 6. CONTACT FORM & INSTANT TOAST
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    if (!name || !email || !message) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    // Gösterim Bildirimi
    showToast(`Teşekkürler ${name}! Mesajınız başarıyla iletildi.`);
    form.reset();
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* -------------------------------------------------------------
 * 7. MOBILE MENU
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('show-mobile');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show-mobile');
      });
    });
  }
}
