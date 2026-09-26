import PageHeader from '@/components/PageHeader';
import LegalDocument from '@/components/LegalDocument';
import { siteInfo } from '@/lib/siteContent';

export const metadata = {
  title: 'Privacy Policy | Helping Hearts NGO',
  description:
    'How Helping Hearts collects, uses, and protects the personal information of donors, volunteers, and website visitors.',
};

const LAST_UPDATED = '23 September 2026';

const intro = [
  `Helping Hearts (registration number ${siteInfo.registrationNumber}) is committed to protecting the privacy of everyone who supports our work — donors, volunteers, well-wishers, and the people we rescue and shelter.`,
  'This Privacy Policy explains what information we collect through this website and our offline activities, why we collect it, how we look after it, and the choices you have. By using this website you agree to the practices described here.',
];

const sections = [
  {
    heading: 'Information We Collect',
    body: [
      'We only collect information that we genuinely need. Depending on how you interact with us, this may include:',
      {
        list: [
          'Contact details you give us voluntarily — your name, email address, phone number, and postal address — for example when you submit our contact form, enquire about volunteering, or make a donation.',
          'Donation records, including the amount, date, and mode of payment, which we are required to maintain for accounting and audit purposes.',
          'Volunteer information, such as your areas of interest, availability, and any details you choose to share in support of your application.',
          'Correspondence, including emails, messages, and notes from phone calls, so that we can respond to you properly.',
          'Technical information collected automatically by our hosting and analytics providers, such as your IP address, browser type, device type, referring page, and the pages you viewed.',
        ],
      },
      'Your PAN, collected on the donation form. Indian tax law requires it for us to issue a valid donation receipt, so it is the one government identifier we ask for. It is used for receipts and statutory filings only — never for anything else, and never shared with other donors or third parties.',
      'We do not ask for, and request that you never send us, any other sensitive information such as caste, religious belief, medical history, Aadhaar, or passport details.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    body: [
      'We use the information described above only for the purposes for which it was given, namely to:',
      {
        list: [
          'Respond to your enquiries, requests, and messages.',
          'Process and acknowledge your donation, and issue receipts.',
          'Assess and coordinate volunteering opportunities.',
          'Send you updates about our shelters, events, and appeals — where you have asked to receive them.',
          'Maintain accurate accounting, statutory, and audit records as required by Indian law.',
          'Understand how our website is used so that we can improve it.',
          'Protect our organisation, our residents, and our supporters against fraud or misuse.',
        ],
      },
      'We will not use your information for any materially different purpose without first informing you.',
    ],
  },
  {
    heading: 'Donations and Payment Information',
    body: [
      'We do not use a third-party payment gateway, and no payment is ever processed on this website. Donations are made by direct UPI transfer: we display our QR code, and you pay from your own UPI app — Google Pay, PhonePe, Paytm, or any other — entirely outside this website.',
      'This means we never see, collect, request, or store any payment credential. We hold no card numbers, no CVV codes, no UPI PIN, no OTPs, and no net-banking passwords, because none of them are ever entered here.',
      'What we do collect, through the donation form shown before the QR code, is the information we need to acknowledge your gift and keep our accounts: your name, email address, phone number, the amount you intend to give, the purpose you have chosen, and any message you add.',
      'Because the transfer happens in your own UPI app, it does not reach us automatically. We ask you to send us the payment screenshot or UPI reference number so that we can match it against our bank statement, confirm it, and issue your receipt. Until we do, your record is simply an unconfirmed intention to donate.',
      'Please never share your card details, OTPs, UPI PIN, or banking passwords with anyone claiming to represent Helping Hearts, whether by phone, email, or message. We will never ask for them.',
    ],
  },
  {
    heading: 'Volunteer Information',
    body: [
      'When you sign up through our Join Us page we collect your name, email address, phone number, city, the kind of help you would like to offer, your availability, and anything else you choose to tell us.',
      'We use this only to contact you about volunteering, to match you to a suitable home and schedule, and to keep a record of who is working with our residents — which we have a duty of care to maintain.',
      'We do not add volunteers to donation appeals without their agreement, and we do not pass volunteer details to any other organisation. If you decide not to proceed, or you stop volunteering, you can ask us to delete your record.',
    ],
  },
  {
    heading: 'Photographs, Video, and Stories',
    body: [
      'Photographs and videos of our homes, events, and activities are central to explaining our work. We treat the people in them with care:',
      {
        list: [
          'We seek consent before photographing residents, and we honour a refusal without question or consequence.',
          'We do not publish the full name, address, medical condition, or family circumstances of anyone in our care.',
          'We do not publish images that we believe would compromise a resident’s dignity, safety, or privacy — including photographs taken during a street rescue, when a person is least able to consent.',
          'Where a story needs to be told, we may change names and identifying details.',
          'If you or a family member appears in a photograph on this website and you would like it removed, contact us and we will take it down.',
        ],
      },
    ],
  },
  {
    heading: 'The People We Rescue and Shelter',
    body: [
      'The people we bring in from the streets are, by definition, at their most vulnerable. Their information is handled separately from everything described above and with considerably more care.',
      {
        list: [
          'Records about residents are held offline, not on this website.',
          'They are shared only with the staff, medical professionals, and statutory authorities who genuinely need them.',
          'They are never given to donors, however generous, and never used in fundraising material without the resident’s consent.',
          'Where a resident is a child or is unable to give informed consent, we do not publish their name, photograph, or circumstances at all.',
        ],
      },
      'We also do not knowingly collect personal information online from anyone under the age of 18. If you are under 18, please involve a parent or guardian before contacting us or making a donation.',
      'If you believe information about a resident has been published in error, contact us immediately and we will remove it.',
    ],
  },
  {
    heading: 'Sharing and Disclosure',
    body: [
      'We do not sell, rent, trade, or lease your personal information to anyone. We share it only in these limited circumstances:',
      {
        list: [
          'With service providers who work on our behalf — for example email delivery services, image hosting, and website hosting — and only to the extent they need it to provide that service.',
          'With our auditors, bankers, and professional advisers, in confidence, for accounting and compliance purposes.',
          'With government or regulatory authorities where we are required to do so by law, or in response to a valid legal process.',
          'Where it is necessary to protect the safety, rights, or wellbeing of our residents, staff, volunteers, or the public.',
        ],
      },
      'Aggregate, anonymised figures — such as the total number of donors in a year, or the number of meals served — may be published in our reports. These cannot be used to identify you.',
    ],
  },
  {
    heading: 'Cookies and Analytics',
    body: [
      'This website may use cookies and similar technologies to keep the site working correctly and to understand, in aggregate, how visitors use it. Cookies are small files stored by your browser.',
      'Most browsers let you refuse or delete cookies through their settings. The website will continue to work if you do, although some conveniences may be lost. We do not use cookies to build advertising profiles.',
    ],
  },
  {
    heading: 'Data Retention',
    body: [
      'We keep personal information only for as long as we have a reason to. Donation and financial records are retained for the period required by Indian tax and accounting law. Contact and volunteering records are kept while our relationship is active and for a reasonable period afterwards.',
      'When information is no longer needed, we delete it or anonymise it.',
    ],
  },
  {
    heading: 'How We Protect Your Information',
    body: [
      'We take reasonable technical and organisational measures to protect your information, including restricting access to those who need it, using reputable hosting and payment providers, and keeping our systems updated.',
      'No method of transmission or storage is completely secure, and we cannot guarantee absolute security. If we ever become aware of a breach that affects your personal information, we will act promptly and inform you and the relevant authorities where required.',
    ],
  },
  {
    heading: 'Your Rights and Choices',
    body: ['You may, at any time, ask us to:', {
      list: [
        'Tell you what personal information about you we hold.',
        'Correct information that is inaccurate or out of date.',
        'Delete your information, where we are not required to keep it by law.',
        'Stop sending you newsletters, appeals, or updates.',
      ],
    },
      `To exercise any of these rights, write to us at ${siteInfo.email} or use the contact details at the bottom of this page. We will respond within a reasonable period. Every email newsletter we send also includes a way to unsubscribe.`,
    ],
  },
  {
    heading: 'Third-Party Links',
    body: [
      'Our website links to other services, including our own Facebook, Instagram, and YouTube pages. When you pay us by UPI, you do so inside your own payment app. All of these are governed by their own privacy policies, and we are not responsible for their practices. We encourage you to read them.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or in the law. The revised version will be posted on this page with a new “Last updated” date. Significant changes will be highlighted on our website.',
      'Please review this page periodically. Continuing to use our website after a change means you accept the updated policy.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Trust Matters"
        title="Privacy Policy"
        description="How we collect, use, and safeguard the information of our donors, volunteers, visitors, and the residents of our homes."
        breadcrumb="Privacy Policy"
      />
      <LegalDocument
        lastUpdated={LAST_UPDATED}
        intro={intro}
        sections={sections}
      />
    </>
  );
}
