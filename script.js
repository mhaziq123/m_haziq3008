// ==== MOBILE MENU ====//
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ==== DARK MODE ====//
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
}

// ==== FADE-IN ANIMATION ====//
const fadeElements = document.querySelectorAll(".fade-in");

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach((el) => observer.observe(el));
}

// ==== BACK TO TOP ====//
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 400 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==== COUNTER ==== //
const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.dataset.target;
        let count = 0;

        const updateCounter = () => {
          const increment = target / 100;

          if (count < target) {
            count += increment;
            counter.innerText = Math.floor(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// ==== LIGHTBOX ==== //
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close-lightbox");

if (galleryItems.length > 0 && lightbox && lightboxImg) {
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = item.src;
    });
  });
}

if (closeLightbox && lightbox) {
  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (lightbox && e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// ==== TASK SYSTEM ====//

// progress bar
function updateProgress() {
  const tasks = document.querySelectorAll(".task-card input");
  if (tasks.length === 0) return;

  let done = 0;

  tasks.forEach(t => {
    if (t.checked) done++;
  });

  const percent = (done / tasks.length) * 100;
  const bar = document.getElementById("progressBar");

  if (bar) bar.style.width = percent + "%";
}

// Checkbox behavior
document.addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
    const card = e.target.closest(".task-card");

    if (card) {
      if (e.target.checked) {
        card.classList.add("done");
      } else {
        card.classList.remove("done");
      }
    }

    updateProgress();
  }
});

//  progress on load
window.addEventListener("load", updateProgress);

function setActive(btn){
    document.querySelectorAll(".filter button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

function logout(){
    localStorage.removeItem("login");
    localStorage.removeItem("username");
    window.location = "index.html";

}
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
            label: 'Tasks',
            data: [3, 5, 2]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

