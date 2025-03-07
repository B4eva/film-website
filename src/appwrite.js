

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;



export const updateSearchCount = async () => {   

    console.log(DATABASE_ID, API_KEY, COLLECTION_ID, PROJECT_ID);
 }
