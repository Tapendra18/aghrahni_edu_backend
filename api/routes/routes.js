const collegeRoutes = require("./collegeRoutes");
const courseRoutes = require("./courseRoutes");
const enquiryRoutes = require("./enquiryRoutes");
const userRoutes = require("./userRoutes");


module.exports = function(app){
    app.use('/api/v1' ,  collegeRoutes);
    app.use('/api/v1' , courseRoutes);
    app.use('/api/v1', enquiryRoutes);
    app.use("/api/v1" , userRoutes);
}