

export async function ownerCheck() {
  const documentId = localStorage.getItem("documentId");
  try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/document/${documentId}/owner-check`,
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
      if(data.owner){
        return true
      }
    } catch (error) {
      console.error("Error while fetching the document:", error);
      return false;
    }
}