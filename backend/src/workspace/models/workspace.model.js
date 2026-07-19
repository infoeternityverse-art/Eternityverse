import mongoose from 'mongoose';
import { encryptCredentialSecret } from '../../utils/credential-secret.js';

export const WORKSPACE_PROVIDERS = {
  VASTAI: 'vastai',
  RUNPOD: 'runpod',
  TENSORDOCK: 'tensordock',
  OTHER: 'other',
};

export const WORKSPACE_STATUSES = {
  PROVISIONING: 'provisioning',
  RUNNING: 'running',
  STOPPED: 'stopped',
  MAINTENANCE: 'maintenance',
  EXPIRED: 'expired',
  FAILED: 'failed',
};

const workspaceSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GpuPackage',
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: Object.values(WORKSPACE_PROVIDERS),
      required: true,
      index: true,
    },
    providerInstanceId: {
      type: String,
      trim: true,
      maxlength: 180,
    },
    gpuModel: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(WORKSPACE_STATUSES),
      default: WORKSPACE_STATUSES.PROVISIONING,
      index: true,
    },
    instanceIP: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    sshPort: {
      type: Number,
      min: 1,
      max: 65535,
      default: 22,
    },
    sshUsername: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    sshPassword: {
      type: String,
      select: false,
    },
    installedApps: {
      type: [String],
      default: [],
    },
    workspaceUrls: {
      type: Map,
      of: String,
      default: {},
    },
    expiryDate: {
      type: Date,
      default: null,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.sshPassword;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

workspaceSchema.index({ customer: 1, status: 1 });
workspaceSchema.index({ status: 1, expiryDate: 1 });
workspaceSchema.index({ provider: 1, providerInstanceId: 1 });
workspaceSchema.index({ createdAt: -1 });

workspaceSchema.virtual('isActive').get(function getIsActive() {
  return [WORKSPACE_STATUSES.PROVISIONING, WORKSPACE_STATUSES.RUNNING].includes(this.status);
});

workspaceSchema.method('markStatus', function markStatus(status) {
  this.status = status;
  return this;
});

workspaceSchema.static('findForCustomer', function findForCustomer(customerId) {
  return this.find({ customer: customerId }).sort({ createdAt: -1 });
});

workspaceSchema.pre('save', function normalizeWorkspace(next) {
  if (this.isModified('providerInstanceId') && this.providerInstanceId) {
    this.providerInstanceId = this.providerInstanceId.trim();
  }

  if (this.isModified('gpuModel') && this.gpuModel) {
    this.gpuModel = this.gpuModel.trim();
  }

  if (this.isModified('instanceIP') && this.instanceIP) {
    this.instanceIP = this.instanceIP.trim();
  }

  if (this.isModified('sshUsername') && this.sshUsername) {
    this.sshUsername = this.sshUsername.trim();
  }

  if (this.isModified('sshPassword') && this.sshPassword) {
    this.sshPassword = encryptCredentialSecret(this.sshPassword);
  }

  if (this.isModified('installedApps')) {
    this.installedApps = this.installedApps.map((app) => app.trim()).filter(Boolean);
  }

  next();
});

export const Workspace = mongoose.model('Workspace', workspaceSchema);
