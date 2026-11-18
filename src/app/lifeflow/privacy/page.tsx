import Footer from "@/Landing/Footer";
import Navigation from "@/Landing/Navigation";
import React from "react";
import { pageMetadata } from "@/lib/seo";

/**
 * Privacy policy for LifeFlow, LifeFirst's workplace app (web and Android).
 * Kept apart from /privacy-policy, which covers the website's contact form,
 * so marketing wording never applies to employee data. This is the URL given
 * to Google Play. Keep it true to what LifeFlow actually does: when the app
 * starts collecting something new or sharing with a new provider, update this
 * page and its effective date in the same release.
 */

export const metadata = pageMetadata({
  title: "LifeFlow Privacy Policy | LifeFirst",
  description:
    "How LifeFlow, LifeFirst's workplace app for web and Android, collects, uses, protects and deletes employee information, including attendance photos, face data and location.",
  path: "/lifeflow/privacy",
});

const EFFECTIVE_DATE = "19 November 2026";
const CONTACT_EMAIL = "coo@life-first.in";

const h2 =
  "text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2";
const body = "text-gray-700 leading-relaxed space-y-3";
const list = "list-disc pl-6 space-y-1";

const Mail = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
    {CONTACT_EMAIL}
  </a>
);

const page = () => {
  return (
    <>
      <Navigation />
      <div className="bg-gray-50 min-h-screen py-8 mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8 space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">
                LifeFlow Privacy Policy
              </h1>
              <p className="text-gray-500">Effective date: {EFFECTIVE_DATE}</p>
              <p className="text-gray-700 leading-relaxed">
                LifeFlow is the workplace app of LifeFirst Concepts &amp;
                Technologies Pvt. Ltd. (“LifeFirst”, “we”, “us”). Employees use
                it for attendance, leave, payslips, expense claims, tasks,
                announcements and HR requests. This policy explains what
                LifeFlow collects about you, why, who can see it, how long we
                keep it and how to have it deleted. It applies to the LifeFlow
                web app and the LifeFlow mobile app.
              </p>
              <p className="text-gray-700 leading-relaxed">
                LifeFlow is not a public app: accounts are created by
                LifeFirst&apos;s HR team for employees. It is not meant for
                anyone under 18.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className={h2}>Who is responsible for your data</h2>
                <div className={body}>
                  <p>
                    The data controller for LifeFlow is the Chief Operating
                    Officer (COO) of LifeFirst Concepts &amp; Technologies Pvt.
                    Ltd. For any question, request or complaint about your data
                    in LifeFlow, write to <Mail />.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={h2}>Information LifeFlow collects</h2>
                <div className={body}>
                  <p>
                    <strong>Your account:</strong> name, work email, username
                    and password. Passwords are stored only in a scrambled
                    (hashed) form that cannot be turned back into the password.
                  </p>
                  <p>
                    <strong>Your employee record</strong>, entered by you or by
                    HR:
                  </p>
                  <ul className={list}>
                    <li>
                      personal and contact details, emergency contacts and
                      family details you choose to give
                    </li>
                    <li>
                      job details: employee code, designation, department,
                      reporting manager, joining date
                    </li>
                    <li>
                      identity numbers such as PAN and Aadhaar, and bank account
                      details for salary, stored encrypted
                    </li>
                    <li>salary, payslips, and documents you or HR upload</li>
                    <li>your profile photo</li>
                  </ul>
                  <p>
                    <strong>Attendance:</strong> the time of each punch in and
                    out, a photo taken by the camera when you punch from the
                    mobile app, and, only if you allow it, your location at that
                    moment. Corrections you request and their approval are
                    recorded too.
                  </p>
                  <p>
                    <strong>Face data:</strong> see the next section.
                  </p>
                  <p>
                    <strong>Leave, expenses and requests:</strong> leave
                    applications, expense entries with photos or files of your
                    bills, mileage details, approvals and comments, tasks and
                    help-desk requests.
                  </p>
                  <p>
                    <strong>Notifications:</strong> a device token that lets us
                    send push notifications to your phone, and the in-app
                    notifications sent to you.
                  </p>
                  <p>
                    <strong>Technical information:</strong> IP address, device
                    type and app version, kept in security and error logs, and a
                    record of important actions (who changed what, and when).
                  </p>
                </div>
              </section>

              <section>
                <h2 className={h2}>Face data</h2>
                <div className={body}>
                  <p>
                    To check that the person punching in is really you, LifeFlow
                    uses face matching. When you set it up, you take a few
                    photos of your face. From each photo our own face-matching
                    service works out a face print: a list of numbers that
                    describes your face. When you punch, the same is done with
                    the punch photo and compared with your face print.
                  </p>
                  <ul className={list}>
                    <li>
                      Face data is used only to confirm attendance punches,
                      never for anything else.
                    </li>
                    <li>
                      It is processed on LifeFirst&apos;s own servers. It is not
                      sold, and not sent to any outside face-recognition or AI
                      company.
                    </li>
                    <li>
                      A punch whose face doesn&apos;t match is flagged for HR to
                      review; it is not decided by the machine alone.
                    </li>
                    <li>
                      It is deleted within 90 days after you are offboarded
                      (see “How long we keep your data”).
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className={h2}>Phone permissions</h2>
                <div className={body}>
                  <p>The mobile app asks for these permissions:</p>
                  <ul className={list}>
                    <li>
                      <strong>Camera:</strong> to take your punch photo, your
                      face set-up photos, and photos of bills.
                    </li>
                    <li>
                      <strong>Location</strong> (only while the app is open):
                      to record where you punched. You can refuse; LifeFlow does
                      not track your location in the background.
                    </li>
                    <li>
                      <strong>Photos:</strong> to pick a profile photo or a bill
                      from your gallery.
                    </li>
                    <li>
                      <strong>Notifications:</strong> to tell you about
                      approvals, reminders and announcements.
                    </li>
                  </ul>
                  <p>You can change these in your phone&apos;s settings.</p>
                </div>
              </section>

              <section>
                <h2 className={h2}>How we use your information</h2>
                <div className={body}>
                  <ul className={list}>
                    <li>to run attendance, leave and holiday calendars</li>
                    <li>
                      to calculate and pay salary, and to meet statutory
                      requirements such as tax and provident fund
                    </li>
                    <li>to process and pay back expense claims</li>
                    <li>
                      to let your manager, HR and Accounts act on your requests
                    </li>
                    <li>to send you notifications and emails about your work</li>
                    <li>
                      to keep LifeFlow secure and to find and fix problems
                    </li>
                    <li>to comply with the law</li>
                  </ul>
                  <p>
                    We do not use LifeFlow data for advertising or marketing,
                    and we do not sell it.
                  </p>
                  <p>
                    We process this information for the purposes of your
                    employment and to meet our legal obligations, as the
                    Digital Personal Data Protection Act, 2023 allows, and with
                    your consent where we ask for it, such as for location.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={h2}>Who can see your information</h2>
                <div className={body}>
                  <p>
                    <strong>Inside LifeFirst</strong>, access depends on role:
                    your reporting manager sees what they need to approve your
                    attendance, leave and expenses; HR and Accounts see the
                    records they manage; colleagues see directory details such
                    as your name, designation, department and photo. Private
                    details (contact details, identity numbers, bank details,
                    salary) are visible only to the HR and Accounts roles that
                    need them.
                  </p>
                  <p>
                    <strong>Service providers</strong> that run LifeFlow for us,
                    under their own security and privacy terms:
                  </p>
                  <ul className={list}>
                    <li>Railway: servers and database</li>
                    <li>Cloudflare: file storage and website security checks</li>
                    <li>
                      Google Firebase and Expo: delivering push notifications to
                      your phone
                    </li>
                    <li>
                      Anthropic: when you use “read the bill” for an expense,
                      the bill image is sent to Anthropic&apos;s AI to read the
                      merchant, date and amount for you to check. Bills are not
                      used to train its models.
                    </li>
                    <li>an email delivery provider, for work emails</li>
                  </ul>
                  <p>
                    These providers may store data on servers outside India. We
                    also share information with government authorities when the
                    law requires it.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={h2}>How we protect it</h2>
                <div className={body}>
                  <ul className={list}>
                    <li>all traffic to LifeFlow is encrypted (HTTPS)</li>
                    <li>
                      passwords are hashed; identity numbers and bank details
                      are encrypted
                    </li>
                    <li>
                      access is limited by role, and important actions are
                      logged
                    </li>
                  </ul>
                  <p>
                    No system is completely secure. If a breach affects your
                    data, we will tell you and the authorities as the law
                    requires.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={h2}>How long we keep your data</h2>
                <div className={body}>
                  <p>We keep your data while you work at LifeFirst.</p>
                  <p>
                    When you leave and HR completes your offboarding in
                    LifeFlow, we delete your face data, punch photos, punch
                    locations and your LifeFlow account{" "}
                    <strong>within 90 days</strong>.
                  </p>
                  <p>
                    Records the law requires us to keep, such as salary, tax and
                    provident fund records, are kept for as long as the law
                    requires and then deleted.
                  </p>
                  <p>In-app notifications are deleted after 180 days.</p>
                </div>
              </section>

              <section>
                <h2 className={h2}>Your rights</h2>
                <div className={body}>
                  <p>You can:</p>
                  <ul className={list}>
                    <li>see the personal data LifeFlow holds about you</li>
                    <li>
                      correct it: most details can be updated from your profile
                      in the app; HR updates the rest
                    </li>
                    <li>
                      ask for it to be deleted, apart from records we must keep
                      by law
                    </li>
                    <li>
                      withdraw consent you gave, for example for location
                    </li>
                    <li>nominate someone to act for you</li>
                    <li>raise a complaint</li>
                  </ul>
                  <p>
                    Write to <Mail />. We reply within 30 days. If you are not
                    satisfied with our answer, you may complain to the Data
                    Protection Board of India.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={h2}>Deleting your account</h2>
                <div className={body}>
                  <p>
                    Your LifeFlow account is closed when you are offboarded,
                    and deleted as described above. To ask for your account and
                    data to be deleted earlier, write to <Mail /> from your work
                    email, or ask HR. We confirm when it is done.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={h2}>Changes to this policy</h2>
                <div className={body}>
                  <p>
                    When LifeFlow changes what it collects or who it shares
                    with, we update this page and its effective date, and let
                    you know.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={h2}>Contact</h2>
                <div className={body}>
                  <p>
                    LifeFirst Concepts &amp; Technologies Pvt. Ltd., attention:
                    COO. Email: <Mail />
                  </p>
                  <p>
                    For the LifeFirst website and its contact form, see our{" "}
                    <a
                      href="/privacy-policy"
                      className="text-blue-600 hover:underline"
                    >
                      website privacy policy
                    </a>
                    .
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
