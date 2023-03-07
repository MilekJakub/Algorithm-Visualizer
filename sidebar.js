const sidebar = document.querySelector('#sidebar');
const sidebarToggler = document.querySelector('.sidebar-toggle');


sidebarToggler.addEventListener('click', function() {
	sidebar.classList.toggle('show');
});
