import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			first: {
				type: String,
			},
			last: {
				type: String,
			},
		},
		email: {
			type: String,
			unique: [true, 'email already exists'],
		},
		phone: {
			type: String,
		},
		gender: {
			type: String,
			enum: ['Male', 'Female', 'LGBTQ', 'Others'],
		},
	},
	{ timestamps: true }
);

userSchema.methods.joiValidate = (requestBody) => {
	const Joi = require('@hapi/joi');

	// define the validation schema
	const schema = Joi.object({
		name: {
			first: Joi.string()
				.trim()
				.min(3)
				.max(20)
				.messages({ 'string.empty': 'Please enter First Name' }),
			last: Joi.string()
				.trim()
				.min(3)
				.max(20)
				.messages({ 'string.empty': 'Please enter Last Name' }),
		},

		// email is required
		// email must be a valid email string
		email: Joi.string()
			.trim()
			.min(6)
			.email()
			.required()
			.messages({ 'string.empty': 'Please enter Email' }),

		// phone is required
		// and must be a string of the format XXX-XXX-XXXX
		// where X is a digit (0-9)
		phone: Joi.string()
			.trim()
			.required()
			.min(10)
			.max(10),

		gender: Joi.string().valid('Male', 'Female', 'LGBTQ'),
		//
	}).options({ stripUnknown: true });

	return schema.validate(requestBody);
};
const exportSchema = mongoose.model('Users', userSchema, 'Users');
// module.exports = mongoose.model('Users', userSchema, 'Users');
export { exportSchema as Users };
