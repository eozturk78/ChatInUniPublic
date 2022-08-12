importScripts('https://www.gstatic.com/firebasejs/9.9.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.2/firebase-messaging-compat.js');


// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBh9MPmP-PfNNl8INDyJcOAPC2bbySOzAo",
  authDomain: "chatinuni-d900d.firebaseapp.com",
  databaseURL: "https://chatinuni-d900d.firebaseio.com",
  projectId: "chatinuni-d900d",
  storageBucket: "chatinuni-d900d.appspot.com",
  messagingSenderId: "1007774413971",
  appId: "1:1007774413971:web:1a8485af55cdf2d7bbc966"
};

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/assets/image/logo.png"
  };

  self.addEventListener('notificationclick', function(event) {
      event.waitUntil(self.clients.openWindow('https://chatinuni.com/ua/message-inbox'));
      event.notification.close();
  });
 self.registration.showNotification(notificationTitle,
    notificationOptions);
});