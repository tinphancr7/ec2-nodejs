import db from '../models/index.js';
import { Op } from 'sequelize';

const createPet = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                email: req.body.Uemail,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const newPet = await db.Pet.create({
            userId: user.id,
            ...req.body,
        });

        return res.status(201).json({
            message: 'Create pet success',
            result: newPet,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getPetbyId = async (req, res) => {
    try {
        const pet = await db.Pet.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: db.User,
                    as: 'userData',
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
            ],
            raw: true,
            nest: true,
        });

        return res.status(200).json({
            message: 'Get pet success',
            result: pet,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllPets = async (req, res) => {
    try {
        const { searchString } = req.query;
        if (!searchString) {
            const pets = await db.Pet.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'userData',
                        attributes: ['id', 'firstName', 'lastName', 'email'],
                    },
                ],
                raw: true,
                nest: true,
            });
            return res.status(200).json({
                message: 'Get all pets success',
                result: pets,
            });
        } else {
            const pets = await db.Pet.findAll({
                include: [
                    {
                        model: db.User,
                        as: 'userData',
                        attributes: ['id', 'firstName', 'lastName', 'email'],
                    },
                ],
                raw: true,
                nest: true,
            });
            const newpets = pets.filter((pet) => {
                for (let key in pet) {
                    if (key === 'userData') {
                        for (let key2 in pet[key]) {
                            if (pet[key][key2].toString().toLowerCase().includes(searchString.toLowerCase())) {
                                return true;
                            }
                        }
                    }
                    if (pet[key].toString().toLowerCase().includes(searchString.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
            return res.status(200).json({
                message: 'Get all pets success',
                result: newpets,
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllPetsByUserId = async (req, res) => {
    try {
        const pets = await db.Pet.findAll({
            where: {
                userId: req.params.id,
            },
            include: [
                {
                    model: db.User,
                    as: 'userData',
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
            ],
            raw: true,
            nest: true,
        });

        return res.status(200).json({
            message: 'Get all pets success',
            result: pets,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updatePet = async (req, res) => {
    try {
        const updatedPet = await db.Pet.update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );

        return res.status(200).json({
            message: 'Update pet success',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const deletePet = async (req, res) => {
    try {
        const deletedPet = await db.Pet.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json({
            message: 'Delete pet success',
            result: deletedPet,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export { createPet, getPetbyId, updatePet, deletePet, getAllPets, getAllPetsByUserId };
