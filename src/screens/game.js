// Экран 5. Игра. Пока это бег по дороге из этапа 1.
// Вопросы, препятствия, сердца и конец игры появятся на следующих этапах.
import * as THREE from 'three';
import { makeScreenRoot } from '../ui.js';
import { setCameraMode } from '../cameraRig.js';
import { state } from '../state.js';
import { LANES, SPEED_START, SPEED_MAX, SPEED_GROWTH } from '../config.js';

export function createGameScreen(ctx) {
  const s = makeScreenRoot(`
    <div class="spacer"></div>
    <p class="hint" id="hint">Свайп влево/вправо<br>или касание левой/правой половины</p>
    <div class="row"><button class="btn secondary small" id="home">Главная</button></div>
  `, 'overlay');
  // Кнопка «Главная» здесь временная: настоящий конец игры будет на этапе 5.

  let hero = null;
  let laneIndex = 1;
  let heroX = 0;
  let speed = SPEED_START;
  let hintTimer = 0;

  function moveLane(dir) {
    laneIndex = THREE.MathUtils.clamp(laneIndex + dir, 0, 2);
    s.$('#hint').style.opacity = '0';
  }
  s.$('#home').addEventListener('click', () => ctx.goTo('hero'));

  return {
    enter() {
      ctx.world.show();
      setCameraMode(ctx.camera, 'game');
      hero = ctx.heroes[state.heroIndex];
      laneIndex = 1; heroX = 0; speed = SPEED_START; hintTimer = 0;
      hero.root.position.set(0, 0, 0);
      hero.root.scale.setScalar(1);
      hero.root.rotation.set(0, Math.PI, 0);  // спиной к камере
      hero.setPose('run');
      ctx.scene.add(hero.root);
      s.$('#hint').style.opacity = '1';
      s.show();
      ctx.input.setHandlers({
        swipe: (dir) => moveLane(dir),
        tap: (side) => moveLane(side),
        key: (dir) => moveLane(dir),
      });
    },
    exit() {
      ctx.input.clear();
      if (hero) { ctx.scene.remove(hero.root); hero.mixer.timeScale = 1; }
      ctx.world.hide();
      s.hide();
    },
    update(dt) {
      hintTimer += dt;
      if (hintTimer > 8) s.$('#hint').style.opacity = '0';

      speed = Math.min(SPEED_MAX, speed + SPEED_GROWTH * dt);
      ctx.world.update(dt, speed);

      // Плавный переход между дорожками
      const diff = LANES[laneIndex] - heroX;
      heroX += diff * Math.min(1, 12 * dt);
      hero.root.position.x = heroX;
      hero.root.rotation.y = Math.PI - diff * 0.25; // чуть поворачивается в сторону движения
      hero.root.rotation.z = -diff * 0.06;

      hero.mixer.timeScale = speed / 10;
      hero.mixer.update(dt);
    },
  };
}
