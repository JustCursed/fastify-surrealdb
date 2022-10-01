const Surreal = require('surrealdb.js');

module.exports = require('fastify-plugin')(async (fastify, cfg) => {
	const db = new Surreal(cfg.url);

	await db.wait(cfg.wait ?? true);


	cfg.signin ?
		await db.signin(cfg.signin) :
		cfg.signup ?
			await db.signup(cfg.signup) :
			console.error('\x1b[31mDatabase authentication error\x1b[0m');

	if (!fastify.db) {
		fastify.decorate(cfg.name ?? 'db', db);
	}
}, {
  fastify: '4.x',
  name: 'fastify-surrealdb'
})
