// Экран 2. «Нажми, чтобы начать».
// Телефоны не разрешают звук без касания, поэтому звук «просыпается» именно здесь.
import { makeScreenRoot } from '../ui.js';
import { unlockAudio } from '../audio.js';

export function createTapScreen(ctx) {
  const s = makeScreenRoot(`
    <h1 class="logo">Юный Эколог</h1>
    <p class="big pulse">Нажми, чтобы начать</p>
  `, 'solid green clickable');

  let busy = false;
  function go() {
    if (busy) return;
    busy = true;
    unlockAudio();
    ctx.goTo('hero');
  }
  s.root.addEventListener('pointerup', go);
  window.addEventListener('keydown', (e) => {
    if (s.root.style.display !== 'none' && (e.key === 'Enter' || e.key === ' ')) go();
  });

  return {
    enter() { busy = false; s.show(); },
    exit() { s.hide(); },
  };
}
