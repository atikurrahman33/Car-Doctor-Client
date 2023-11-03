import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/Firebase.Config";
import { createContext, useEffect, useState } from "react";

export const AuthContext= createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null);
    const[loading,setLoading]=useState(true);

    const creatUser =(email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password);
  
    }
    const signIn =(email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("setuse",currentUser)
            setLoading(false)

        });
        return ()=>{
            return unSubscribe()
        }
    },[])

    const authInfo ={
        user,
        loading,
        creatUser,
        signIn


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;