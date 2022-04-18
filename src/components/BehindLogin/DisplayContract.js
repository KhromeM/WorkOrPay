import Contract from "./Contract";
import { useAuth } from "../../util/auth";

function DisplayContract() {
  const auth = useAuth();
  return (
    <div>
      {auth.user && <Contract />}
      Hello
    </div>
  );
}
export default DisplayContract;
