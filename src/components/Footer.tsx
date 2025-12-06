import { Play, Mail, MessageCircle } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-card/50 border-t border-border">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold text-foreground">StreamMax</span>
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Premium IPTV service with 18,000+ channels worldwide. Stream your favorite content in HD & 4K quality.
            </p>
            
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Channels", "Tutorials", "FAQ"].map(link => <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Supported Devices */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Devices
            </h4>
            <ul className="space-y-3">
              {["Smart TV", "FireStick", "Android", "iOS", "MAG Box", "Formuler"].map(device => <li key={device}>
                  <a href="/install" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{device}</a>
                </li>)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Refund Policy", "DMCA"].map(item => <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} StreamMax. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-xs text-muted-foreground text-center">
              Powered By StreamMax, Secure Payment  
            </p>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <div className="bg-white rounded px-2 py-0.5 h-5 flex items-center justify-center">
                <span className="text-[#1A1F71] font-bold text-[10px]">VISA</span>
              </div>
              <div className="bg-white rounded px-2 py-0.5 h-5 flex items-center justify-center gap-0">
                <div className="w-3 h-3 rounded-full bg-[#EB001B]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1.5"></div>
              </div>
              <div className="bg-[#006FCF] rounded px-1.5 py-0.5 h-5 flex items-center justify-center">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-white font-bold text-[6px] tracking-tight">AMERICAN</span>
                  <span className="text-white font-bold text-[6px] tracking-tight">EXPRESS</span>
                </div>
              </div>
              <div className="bg-[#00D632] rounded px-2 py-0.5 h-5 flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">CashAPP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};