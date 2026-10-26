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
      entry.target.style.animationDelay = `${Math.max(i, 0) % 8 * 0.08}s`;
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
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => spy.observe(section));

document.querySelectorAll(".cta").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("is-loading");
    window.setTimeout(() => btn.classList.remove("is-loading"), 280);
  });
});
