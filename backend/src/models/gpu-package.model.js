import mongoose from 'mongoose';

export const STORAGE_TYPES = {
  SSD: 'ssd',
  NVME: 'nvme',
  HDD: 'hdd',
};

export const AVAILABILITY_STATUSES = {
  AVAILABLE: 'available',
  LIMITED: 'limited',
  UNAVAILABLE: 'unavailable',
  COMING_SOON: 'coming_soon',
};

const gpuPackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 180,
    },
    gpuModel: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      index: true,
    },
    gpuMemoryGb: {
      type: Number,
      required: true,
      min: 1,
    },
    cpuCores: {
      type: Number,
      required: true,
      min: 1,
    },
    ramGb: {
      type: Number,
      required: true,
      min: 1,
    },
    storageGb: {
      type: Number,
      required: true,
      min: 1,
    },
    storageType: {
      type: String,
      enum: Object.values(STORAGE_TYPES),
      default: STORAGE_TYPES.NVME,
    },
    bandwidth: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    region: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      index: true,
    },
    hourlyPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    monthlyPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 3,
      maxlength: 3,
      default: 'USD',
    },
    availabilityStatus: {
      type: String,
      enum: Object.values(AVAILABILITY_STATUSES),
      default: AVAILABILITY_STATUSES.AVAILABLE,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    features: {
      type: [String],
      default: [],
    },
    useCases: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

gpuPackageSchema.index({ slug: 1 }, { unique: true });
gpuPackageSchema.index({ isPublished: 1, availabilityStatus: 1 });
gpuPackageSchema.index({ gpuModel: 1, region: 1 });
gpuPackageSchema.index({ hourlyPrice: 1 });
gpuPackageSchema.index({ monthlyPrice: 1 });
gpuPackageSchema.index({ createdAt: -1 });

gpuPackageSchema.virtual('displayPrice').get(function getDisplayPrice() {
  return `${this.currency} ${this.hourlyPrice}/hr`;
});

gpuPackageSchema.virtual('specSummary').get(function getSpecSummary() {
  return `${this.gpuModel} ${this.gpuMemoryGb}GB`;
});

gpuPackageSchema.method('isAvailableForEnquiry', function isAvailableForEnquiry() {
  return this.isPublished && this.availabilityStatus !== AVAILABILITY_STATUSES.UNAVAILABLE;
});

gpuPackageSchema.static('findPublished', function findPublished(filter = {}) {
  return this.find({ ...filter, isPublished: true });
});

gpuPackageSchema.static('findBySlug', function findBySlug(slug) {
  return this.findOne({ slug: String(slug).toLowerCase().trim() });
});

gpuPackageSchema.pre('save', function normalizeGpuPackage(next) {
  if (this.isModified('slug') && this.slug) {
    this.slug = this.slug.toLowerCase().trim();
  }

  if (this.isModified('currency') && this.currency) {
    this.currency = this.currency.toUpperCase().trim();
  }

  if (this.isModified('features')) {
    this.features = this.features.map((feature) => feature.trim()).filter(Boolean);
  }

  if (this.isModified('useCases')) {
    this.useCases = this.useCases.map((useCase) => useCase.trim()).filter(Boolean);
  }

  next();
});

export const GpuPackage = mongoose.model('GpuPackage', gpuPackageSchema);
