import db from "../models/index.js";

const createDoctor = async (req, res) => {
    try {
        const {firstName, lastName, email, address, password, image, phone, specialtyId} = req.body;
        const roleId = "doctor";

        const newUser = await db.User.create({
            firstName,
            lastName,
            email,
            address,
            roleId,
            password,
            image,
            phone,
        });

        const newDoctor = await db.Dr.create({
            userId: newUser.id,
            specialtyId,
        });

        return res.status(201).json({
            message: "Create doctor success",
            result: newDoctor,
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getDoctor = async (req, res) => {
    try {
        const doctors = await db.Dr.findAll({
            include: [
                {
                    model: db.User,
                    as: "userData",
                    attributes: ["firstName", "lastName", "email", "address", "image", "phone"],
                },
                {
                    model: db.Specialty,
                    as: "specialtyData",
                    attributes: ["name"],
                },
            ],
            nest: true,
            raw: true,
        });

        return res.status(200).json({
            message: "Get doctors success",
            result: doctors,
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getDoctorById = async (req, res) => {
    try {
        const doctor = await db.Dr.findOne({
            where: {id: req.params.id},
            include: [
                {
                    model: db.User,
                    as: "userData",
                    attributes: ["firstName", "lastName", "email", "address", "image", "phone"],
                },
                {
                    model: db.Specialty,
                    as: "specialtyData",
                    attributes: ["name"],
                },
            ],
            raw: true,
            nest: true,
        });

        if (!doctor) return res.status(404).json({message: "Doctor not found"});

        return res.status(200).json({
            message: "Get doctor success",
            result: doctor,
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const updateDoctor = async (req, res) => {
    try {
        const {firstName, lastName, email, address, password, image, phone, specialtyId} = req.body;
        const roleId = "doctor";

        const updatedUser = await db.User.update(
            {
                firstName,
                lastName,
                email,
                address,
                roleId,
                password,
                image,
                phone,
            },
            {where: {id: req.params.id}}
        );

        const updatedDoctor = await db.Dr.update(
            {
                specialtyId,
            },
            {where: {userId: req.params.id}}
        );

        return res.status(200).json({
            message: "Update doctor success",
            result: updatedDoctor,
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const deletedUser = await db.User.destroy({where: {id: req.params.id}});
        const deletedDoctor = await db.Dr.destroy({where: {userId: req.params.id}});

        return res.status(200).json({
            message: "Delete doctor success",
            result: deletedDoctor,
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export {
    createDoctor, getDoctor, getDoctorById, updateDoctor, deleteDoctor
}