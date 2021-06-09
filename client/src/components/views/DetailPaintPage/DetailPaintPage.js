import React from 'react'
import { Button, Layout, Breadcrumb } from 'antd';
import LeftSideBar from './views/LeftSideBar';
import RightSideBar from './views/RightSideBar';
import MainTab from './views/MainTab';

function DetailPaintPage(props) {

  return (
    <div className="paintpage-wrap onepage">
      <LeftSideBar projectId={props.match.params.projectId} />
      <MainTab />
      <RightSideBar />
    </div>
  )
}

export default DetailPaintPage