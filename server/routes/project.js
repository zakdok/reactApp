const express = require('express');
const router = express.Router();
const { Project } = require("../models/Project");

//=================================
//             Project
//=================================

router.post('/', (req, res) => {
    // 받아온 정보들을 DB에 넣어준다.
    const project = new Project(req.body)
    project.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, project })
    })
})

router.get('/projects_by_id', (req, res) => {

    let type = req.query.type
    let projectIds = req.query.id


    if (type === "array") {
        let ids = req.query.id.split(',')
        projectIds = []
        projectIds = ids.map(item => {
            return item
        })
    }

    Project.find({ _id: { $in: projectIds } })
        .populate('writer')
        .exec((err, project) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(project)
        })

})

router.post("/addToPage", (req, res) => {
    Project.findOne({ _id: req.body.projectId },
        (err, project) => {
            Project.findOneAndUpdate(
                { _id: req.body.projectId },
                {
                    $push: {
                        pages: req.body.projectPages
                    }
                },
                { new: true },
                (err, project) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).send(project)
                }
            )
        })
});

module.exports = router;
