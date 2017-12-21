/**
 * 1. 버튼 3가지형태를 예제파일처럼 만들기.
 * 2. 백그라운드 이미지에 글씨같은것들 포함하기.
 * 3. game.load.atlas 사용시 cross origin 문제로 파일 분리 필요할수도 있음.
 * 4. 캐릭터 중앙 정렬
 */
var schemeChar = {
  'darkelf-warrior': { filename: 'char/darkelf_warrior_20', pos: [ -20, 400 ] },
  'darkelf-rogue': { filename: 'char/darkelf_rogue_20', pos: [ 0, 400 ] },
  'darkelf-mage': { filename: 'char/darkelf_mage_20', pos: [ 30, 300 ] },
  'dwarf-warrior': { filename: 'char/dwarf_warrior_20', pos: [ 30, 400 ] },
  'dwarf-rogue': { filename: 'char/dwarf_rogue_20', pos: [ -50, 400 ] },
  'dwarf-mage': { filename: 'char/dwarf_mage_20', pos: [ -100, 400 ] },
  'elf-warrior': { filename: 'char/elf_warrior_20', pos: [ -150, 400 ] },
  'elf-rogue': { filename: 'char/elf_rogue_20', pos: [ -10, 410 ] },
  'elf-mage': { filename: 'char/elf_mage_20', pos: [ -30, 400 ] },
  'human-warrior': { filename: 'char/human_warrior_20', pos: [ -140, 400 ] },
  'human-rogue': { filename: 'char/human_rogue_20', pos: [ -20, 400 ] },
  'human-mage': { filename: 'char/human_mage_20', pos: [ 0, 400 ] },
};
var schemeStat = {
  'stat-darkelf': { filename: 'stat/graph_darkelf' },
  'stat-dwarf': { filename: 'stat/graph_dwarf' },
  'stat-elf': { filename: 'stat/graph_elf' },
  'stat-human': { filename: 'stat/graph_human' },
};
var schemeBtns = {
  'button-human': { filename: 'btns/ch_btn_human', size: [ 99, 99 ] },
  'button-elf': { filename: 'btns/ch_btn_elf', size: [ 99, 99 ] },
  'button-darkelf': { filename: 'btns/ch_btn_darkelf', size: [ 99, 99 ] },
  'button-dwarf': { filename: 'btns/ch_btn_dwarf', size: [ 99, 99 ] },
  'button-warrior': { filename: 'btns/class_btn_warrior', size: [ 80, 80 ] },
  'button-rogue': { filename: 'btns/class_btn_rogue', size: [ 80, 80 ] },
  'button-mage': { filename: 'btns/class_btn_mage', size: [ 80, 80 ] },
};
var game = new Phaser.Game(750, 1443, Phaser.CANVAS, 'playable-demo', { preload: preload, create: create });
var click = 1, out = 0, over = 1;
var sprite, stat;
var raceBtn1, raceBtn2, raceBtn3, raceBtn4;
var jobBtn1, jobBtn2, jobBtn3;
var scmChar, scmStat, scmBtns, scm;

function preload() {
  /***** Background *****/
  game.stage.backgroundColor = '#000';
  game.load.image('bg', 'assets/images/background_with_text.jpg');

  /***** Characters *****/
  for (scmChar in schemeChar) {
    if (schemeChar.hasOwnProperty(scmChar)) {
      scm = schemeChar[scmChar];
      game.load.spritesheet(scmChar, 'assets/images/' + scm.filename + '.png', 500, 500, 20);
    }
  }

  /***** Status Graph *****/
  for (scmStat in schemeStat) {
    if (schemeStat.hasOwnProperty(scmStat)) {
      scm = schemeStat[scmStat];
      game.load.image(scmStat, 'assets/images/' + scm.filename + '.png');
    }
  }

  /***** Buttons *****/
  for (scmBtns in schemeBtns) {
    if (schemeBtns.hasOwnProperty(scmBtns)) {
      scm = schemeBtns[scmBtns];
      game.load.spritesheet(scmBtns, 'assets/images/' + scm.filename + '.png', scm.size[0], scm.size[1]);
    }
  }
}

function create() {
  game.add.sprite(0, 0, 'bg');

  raceBtn1 = game.add.button(156, 181, 'button-human', actionOnClick1('human'), this, click, out, over);
  raceBtn2 = game.add.button(268, 181, 'button-elf', actionOnClick1('elf'), this, click, out, over);
  raceBtn3 = game.add.button(380, 181, 'button-darkelf', actionOnClick1('darkelf'), this, click, out, over);
  raceBtn4 = game.add.button(490, 181, 'button-dwarf', actionOnClick1('dwarf'), this, click, out, over);

  // 디폴트 종족 선택
  actionOnClick1('human')();
}

function actionOnClick1(raceId) {
  return function() {
    // reset buttons
    raceBtn1.setFrames(out, out, out);
    raceBtn2.setFrames(out, out, out);
    raceBtn3.setFrames(out, out, out);
    raceBtn4.setFrames(out, out, out);

    switch (raceId) {
      case 'human':
        raceBtn1.setFrames(click, click, click); // 버튼 선택표시
        break;
      case 'elf':
        raceBtn2.setFrames(click, click, click); // 버튼 선택표시
        break;
      case 'darkelf':
        raceBtn3.setFrames(click, click, click); // 버튼 선택표시
        break;
      case 'dwarf':
        raceBtn4.setFrames(click, click, click); // 버튼 선택표시
        break;
    }

    if (jobBtn1 && jobBtn2 && jobBtn3) {
      jobBtn1.kill();
      jobBtn2.kill();
      jobBtn3.kill();
    }
    jobBtn1 = game.add.button(244, 330, 'button-warrior', actionOnClick2(raceId, 'warrior'), this);
    jobBtn2 = game.add.button(334, 330, 'button-rogue', actionOnClick2(raceId, 'rogue'), this);
    jobBtn3 = game.add.button(424, 330, 'button-mage', actionOnClick2(raceId, 'mage'), this);

    // 스테이터스 선택
    if (stat) {
      stat.destroy();
    }
    stat = game.add.sprite(60, 640, 'stat-' + raceId);

    // 디폴트 직업 선택
    actionOnClick2(raceId, 'warrior')();
  };
}

function actionOnClick2(raceId, jobId) {
  return function() {
    // reset buttons
    jobBtn1.setFrames(out, out, out);
    jobBtn2.setFrames(out, out, out);
    jobBtn3.setFrames(out, out, out);

    // 버튼 선택표시
    switch (jobId) {
      case 'warrior':
        jobBtn1.setFrames(click, click, click);
        break;
      case 'rogue':
        jobBtn2.setFrames(click, click, click);
        break;
      case 'mage':
        jobBtn3.setFrames(click, click, click);
        break;
    }

    // display character texture
    if (sprite) {
      sprite.kill();
    }
    var raceJobId = raceId + '-' + jobId;
    var curChar = schemeChar[ raceJobId ];
    sprite = game.add.sprite(curChar.pos[ 0 ], curChar.pos[ 1 ], raceJobId); // 캐릭터별 중앙 위치
    sprite.loadTexture(raceJobId, 0, false);
    sprite.animations.add('walk');
    sprite.animations.play('walk', /*움직임속도*/8, /*반복*/true);
    sprite.scale.set(2); // 2배 스케일링
  };
}
