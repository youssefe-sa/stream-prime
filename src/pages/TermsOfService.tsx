import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - StreamMax IPTV</title>
        <meta name="description" content="StreamMax Terms of Service - Read our terms and conditions for using our IPTV streaming service." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="section-container max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using StreamMax IPTV service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Service. We reserve the right to modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                StreamMax provides an Internet Protocol Television (IPTV) streaming service that allows subscribers to access live television channels, video on demand content, and related features through compatible devices. The availability of content may vary based on your subscription plan and geographic location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To use our Service, you must:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Be at least 18 years of age or have parental consent</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized account access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Subscription and Payment</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">4.1 Subscription Plans</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer various subscription plans with different durations and features. The details of each plan, including pricing and features, are displayed on our website at the time of purchase.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3">4.2 Payment</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All payments are processed through secure third-party payment processors. By subscribing, you authorize us to charge your selected payment method for the subscription fee.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3">4.3 Automatic Renewal</h3>
              <p className="text-muted-foreground leading-relaxed">
                Subscriptions may automatically renew at the end of each billing period unless you cancel before the renewal date. You will be notified before any automatic renewal charges.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Acceptable Use Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree NOT to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Share your account credentials with others</li>
                <li>Resell, redistribute, or commercially exploit the Service</li>
                <li>Attempt to circumvent any security measures</li>
                <li>Use the Service for any illegal purposes</li>
                <li>Record, download, or redistribute any content</li>
                <li>Use VPNs or proxies to access geo-restricted content</li>
                <li>Exceed the device limit specified in your subscription plan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide uninterrupted service, we do not guarantee that the Service will be available at all times. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control. We are not liable for any interruptions or degradation of service quality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Content Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                StreamMax aggregates and provides access to content from various sources. We do not produce or own the content available through our Service. Content availability may change without notice. We are not responsible for the accuracy, completeness, or quality of third-party content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The StreamMax name, logo, and all related graphics, software, and technology are protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Service for personal, non-commercial purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, STREAMMAX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SERVICE IN THE TWELVE MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use the Service will immediately cease. You may cancel your subscription at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at support@streammax.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default TermsOfService;
