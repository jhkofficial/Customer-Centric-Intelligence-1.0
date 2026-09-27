// Types for Campaign & Omnichannel Orchestration module

export type OrchestrationSubmenuId =
  | 'overview'
  | 'customer-journey'
  | 'journey-builder'
  | 'prospect-followup'
  | 'next-best-action'
  | 'campaign-management'
  | 'omnichannel'
  | 'nurture-reengagement'
  | 'contact-policy'
  | 'journey-analytics';

export type LeadStatus =
  | 'Anonymous'
  | 'Known Prospect'
  | 'New Prospect'
  | 'Contacted'
  | 'Interested'
  | 'Hot Prospect'
  | 'Test Drive Scheduled'
  | 'Negotiation'
  | 'Deferred'
  | 'Nurture'
  | 'Financing Barrier'
  | 'Considering'
  | 'No Response'
  | 'Re-Engaged'
  | 'Deal Closed'
  | 'Lost — Competitor'
  | 'Lost — Budget'
  | 'Lost — Product Mismatch'
  | 'Purchased Other Branch'
  | 'Not Interested'
  | 'Do Not Contact';

export type FollowUpOutcome =
  | 'Interested — Ready to Buy'
  | 'Interested — Need Test Drive'
  | 'Interested — Financing Barrier'
  | 'Interested — Budget Constraint'
  | 'Interested — Purchase Later'
  | 'Considering'
  | 'Comparing Competitor'
  | 'Interested in Different Product'
  | 'No Response'
  | 'Not Interested'
  | 'Purchased at Other Branch'
  | 'Purchased Competitor'
  | 'Do Not Contact';

export type CommunicationChannel =
  | 'WhatsApp'
  | 'Phone'
  | 'Email'
  | 'SMS'
  | 'Live Chat'
  | 'Call Center'
  | 'Social Media'
  | 'Push Notification'
  | 'Dealer Interaction';

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface ReasonCodeCategory {
  id: string;
  name: string;
  subReasons: string[];
}

export interface ProspectProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  branch: string;
  productInterest: string;
  previousProductInterest?: string;
  leadScore: number;
  intentLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  status: LeadStatus;
  lastOutcome?: FollowUpOutcome;
  lastReason?: string;
  lastSubReason?: string;
  lastInteractionDate: string;
  lastInteractionTime: string;
  lastChannel: CommunicationChannel;
  nextFollowUpDate: string;
  assignedSales: string;
  slaHoursRemaining: number;
  priority: PriorityLevel;
  customerBarrier?: string;
  expectedPurchaseTiming?: string;
  contactAttempts: number;
  maxContactAttempts: number;
  engagementScoreChange: number; // e.g. +32%
  isDoNotContact: boolean;
  isConverted: boolean;
  isPurchasedOtherBranch: boolean;
  notes: string;
  // Customer 360 additions
  vehicleOwnership?: string;
  monthlyExpenditure?: string;
  incomeSegment?: string;
  customerSince?: string;
  preferredChannel: CommunicationChannel;
}

export interface JourneyTimelineNode {
  id: string;
  date: string;
  time: string;
  channel: CommunicationChannel | 'Instagram' | 'Website' | 'Event' | 'QR Registration';
  interaction: string;
  status: LeadStatus;
  customerResponse?: string;
  salesAction?: string;
  systemAction?: string;
  visualState: 'blue' | 'orange' | 'yellow' | 'green' | 'red' | 'purple';
  // State description:
  // Blue = Prospect, Orange = Needs Attention, Yellow = Nurture, Green = Converted, Red = Lost/Do Not Contact, Purple = AI Recommendation
}

export interface NextBestActionItem {
  id: string;
  prospectId: string;
  customerName: string;
  leadScore: number;
  currentState: LeadStatus;
  customerBarrier: string;
  recommendedAction: string;
  recommendedChannel: CommunicationChannel;
  recommendedTime: string;
  assignedSales: string;
  priority: PriorityLevel;
  confidenceScore: number; // e.g. 82%
  ctaLabel: string;
  ctaActionType: 'financing-offer' | 'schedule-followup' | 'reactivate-lead' | 'test-drive' | 'custom';
  aiRationale: string[];
}

export interface CampaignRecord {
  id: string;
  name: string;
  objective: string;
  campaignType:
    | 'Acquisition Campaign'
    | 'Nurture Campaign'
    | 'Re-Engagement Campaign'
    | 'Financing Campaign'
    | 'Product Education Campaign'
    | 'Event Campaign'
    | 'Test Drive Campaign'
    | 'Retention Campaign'
    | 'Loyalty Campaign';
  audienceSegment: string;
  channel: CommunicationChannel;
  schedule: string;
  status: 'Aktif' | 'Terjadwal' | 'Selesai' | 'Draf';
  owner: string;
  budget: string;
  sentCount: number;
  deliveredCount: number;
  openedCount: number;
  clickedCount: number;
  respondedCount: number;
  convertedCount: number;
  revenueGenerated: string;
}

export interface OmnichannelMessage {
  id: string;
  prospectId: string;
  customerName: string;
  timestamp: string;
  channel: CommunicationChannel;
  direction: 'inbound' | 'outbound' | 'system';
  content: string;
  senderName: string;
  status?: 'Sent' | 'Delivered' | 'Read' | 'Replied';
}

export interface ContactPolicyRule {
  id: string;
  channel: CommunicationChannel;
  maxFrequency: string;
  cooldownPeriod: string;
  noResponseRule: string;
  segmentAppliesTo: string;
  consentRequired: boolean;
  status: 'Enforced' | 'Warning' | 'Disabled';
}

export interface ReEngagementOpportunity {
  id: string;
  prospectId: string;
  customerName: string;
  productInterest: string;
  previousStatus: LeadStatus;
  lastSalesInteractionDays: number;
  newSignal: string;
  engagementScoreDelta: string;
  recommendedAction: string;
  priority: PriorityLevel;
}
