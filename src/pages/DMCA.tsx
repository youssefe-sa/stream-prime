import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const DMCA = () => {
  return (
    <>
      <Helmet>
        <title>DMCA Policy - StreamMax IPTV</title>
        <meta name="description" content="StreamMax DMCA Policy - Learn about our copyright infringement procedures and how to submit takedown notices." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16 bg-background min-h-screen">
        <div className="section-container max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">DMCA Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card/50 border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                StreamMax respects the intellectual property rights of others and expects our users to do the same. We are committed to responding to notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act (DMCA) and other applicable intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Notice and Takedown Procedure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe that content available through our Service infringes your copyright, please submit a DMCA takedown notice containing the following information:
              </p>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
                <li>
                  <strong className="text-foreground">Identification of the copyrighted work:</strong> A description of the copyrighted work you claim has been infringed, or if multiple works are covered by a single notification, a representative list of such works.
                </li>
                <li>
                  <strong className="text-foreground">Identification of the infringing material:</strong> Identification of the material you claim is infringing and information reasonably sufficient to permit us to locate the material (e.g., channel name, URL, or other identifying information).
                </li>
                <li>
                  <strong className="text-foreground">Contact information:</strong> Your name, address, telephone number, and email address.
                </li>
                <li>
                  <strong className="text-foreground">Good faith statement:</strong> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                </li>
                <li>
                  <strong className="text-foreground">Accuracy statement:</strong> A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.
                </li>
                <li>
                  <strong className="text-foreground">Signature:</strong> Your physical or electronic signature.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Designated DMCA Agent</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Please submit your DMCA takedown notice to our designated agent:
              </p>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground font-medium mb-2">StreamMax DMCA Agent</p>
                <p className="text-muted-foreground">Email: dmca@streammax.com</p>
                <p className="text-muted-foreground">Subject Line: DMCA Takedown Notice</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Counter-Notification</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe your content was removed or disabled by mistake or misidentification, you may submit a counter-notification containing:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your physical or electronic signature</li>
                <li>Identification of the material that was removed and its location before removal</li>
                <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake or misidentification</li>
                <li>Your name, address, and telephone number</li>
                <li>A statement that you consent to the jurisdiction of the federal court in your district</li>
                <li>A statement that you will accept service of process from the person who provided the original notification</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Processing Timeline</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Upon receiving a valid DMCA notice, we will:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Acknowledge receipt within 24-48 hours</li>
                <li>Review the notice for completeness and validity</li>
                <li>Take appropriate action, which may include removing or disabling access to the allegedly infringing content</li>
                <li>Notify the affected user (if applicable) of the takedown</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Repeat Infringers</h2>
              <p className="text-muted-foreground leading-relaxed">
                In accordance with the DMCA and other applicable laws, we have adopted a policy of terminating, in appropriate circumstances and at our sole discretion, users who are deemed to be repeat infringers. We may also, at our sole discretion, limit access to our Service and/or terminate the accounts of any users who infringe intellectual property rights of others, whether or not there is any repeat infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Third-Party Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                StreamMax acts as a service provider and does not control, endorse, or assume responsibility for any third-party content accessible through our Service. The availability of content through our Service does not constitute an endorsement or guarantee of the legality of such content. Rights holders should direct any copyright concerns to the appropriate content sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Good Faith Requirement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Please note that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing, or that material or activity was removed or disabled by mistake, may be subject to liability for damages. Please ensure that you have a legitimate claim before submitting a DMCA notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modifications to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this DMCA Policy at any time. Any changes will be effective immediately upon posting the revised policy on this page. Your continued use of our Service following the posting of changes constitutes your acceptance of such changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions regarding this DMCA Policy, please contact us at dmca@streammax.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default DMCA;
