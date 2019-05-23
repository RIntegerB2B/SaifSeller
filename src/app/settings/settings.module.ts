import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BannersComponent } from './banners/banners.component';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SettingsService} from './settings.service';
import {SettingRoutingModule} from './setting-routing.module';
import { ViewBannersComponent } from './view-banners/view-banners.component';
import { AdsComponent } from './ads/ads.component';
import { ViewAdsComponent } from './view-ads/view-ads.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ViewPromotionsComponent } from './view-promotions/view-promotions.component';
import {FooterComponent} from './footer/footer.component';
import {ViewFooterComponent} from './view-footer/view-footer.component';
import { SupportComponent } from './support/support.component';
import { ViewSupportComponent } from './view-support/view-support.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ViewContactUsComponent } from './view-contact-us/view-contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ViewPrivacyPolicyComponent } from './view-privacy-policy/view-privacy-policy.component';
import { FaqComponent } from './faq/faq.component';
import { ViewFaqComponent } from './view-faq/view-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { TermsAndUseComponent } from './terms-and-use/terms-and-use.component';
import { ViewTermsAndUseComponent } from './view-terms-and-use/view-terms-and-use.component';
import { SubsrcibeComponent } from './subsrcibe/subsrcibe.component';

@NgModule({
  declarations: [
    BannersComponent,
    ViewBannersComponent,
    AdsComponent,
    ViewAdsComponent,
    PromotionsComponent,
    ViewPromotionsComponent,
    FooterComponent,
    ViewFooterComponent,
    SupportComponent,
    ViewSupportComponent,
    ContactUsComponent,
    ViewContactUsComponent,
    PrivacyPolicyComponent,
    ViewPrivacyPolicyComponent,
    FaqComponent,
    ViewFaqComponent,
    EditFaqComponent,
    TermsAndUseComponent,
    ViewTermsAndUseComponent,
    SubsrcibeComponent
  ],
  imports: [
    HttpClientModule,
    SettingRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatStepperModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers:
   [
    SettingsService
   ]
})
export class SettingsModule { }
