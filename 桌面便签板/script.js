const reveals = [...document.querySelectorAll(".reveal")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const i = reveals.indexOf(entry.target);
      entry.target.style.animationDelay = `${(Math.max(i, 0) % 8) * 0.08}s`;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
reveals.forEach((el) => io.observe(el));

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);
sections.forEach((section) => spy.observe(section));

document.querySelectorAll(".cta").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("is-loading");
    window.setTimeout(() => btn.classList.remove("is-loading"), 280);
  });
});

const copy = {
  todo: "今天必须推进的事。短句即可，完成后划掉，不升级成项目管理。",
  later: "还没想清楚要不要做。先放着，避免假装自己已经排好优先级。",
  idea: "一句忽然出现的话。最多三千字，给它单独的编辑区，让它慢慢长。"
};

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    const panel = document.getElementById("tab-copy");
    if (panel) panel.textContent = copy[tab.dataset.tab] || copy.todo;
  });
});

const date = new Date();
const orbDate = document.querySelector(".orb-date");
const orbWeek = document.querySelector(".orb-week");
if (orbDate) {
  orbDate.textContent = `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}
if (orbWeek) {
  orbWeek.textContent = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
}
