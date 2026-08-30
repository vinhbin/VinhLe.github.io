/* Shared room runtime: sets the accent, plays the enter fade, and injects the
   "back to vinhle.xyz" corner link on every page except the launch page.
   Skips the enter flood when arriving via the launch page's Try-it handoff. */
(function () {
  var body = document.body;
  var accent = body.dataset.accent || '#c9a84c';
  document.documentElement.style.setProperty('--room-accent', accent);

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var fromLaunch = false;
  try {
    fromLaunch = sessionStorage.getItem('fromLaunch') === '1';
    if (fromLaunch) sessionStorage.removeItem('fromLaunch');
  } catch (e) {}

  if (!reduced && !fromLaunch) {
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
    var home = /\/archive\//.test(window.location.pathname) ? '../index.html' : 'index.html';
    var hatch = document.createElement('a');
    hatch.className = 'void-hatch';
    hatch.href = home;
    hatch.setAttribute('aria-label', 'Back to vinhle.xyz');
    hatch.innerHTML = '<span aria-hidden="true">&#8249;</span><span>vinhle.xyz</span>';
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
      setTimeout(function () { window.location.href = home; }, 420);
    });
  }
})();
