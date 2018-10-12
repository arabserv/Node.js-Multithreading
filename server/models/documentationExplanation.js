//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Topic } = require('./topic');

var DocumentationExplanationSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        unique: true
    },

    type: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        enum: ['type1', 'type2', 'type3', 'type4', 'type5']
        // type 1 : كتب التفسير الميسندة المطبوعة
        // type 2 : كنب التفسير المسندة المفقودة وما في حكمها
        // type 3 : كتب علوم القرآن المسندة
        // type 4 : كتب الحديث المسندة
        // type 5 : ما سوي ذلك من كتب الفقة و اللغة والادب و التراجم المسندة
    },

    description: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Topic",
        // required: true,
        // minlength: 1,
        // trim: true,
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
        //     message: '{VALUE} - لا توجد موضوع يحمل هذا الاسم'
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

DocumentationExplanationSchema.plugin(mongoosePaginate);

DocumentationExplanationSchema.index({ '$**': 'text' });

// DocumentationExplanationSchema.pre('find', autoPopulation);

// DocumentationExplanationSchema.pre('findOne', autoPopulation);

// function autoPopulation(next) {
//     this.populate('description');
//     next();
// }

var DocumentationExplanation = mongoose.model('DocumentationExplanation', DocumentationExplanationSchema);

module.exports = { DocumentationExplanation };