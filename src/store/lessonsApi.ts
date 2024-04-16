import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const lessonsApi = createApi({
  reducerPath: "lessonsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getLessons: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, "lessons"));
          const lessons = querySnapshot.docs.map((doc) => doc.data());
          return { data: lessons };
        } catch (e) {
          return { error: e };
        }
      },
    }),

    addLesson: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, "lessons"), data);
          return { data: data };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const { useGetLessonsQuery, useAddLessonMutation } = lessonsApi;
