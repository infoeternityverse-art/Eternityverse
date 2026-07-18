import mongoose from 'mongoose';

export const ENQUIRY_STATUSES = {
  PENDING: 'pending',
  CONTACTED: 'contacted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  FULFILLED: 'fulfilled',
};

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: Object.values(ENQUIRY_STATUSES),
      required: true,
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const enquirySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    gpuPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GpuPackage',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(ENQUIRY_STATUSES),
      default: ENQUIRY_STATUSES.PENDING,
      index: true,
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    expectedUsage: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    duration: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    budget: {
      type: Number,
      min: 0,
      default: null,
    },
    contactName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    contactPhone: {
      type: String,
      trim: true,
      maxlength: 40,
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: '',
    },
    customerVisibleNotes: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: '',
    },
    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

enquirySchema.index({ customer: 1, createdAt: -1 });
enquirySchema.index({ gpuPackage: 1, createdAt: -1 });
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ contactName: 1 });
enquirySchema.index({ contactEmail: 1 });
enquirySchema.index({ createdAt: -1 });

enquirySchema.virtual('isOpen').get(function getIsOpen() {
  return [ENQUIRY_STATUSES.PENDING, ENQUIRY_STATUSES.CONTACTED, ENQUIRY_STATUSES.APPROVED].includes(
    this.status
  );
});

enquirySchema.method(
  'appendStatusHistory',
  function appendStatusHistory(status, changedBy = null, note = '') {
    this.statusHistory.push({ status, changedBy, note });
    return this;
  }
);

enquirySchema.static('findForCustomer', function findForCustomer(customerId) {
  return this.find({ customer: customerId }).sort({ createdAt: -1 });
});

enquirySchema.static('findByStatus', function findByStatus(status) {
  return this.find({ status }).sort({ createdAt: -1 });
});

enquirySchema.pre('save', function normalizeEnquiry(next) {
  if (this.isModified('contactEmail') && this.contactEmail) {
    this.contactEmail = this.contactEmail.toLowerCase().trim();
  }

  if (this.isNew && this.statusHistory.length === 0) {
    this.statusHistory.push({ status: this.status });
  }

  next();
});

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
