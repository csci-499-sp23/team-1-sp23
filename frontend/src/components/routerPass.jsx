import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function routerPass(Comp) {
  function Component() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams()
    return <Comp location={location} navHook={useNavigate()} searchParamsHook={{searchParams, setSearchParams}}/>;
  }

  return Component;
}
