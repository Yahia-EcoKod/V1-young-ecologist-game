// Все настройки игры в одном месте. Числа можно менять.

export const LANES = [-1.7, 0, 1.7];   // положение трёх дорожек по ширине
export const TILE_LEN = 24;            // длина одного куска дороги
export const TILE_COUNT = 5;           // сколько кусков дороги одновременно
export const ROAD_HALF = 2.7;          // половина ширины дороги
export const FENCE_X = 2.95;           // где стоят заборы
export const HERO_HEIGHT = 1.7;        // рост героя в мире игры
export const SPEED_START = 9;          // стартовая скорость
export const SPEED_MAX = 16;           // максимальная скорость
export const SPEED_GROWTH = 0.12;      // на сколько растёт скорость за секунду
export const SKY = 0xbfe6f5;           // цвет неба

// Ширина игрового окна не больше 62% его высоты (на ноутбуке игра идёт узкой колонкой по центру)
export const MAX_FRAME_ASPECT = 0.62;

// Герои: имя файла в assets/heroes и название на экране
export const HEROES = [
  { file: 'Ranger',       name: 'Рейнджер' },
  { file: 'Knight',       name: 'Рыцарь' },
  { file: 'Mage',         name: 'Маг' },
  { file: 'Barbarian',    name: 'Варвар' },
  { file: 'Rogue',        name: 'Разбойник' },
  { file: 'Rogue_Hooded', name: 'Разбойник в капюшоне' },
];

// Разделы по классам
export const SECTIONS = [
  { id: '1-4',  title: '1-4 классы' },
  { id: '5-8',  title: '5-8 классы' },
  { id: '9-11', title: '9-11 классы' },
];
