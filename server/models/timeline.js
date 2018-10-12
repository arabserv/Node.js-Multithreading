//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var { Topic } = require('./topic');

var TimelineSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 1,
        required: true,
        unique: true
    },

    date: {
        type: String,
        required: true,
        minlength: 1,
        required: true
    },

    description: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Topic",
        // minlength: 1,
        // trim: true,
        // required: true,
        // validate: {
        //     isAsync: true,
        //     validator: function (value) {
        //         return Topic.findOne({ _id: value })
        //             .then(doc => {
        //                 if (!doc) {
        //                     return false;
        //                 }
        //                 return true;
        //             })
        //             .catch(e => {
        //                 return false;
        //             });
        //     },
        //     message: '{VALUE} - لا يوجد موضوع يحمل هذا العنوان'
        // }
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }

}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

TimelineSchema.plugin(mongoosePaginate);

TimelineSchema.index({ '$**': 'text' });

// TimelineSchema.pre('find', autoPopulation);

// TimelineSchema.pre('findOne', autoPopulation);

// function autoPopulation(next) {
//     this.populate("description");
//     next();
// }

var Timeline = mongoose.model('Timeline', TimelineSchema);

module.exports = { Timeline };