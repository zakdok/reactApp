import React from 'react'
import '../Sections/css/DetailPaintPage.css';

function Page(props) {
    return (
        <li className="list-con">
            <div className="list-inner">
                <div className="canvas-wrap">
                    {props.index + 1}
                    {/* <canvas></canvas> */}
                </div>
            </div>
        </li>
    )
}

export default Page
