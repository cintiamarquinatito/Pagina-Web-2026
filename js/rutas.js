(function () {
  let rutaActual = window.location.pathname;

  if (rutaActual.endsWith('/index.html')) {
    rutaActual = rutaActual.replace(/\/index\.html$/, '/');
  } else {
    rutaActual = rutaActual
      .replace(/\/page\//, '/')
      .replace(/\.html$/, '');
  }

  if (rutaActual !== window.location.pathname) {
    window.history.replaceState(null, '', rutaActual + window.location.hash);
  }

  document.addEventListener('click', function (e) {
    const enlace = e.target.closest('a');
    if (!enlace) return;

    const href = enlace.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;

    e.preventDefault();

    if (href.includes('index.html')) {
      window.location.href = '/index.html';
    } else if (href.includes('catalogo.html')) {
      window.location.href = '/page/catalogo.html';
    } else if (href.includes('contactame.html')) {
      window.location.href = '/page/contactame.html';
    }
  });
})();