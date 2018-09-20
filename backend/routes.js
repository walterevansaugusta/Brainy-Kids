'use strict';
const controllers = require('./controllers');

// We disable sessions since we want to validate the token on each request
const PASSPORT_OPTIONS = { session: false };

module.exports = (app, passport) => {
	/**
	 * The following code is used on routes which we wish to protect via JWTs.
	 * It only verifies that valid token is provided, for a valid teacher or
	 * student, it doesn't verify that a student can access only certain routes.
	 * Additional validation is necessary for that.
	 *
	 * Middleware: passport.authenticate('jwt', PASSPORT_OPTIONS)
	 */
    app.post('/api/session/register', [], controllers.session.newTeacher);

	app.get('/status', [], controllers.static.status);

	/**
	 * Program Routes
	 */
	app.get('/api/programs', [], controllers.program.getAll);
	app.get('/api/program/:id', [], controllers.program.getOne);
	app.post('/api/program', [], controllers.program.create);
	app.put('/api/program/:id', [], controllers.program.update);
	app.delete('/api/program/:id', [], controllers.program.deleteOne);

	// Render React page. Must be last route
	app.get('/*', [], controllers.static.getAll);
};
