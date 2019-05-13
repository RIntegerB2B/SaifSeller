import {PrivacyDetails} from './policyDetails.model';

export class PrivacyPolicy {
    _id: string;
    policyHeading: string;
    policies: [PrivacyDetails];
    detailsUpdate: boolean;
}
