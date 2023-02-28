const collegeRoutes = require("./collegeRoutes");
const courseRoutes = require("./courseRoutes");

module.exports = function(app){
    app.use('/api/v1' ,  collegeRoutes);
    app.use('/api/v1' , courseRoutes);
}