import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserData } from "../types/users";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query({
      async queryFn({ id }) {
        try {
          const docRef = doc(db, "users", id);
          const docSnap = await getDoc(docRef);
          const user = docSnap.data() as UserData;
          return { data: user };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    createUser: builder.mutation({
      async queryFn({ email, password, firstName, lastName }) {
        try {
          const auth = getAuth();
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const userDocRef = doc(collection(db, "users"), user.uid);
          await setDoc(userDocRef, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            isAdmin: false,
            progress: [],
          });
          return {
            data: { email: user.email, id: user.uid, token: user.refreshToken },
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    signIn: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const auth = getAuth();
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return {
            data: { email: user.email, id: user.uid, token: user.refreshToken },
          };
        } catch (error) {
          return { error: error };
        }
      },
    }),
    updateProgress: builder.mutation({
      async queryFn({ id, lessonName }) {
        try {
          const userRef = doc(db, "users", id);
          await updateDoc(userRef, {
            progress: arrayUnion(lessonName),
          });
          return {
            data: { lessonName },
          };
        } catch (error) {
          return { error: error };
        }
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useSignInMutation,
  useUpdateProgressMutation,
} = usersApi;
