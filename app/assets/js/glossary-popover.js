import { glossaryVisuals } from "../../content/glossary-visuals.js?v=2.0.1-glossary1";

const OPEN_DELAY = 260;
const CLOSE_DELAY = 160;
let popover;
let activeTrigger;
let openTimer;
let closeTimer;
let resizeBound = false;

export const hasGlossaryVisual = (term) => Boolean(glossaryVisuals[term]);

function ensurePopover() {
  if (popover) return popover;
  popover = document.createElement("aside");
  popover.id = "glossary-visual-popover";
  popover.className = "glossary-popover";
  popover.setAttribute("role", "dialog");
  popover.setAttribute("aria-modal", "false");
  popover.hidden = true;
  popover.addEventListener("mouseenter", cancelClose);
  popover.addEventListener("mouseleave", scheduleClose);
  document.body.append(popover);
  return popover;
}

function positionPopover(trigger) {
  const panel = ensurePopover();
  panel.style.removeProperty("left");
  panel.style.removeProperty("top");
  panel.style.removeProperty("bottom");
  if (window.matchMedia("(max-width: 760px)").matches) {
    panel.style.left = "12px";
    panel.style.bottom = "12px";
    return;
  }
  const margin = 16;
  const gap = 10;
  const safeTop = 90;
  const anchor = trigger.closest(".term-card").getBoundingClientRect();
  const bounds = panel.getBoundingClientRect();
  const fitsRight = window.innerWidth - anchor.right - gap - margin >= bounds.width;
  const fitsLeft = anchor.left - gap - margin >= bounds.width;
  if (fitsRight || fitsLeft) {
    const sideLeft = fitsRight ? anchor.right + gap : anchor.left - bounds.width - gap;
    const sideTop = Math.min(Math.max(anchor.top, safeTop), window.innerHeight - bounds.height - margin);
    panel.style.left = `${Math.round(sideLeft)}px`;
    panel.style.top = `${Math.round(Math.max(safeTop, sideTop))}px`;
    return;
  }
  const left = Math.min(Math.max(anchor.left, margin), window.innerWidth - bounds.width - margin);
  const below = anchor.bottom + gap;
  const top = below + bounds.height <= window.innerHeight - margin
    ? below
    : Math.max(safeTop, anchor.top - bounds.height - gap);
  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(top)}px`;
}

function fillPopover(term, trigger) {
  const visual = glossaryVisuals[term];
  const panel = ensurePopover();
  panel.replaceChildren();
  const heading = document.createElement("div");
  heading.className = "glossary-popover-heading";
  const title = document.createElement("h3");
  title.id = "glossary-popover-title";
  title.textContent = term;
  const close = document.createElement("button");
  close.className = "glossary-popover-close";
  close.type = "button";
  close.setAttribute("aria-label", "Fechar explicação visual");
  close.textContent = "×";
  close.addEventListener("click", () => closePopover(true));
  heading.append(title, close);
  const image = document.createElement("img");
  image.src = visual.illustration;
  image.alt = visual.alt;
  image.width = 420;
  image.height = 220;
  const simple = document.createElement("p");
  simple.textContent = visual.simple;
  const example = document.createElement("p");
  example.className = "glossary-popover-example";
  const label = document.createElement("strong");
  label.textContent = "Exemplo: ";
  example.append(label, visual.example);
  panel.append(heading, image, simple, example);
  panel.setAttribute("aria-labelledby", title.id);
  panel.hidden = false;
  activeTrigger = trigger;
  trigger.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => positionPopover(trigger));
}

function openPopover(term, trigger, delayed = false) {
  clearTimeout(openTimer);
  cancelClose();
  if (activeTrigger === trigger && !ensurePopover().hidden) return;
  const open = () => {
    if (activeTrigger && activeTrigger !== trigger) activeTrigger.setAttribute("aria-expanded", "false");
    fillPopover(term, trigger);
  };
  if (delayed) openTimer = setTimeout(open, OPEN_DELAY);
  else open();
}

function closePopover(returnFocus = false) {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
  if (!popover || popover.hidden) return;
  popover.hidden = true;
  if (activeTrigger) {
    activeTrigger.setAttribute("aria-expanded", "false");
    if (returnFocus) activeTrigger.focus();
  }
  activeTrigger = undefined;
}

function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => closePopover(), CLOSE_DELAY);
}

function cancelClose() {
  clearTimeout(closeTimer);
}

function handleDocumentClick(event) {
  if (!activeTrigger) return;
  if (popover?.contains(event.target) || activeTrigger.contains(event.target)) return;
  closePopover();
}

function handleKeydown(event) {
  if (event.key === "Escape" && activeTrigger) closePopover(true);
}

export function setupGlossaryVisuals(root) {
  closePopover();
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  root.querySelectorAll("[data-visual-term]").forEach((trigger) => {
    const term = trigger.dataset.visualTerm;
    let pointerActivation = false;
    trigger.addEventListener("pointerdown", () => { pointerActivation = true; });
    trigger.addEventListener("click", () => {
      pointerActivation = false;
      if (activeTrigger === trigger && !ensurePopover().hidden) closePopover();
      else openPopover(term, trigger);
    });
    trigger.addEventListener("focus", () => {
      if (!pointerActivation) openPopover(term, trigger);
    });
    const card = trigger.closest(".term-card");
    card.addEventListener("mouseenter", () => {
      if (finePointer.matches) openPopover(term, trigger, true);
    });
    card.addEventListener("mouseleave", () => {
      if (finePointer.matches) scheduleClose();
    });
  });
  document.removeEventListener("click", handleDocumentClick);
  document.removeEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
  if (!resizeBound) {
    window.addEventListener("resize", () => {
      if (activeTrigger) positionPopover(activeTrigger);
    });
    resizeBound = true;
  }
}
