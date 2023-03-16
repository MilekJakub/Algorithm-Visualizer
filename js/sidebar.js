const sidebar = document.querySelector('#sidebar');
const sidebarToggler = document.querySelector('.bi-list');
const dropdown = document.querySelector('.dropdown');
const body = document.querySelector('body');

let touchStart, touchEnd

body.addEventListener('click', function(e) {
	if (e.target.id != 'sidebar' && e.target.offsetParent?.id != 'sidebar' && e.target.previousElementSibling?.id != 'sidebar' && sidebar.classList.contains('show')) {
		console.dir(e.target);
  	sidebar.classList.remove('show')
	}
});

sidebarToggler.addEventListener('click', function(e) {
	e.stopPropagation();
  sidebar.classList.toggle('show')
})

sidebar.addEventListener('touchstart', e => touchStart = e.targetTouches[0].clientX);

sidebar.addEventListener('touchmove', e => touchEnd = e.targetTouches[0].clientX);

sidebar.addEventListener('touchend', e => {
	console.log('swipe');
	console.log(`start: ${touchStart} end: ${touchEnd}`);
  if (touchStart - touchEnd > 50) {
    sidebar.classList.remove('show')
  }
	touchStart = 0;
	touchEnd = undefined;
})

dropdown.addEventListener("click", function() {

	const dropdownIcon = document.querySelector('.dropdown > .bi');

	if (dropdownIcon.classList.contains('bi-caret-down')) {
		dropdownIcon.classList.remove('bi-caret-down');
		dropdownIcon.classList.add('bi-caret-up-fill');
	} else {
		dropdownIcon.classList.remove('bi-caret-up-fill');
		dropdownIcon.classList.add('bi-caret-down');
	}

	var dropdownContent = this.nextElementSibling;

	if (dropdownContent.style.display == 'block') {
		dropdownContent.style.display = 'none';
	} else {
		dropdownContent.style.display = 'block';
	}
});
