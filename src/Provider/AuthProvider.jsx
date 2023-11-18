import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

    const logOut= ()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser)
            setLoading(false)

        });
        return ()=>{
            setLoading(true)
            return unSubscribe()
        }
    },[])

    const authInfo ={
        user,
        loading,
        creatUser,
        signIn,
        logOut


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;