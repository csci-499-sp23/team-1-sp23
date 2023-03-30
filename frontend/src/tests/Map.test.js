import renderer from "react-test-renderer";

import Map from "../components/Map";

it("renders map properly", () => {
  const tree = renderer.create(<Map />).toJSON();
  expect(tree).toMatchSnapshot();
});
