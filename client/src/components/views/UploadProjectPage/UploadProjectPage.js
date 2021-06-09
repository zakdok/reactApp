import React, {useState} from 'react'
import { Typography, Button, Form, Input, Select  } from 'antd';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { addToProject } from '../../../_actions/user_actions'

const { TextArea } = Input;
const { Option } = Select;

function UploadProjectPage(props) {


    const dispatch = useDispatch()

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Participants, setParticipants] = useState("")
    const [Pages, setPages] = useState([])


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const participantsChangeHandler = (event) => {
        setParticipants(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

         if(!Title || !Description) {
             return alert("모든 값을 넣어주셔야 합니다.")
         }

         // 서버에 채운 값들을 request로 보낸다.
         const body = {
             //로그인 된 사람의 ID
             writer: props.user.userData._id,
             title: Title,
             description: Description,
             pages: Pages
         }

         Axios.post("/api/project",body)
            .then(response => {
                if(response.data.success) {
                    dispatch(addToProject(response.data.project._id, Title, Description, Pages)).then(() => {
                        alert('프로젝트 업로드에 성공 했습니다.')
                        props.history.push('/')
                    })
                } else {
                    alert('프로젝트 업로드에 실패했습니다.')
                }
            })
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 프로젝트 생성 </h2>

            </div>

                <Form onSubmit={onSubmit}>
                    <br />
                    <br />
                    <label>프로젝트명</label>
                    <Input onChange={titleChangeHandler} value={Title} />
                    <br />
                    <br />
                    <label>설명</label>
                    <TextArea onChange={descriptionChangeHandler} value={Description} />
                    <br />
                    <br />
                    <label>프로젝트 참여 인원</label>
                    <br />
                    <br />
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        defaultValue={['']}
                        onChange={handleChange}
                        optionLabelProp="label"
                    >
                        <Option value="china" label="China">
                            <div className="demo-option-label-item">
                                <span role="img">
                                팀원
                                </span>
                                김영준
                            </div>
                        </Option>
                    </Select>
                    <br />
                    <br />
                     <Button onClick={onSubmit}>
                        확인
                    </Button>
                </Form>
        </div>
    )
}

export default UploadProjectPage
