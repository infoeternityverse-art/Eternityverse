import { Credential, CREDENTIAL_STATUSES } from '../models/index.js';
import { notificationService } from '../notifications/index.js';
import { decryptCredentialSecret } from '../utils/credential-secret.js';
import { BaseService } from './base.service.js';

class CredentialService extends BaseService {
  constructor() {
    super(Credential, {
      resourceName: 'Credential',
      searchFields: ['host', 'username', 'sshCommand', 'accessInstructions'],
      allowedFilters: ['customer', 'enquiry', 'gpuPackage', 'status', 'host', 'username'],
      allowedSortFields: ['createdAt', 'updatedAt', 'issuedAt', 'expiresAt'],
      allowedSelectFields: [
        'customer',
        'enquiry',
        'gpuPackage',
        'host',
        'port',
        'username',
        'sshCommand',
        'accessInstructions',
        'status',
        'issuedBy',
        'issuedAt',
        'expiresAt',
        'revokedAt',
        'createdAt',
        'updatedAt',
      ],
      allowedPopulate: ['customer', 'enquiry', 'gpuPackage', 'issuedBy'],
    });
  }

  async create(payload, options = {}) {
    const response = await super.create(payload, options);
    const credential = await this.findById(response.data._id, {
      populate: ['customer', 'gpuPackage'],
      unwrap: true,
    });

    await notificationService.sendCredentialIssued({
      credential,
      customer: credential.customer,
      gpuPackage: credential.gpuPackage,
    });

    return response;
  }

  findActiveForCustomer(customerId, options = {}) {
    return this.findMany({
      ...options,
      filters: {
        ...options.filters,
        customer: customerId,
        status: CREDENTIAL_STATUSES.ACTIVE,
      },
    });
  }

  async findActiveForCustomerWithSecrets(customerId, options = {}) {
    const response = await this.findActiveForCustomer(customerId, options);
    const credentialIds = response.data.map((credential) => credential._id);
    const credentialsWithPasswords = await Credential.find({ _id: { $in: credentialIds } }).select(
      '+passwordEncrypted'
    );
    const passwordById = new Map(
      credentialsWithPasswords.map((credential) => [
        credential._id.toString(),
        decryptCredentialSecret(credential.passwordEncrypted),
      ])
    );

    response.data = response.data.map((credential) => {
      const credentialObject = credential.toJSON();
      credentialObject.password = passwordById.get(credential._id.toString()) || '';
      return credentialObject;
    });

    return response;
  }

  findExpiredCandidates(date = new Date(), options = {}) {
    return this.findMany({
      ...options,
      filters: {
        ...options.filters,
        status: CREDENTIAL_STATUSES.ACTIVE,
      },
      extraFilter: {
        expiresAt: { $lte: date },
      },
    });
  }
}

export const credentialService = new CredentialService();
