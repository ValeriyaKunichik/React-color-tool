import React from "react";
import { Switch } from "antd";
import Slider from "./Slider";

export default function App() {
  const [formData, setFormData] = React.useState("");
  const [newColor, setNewColor] = React.useState("#ffffff");
  const [slider, setSlider] = React.useState(0);
  const [lighten, setLighten] = React.useState(true);

  let hextorgb;

  function handleChange(event) {
    console.log(event);
    const { value } = event.target;
    setFormData(value);
    sliderVal(0);
    setNewColor("");
  }

  function sliderVal(val) {
    setSlider(val);
    if (hextorgb) {
      alterColor(hextorgb, val);
    }
  }

  function toggleMode(checked) {
    setLighten(checked);
    sliderVal(0);
    setNewColor("");
  }

  //COLOR MANIPULATIONS
  function isValidHex(hex) {
    if (!hex) return false;
    let strippedHex = hex.replace("#", "");
    if (strippedHex.length === 3 || strippedHex.length === 6) {
      if (strippedHex.length === 3) {
        strippedHex =
          strippedHex[0] +
          strippedHex[0] +
          strippedHex[1] +
          strippedHex[1] +
          strippedHex[2] +
          strippedHex[2];
      }
      const r = parseInt(strippedHex.substring(0, 2), 16);
      const g = parseInt(strippedHex.substring(2, 4), 16);
      const b = parseInt(strippedHex.substring(4, 6), 16);
      hextorgb = { r, g, b };
      //console.log(hextorgb)
    }
    return strippedHex.length === 3 || strippedHex.length === 6;
  }

  const convertRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);
    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
  };

  function alterColor(hextorgb, percentage) {
    const { r, g, b } = hextorgb;
    const amount = Math.floor((percentage / 100) * 255);
    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    setNewColor(convertRGBToHex(newR, newG, newB));
  }

  function increaseWithin0To255(hex, amount) {
    return lighten
      ? Math.min(255, Math.max(0, hex + amount))
      : Math.max(0, Math.max(0, hex - amount));
  }
  //STYLES
  const styles = {
    backgroundColor: isValidHex(formData) ? "#" + formData : "white",
  };

  const newstyles = {
    backgroundColor: newColor,
  };

  //RENDER
  return (
    <main>
      <div className="container">
        <h1 className="title">Color Lighten/Darken tool</h1>
        <label htmlFor="hexColor">Color (Hex)</label>
        <div className="row">
          <input
            id="hexColor"
            type="text"
            placeholder="#000000"
            onChange={handleChange}
            name="firstName"
            value={formData}
          />
          <span className="toggle-group">
            <label htmlFor="switch">D</label>
            <Switch className="switch" defaultChecked onChange={toggleMode} />
            <label htmlFor="switch">L</label>
          </span>
        </div>
        <div className="slider">
          <label htmlFor="slider">{slider}%</label>
          <Slider sliderVal={sliderVal} newColor={newColor} />
        </div>
        <p>Input Color</p>
        <div id="inputColor" className="box" style={styles}></div>
        <p>Altered Color {hextorgb && newColor}</p>
        <div id="alteredColor" className="box" style={newstyles}></div>
      </div>
    </main>
  );
}