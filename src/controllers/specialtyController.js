import db from "../models/index.js";

const createSpecialty = async (req, res) => {
	try {
		const newSpecialty = await db.Specialty.create({
			...req.body,
		});
		return res.status(201).json({
			message: "Create specialty success",
			result: newSpecialty,
		});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

const updateSpecialty = async (req, res) => {
	try {
		const updatedSpecialty = await db.Specialty.update(
			{
				...req.body,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		return res.status(200).json({
			message: "Update booking success",
			result: updatedSpecialty,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

const getAllSpecialty = async (req, res) => {
	try {
		const specialty = await db.Specialty.findAll();
		return res.status(200).json({
			message: "Get specialty success",
			result: specialty,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

const deleteSpecialty = async (req, res) => {
	try {
		const deletedSpecialty = await db.Specialty.destroy({
			where: {
				id: req.params.id,
			},
		});
		return res.status(204).json({
			message: "Delete specialty success",
			result: deletedSpecialty,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

const getSpecialtyById = async (req, res) => {
	try {
		const specialty = await db.Specialty.findOne({
			where: {
				id: req.params.id,
			},
		});
		return res.status(200).json({
			message: "Get specialty success",
			result: specialty,
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

export {
	createSpecialty,
	updateSpecialty,
	getAllSpecialty,
	deleteSpecialty,
	getSpecialtyById,
};
