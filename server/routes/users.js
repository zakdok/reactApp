const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Project } = require("../models/Project")
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post('/register', (req, res) => {
    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

router.post('/login', (req, res) => {

    // console.log('ping')
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {

        // console.log('user', user)
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            // console.log('err',err)

            // console.log('isMatch',isMatch)

            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            //비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 쿠키 , 로컬스토리지 토큰을 저장한다.
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            })
        })
    })
})


// role 1 어드민    role 2 특정 부서 어드민 
// role 0 -> 일반유저   role 0이 아니면  관리자 
router.get('/auth', auth, (req, res) => {
    //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        project: req.user.project,
        image: req.user.image
    })
})

router.get('/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})

router.post("/addToProject", auth, (req, res) => {
    // 먼저 User Collection에 해당 유저의 정보를 가져온다.
    User.findOne({ _id: req.user._id },
        (err, userInfo) => {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        project: {
                            id: req.body.projectId,
                            title: req.body.projectTitle,
                            description: req.body.projectDescription,
                            pages: req.body.projectPages,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).send(userInfo.project)
                }
            )
        })
});

module.exports = router;
