import PageHeader from '@/components/PageHeader';
import LegalDocument from '@/components/LegalDocument';
import { FOUNDED_YEAR, siteInfo } from '@/lib/siteContent';

export const metadata = {
  title: 'Terms & Conditions | Helping Hearts NGO',
  description:
    'The terms that govern your use of the Helping Hearts website, donations, and volunteering with us.',
};

const LAST_UPDATED = '23 September 2026';

const intro = [
  `These Terms & Conditions govern your use of this website and any donation, volunteering, or other interaction you have with Helping Hearts (registration number ${siteInfo.registrationNumber}), a non-profit organisation based in Coimbatore, Tamil Nadu, India, serving since ${FOUNDED_YEAR}.`,
  'Please read them carefully. By browsing this website, submitting a form, donating, or volunteering, you confirm that you have read, understood, and accepted these terms. If you do not agree with them, please do not use this website.',
];

const sections = [
  {
    heading: 'About Us',
    body: [
      `Helping Hearts is a registered non-profit organisation founded in ${FOUNDED_YEAR} by a group of college students in Coimbatore. We rescue homeless people from the streets, run shelters and care centres across districts, and operate public healthcare access projects. Our registered office is at ${siteInfo.address[0]} ${siteInfo.address[1]}.`,
      `Our registration number is ${siteInfo.registrationNumber}. You can reach us on ${siteInfo.phone}, on WhatsApp at ${siteInfo.whatsappDisplay}, or at ${siteInfo.email} during our office hours, ${siteInfo.officeHours}.`,
    ],
  },
  {
    heading: 'Use of This Website',
    body: [
      'You may use this website to learn about our work, view our shelters and events, contact us, volunteer, and donate. You agree to use it lawfully and respectfully, and in particular not to:',
      {
        list: [
          'Submit false, misleading, or impersonating information through any form on this website.',
          'Attempt to gain unauthorised access to any part of the website, its administrative area, our servers, or our databases.',
          'Introduce viruses, malware, or any code intended to disrupt or damage the website.',
          'Use automated tools to scrape, harvest, or copy content or contact details from this website.',
          'Copy or reuse photographs of our residents for any purpose whatsoever.',
          'Use our name, logo, registration number, or materials to solicit money or goods without our written authorisation.',
        ],
      },
      'We may restrict or withdraw access to the website, without notice, to anyone we reasonably believe is misusing it.',
    ],
  },
  {
    heading: 'Donations',
    body: [
      'All donations to Helping Hearts are entirely voluntary. By donating, you confirm that:',
      {
        list: [
          'The funds are yours, from a lawful source, and you are entitled to donate them.',
          'You are at least 18 years of age, or are donating with the consent of a parent or guardian.',
          'The details you provide for the donation and receipt are accurate.',
        ],
      },
      'Donations are applied to our charitable objectives — running and maintaining our shelters, food, medical care, education, staff salaries, and the administrative costs necessary to deliver these. Where you donate towards a specific purpose, we will apply the funds to it; if that purpose is already fully funded or cannot proceed, we may apply the funds to a similar one and will tell you if you ask.',
      'We are not able to guarantee that a donation will benefit a particular individual resident, and we do not accept donations conditional on such an arrangement.',
      'Please make donations only through the QR code published on this website or through details confirmed directly by our office. We are not responsible for money given to any individual, agent, or account we have not authorised.',
    ],
  },
  {
    heading: 'How Payment Works',
    body: [
      'We do not use a third-party payment gateway, and no payment is taken on this website. Instead, we show you our UPI QR code, and you transfer the money yourself from your own UPI application.',
      'Accordingly:',
      {
        list: [
          'The transfer is a transaction between you and your own bank or payment app. Helping Hearts is not a party to it and has no control over it.',
          'We never ask for and never receive your card number, CVV, UPI PIN, OTP, or net-banking password. Treat any such request as fraudulent.',
          'Submitting the donation form on this website records your intention to donate. It is not itself a payment, and it does not create a binding obligation on you to pay.',
          'Because nothing confirms the transfer to us automatically, please send us the payment screenshot or UPI reference number. We match it against our bank statement before confirming the donation and issuing a receipt.',
          'Any delay, failure, reversal, or error in the transfer is a matter between you and your bank or payment provider. We will help you trace a payment where we reasonably can.',
          'Please verify the payee name shown in your app before you confirm any transfer.',
        ],
      },
    ],
  },
  {
    heading: 'Receipts and Tax',
    body: [
      'We issue a receipt for every donation we receive. If you have not received yours within a reasonable time, please contact our office with the transaction details and we will reissue it.',
      'Any tax benefit available on a donation depends on our current registrations and on your own tax position under Indian law. Nothing on this website constitutes tax advice, and you should confirm your eligibility with your own tax adviser.',
    ],
  },
  {
    heading: 'Cancellations and Refunds',
    body: [
      'Because donations are voluntary contributions rather than payments for goods or services, they are generally non-refundable once received and receipted.',
      'We will, however, review and refund a donation where there has been a genuine error — for example a duplicate transfer, an amount entered incorrectly, or a transfer you did not authorise. Write to us with the UPI reference number, the date, and the amount as soon as you notice the problem.',
      'Approved refunds are returned to the same UPI ID or bank account the money came from, and only after the credit has appeared and cleared in our account. Please allow a reasonable period for us to verify and process it.',
      'If you have set up a recurring or standing instruction in your own payment app or with your bank, only you can cancel it — we have no gateway or subscription to switch off at our end. Tell us as well so that we stop expecting the gift.',
    ],
  },
  {
    heading: 'Volunteering',
    body: [
      'We welcome volunteers, and we also have a duty of care to the people living in our homes. Accordingly:',
      {
        list: [
          'Submitting a volunteering enquiry is not a guarantee of a placement. We may decline any application at our discretion.',
          'Volunteering may be subject to an interview, verification of the details you provide, and an induction.',
          'Volunteers must follow our code of conduct, the instructions of our staff, and our child and vulnerable adult protection practices at all times.',
          'Volunteers may not photograph, film, or publish images of residents, or share residents’ personal details, without our written permission.',
          'Volunteering is unpaid and voluntary. It creates no contract of employment, no entitlement to remuneration, and no partnership or agency between you and Helping Hearts.',
          'We may end a volunteering arrangement at any time, particularly where the safety or wellbeing of a resident is in question.',
        ],
      },
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'The Helping Hearts name, logo, and the text, graphics, photographs, and design of this website are owned by us or used with permission, and are protected by applicable intellectual property law.',
      'You may view, download, and print pages from this website for your own personal, non-commercial information. Any other use — including republishing, reproduction, modification, or commercial exploitation — requires our prior written consent.',
      'Photographs of our residents may not be copied, reproduced, or redistributed under any circumstances.',
    ],
  },
  {
    heading: 'Content You Submit',
    body: [
      'If you send us content through this website — a message, an enquiry, a testimonial, or a photograph — you confirm that it is yours to send and that it does not infringe anyone else’s rights, and you grant us permission to use it in connection with our charitable work.',
      'You agree not to submit anything unlawful, defamatory, obscene, threatening, or otherwise inappropriate. We may remove or decline to use any submission at our discretion.',
    ],
  },
  {
    heading: 'Third-Party Links and Services',
    body: [
      'This website links to third-party services, including our Facebook, Instagram, and YouTube pages. Donations are completed inside your own UPI application. We do not control any of these services and are not responsible for their content, availability, terms, or privacy practices. Following an external link, or using a payment app, is at your own risk.',
    ],
  },
  {
    heading: 'Accuracy and Availability',
    body: [
      'We take care to keep the information on this website accurate and current, including details of our shelters, events, and appeals. Even so, information may become out of date or contain errors, and we make no warranty that it is complete or error-free.',
      'We do not guarantee that this website will be available without interruption. We may suspend, withdraw, or change any part of it, or the whole of it, without notice.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    body: [
      'This website is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, Helping Hearts, its trustees, staff, and volunteers will not be liable for any indirect, incidental, or consequential loss arising from your use of, or inability to use, this website, or from your reliance on any information on it.',
      'Nothing in these terms limits any liability that cannot be limited or excluded under applicable law.',
    ],
  },
  {
    heading: 'Indemnity',
    body: [
      'You agree to indemnify Helping Hearts against any claim, loss, or expense arising out of your breach of these Terms & Conditions, your misuse of this website, or your unlawful use of our name, logo, or materials.',
    ],
  },
  {
    heading: 'Privacy',
    body: [
      'Our handling of your personal information is described in our Privacy Policy, which forms part of these terms. Please read it alongside this document.',
    ],
  },
  {
    heading: 'Governing Law and Jurisdiction',
    body: [
      'These Terms & Conditions are governed by the laws of India. Any dispute arising out of them or out of your use of this website is subject to the exclusive jurisdiction of the competent courts at Coimbatore, Tamil Nadu.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    body: [
      'We may revise these Terms & Conditions at any time. The current version will always be published on this page with its “Last updated” date. Your continued use of the website after a revision means you accept the updated terms.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Please Read Carefully"
        title="Terms & Conditions"
        description="The terms that govern your use of this website, your donations, and volunteering with Helping Hearts."
        breadcrumb="Terms & Conditions"
      />
      <LegalDocument
        lastUpdated={LAST_UPDATED}
        intro={intro}
        sections={sections}
      />
    </>
  );
}
