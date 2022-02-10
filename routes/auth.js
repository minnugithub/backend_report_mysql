
import express from "express";
import users from "../models/user";
import bcrypt from 'bcryptjs'
const router = express.Router();

/*      poating data        */


router.post("/list", (req, res)=> {
    const { id,name,roleid,uid,email,password,addedby} = req.body
    //console.log(id)
    //console.log(req.body)
    users.findOne({ where: { id: id }}).then(async existing_user => {
        if(existing_user){
            res.send({message: "User already exist"})
        } else {
            const new_user = new users({  
                id,
                name,
                roleid,
                uid,
                email,
                password,
                addedby
            })
            console.log("hi")
            //console.log(new_user.password)
            /* var bpass = bcrypt.hash(new_user.password,8);
            new_user.password = JSON.stringify(bpass).toString() */
            async function hashIt(pwd){
                const salt = await bcrypt.genSalt(6);
                return await bcrypt.hash(pwd, salt);
              }
            new_user.password = await hashIt(new_user.password);
            console.log(new_user.password);
            // const hash = (new_user, salt, next) => {
            //     bcrypt.hash(new_user.password, salt, (error, newHash) => {
            //     if (error) {
            //     return next(error)
            //     }
            //     new_user.password = newHash
            //     return next()
            //     })
            //     }

            new_user.save().then(response => {
                if(response) {
                    res.send( { message: "Added Successfully" })
                }
            }).catch((err) => {
                res.send(err)
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}) 


//getting data
router.get('/list', async (req, res) => {

    const user = await users.findAll()

    //console.log("Food Item(s):", JSON.stringify(users, null, 2));

    res.send(user); // true

});
//getting data w r t addedby
router.get('/list/:addedby', async (req, res) => {
    try {
        const user = await users.findAll({ where: { addedby: req.params.addedby } });
        res.json(user);
        res.send( user)
    } catch (err) { res.json({ message: err }); }
})

//getting by uid

router.get('/list/:uid', async (req, res) => {
    try {
        const user = await users.findOne({ where: { uid: req.params.uid } });
        res.json(user);
        res.send( user)
    } catch (err) { res.json({ message: err }); }
})


// getting a user by id

router.get('/list/:id', async (req, res) => {
    try {
        const user = await users.findOne({ where: { id: req.params.id } });
        res.json(user);
        res.send( { message: "Added Successfully" })
    } catch (err) { res.json({ message: err }); }
})
// deleting a associate

router.delete('/list/:uid', async (req, res) => {
    try {
        const user= await users.destroy({ where: { uid: req.params.uid } });
        res.json("delete success");
        res.send( { message: "Deleted Successfully" })
        
    } catch (err) {
        res.json({ message: err });
    }
});
// updating the user
router.patch('/list/:id', async (req, res) => {
    try {
        const user = await users.update({
            roleid: req.body.roleid,
            
        },
            { where: { id: req.params.id } });
        res.json(user);
        res.json("update succesfull")
    } catch (err) {
        res.json({ message: err });
    }
});

export default router