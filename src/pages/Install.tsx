import { Header } from "@/components/Header";
import { Tutorials } from "@/components/Tutorials";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Install = () => {
  return (
    <>
      <Helmet>
        <title>Installation Guides - StreamMax | Setup on Any Device</title>
        <meta 
          name="description" 
          content="Step-by-step installation guides for all devices. FireStick, Smart TV, Android, iOS, MAG, Formuler and more." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <Tutorials />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Install;
