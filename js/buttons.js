// круговая волна от места нажатия на кнопку
document.querySelectorAll('.btn').forEach((btn) => {
  const layer = document.createElement('span');
  layer.className = 'btn__ripples';
  btn.appendChild(layer);

  btn.addEventListener('pointerdown', (e) => {
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const ripple = document.createElement('span');
    ripple.className = 'btn__ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - r.left - size / 2 + 'px';
    ripple.style.top = e.clientY - r.top - size / 2 + 'px';
    layer.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});
