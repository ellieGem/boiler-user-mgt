import Users from './users.controller';
exports.usersRouter = function(router) {
	router
		.route('/users')
		.post(Users.createUser)
		.get(Users.getAllUsers);

	router
		.route('/users/id/:userId')
		.get(Users.getByIdUser)
		.put(Users.updateUser)
		.patch(Users.updateUser)
		.delete(Users.deleteUser);

	router.route('/users/email/:email').get(Users.getOneUser);
};
