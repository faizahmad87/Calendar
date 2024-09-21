// Import the necessary Firebase functions
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
 apiKey: 'your-api-key',
 authDomain: 'your-auth-domain',
 projectId: 'your-project-id',
 storageBucket: 'your-storage-bucket',
 messagingSenderId: 'your-messaging-sender-id',
 appId: 'your-app-id'
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized Firebase services to use them in other files
export {app, auth, db};
