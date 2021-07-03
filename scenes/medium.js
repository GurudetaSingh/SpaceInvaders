const MOVE_SPEED = 200
const INVADER_SPEED = 150
let   CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 150
const TIME_LEFT = 25
const BULLET_SPEED = 400

layer(['obj', 'ui'], 'obj')

addLevel([
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &', 
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
], {
  width: 30,
  height: 22,
  '^' : [ sprite('space-invader'), scale(0.7), 'space-invader'],
  '!' : [ sprite('wall'), 'left-wall'],
  '&' : [ sprite('wall'), 'right-wall'],
})

const player = add([
  sprite('space-ship'),
  pos(width() / 2, height() / 2),
  origin('center')
])

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})

function spawnBullet(p) {
  add([
    rect(6,18), 
    pos(p), 
    origin('center'), 
    color(rgb(255,0,0)),
    'bullet'
    ])
}

keyPress('space', () => {
spawnBullet(player.pos.add(0, -25))
})

action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if (b.pos.y < 0) {
    destroy(b)
  }
})

collides('bullet', 'space-invader', (b,s) => {
  camShake(4)
  destroy(b)
  destroy(s)
  score.value++
  score.text = score.value
  
  if (score.value == 48) {
    go('win')
  }
})

const score = add([
  text('0'),
  pos(45, 50),
  layer('ui'),
  scale(3),
  {
    value: 0,
  }
])

const timer = add([
  text('0'),
  pos(100,50),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])


timer.action(() =>  {
  timer.time -= dt()
  timer.text = timer.time.toFixed(2)
  if (timer.time <= 0 ) {
    go('lose', { score: score.value })
  }
})

action('space-invader', (s) => {
  s.move(CURRENT_SPEED, 0)
})

collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

collides('space-invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

player.overlaps('space-invader', () => {
  go('lose', { score: score.value })
})

action('space-invader', (s) => {
  if (s.pos.y >= (12 * 22)) {
  // if (s.pos.y >= height() /2) {
      go('lose', { score: score.value })
  }
})