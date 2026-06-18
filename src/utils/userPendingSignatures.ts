

export async function userPendingSignature() {
 
  try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/document/pending/signatures`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      const data = await response.json();
      if(!response.ok){
        return false;
      }
      return data.documents;
    } catch (error) {
      console.error("Error while fetching the document:", error);
      return false;
    }
}