import ReactSlider from "react-slider";

function Slider(props) {
  let reset = false;
  if (props.newColor === "") {
    reset = true;
  }
  return reset ? (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      onChange={props.sliderVal}
      value={0}
    />
  ) : (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      onChange={props.sliderVal}
    />
  );
}

export default Slider;