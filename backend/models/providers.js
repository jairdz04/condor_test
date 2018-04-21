const mongoose = require('mongoose');
 
const providerSchema = mongoose.Schema({
    employerId: Number,
    firstName: String,
    lastName: String,
    middleName: String,
    email: String,
    providerType: String,
    assignedTo: String,
    staffStatus: String,
    status: String,
    createdBy: Number,
    updatedBy: Number,
    projectedStartDate: String,
    specialty: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Specialty'
    },
    created: { 
        type: Date,
        default: Date.now
    }
});
 
const Provider = mongoose.model('Provider', providerSchema);
 
module.exports = Provider;
