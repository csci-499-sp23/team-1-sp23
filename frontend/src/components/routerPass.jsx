import { useLocation } from "react-router-dom";

export function routerPass(Comp) {
  function Component() {
    const location = useLocation();
    return <Comp location={location} />;
  }

  return Component;
}
