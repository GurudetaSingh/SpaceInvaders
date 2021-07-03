add([
		text("Space Invaders"),
		pos(100, 70),
		scale(3),
	]);

	add([
		rect(80, 20),
		pos(220, 130),
		"level1",
		{
			clickAction: () => go('easy'),
		},
	]);

	add([
		text("Easy"),
		pos(242, 135),
		color(0, 0, 0)
	]);

  add([
		rect(80, 20),
		pos(220, 170),
		"level2",
		{
			clickAction: () => go('medium'),
		},
	]);

  add([
		text("Medium"),
		pos(235, 175),
		color(0, 0, 0)
	]);

  add([
		rect(80, 20),
		pos(220, 210),
		"level3",
		{
			clickAction: () => go('hard'),
		},
  ]);

  add([
		text("Hard"),
		pos(242, 215),
		color(0, 0, 0)
	]);

	action("level1", b => {

		if (b.isHovered()) {
			b.use(color(rgb(0,255,0)));
		} else {
			b.use(color(1, 1, 1));
		}

		if (b.isClicked()) {
			b.clickAction();
		}

	});

  action("level2", b => {

		if (b.isHovered()) {
			b.use(color(rgb(0,255,0)));
		} else {
			b.use(color(1, 1, 1));
		}

		if (b.isClicked()) {
			b.clickAction();
		}
	});

  action("level3", b => {

		if (b.isHovered()) {
			b.use(color(rgb(0,255,0)));
		} else {
			b.use(color(1, 1, 1));
		}

		if (b.isClicked()) {
			b.clickAction();
		}
  });