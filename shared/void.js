/* Shared room runtime: sets the accent, plays the door-light enter flood,
   and injects the "hallway" escape hatch on every page except the hallway itself. */
(function () {
  var body = document.body;
  var accent = body.dataset.accent || '#c9a84c';
  document.documentElement.style.setProperty('--room-accent', accent);

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced) {
    var ov = document.createElement('div');
    ov.className = 'void-enter';
    ov.style.background = accent;
    body.appendChild(ov);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { ov.classList.add('void-enter-done'); });
    });
    setTimeout(function () { ov.remove(); }, 900);
  }

  if (body.dataset.room !== 'hallway') {
    var hatch = document.createElement('a');
    hatch.className = 'void-hatch';
    hatch.href = 'index.html';
    hatch.setAttribute('aria-label', 'Back to the hallway');
    hatch.innerHTML =
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h20"/><path d="M13 20V4a1 1 0 0 0-1.2-.98l-5 1A1 1 0 0 0 6 5v15"/><circle cx="10" cy="12" r="0.5" fill="currentColor"/></svg>' +
      '<span>hallway</span>';
    body.appendChild(hatch);

    hatch.addEventListener('click', function (e) {
      if (reduced) return; // plain navigation
      e.preventDefault();
      var out = document.createElement('div');
      out.className = 'void-exit';
      body.appendChild(out);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { out.classList.add('void-exit-on'); });
      });
      setTimeout(function () { window.location.href = 'index.html'; }, 420);
    });
  }
})();
