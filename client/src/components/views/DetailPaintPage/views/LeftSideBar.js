import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd';
import Page from "./Page";
import { useDispatch } from 'react-redux'
import { addToPage } from '../../../../_actions/user_actions'
import '../Sections/css/DetailPaintPage.css';

let pageItems = []

function LeftSideBar(props) {
    const dispatch = useDispatch()
    const [renderPage, setRenderPage] = useState(false)
    const [Pages, setPages] = useState([])

    const projectId = props.projectId

    useEffect(() => {
        Axios.get(`/api/project/projects_by_id?id=${projectId}&type=single`)
            .then(response => {
                response.data[0].pages.forEach((item, index, array) => {
                    pageItems.push(item)

                    if(Object.is(array.length - 1, index)){
                        setPages(pageItems)
                    }
                })
                if (response.data[0].pages.length > 0) {
                    setRenderPage(true)
                }
            })
            .catch(err => alert(err))
    }, [])

    const renderPageList = () => (
        pageItems.map((item, idx) => (
            <Page key={idx} index={idx} />
        ))
    )

    const onSubmit = (event) => {
        event.preventDefault();
        if(Pages.length === 0){
            setRenderPage(true)
        }

        // setPages([...pageItems, pageItems.length + 1])
        setPages([...Pages, Pages.length + 1]);
        pageItems.push(pageItems.length + 1);

        const body = {
            projectId: projectId,
            pages: Pages.length
        }

        Axios.post("/api/project", body)
            .then(response => {
                if (response.data.success) {
                    dispatch(addToPage(body.projectId, body.pages))
                } else {
                    alert('페이지 추가에 실패 했습니다.')
                }
            })
    }


    return (
        <div className="paintpage-side-wrap left">
            <div className="canvas-list-area">
                <ul className="list-wrap">
                    {renderPage &&
                        renderPageList()
                    }
                    {!renderPage &&
                        <li className="list-con">
                            <div className="list-inner">
                                <div className="empty-text-wrap">
                                    생성된 페이지가 없습니다.
                                </div>
                            </div>
                        </li>
                    }
                </ul>
            </div>
            <div className="canvas-add-wrap">
                <div className="canvas-con">
                    <Button onClick={onSubmit}>추가</Button>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar 