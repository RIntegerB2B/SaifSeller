import {FaqDetails} from './faqDetails.model';

export class FAQ {
    _id: string;
    faqHeading: string;
    faqDetails: [FaqDetails];
    detailsUpdate: boolean;
}
