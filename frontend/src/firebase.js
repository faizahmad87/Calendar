// Import the necessary Firebase functions
import {initializeApp, getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
 apiKey: 'AIzaSyA1zhvMr6Xm_9YpDx83lfCnAB1pDluG-lc',
 authDomain: 'calendar-eae76.firebaseapp.com',
 projectId: 'calendar-eae76',
 storageBucket: 'calendar-eae76.appspot.com',
 messagingSenderId: '882748295071',
 appId: '1:882748295071:web:dd29ef0254f666a882dfaa',
 measurementId: 'G-71EFPSQ795'
};

// Initialize Firebase app
// Check if Firebase has been initialized
let app;
if (!getApps().length) {
 app = initializeApp(firebaseConfig);
 console.log('Firebase Initialized:', app);
} else {
 app = getApps()[0];
 console.log('Firebase already initialized');
}

// Initialize Firebase Auth and Firestore services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized Firebase services to use them in other files
export {app, auth, db};
