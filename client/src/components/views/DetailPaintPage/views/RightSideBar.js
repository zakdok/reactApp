import React from 'react'
import { Button } from 'antd';
import '../Sections/css/paint.css';  // Page에 관련된 stylesheet 파일
import '../Sections/css/DetailPaintPage.css';

function RightSideBar() {
    return (
        <div className="paintpage-side-wrap right">
            <div className="paintpage-side-con right-sidebar">
              <h4>Menu</h4>
              <div id="palette">
                  <form id="palette_form" onsubmit="return false;">
                     <dl className="object-setting">
                       <dt>모양</dt>
                       <dd className="object-shape">
                         <input
                          type="radio"
                          id="shape_circle"
                          name="shape"
                          value="circle"
                          checked
                        />
                        <br />
                        <label for="shape_circle">●</label>
                        <input type="radio" id="shape_rect" name="shape" value="rect" />
                        <label for="shape_rect">■</label>
                        <input
                          type="radio"
                          id="shape_text"
                          name="shape"
                          value="text"
                          onchange="size_height.value=18; font_size.value=15; font_black.checked=true; bg_white.checked=true;"
                        />
                        <label for="shape_text">T</label>
                      </dd>
                      <dt>사이즈</dt>
                      <br />
                      <dd className="object-size">
                        <label for="size_width">W </label>
                        <input
                          type="text"
                          id="size_width"
                          className="align-right"
                          name="width"
                          value="100"
                        /><label for="size_width"> px</label>
                      </dd>
                      <dd className="object-size">
                        <label for="size_height">H    </label>
                        <input
                          type="text"
                          id="size_height"
                          className="align-right"
                          name="height"
                          value="100"
                        /><label for="size_width"> px</label>
                      </dd>
                      <dt>글자 크기</dt>
                      <br />
                      <dd className="object-size">
                        <label for="size_font">Font </label>
                        <input
                          type="text"
                          id="size_font"
                          className="align-right"
                          name="font_size"
                          value="32"
                        /><label for="size_width"> px</label><br />
                      </dd>
                      <dt>배경 색상</dt>
                      <dd className="object-color bg-color">
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="radio"
                                  id="bg_black"
                                  name="bg_color"
                                  value="bg-black"
                                  checked
                                />
                                <label for="bg_black" className="bg-black black">■</label>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  id="bg_white"
                                  name="bg_color"
                                  value="bg-white"
                                />
                                <label for="bg_white" className="bg-white white">■</label>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  id="bg_blue"
                                  name="bg_color"
                                  value="bg-blue"
                                />
                                <label for="bg_blue" className="bg-blue blue">■</label>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  id="bg_pink"
                                  name="bg_color"
                                  value="bg-pink"
                                />
                                <label for="bg_pink" className="bg-pink pink">■</label>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  id="bg_green"
                                  name="bg_color"
                                  value="bg-green"
                                />
                                <label for="bg_green" className="bg-green green">■</label>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </dd>
                      <dt>글자 색상</dt>
                      <dd className="object-color font-color">
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="radio"
                                  id="font_black"
                                  name="font_color"
                                  value="black"
                                  checked
                                />
                                <label for="font_black" className="bg-black black">■</label>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  id="font_white"
                                  name="font_color"
                                  value="white"
                                />
                                <label for="font_white" className="bg-white white">■</label>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  id="font_blue"
                                  name="font_color"
                                  value="blue"
                                />
                                <label for="font_blue" className="bg-blue blue">■</label>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  id="font_pink"
                                  name="font_color"
                                  value="pink"
                                />
                                <label for="font_pink" className="bg-pink pink">■</label>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  id="font_green"
                                  name="font_color"
                                  value="green"
                                />
                                <label for="font_green" className="bg-green green">■</label>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </dd>
                      <dt>투명도</dt>
                      <dd className="object-opacity">
                        <input
                          type="text"
                          id="opacity"
                          name="opacity"
                          value="100"
                          className="align-right"
                          disabled
                        />%
                      </dd>
                      <dd>
                        <input
                          type="range"
                          name="opacity_slider"
                          min="1"
                          max="100"
                          value="100"
                          onchange="opacity.value=this.value"
                        />
                      </dd>
                    </dl>
                    <div className="buttons align-right">
                      <Button id="create_object">생성</Button>
                    </div>
                </form>
              </div>
        </div>
        </div>
    )
}

export default RightSideBar

 