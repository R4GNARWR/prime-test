if (location.hash) {
	setTimeout(function() {
		window.scrollTo(0, 0);
	}, 1);
}

window.addEventListener("DOMContentLoaded", function(){
	setTimeout(
        function() {
			document.body.classList.remove('preload');
            document.getElementById('preloadWrap').classList.remove('preload-active');
        },
		2200
    );
});
