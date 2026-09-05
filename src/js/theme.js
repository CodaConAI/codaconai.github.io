/*
 * Theme preference and language courtesy hint.
 *
 * Loaded synchronously in <head> so a saved theme applies before first paint.
 * Stores exactly one preference (the chosen theme) and one flag (hint dismissed)
 * in localStorage. No identifiers, no network, no redirects.
 * CSP-safe: external script, no eval, no inline styles.
 */
(function () {
  var KEY = "codacon-theme";
  var HINT_KEY = "codacon-lang-hint";
  var root = document.documentElement;

  function read(k) {
    try { return localStorage.getItem(k); } catch (e) { return null; }
  }
  function write(k, v) {
    try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ }
  }

  function apply(theme) {
    if (theme === "light" || theme === "dark") root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: theme || "system" } }));
  }

  var saved = read(KEY);
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function ready() {
    // Theme toggle: cycles system -> light -> dark.
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      var order = ["system", "light", "dark"];
      var current = saved === "light" || saved === "dark" ? saved : "system";
      var render = function () {
        var labels = btn.querySelectorAll("[data-theme-label]");
        for (var i = 0; i < labels.length; i++) {
          labels[i].hidden = labels[i].getAttribute("data-theme-label") !== current;
        }
        btn.setAttribute("data-theme-state", current);
      };
      btn.addEventListener("click", function () {
        current = order[(order.indexOf(current) + 1) % order.length];
        write(KEY, current === "system" ? null : current);
        apply(current === "system" ? null : current);
        render();
      });
      render();
      btn.hidden = false;
    }

    // Language hint: if the browser prefers the other language, show one visible
    // link to the translated page. Never redirects. Dismissal is remembered.
    var hint = document.querySelector("[data-lang-hint]");
    if (hint && read(HINT_KEY) !== "dismissed") {
      var pageLang = (root.getAttribute("lang") || "en").slice(0, 2);
      var target = hint.getAttribute("data-lang-hint");
      var prefs = navigator.languages || [navigator.language || ""];
      var first = (prefs[0] || "").slice(0, 2).toLowerCase();
      if (first === target && first !== pageLang) {
        hint.hidden = false;
        var close = hint.querySelector("button");
        if (close) {
          close.addEventListener("click", function () {
            hint.hidden = true;
            write(HINT_KEY, "dismissed");
          });
        }
      }
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
