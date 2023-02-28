const collegeRoutes = require("./collegeRoutes");
const courseRoutes = require("./courseRoutes");
const enquiryRoutes = require("./enquiryRoutes");

module.exports = function(app){
    app.use('/api/v1' ,  collegeRoutes);
    app.use('/api/v1' , courseRoutes);
    app.use('/api/v1', enquiryRoutes);
}