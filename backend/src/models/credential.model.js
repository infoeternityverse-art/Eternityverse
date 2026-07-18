import mongoose from 'mongoose';
import { encryptCredentialSecret } from '../utils/credential-secret.js';

export const CREDENTIAL_STATUSES = {
  ACTIVE: 'active',
  REVOKED: 'revoked',
  EXPIRED: 'expired',
};

const credentialSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    enquiry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enquiry',
      required: true,
    },
    gpuPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GpuPackage',
      required: true,
      index: true,
    },
    host: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    port: {
      type: Number,
      required: true,
      min: 1,
      max: 65535,
      default: 22,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    passwordEncrypted: {
      type: String,
      required: true,
      select: false,
    },
    sshCommand: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    accessInstructions: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: Object.values(CREDENTIAL_STATUSES),
      default: CREDENTIAL_STATUSES.ACTIVE,
      index: true,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    expiresAt: {
      type: Date,
      default: null,
      index: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.passwordEncrypted;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

credentialSchema.index({ customer: 1, status: 1 });
credentialSchema.index({ enquiry: 1 });
credentialSchema.index({ gpuPackage: 1, status: 1 });
credentialSchema.index({ status: 1, expiresAt: 1 });
credentialSchema.index({ issuedAt: -1 });

credentialSchema.virtual('connectionTarget').get(function getConnectionTarget() {
  return `${this.username}@${this.host}`;
});

credentialSchema.virtual('isExpired').get(function getIsExpired() {
  return Boolean(this.expiresAt && this.expiresAt <= new Date());
});

credentialSchema.method('revoke', function revoke() {
  this.status = CREDENTIAL_STATUSES.REVOKED;
  this.revokedAt = new Date();
  return this;
});

credentialSchema.method('buildSshCommand', function buildSshCommand() {
  return `ssh ${this.username}@${this.host} -p ${this.port}`;
});

credentialSchema.static('findActiveForCustomer', function findActiveForCustomer(customerId) {
  return this.find({ customer: customerId, status: CREDENTIAL_STATUSES.ACTIVE }).sort({
    issuedAt: -1,
  });
});

credentialSchema.static('findExpiringBefore', function findExpiringBefore(date) {
  return this.find({ status: CREDENTIAL_STATUSES.ACTIVE, expiresAt: { $lte: date } });
});

credentialSchema.pre('save', function normalizeCredential(next) {
  if (!this.sshCommand && this.host && this.username && this.port) {
    this.sshCommand = this.buildSshCommand();
  }

  if (this.isModified('host') && this.host) {
    this.host = this.host.trim();
  }

  if (this.isModified('username') && this.username) {
    this.username = this.username.trim();
  }

  if (this.isModified('passwordEncrypted') && this.passwordEncrypted) {
    this.passwordEncrypted = encryptCredentialSecret(this.passwordEncrypted);
  }

  next();
});

export const Credential = mongoose.model('Credential', credentialSchema);
