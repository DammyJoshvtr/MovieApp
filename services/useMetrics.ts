import { 
  collection, query, where, getDocs, addDoc, updateDoc, doc, orderBy, limit 
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const movieCollection = collection(db, "metrics");

// ----------------------------------
// UPDATE SEARCH COUNT
// ----------------------------------
export const updateSearchCount = async (queryText: string, movie: Movie) => {
  try {
    // 1. Find movie by searchTerm
    const q = query(
      movieCollection,
      where("searchTerm", "==", queryText)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // 2. Exists → update count
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
