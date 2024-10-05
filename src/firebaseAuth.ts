import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};