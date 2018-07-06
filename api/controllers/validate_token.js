const generateTokenService = require('../services/generate-invite-token');
const validateInviteToken = require('../services/validate-invite-token');
const tokenService = require('../services/token-service');
module.exports = {
    validate_token: validate_token,
    generate_tokenfunction: generate_tokenfunction
};


function validate_token(req, res) {
    validateInviteToken(req).then((data) => {
        res.status(200).json({"appKey": data.appKey, "appUrl": data.appUrl});
    })
        .catch((err) => {
            res.status(400).send({
                "error_code": "-101",
                "error_message": "Failed to load data",
                "trace_id": "b30d919c-6491-491e-a5e4-6222ef0b32e4"
            });
        })
}

function generate_tokenfunction(req, res) {
    let jwtToken = req.query.api_key;

    try {
        let verifyAuthToken = tokenService.verifyToken(jwtToken);
        if(verifyAuthToken){
           generateTokenService(req).then((data) => {
              res.status(200).json(data);
          })
       }else{
           res.status(400).send({
            "error_code": "-101",
            "error_message": "Failed to load data",
            "trace_id": "b30d919c-6491-491e-a5e4-6222ef0b32e4"
        });
       }
   } catch (err) {
    res.status(403).json({
        "error_code": "403",
        "error_message": "Invalid JWT Token",
        "trace_id": "b30d919c-6491-491e-a5e4-6222ef0b32e4"
    });
} 
}
    
