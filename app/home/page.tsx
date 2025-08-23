import WalletBadge from '@/components/WalletBadge';
import BuyCreditsButton from '@/components/BuyCreditsButton';
import GoLiveButton from '@/components/GoLiveButton';
import CreditStore from '@/components/CreditStore';
import MerchStore from '@/components/MerchStore';
export default function Home(){
  const email = 'user@example.com';
  return (
    <main style={{minHeight:'100dvh',background:'linear-gradient(180deg,#000,#2b0b2b)',padding:'48px 24px'}}>
      <div style={{maxWidth:960,margin:'0 auto',display:'flex',flexDirection:'column',gap:16}}>
        <WalletBadge email={email} />
        <header><h1 style={{fontSize:36,margin:0}}>AsskFans Penthouse</h1><p style={{opacity:0.8}}>Pick a lounge. Pay to play when ready.</p></header>
        <section style={{display:'flex',gap:8}}>
          <BuyCreditsButton email={email} priceId="price_100CREDITS" />
          <BuyCreditsButton email={email} priceId="price_300CREDITS" />
          <BuyCreditsButton email={email} priceId="price_1200CREDITS" />
        </section>
        <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:16}}>
            <h2 style={{margin:'0 0 8px 0'}}>Rosie Palms</h2><p style={{opacity:0.8}}>Flirty, funny, dangerously distracting.</p>
            <GoLiveButton email={email} character="rosie" />
          </div>
          <div style={{border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,padding:16}}>
            <h2 style={{margin:'0 0 8px 0'}}>The Ass King</h2><p style={{opacity:0.8}}>Larger-than-life. Louder-than-legal.</p>
            <GoLiveButton email={email} character="assking" />
          </div>
        </section>
        <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <CreditStore email={email} />
          <MerchStore email={email} />
        </section>
        <section style={{marginTop:8}}><a href="/explore" style={{display:'inline-block',padding:'10px 16px',borderRadius:14,background:'#fff',color:'#000'}}>Explore Hub</a></section>
      </div>
    </main>
  );
}
