import React, {createRef, useEffect} from "react";
import { Breadcrumb, Layout } from 'antd';
import Axios from 'axios';
//import '../Sections/css/common.css';  // 공통으로 적용할 stylesheet 파일
//import '../Sections/css/paint.css';  // Page에 관련된 stylesheet 파일
//import '../Sections/js/event_handler.js'; // Element에 적용할 이벤트를 작성하는 javascript 파일
//import '../Sections/js/functions.js';  // Element 생성 및 기타 함수들을 작성하는 javascript 파일
//import '../Sections/js/common.js'; // Element에 이벤트를 바인딩하는 javascript 파일.
import '../Sections/css/DetailPaintPage.css';

function MainTab() {
    const { Content } = Layout;

    let canvas;
    let canvasRef = createRef();
    let pos = {  
      drawable: false,
      X: -1,
      Y: -1
    };
    let ctx;

    useEffect(() => {
      canvas = canvasRef.current;
      ctx = canvas.getContext("2d");
      // ctx.canvas.width  = window.innerWidth;
      // ctx.canvas.height = window.innerHeight;
      canvas.addEventListener("mousedown", initDraw);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", finishDraw);
      canvas.addEventListener("mouseout", finishDraw);
    },[]);

    function initDraw(event) {
      ctx.beginPath();
      pos = {drawable: true, ...getPosition(event)};
      ctx.moveTo(pos.X, pos.Y);
    }

    function draw(event) {
        if (pos.drawable) {
            pos = {...pos, ...getPosition(event)};
            ctx.lineTo(pos.X, pos.Y);
            ctx.stroke();
        }
    }

    function finishDraw() {
        pos = {drawable: false, X: -1, Y: -1};
    }

    function getPosition(event) {
        return {X: event.offsetX,
                Y:  event.offsetY};
    }

    //  const [canvasArray, setCanvasArray] = useState({});

    // const onSubmit = (props) => {
    //   
    //    setCanvasArray({
    //      ...CanvasArray,
    //      <canvas ref={canvasRef} width={1315} height={550} style={{border:'solid 1px #000000', background: 'white'}}/>
    //    })
    // };

    return (
        <div className="paintpage-main-wrap">
            <div className="paintpage-main-con container">
                <Content>
                    {/* <Breadcrumb>
                    </Breadcrumb> */}
                    <div className="canvas-wrap"> 
                        <div className="canvas-exist-wrap">
                            <div className="canvas-con">
                                <div className="exist">
                                    <div className="canvas-item">
                                        <canvas ref={canvasRef} width="800" height={"500"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </div>
        </div>
    )
}

export default MainTab
 