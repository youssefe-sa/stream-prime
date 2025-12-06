import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const RefundPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy - StreamMax IPTV</title>
        <meta name="description" content="StreamMax Refund Policy - Understand our refund terms and conditions for IPTV subscriptions." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="section-container max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card/50 border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-primary mb-4">Free Trial Available</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer a <strong className="text-foreground">24-hour free trial</strong> so you can test our service before committing to a paid subscription. We strongly recommend using the trial to ensure our service meets your needs and is compatible with your devices and internet connection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Refund Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At StreamMax, customer satisfaction is important to us. We offer refunds under the following conditions:
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3">1.1 Full Refund (Within 24 Hours)</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may request a full refund within 24 hours of your initial purchase if:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The service does not work on your device despite following our installation guides</li>
                <li>You experience persistent technical issues that our support team cannot resolve</li>
                <li>The service quality significantly differs from what was advertised</li>
              </ul>
              
              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">1.2 Partial Refund (24 Hours - 7 Days)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Requests made between 24 hours and 7 days after purchase may be eligible for a partial refund (prorated based on unused service time) at our discretion, particularly in cases of documented technical issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Non-Refundable Situations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Refunds will NOT be provided in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Requests made more than 7 days after purchase</li>
                <li>Change of mind or no longer wanting the service</li>
                <li>Issues caused by your internet connection or ISP</li>
                <li>Incompatibility with devices not listed as supported</li>
                <li>Account suspension due to Terms of Service violations</li>
                <li>Failure to contact support before requesting a refund</li>
                <li>VPN-related connectivity issues</li>
                <li>Temporary channel outages or content changes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How to Request a Refund</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>
                  <strong className="text-foreground">Contact Support First:</strong> Before requesting a refund, please contact our support team. Many issues can be resolved quickly, and we want to ensure you get the best experience.
                </li>
                <li>
                  <strong className="text-foreground">Submit a Refund Request:</strong> If the issue cannot be resolved, email support@streammax.com with:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Your account email address</li>
                    <li>Order/Transaction ID</li>
                    <li>Reason for refund request</li>
                    <li>Description of the issue experienced</li>
                    <li>Any troubleshooting steps already attempted</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-foreground">Wait for Review:</strong> Our team will review your request within 24-48 business hours.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Refund Processing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Once a refund is approved:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Refunds will be issued to the original payment method</li>
                <li>Processing time: 5-10 business days depending on your payment provider</li>
                <li>Your subscription will be immediately canceled upon refund approval</li>
                <li>Access to the service will be revoked</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Chargebacks</h2>
              <p className="text-muted-foreground leading-relaxed">
                We encourage you to contact us directly before initiating a chargeback with your bank or payment provider. Chargebacks without prior communication may result in permanent account suspension. We are committed to resolving disputes fairly and promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Subscription Cancellation</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may cancel your subscription at any time. Cancellation will prevent future charges but does not automatically entitle you to a refund for the current billing period. Your access will continue until the end of your paid subscription period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Special Circumstances</h2>
              <p className="text-muted-foreground leading-relaxed">
                We understand that exceptional situations may arise. If you believe your situation warrants special consideration, please contact our support team. We review all requests on a case-by-case basis and strive to find fair solutions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For refund requests or questions about this policy, please contact us at support@streammax.com. Our support team is available 24/7 to assist you.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default RefundPolicy;
