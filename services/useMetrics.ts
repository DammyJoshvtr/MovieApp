import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const movieCollection = collection(db, "metrics");

const savedCollection = collection(db, "saved movies");

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

// ----------------------------------
// GET TRENDING MOVIES
// ----------------------------------
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const q = query(
      movieCollection,
      orderBy("count", "desc"),
      limit(5)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as unknown as TrendingMovie[]; //Just to make typescript happy, by knowing what we are returning

  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return undefined;
  }
};

// ------------------------------
// -------STORE SAVED MOVIES -----
// -------------------------------

export const storeSavedMovies = async (movie: SavedMovies) => {
  try {
    // 1. Check if the movie already exists in saved movies
    const q = query(
      savedCollection,
      where("movie_id", "==", movie.movie_id)
    );

    const snapshot = await getDocs(q);

    // 2. If movie already exists → do nothing
    if (!snapshot.empty) {
      console.log("Movie already saved:", snapshot.docs[0].data());
      return; // stop here
    }

    // 3. If not saved → add new document
    const newDoc = await addDoc(savedCollection, {
      title: movie.title,
      movie_id: movie.movie_id,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_url}`,
    });

    console.log("Movie saved successfully!");
    console.log(`LATEST ADDED DOCUMENT: ${ newDoc.id }`)
    

  } catch (error) {
    console.error("Error saving movie:", error);
    throw error;
  }
};

export const getStoredMovies = async (movie: SavedMovies) => {
  try {
    const q = query(
      savedCollection,
      where("movie_id", "==", movie.movie_id)
    );

    const snapshot = await getDocs(q);

    // No movie stored
    if (snapshot.empty) {
      console.log("DOCUMENT DOES NOT EXIST");
      return null;
    }

    // Return stored movie(s)
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    
  } catch (err) {
    console.error(`Error fetching stored movie:`, err);
    return null;
  }
};