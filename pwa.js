// 1. Permet à l'application de se charger même avec une mauvaise connexion
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js');
  });
}

// 2. Bouton "Installer l'application"
var invitation = null;

window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  invitation = e;
});

function installerApp() {
  if (invitation) {
    invitation.prompt();
    invitation = null;
  } else {
    alert("Sur iPhone : appuie sur le bouton Partager du navigateur, puis « Sur l'écran d'accueil ».\n\nSur Android : ouvre le menu ⋮ du navigateur, puis « Installer l'application ».");
  }
}

// 3. Bouton "Partager l'application"
function partagerApp() {
  var lien = new URL('index.html', location.href).href;
  var texte = "Découvre l'application Jeunes Inspirés 🔥";

  if (navigator.share) {
    navigator.share({ title: 'Jeunes Inspirés', text: texte, url: lien });
  } else {
    window.open('https://wa.me/?text=' + encodeURIComponent(texte + ' ' + lien), '_blank');
  }
}