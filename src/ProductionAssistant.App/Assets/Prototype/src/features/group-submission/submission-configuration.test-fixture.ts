import type { SubmissionConfiguration } from './business-configuration.types'

export function configurationFixture(): SubmissionConfiguration {
  return {
    revision: 0,
    businesses: [],
    rules: { automatic: false, time: '08:45', weekdays: [1, 2, 3, 4, 5, 6, 0], missingData: 'wait', retryMinutes: 10, retryUntil: '18:00' },
    hasBusiness: false,
    nextRunAt: null,
    dataOptions: [],
  }
}
