import { useParams } from "react-router-dom";

const Document = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Document</div>;
};

export default Document;
