import { Route, Routes } from "react-router-dom";
import { adminRoutes, privateRoutes, publicRoutes } from "./routes";
import { useAuth } from "../../hooks/use-auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserData } from "../../types/users";

const AppRouter = () => {
  const { isAuth, id } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (isAuth) {
        try {
          const docRef = doc(db, "users", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data() as UserData);
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.log("Error getting document:", e);
        }
      }
    };

    getUserData();
  }, [id]);
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth &&
        privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {/* {isAuth &&
        user?.isAdmin &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))} */}
    </Routes>
  );
};

export default AppRouter;
