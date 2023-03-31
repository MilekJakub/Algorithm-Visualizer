const colors = {
	purple: '#6611ff',
	green: '#88ff44',
	orange: '#ffaa00',
};

const icons = {
  themeButton: '\uF1D1',
  shuffleButton: '\uF544',
  playButton: '\uF4F2',
  previousButton: '\uF12E',
  nextButton: '\uF137',
};

async function sleep(time) { return new Promise(resolve => setTimeout(resolve, time)); }

export { colors, icons, sleep };
