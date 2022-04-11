import './App.css';
import {getCurrentValue, memoize, observable, observer, useObservableTransition} from "proxily";
import { HexColorPicker } from "react-colorful";
import {Col, Container, Row} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Tree from "./PythagorasTree";
import {state} from "./state";
import {useState} from "react";


function App() {
  const [withTransition, setWithTransition] = useState(false);
  return (
    <Container style={{width: 650}}>
      <h2 style={{textAlign: 'center', paddingTop: 20}}>Fractal Forest</h2>
      <Row><Col style={{paddingTop: 50}}>
          <label>
              <input type="checkbox" checked={withTransition} onChange={() => setWithTransition(!withTransition)} />
              {' '}{' '}useObservableTransition
          </label>
      </Col></Row>
      <Row><Col>
          {withTransition ? <ControlsWithTransition /> : <Controls />}
      </Col></Row>
      <Row><Col style={{padding: 20}}>
            Without useObservableTransition checked, dragging the sliders is "jerky" because all of the intermediate states have to be rendered.  With useObservableTranstion, the intermediate states are automatically aborted
            by React because under the covers useObservableTransition use startTransition.
      </Col></Row>
      <Row><Col><Trees /></Col></Row>
    </Container>
  );
}


const Trees = observer(function Trees () {
   return (
      <>
        {state.trees.map((t, ix) => <Tree n={ix} posX={t[0]} posY={t[1]} />)}
      </>
  );
});


const ControlsWithTransition = observer(function Controls() {
  let [,startTransition] = useObservableTransition();
  return(
      <Row>
        <Col style={{paddingTop: 30}}>
           <Row><Col xs={5} style={{paddingTop: 12}}>Tree Count: {state.treeCount}</Col><Col>
            <RangeSlider value={getCurrentValue(state, state => state.treeCount)}
                         min={1} max={100} size="lg"
                         onChange={(e : any) => startTransition(() => state.treeCount = parseInt(e.target.value, 10))} />
          </Col></Row>
          <Row><Col xs={5} style={{paddingTop: 12}}>Smallest Tree: {state.minSize}</Col><Col>
            <RangeSlider value={getCurrentValue(state, state => state.minSize)}
                         min={25} max={100} size="lg"
                         onChange={(e : any) => startTransition(() => state.minSize = parseInt(e.target.value, 10))} />

          </Col></Row>
          <Row><Col xs={5} style={{paddingTop: 12}}>Largest Tree: {state.maxSize}</Col><Col>
            <RangeSlider className="RangeSlider" value={getCurrentValue(state, state => state.maxSize)}
                         min={110} max={250} size="lg"
                         onChange={(e : any) => startTransition(() => state.maxSize = parseInt(e.target.value, 10))} />

          </Col></Row>
        </Col>

      </Row>
  );
});

const Controls = observer(function ControlsO() {
    return(
        <Row>
            <Col style={{paddingTop: 30}}>
                <Row><Col xs={5} style={{paddingTop: 12}}>Tree Count: {state.treeCount}</Col><Col>
                    <RangeSlider value={state.treeCount}
                                 min={1} max={100} size="lg"
                                 onChange={(e : any) => state.treeCount = parseInt(e.target.value, 10)} />
                </Col></Row>
                <Row><Col xs={5} style={{paddingTop: 12}}>Smallest Tree: {state.minSize}</Col><Col>
                    <RangeSlider value={getCurrentValue(state, state => state.minSize)}
                                 min={25} max={100} size="lg"
                                 onChange={(e : any) => state.minSize = parseInt(e.target.value, 10)} />

                </Col></Row>
                <Row><Col xs={5} style={{paddingTop: 12}}>Largest Tree: {state.maxSize}</Col><Col>
                    <RangeSlider className="RangeSlider" value={state.maxSize}
                                 min={110} max={250} size="lg"
                                 onChange={(e : any) => state.maxSize = parseInt(e.target.value, 10)} />

                </Col></Row>
            </Col>
        </Row>
    );
});

export default observer(App);
