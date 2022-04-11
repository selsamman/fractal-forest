import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import {useState, useDeferredValue, memo} from "react";
import Tree from "./Tree";


const minX = 0;
const maxX = 400;
const minY = 0;
const maxY = 600;

const trees : Array<any> = [];
for (let ix = 0; ix < 125; ++ix)
    trees.push([
        Math.random() * (maxX - minX) + minX,
        Math.random() * (maxY - minY) + minY,
    ]);

function App() {
  const [size, setSize] = useState(200);
  return (
    <Container style={{width: 650}}>
      <h2 style={{textAlign: 'center', paddingTop: 20}}>Fractal Forest</h2>
       <Row>
           <Col style={{paddingTop: 30}}>

               <Row><Col xs={5} style={{paddingTop: 12}}>Largest Tree: {size}</Col><Col>
                   <RangeSlider className="RangeSlider" value={size}
                                min={110} max={400} size="lg"
                                onChange={(e : any) => setSize(parseInt(e.target.value, 10))} />

               </Col></Row>
           </Col>
      </Row>
      <Row>
          <Trees size={useDeferredValue(size)} />
      </Row>
    </Container>
  );
}


const Trees = memo(function Trees ({size} : {size : number}) {
   return (
      <>
        {trees.map((t, ix) => <Tree key={ix} size={size} n={ix} posX={t[0]} posY={t[1]} />)}
      </>
  );
});

export default App;
