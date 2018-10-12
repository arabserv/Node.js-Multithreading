//
// Author: 
//  Ayman Aljohary - ayman2243@gmail.com / 01201035118
//

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var { Annotation } = require('./annotation');
var { Folder } = require('./folder');
var { Resource } = require('./resource');
var { DocumentationExplanation } = require('./documentationExplanation');
var { Interpreter } = require('./interpreter');
var { Timeline } = require('./timeline');
var { Surah } = require('./surah');
var { Aya } = require('./aya');
var { Title } = require('./title');


var PointSchema = new mongoose.Schema({

    pointNumber: {
        type: Number,
        minlength: 1,
        trim: true,
        required: true,
        unique: true
    },

    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },

    annotation: [{
        charLocation: {
            type: Number,
            minlength: 1,
            trim: true,
            required: true
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Annotation",
            required: true,
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Annotation.findOne({ _id: value })
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
                message: '{VALUE} - لا توجد حاشية تحمل هذا التعريف'
            }
        }
    }],

    documents: [{
        _id: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "DocumentationExplanation",
            minlength: 1,
            trim: true,
            validate: {
                isAsync: true,
                validator: function (value) {
                    return DocumentationExplanation.findOne({ _id: value })
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
                message: '{VALUE} - لا توجد مسند تحمل هذا الاسم'
            }
        }
    }],

    folder_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
        validate: {
            isAsync: true,
            validator: function (value) {
                return Folder.findOne({ _id: value })
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
            message: '{VALUE} - لا توجد مجلد تحمل هذا التعريف'
        }
    },

    typeOfTafser: {
        enum: ['Quran', 'Sunna', 'Language', 'Information', 'Israiliyat'],
        required: true,
        type: String,
        minlength: 1,
        trim: true
    },

    interpreters: [{
        _id: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interpreter",
            minlength: 1,
            trim: true,
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Interpreter.findOne({ _id: value })
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
                message: '{VALUE} - لا توجد مفسر يحمل هذا الاسم'
            }
        }
    }],

    timeline_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Timeline",
        minlength: 1,
        trim: true,
        validate: {
            isAsync: true,
            validator: function (value) {
                return Timeline.findOne({ _id: value })
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
            message: '{VALUE} - لا توجد وقت زمني يحمل هذا الاسم'
        }
    },

    resources: [{
        _id: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",
            minlength: 1,
            trim: true,
            validate: {
                isAsync: true,
                validator: function (value) {
                    return Resource.findOne({ _id: value })
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
                message: '{VALUE} - لا توجد مصدر يحمل هذا الاسم'
            }
        }
    }],

    aya_id: {
        type: mongoose.Schema.Types.ObjectId,
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
            message: '{VALUE} - لا توجد آىة يحمل هذا التعريف'
        }
    },

    surah_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Surah",
        minlength: 1,
        trim: true,
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
            message: '{VALUE} - لا توجد سورة يحمل هذا الاسم'
        }
    },

    pageNumber: {
        type: Number,
        minlength: 1,
        trim: true,
        required: true
    },

    title_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Title",
        minlength: 1,
        trim: true,
        validate: {
            isAsync: true,
            validator: function (value) {
                return Title.findOne({ _id: value })
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
            message: '{VALUE} - لا توجد عنوان يحمل هذا الاسم'
        }
    }

}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });



PointSchema.plugin(mongoosePaginate);

PointSchema.index({ "$**": 'text' });

PointSchema.pre('find', autoPopulation);

PointSchema.pre('findOne', autoPopulation);

function autoPopulation(next) {
    this.populate('folder_id')
        .populate('surah_id')
        .populate('aya_id')
        .populate('interpreters._id')
        .populate('annotation._id')
        .populate('documents._id ')
        .populate('resources._id')
        .populate('timeline_id')
        .populate('title_id');
    next();
}

var Point = mongoose.model('Point', PointSchema);

module.exports = { Point };
