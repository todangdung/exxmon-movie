import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./config";

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export const addDocument = (collectDb, data) => {
    try {
        const query = collection(db, collectDb);

        addDoc(query, {
            ...data,
        });
        console.log("Document written success");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const fbSignIn = async () => {
    const { _tokenResponse, user } = await signInWithPopup(auth, fbProvider);

    if (_tokenResponse?.isNewUser) {
        addDocument("users", {
            displayName: user.displayName,
            email: user.email,
            photoURl: user.photoURL,
            uid: user.uid,
            providerId: _tokenResponse.providerId,
            accessToken: _tokenResponse.oauthAccessToken,
        });
    }
};

export const ggSignIn = async () => {
    const { _tokenResponse, user } = await signInWithPopup(auth, ggProvider);

    if (_tokenResponse?.isNewUser) {
        addDocument("users", {
            displayName: user.displayName,
            email: user.email,
            photoURl: user.photoURL,
            uid: user.uid,
            providerId: _tokenResponse.providerId,
            accessToken: _tokenResponse.oauthAccessToken,
        });
    }
};
