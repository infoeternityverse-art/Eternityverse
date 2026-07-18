import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys.js';
import { enquiryService } from '@/services/enquiry-service.js';

export const useEnquiry = (id, params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.enquiries.detail(id),
    queryFn: () => enquiryService.getById(id, params),
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });

export const useCustomerEnquiries = (params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.enquiries.customerList(params),
    queryFn: () => enquiryService.listCustomer(params),
    placeholderData: keepPreviousData,
    ...options,
  });

export const useAdminEnquiries = (params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.enquiries.adminList(params),
    queryFn: () => enquiryService.listAdmin(params),
    placeholderData: keepPreviousData,
    ...options,
  });
