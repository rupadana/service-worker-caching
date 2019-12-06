// Daftarkan Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
      .then(function() {
        console.log('Pendaftaran ServiceWorker berhasil');
      })
      .catch(function(){
        console.log('Pendaftaran ServiceWorker gagal');
      });
    })
} else {
console.log("ServiceWorker belum didukung browser ini.")
}


document.addEventListener('DOMContentLoaded', function(){

	// Navigasi Sidebar
	var elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	loadNav();
	
	function loadNav()
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				if(this.status != 200) return;

				document.querySelectorAll(".topnav, .sidenav")
				.forEach(function(elm){
					elm.innerHTML = xhttp.responseText;
				});

				// tambahkan listener pada navigasi
				document.querySelectorAll('.sidenav a, .topnav a')
				.forEach(function(elm){
					elm.addEventListener('click', function(event){

						// Tutup Navigasi Sidebar
						var sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();

						// Load page content
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", 'nav.html', true);
		xhttp.send();
	}
	
	// Load page content
	var page = window.location.hash.substr(1);
	if(page == '') page = 'home';
	loadPage(page);
	
	function loadPage(page)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				var content = document.querySelector(".body-content");
				if(this.status == 200) {
					content.innerHTML = xhttp.responseText;
				} else if(this.status == 404) {
					content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
				} else {
					content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
				}
				if(page === 'home'){
					$('.parallax').parallax();
				}
			}
		};
		xhttp.open("GET", 'pages/'+page+'.html', true);
		xhttp.send();
	}
});



