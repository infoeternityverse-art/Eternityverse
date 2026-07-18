import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      index: true,
    },
    entityType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      index: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      index: true,
    },
    ipAddress: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

auditLogSchema.index({ actor: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ createdAt: -1 });

auditLogSchema.virtual('entityReference').get(function getEntityReference() {
  return this.entityId ? `${this.entityType}:${this.entityId}` : this.entityType;
});

auditLogSchema.method('hasActor', function hasActor() {
  return Boolean(this.actor);
});

auditLogSchema.static('record', function record(payload) {
  return this.create(payload);
});

auditLogSchema.static('findForEntity', function findForEntity(entityType, entityId) {
  return this.find({ entityType, entityId }).sort({ createdAt: -1 });
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
