import db from '../models/index.js';

const createHealth = async (req, res) => {
    try {
        const newHealth = await db.HealthRecord.create({
            ...req.body,
        });

        return res.status(201).json({
            message: 'Create health success',
            result: newHealth,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateHealth = async (req, res) => {
    try {
        const updatedHealth = await db.HealthRecord.update(
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
            message: 'Update health success',
            result: updatedHealth,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getHealth = async (req, res) => {
    try {
        const { searchString } = req.query;
        const health = await db.HealthRecord.findAll({
            include: [
                {
                    model: db.Booking,
                    as: 'bookingData',
                    attributes: ['bookingDate', 'bookingTime'],
                    include: [
                        {
                            model: db.Specialty,
                            as: 'specialtyData',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
            raw: true,
            nest: true,
        });

        if (!searchString) {
            return res.status(200).json({
                message: 'Get health success',
                result: health,
            });
        } else {
            const newHealth = health.filter((health) => {
                for (let key in health) {
                    if (key === 'bookingData') {
                        for (let key2 in health[key]) {
                            if (health[key][key2].toString().toLowerCase().includes(searchString.toLowerCase()))
                                return true;
                        }
                    }
                    if (health[key].toString().toLowerCase().includes(searchString.toLowerCase())) return true;
                }
            });
            return res.status(200).json({
                message: 'Get health success',
                result: newHealth,
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getHealthById = async (req, res) => {
    try {
        const health = await db.HealthRecord.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: db.Booking,
                    as: 'bookingData',
                    attributes: ['bookingDate', 'bookingTime', 'userId'],
                    include: [
                        {
                            model: db.Specialty,
                            as: 'specialtyData',
                            attributes: ['name'],
                        },
                        {
                            model: db.User,
                            as: 'userData',
                            attributes: ['firstName', 'lastName'],
                        },
                    ],
                },
            ],
            raw: true,
            nest: true,
        });
        return res.status(200).json({
            message: 'Get health by id success',
            result: health,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteHealth = async (req, res) => {
    try {
        const deletedHealth = await db.HealthRecord.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json({
            message: 'Delete health success',
            result: deletedHealth,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export { createHealth, updateHealth, getHealth, deleteHealth, getHealthById };
