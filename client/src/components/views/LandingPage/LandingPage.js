import React, { useState, useEffect } from 'react'
import { Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { getProjectItems } from '../../../_actions/user_actions'

function LandingPage(props) {
    const [renderProject, setRenderProject] = useState(false);

    useEffect(() => {
        
        let projectItems = []
        
        // 리덕스 User state 안에 project가 들어 있는지 확인
        if (props.user.userData && props.user.userData.project) {
            if (props.user.userData.project.length > 0) {
                props.user.userData.project.forEach(item => {
                    projectItems.push(item.id)
                })
                setRenderProject(true)
            }
        }
    }, [props.user.userData])

    const renderProjectList = () => (
        props.user.userData.project.slice(0).reverse().map((project, index) => (
            <Col lg={6} md={8} key={index}>
                <a href={`/project/${project.id}`}>
                    <Card title={project.title}>
                        <Meta description={`${project.description}`} />
                    </Card>
                </a>
            </Col>
        ))
    )

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Task List<Icon type="rocket" /></h2>
            </div>

            <Row gutter={[16, 25]}>
                {renderProject &&
                    renderProjectList()
                }
                {!renderProject &&
                    '등록된 프로젝트가 없습니다.'
                }
            </Row>
        </div>
    )
}

export default LandingPage
