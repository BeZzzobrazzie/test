import { CAControlPanel } from "../../js/cellular-automaton/ca-controlPanel";
import { CARoot } from "../../js/cellular-automaton/ca-root";

let body = document.querySelector('body');
body.onload = function() {
  let caRoot = new CARoot('.ca__canvas');
  let caControlPanel = new CAControlPanel(caRoot);


}