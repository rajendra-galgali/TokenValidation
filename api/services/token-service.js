(function(){

	const jwt = require('jsonwebtoken');
	const appSecretKey = 'chatSecretKey';

	function generateToken(user){
		if(user){
			return jwt.sign({name: user.name}, appSecretKey, {expiresIn: '7d'} );
		}
	}

	function verifyToken(token){
		return jwt.verify(token, appSecretKey);
	}

	module.exports = { generateToken, verifyToken };

})()