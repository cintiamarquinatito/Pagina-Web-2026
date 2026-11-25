// Limpia la URL en el navegador para ocultar "index.html", "/page/" y ".html"
(function () {
  const rutaActual = window.location.pathname;

  if (rutaActual.endsWith('/index.html')) {
    const nuevaRuta = rutaActual.replace(/\/index\.html$/, '/');
    window.history.replaceState(null, '', nuevaRuta + window.location.hash);
  } else if (rutaActual.endsWith('.html')) {
    const nuevaRuta = rutaActual
      .replace(/^\/page\//, '/')
      .replace(/\.html$/, '');
    window.history.replaceState(null, '', nuevaRuta + window.location.hash);
  }
})();