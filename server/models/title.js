//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Surah } = require('./surah');
var { Aya } = require('./aya');

var TitleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
        unique: true
    },

    type: {
        type: String,
        enum: ['Surah', 'Aya'],
        required: true,
        minlength: 2,
        trim: true
    },

    surah: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Surah",
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Surah.findOne({ _id: value })
                        .then(doc => {
                            if (!doc) {
                                return false;
                            }
                            return true;
                        })
                        .catch(e => {
                            return false;
                        });
                },
                message: '{VALUE} - لا يوجد سورة يحمل هذا التعريف'
            }
        }
    }],

    aya: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Aya",
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Aya.findOne({ _id: value })
                        .then(doc => {
                            if (!doc) {
                                return false;
                            }
                            return true;
                        })
                        .catch(e => {
                            return false;
                        });
                },
                message: '{VALUE} - لا يوجد آية يحمل هذا التعريف'
            }
        }
    }]

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


TitleSchema.plugin(mongoosePaginate);

TitleSchema.index({ "$**": 'text' });

TitleSchema.pre('find', autoPopulation);

TitleSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate("surah._id")
        .populate("aya._id");
    next();
}

var Title = mongoose.model('Title', TitleSchema);

module.exports = { Title };
