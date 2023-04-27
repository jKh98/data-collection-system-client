// serviceWorker.ts

const serviceWorker = {
  register: () => {
    if ("serviceWorker" in navigator) {
      console.log("Registration started");
      const firebaseConfig = encodeURIComponent(
        JSON.stringify({
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.REACT_APP_FIREBASE_APP_ID,
          measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
        })
      );
      navigator.serviceWorker
        .register(
          `../../../firebase-messaging-sw.js?firebaseConfig=${firebaseConfig}`
        )
        .then(function (registration) {
          console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err);
        });
    }
  },
};

export default serviceWorker;
