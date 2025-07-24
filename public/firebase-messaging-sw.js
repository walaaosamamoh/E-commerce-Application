/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBZN29RwASkgYY2c1s3MA_-RoiOrM6VkeQ',
  authDomain: 'e-commerce-a83c7.firebaseapp.com',
  projectId: 'e-commerce-a83c7',
  storageBucket: 'e-commerce-a83c7.appspot.com',
  messagingSenderId: '873459311136',
  appId: '1:873459311136:web:b61b4599756e2f3f699245',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  })
})
