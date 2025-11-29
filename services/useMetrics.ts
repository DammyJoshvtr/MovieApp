import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const movieCollection = collection(db, "metrics");

// ----------------------------------
// UPDATE SEARCH COUNT
// ----------------------------------
export const updateSearchCount = async (queryText: string, movie: Movie) => {
  try {
    // seDoc in the database...
    // Creating a New Document...

    // 1. Find movie by searchTerm
    const q = query(
      movieCollection,
      where("searchTerm", "==", queryText)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // 2. Exists → update count
      console.log(snapshot.docs[0])
      const existing = snapshot.docs[0];
      const ref = doc(db, "metrics", existing.id);

      await updateDoc(ref, {
        count: existing.data().count + 1,
      });

    } else {
      // 3. Does not exist → create new document
      await addDoc(movieCollection, {
        searchTerm: queryText,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }

  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

// updateSearchCount("iron man", {
//   id: 1,
//   title: "iron man",
//   adult: true,
//   backdrop_path: "dsdsdsd",
//   genre_ids: [1, 2, 3, 4],
//   original_language: "English",
//   original_title: "string",
//   overview: "odinisoos",
//   popularity: 12,
//   poster_path: "dsddsddsdsd",
//   release_date: "12-23-000",
//   video: true,
//   vote_average: 13,
//   vote_count: 122
// })

// ----------------------------------
// GET TRENDING MOVIES
// ----------------------------------
// export const getTrendingMovies = async () => {
//   try {
//     const q = query(
//       movieCollection,
//       orderBy("count", "desc"),
//       limit(5)
//     );

//     const snapshot = await getDocs(q);

//     return snapshot.docs.map((d) => ({
//       id: d.id,
//       ...d.data(),
//     })) as TrendingMovie[];

//   } catch (error) {
//     console.error("Error fetching trending movies:", error);
//     return undefined;
//   }
// };
