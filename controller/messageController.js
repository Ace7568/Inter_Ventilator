const messageModule = require('../Module/messageModule');

module.exports = {
    create: (req, res) => {
        const message = req.body;
        const { UID } = message;
        messageModule.messageCollection.find({ UID: UID})
        .then((data) => {
            if (data.length == 0){
                return messageModule
                .create(req.body)

                .then((data) => {
                    return res.send({
                        status: "ok",
                        msg: "User is created",
                        data : data
                    });
                })

                .catch((err) => {
                    return res.send({ status : "fail to create user", error: err });
                });
            }
            else
                return res.send({status: "fail - user already exist"});
        })

    },

    getAll: (req, res)=>{
        return messageModule
            .getALL()

            .then((data) => {
                return res.send(data);
            })

            .catch((err) => {
                return res.send({ status: "fail", error: err });
            })
    },

    updateMessage: (req, res) => {
        const fields = {
            message : req.body.message
        }

        return messageModule
            .updateMessage(req.body.UID, fields)

            .then((data) => {
                return res.send({ status: "updated", updatedmessage : data});
            })

            .catch((err) =>{
                return res.send({ status:"fail to update", error: err});
            })
    },

    getMessage: (req,res)=> {
        return messageModule
            .getMessage(req.body.UID)

            .then((data) => {
                console.log(data)
                return res.send({ status:"ok", message: data});
            })

            .catch((err) => {
                return res.send({ status: "fail", error: err});
            })
    }
}