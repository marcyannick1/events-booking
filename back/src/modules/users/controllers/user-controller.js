const {hashPassword} = require("../utils/bcrypt");
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient()

const createUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        const user = prisma.user.create({
            firstName,
            lastName,
            email,
            password,
        })

        res.status(201).json({user});
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(401).json({message: "Email already exist"});
        }
        res.status(400).json({error: err.message});
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({error: 'Utilisateur non trouvé'});
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if (!updatedUser) return res.status(404).json({error: 'Utilisateur non trouvé'});
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({error: 'Utilisateur non trouvé'});
        res.json({message: 'Utilisateur supprimé avec succès'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
}