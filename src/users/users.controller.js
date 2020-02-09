import { Users } from './users.model';

exports.createUser = async (req, res, next) => {
	try {
		const body = req.body;
		const newUser = new Users(body);

		// Check if User already exists via user email
		const isUser = await Users.findOne({ email: body.email });
		if (isUser) {
			let error = 'User already exists';
			throw error;
		}

		let { error } = newUser.joiValidate(body);
		if (error) {
			throw error.details[0].message;
		}
		newUser
			.save()
			.then((result) => {
				res.status(200).json({
					success: true,
					data: result,
				});
			})
			.catch((err) => {
				res.status(400).json({
					success: false,
					error: err.errmsg,
				});
			});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error,
		});
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const body = req.body;
		// check if user exists
		const isUser = await Users.findOne({ _id: req.params.userId });
		if (!isUser) {
			let error = 'User does not exists';
			throw error;
		}
		Users.findByIdAndUpdate(req.params.userId, req.body, { new: true })
			.then((result) => {
				res.status(200).json({
					success: true,
					user: result,
				});
			})
			.catch((err) => {
				res.status(400).json({
					success: false,
					error: err,
				});
			});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error,
		});
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const isUser = await Users.findOne({ _id: req.params.userId });
		if (!isUser) {
			let error = 'User does not exists';
			throw error;
		}
		Users.findByIdAndRemove(req.params.userId)
			.then((result) => {
				res.status(200).json({
					success: true,
					message: 'User deleted successfully',
					user: isUser,
				});
			})
			.catch((err) => {
				res.status(400).json({
					success: false,
					error: err,
				});
			});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error,
		});
	}
};

exports.getAllUsers = (req, res, next) => {
	Users.find()
		.then((result) => {
			res.status(200).json({
				success: true,
				users: result,
			});
		})
		.catch((err) => {
			res.status(400).json({
				success: false,
				error: err,
			});
		});
};

exports.getOneUser = (req, res, next) => {
	Users.findOne({ email: req.params.email })
		.then((result) => {
			res.status(200).json({
				success: true,
				user: result,
			});
		})
		.catch((err) => {
			res.status(400).json({
				success: false,
				erroe: err,
			});
		});
};

exports.getByIdUser = (req, res, next) => {
	Users.findOne({ _id: req.params.userId })
		.then((result) => {
			res.status(200).json({
				success: true,
				user: result,
			});
		})
		.catch((err) => {
			res.status(400).json({
				success: false,
				error: err,
			});
		});
};
