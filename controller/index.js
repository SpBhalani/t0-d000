const User = require('../models/user')
const Todo = require('../models/todo')
const jwt = require('jsonwebtoken')

const singnUp = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).send("Something went wronge");
            }
            if (user) {
                return res.status(409).send('User Already Exists')
            }
            else {
                const { fName, lName, email, password } = req.body;
                const _user = new User({
                    fName,
                    lName,
                    email,
                    password
                })
                _user.save((error, result) => {
                    if (error) return res.status(400).send("Something went wronge");
                    if (result) return res.status(200).json(result);
                })
            }
        })

}

const signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).send("Somethng Went Wronge")
            }
            if (user) { 
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
                    res.cookie('token', token, { maxAge: 600000 });
                    res.status(200).json({ user, token });
                }
                else {
                    return res.status(401).json({message:"Invalid password"})
                }   
            }
            else {
                return res.status(404).send("User Not Found") 
            }

        })
} 

const signOut = (req, res) => {
    res.clearCookie('token');   
    res.status(200).send("Logout Successfully")
}

const setTodo = (req, res) => {
    Todo.findOne({ user: req.user._id }, (error, list) => {
        if (error) {
            return res.status(400).send("Something went wrong")
        }

        if (list) {
            Todo.findOneAndUpdate(
                { user: req.user._id },
                {
                    "$set": {
                        "todo": [...list.todo, req.body]
                    }
                },
                { new: true },
                (error, _todo) => {
                    if (error) {
                        return res.status(400).send("Something went wronge");
                    }
                    if (_todo) {
                        return res.status(200).json(_todo);
                    }
                })
        }
        else {
            const _Todo = new Todo({
                user: req.user._id,
                todo: req.body
            })
            _Todo.save((error, data) => {
                if (error) {
                    return res.status(400).send("Something went wronge");
                }
                if (data) {
                    return res.status(200).json(data);
                }
            })
        }
    })
}

const getTodo = (req, res) => {
    Todo.findOne({ user: req.user._id }, (error, todo) => {
        if (error) {
            return res.status(400).send("Something went wronge");
        }
        if (todo) {
            return res.status(200).json(todo.todo)
        }
        else {
            const _todo = new Todo({
                user: req.user._id,
                todo: []
            })
            _todo.save((error, data) => {
                if (error) {
                    return res.status(400).send("Something went wronge");
                }
                if (data) {
                    return res.status(200).json(data);
                }
            })
        }
    })
}


const removeTodo = (req, res) => {
    Todo.findOne({ user: req.user._id }, (error, user) => {
        if (error) {
            return res.status(400).send("Something went wronge");
        }
        if (user) {
            const newList = user.todo.filter(task => {
                return task._id != req.body._id
            })
            Todo.findOneAndUpdate(
                { user: req.user._id },
                {
                    "$set": {
                        "todo": newList
                    }
                },
                { new: true },
                (error, user) => {
                    if (error) return res.status(400).send("Something went wronge")
                    if (user) return res.status(200).json( user )
                }
            )
        }
        else {
            res.status(400).send("No task Found")
        }
    })
}

const updateTodo = (req, res) => {
    Todo.findOne({ user: req.user._id }, (error, user) => {
        if (error) {
            return res.status(400).send("Something went wronge");
        }
        if (user) {
            const newList = user.todo.map(todo => {
                if(todo._id == req.body._id) return ({task : req.body.task , _id : todo._id});
                else return todo 
            })
            Todo.findOneAndUpdate(
                { user: req.user._id },
                {
                    "$set": {
                        "todo": newList
                    }
                },  
                { new: true },
                (error, user) => {
                    if (error) return res.status(400).send("Something went wronge")
                    if (user) return res.status(200).json({ user })
                }
            )
        }
        else {
            res.status(400).send("No task Found")
        }
    })
}

module.exports = {
    singnUp,
    signIn,
    signOut,
    setTodo,
    getTodo,
    removeTodo,
    updateTodo


}