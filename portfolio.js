const dialog = document.querySelector("#material-dialog");
let pending;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text) {
  const stash = [];
  let source = text.replace(/`([^`]+)`/g, (_, code) => {
    stash.push(`<code>${escapeHtml(code)}</code>`);
    return `\0${stash.length - 1}\0`;
  });
  source = escapeHtml(source);
  source = source.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  source = source.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  source = source.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const safe = /^(https?:|mailto:|#|\/)/i.test(href) ? href : "#";
    const blank = /^https?:/i.test(safe) ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${escapeHtml(safe)}"${blank}>${label}</a>`;
  });
  return source.replace(/\0(\d+)\0/g, (_, index) => stash[index]);
}

function renderMarkdown(text) {
  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const paragraph = [];
  const splitRow = (row) => row.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph.length = 0;
  };
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.startsWith("```")) {
      flushParagraph();
      const language = escapeHtml(line.slice(3).trim());
      const block = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        block.push(lines[index]);
        index += 1;
      }
      html.push(`<pre><code${language ? ` class="language-${language}"` : ""}>${escapeHtml(block.join("\n"))}</code></pre>`);
      continue;
    }
    const heading = line.match(/^(#{1,6}) (.+)/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    if (/^([-*_])\1{2,}$/.test(line.trim())) {
      flushParagraph();
      html.push("<hr>");
      continue;
    }
    if (line.startsWith("> ")) {
      flushParagraph();
      const quote = [];
      while (index < lines.length && lines[index].startsWith("> ")) {
        quote.push(lines[index].slice(2));
        index += 1;
      }
      index -= 1;
      html.push(`<blockquote>${inlineMarkdown(quote.join(" "))}</blockquote>`);
      continue;
    }
    if (/^\|/.test(line) && index + 1 < lines.length && /^\|?\s*:?-+:?\s*\|/.test(lines[index + 1])) {
      flushParagraph();
      const head = splitRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && /^\|/.test(lines[index])) {
        rows.push(splitRow(lines[index]));
        index += 1;
      }
      index -= 1;
      html.push(
        `<table><thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${rows
          .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table>`
      );
      continue;
    }
    if (/^[-*] /.test(line)) {
      flushParagraph();
      html.push("<ul>");
      while (index < lines.length && /^[-*] /.test(lines[index])) {
        html.push(`<li>${inlineMarkdown(lines[index].slice(2))}</li>`);
        index += 1;
      }
      index -= 1;
      html.push("</ul>");
      continue;
    }
    if (/^\d+\. /.test(line)) {
      flushParagraph();
      html.push("<ol>");
      while (index < lines.length && /^\d+\. /.test(lines[index])) {
        html.push(`<li>${inlineMarkdown(lines[index].replace(/^\d+\. /, ""))}</li>`);
        index += 1;
      }
      index -= 1;
      html.push("</ol>");
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      continue;
    }
    paragraph.push(line);
  }
  flushParagraph();
  return html.join("\n") || "<p></p>";
}

const researchCards = [...document.querySelectorAll("#research .expand-card")];

function expandPanel(card) {
  const panel = card.querySelector(".project-expand");
  if (!panel) return;
  panel.style.maxHeight = `${panel.scrollHeight}px`;
}

function collapsePanel(card) {
  const panel = card.querySelector(".project-expand");
  if (!panel) return;
  if (panel.style.maxHeight === "none" || !panel.style.maxHeight) {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }
  panel.offsetHeight;
  panel.style.maxHeight = "0px";
}

function replayStagger(card) {
  const items = card.querySelectorAll(".project-detail > figure, .detail-prose > *, .expand-close");
  items.forEach((item) => {
    item.style.animation = "none";
  });
  card.offsetHeight;
  items.forEach((item) => {
    item.style.animation = "";
  });
}

function setExpanded(card, open) {
  if (!card) return;
  const toggle = card.querySelector(".expand-toggle");
  const panel = card.querySelector(".project-expand");
  const alreadyOpen = card.classList.contains("is-open");
  if (open === alreadyOpen) return;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (open) {
    researchCards.forEach((other) => {
      if (other !== card) setExpanded(other, false);
    });
    card.classList.add("is-open");
    if (panel) panel.inert = false;
    toggle?.setAttribute("aria-expanded", "true");
    if (toggle) toggle.textContent = "收起详情";
    if (!reduceMotion) replayStagger(card);
    if (reduceMotion) {
      if (panel) panel.style.maxHeight = "none";
    } else {
      expandPanel(card);
      const onEnd = (event) => {
        if (event.propertyName !== "max-height" || !card.classList.contains("is-open")) return;
        panel.style.maxHeight = "none";
        panel.removeEventListener("transitionend", onEnd);
      };
      panel?.addEventListener("transitionend", onEnd);
    }
  } else {
    if (reduceMotion) {
      if (panel) panel.style.maxHeight = "0px";
    } else {
      collapsePanel(card);
    }
    card.classList.remove("is-open");
    if (panel) panel.inert = true;
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) toggle.textContent = "查看项目详情";
  }
  scheduleDirectory();
}

researchCards.forEach((card) => {
  card.querySelector(".expand-toggle")?.addEventListener("click", () => {
    setExpanded(card, !card.classList.contains("is-open"));
  });
  card.querySelector(".expand-close")?.addEventListener("click", () => {
    setExpanded(card, false);
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-open-detail]").forEach((link) =>
  link.addEventListener("click", () => {
    const target = document.getElementById(link.dataset.openDetail);
    if (target?.tagName === "DETAILS") target.open = true;
    const card = target?.closest?.(".expand-card");
    if (card) setExpanded(card, true);
  })
);

function revealHash() {
  const target = document.getElementById(location.hash.slice(1));
  if (!target) return;
  if (target.tagName === "DETAILS") target.open = true;
  const card = target.classList.contains("expand-card")
    ? target
    : target.closest(".expand-card");
  if (card) setExpanded(card, true);
}
addEventListener("hashchange", revealHash);
revealHash();

document.addEventListener("click", async (event) => {
  const origin = event.target.nodeType === 1 ? event.target : event.target.parentElement;
  const button = origin?.closest("[data-preview]");
  if (!button || !dialog) return;
  event.preventDefault();
  pending?.abort();
  const controller = new AbortController();
  pending = controller;
  document.querySelector("#material-title").textContent = button.dataset.title || "资料预览";
  const content = document.querySelector("#material-content");
  content.textContent = "正在加载资料…";
  if (!dialog.open) dialog.showModal();
  try {
    const response = await fetch(button.dataset.preview, { signal: controller.signal });
    if (!response.ok) throw new Error("load");
    const text = await response.text();
    if (controller.signal.aborted) return;
    const source = button.dataset.preview || "";
    const markdown = /\.json$/i.test(source) ? `\`\`\`json\n${text}\n\`\`\`` : text;
    try {
      content.innerHTML = renderMarkdown(markdown);
    } catch {
      content.innerHTML = `<pre>${escapeHtml(text)}</pre>`;
    }
  } catch (error) {
    if (error.name !== "AbortError") content.textContent = "资料加载失败。请关闭后重新打开。";
  }
});
document.querySelector("#material-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("close", () => pending?.abort());

const sectionLinks = [...document.querySelectorAll("[data-section-nav], .topbar nav a[href^='#']")];
const trackLinks = [...document.querySelectorAll("[data-project-nav]")];
const chapters = [...document.querySelectorAll("#tracks, #research, #contact")];
const featured = [...document.querySelectorAll("#tracks .portfolio-project")];
function markCurrent(links, matches) {
  links.forEach((link) => {
    if (matches(link)) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
let scrollFrame;
function updateDirectory() {
  scrollFrame = undefined;
  const readingLine = Math.min(innerHeight * 0.4, 330);
  const chapter = chapters.find((node) => {
    const rect = node.getBoundingClientRect();
    return rect.top <= readingLine && rect.bottom > readingLine;
  });
  markCurrent(sectionLinks, (link) => link.hash === `#${chapter?.id}`);
  const project =
    chapter?.id === "tracks" &&
    featured.find((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top <= readingLine && rect.bottom > readingLine;
    });
  markCurrent(trackLinks, (link) => link.hash === `#${project?.id}`);
}
function scheduleDirectory() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateDirectory);
}
addEventListener("scroll", scheduleDirectory, { passive: true });
addEventListener("resize", scheduleDirectory, { passive: true });
document.querySelectorAll(".portfolio-project details").forEach((detail) =>
  detail.addEventListener("toggle", scheduleDirectory)
);
updateDirectory();

const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !motionPreference.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!motionPreference.matches) entry.target.classList.add("is-entering");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll(".project-cover").forEach((cover) => {
    observer.observe(cover);
    cover.addEventListener("animationend", () => cover.classList.remove("is-entering"), { once: true });
  });
}
